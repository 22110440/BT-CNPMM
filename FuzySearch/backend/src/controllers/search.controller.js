import escapeStringRegexp from 'escape-string-regexp';
import { productFuzySearch } from '../models/ProductFuzySearch.js';
import { normalizeVN } from '../utils/normalize.js';

function toNumber(v, def) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : def;
}

export async function fuzzySearch(req, res) {
  try {
    const q = (req.query.q || req.query.keyword || '').trim();
    if (!q) return res.status(400).json({ error: 'Missing search keyword q' });

    const page = toNumber(req.query.page, 1);
    const limit = Math.min(toNumber(req.query.limit, 20), 100);
    const skip = (page - 1) * limit;

    // Ưu tiên hỗ trợ gõ từng ký tự: nếu từ khóa rất ngắn (<= 2), bỏ qua text search
    if (q.length <= 2) {
      const safe = escapeStringRegexp(q);
      // 1) prefix trên name
      let regexQuery = { name: { $regex: `^${safe}`, $options: 'i' } };
      let count = await productFuzySearch.countDocuments(regexQuery);
      if (count === 0) {
        // 2) substring trên nameNormalized (không dấu)
        const normalized = escapeStringRegexp(normalizeVN(q));
        regexQuery = { nameNormalized: { $regex: normalized, $options: 'i' } };
        count = await productFuzySearch.countDocuments(regexQuery);
      }

      const items = await productFuzySearch
        .find(regexQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      return res.json({ mode: 'short-regex', page, limit, count, items });
    }

    // 1) Thử TEXT SEARCH trước
    let items = await productFuzySearch
      .find(
        { $text: { $search: q } },
        { score: { $meta: 'textScore' }, name: 1, description: 1, price: 1, category: 1 }
      )
      .sort({ score: { $meta: 'textScore' } })
      .skip(skip)
      .limit(limit)
      .lean();

    // Nếu có kết quả text → lấy tổng ước lượng
    if (items.length > 0) {
      const count = await productFuzySearch.countDocuments({ $text: { $search: q } });
      return res.json({
        mode: 'text',
        page, limit, count,
        items
      });
    }

    // 2) Fallback: REGEX theo mức độ chính xác giảm dần
    const safe = escapeStringRegexp(q);
    // token đầu tiên để làm prefix (tối ưu)
    const firstToken = safe.split(/\s+/)[0];

    // 2a) ưu tiên khớp chính xác name (không phân biệt hoa thường)
    let regexQuery = { name: { $regex: `^${safe}$`, $options: 'i' } };
    let count = await productFuzySearch.countDocuments(regexQuery);
    if (count === 0) {
      // 2b) prefix theo token đầu tiên
      regexQuery = { name: { $regex: `^${firstToken}`, $options: 'i' } };
      count = await productFuzySearch.countDocuments(regexQuery);
      if (count === 0) {
        // 2c) substring trên nameNormalized (không dấu)
        const normalized = escapeStringRegexp(normalizeVN(q));
        regexQuery = { nameNormalized: { $regex: normalized, $options: 'i' } };
        count = await productFuzySearch.countDocuments(regexQuery);
      }
    }

    items = await productFuzySearch.find(regexQuery)
      .sort({ createdAt: -1 }) // tạm sắp xếp theo mới nhất nếu là regex
      .skip(skip)
      .limit(limit)
      .lean();

    return res.json({
      mode: 'regex',
      page, limit, count,
      items
    });
  } catch (err) {
    console.error('[search] error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}

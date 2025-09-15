import { useState } from "react";
import api from "../api";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword) return;

    setLoading(true);
    try {
      const res = await api.get("/search", {
        params: { q: keyword, limit: 10 }
      });
      setResults(res.data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto" }}>
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm sản phẩm..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit">Tìm</button>
      </form>

      {loading && <p>Đang tìm kiếm...</p>}

      <ul>
        {results.map((item) => (
          <li key={item._id} style={{ marginTop: "10px" }}>
            <strong>{item.name}</strong> - ${item.price}
            <br />
            <small>{item.description}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;

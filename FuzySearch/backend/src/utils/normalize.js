export function normalizeVN(str = '') {
  // lowerCase + bỏ dấu (Unicode NFD)
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, ''); // yêu cầu Node >= 12
}

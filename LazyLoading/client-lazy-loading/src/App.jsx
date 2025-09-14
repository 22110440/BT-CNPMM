import { useEffect, useState } from "react";
import API from "./api";

function App() {
  const [products, setProducts] = useState([]); // danh sách sản phẩm
  const [page, setPage] = useState(1);          // trang hiện tại
  const [hasMore, setHasMore] = useState(true); // còn dữ liệu không
  const limit = 20;                             // mỗi lần load 20 sản phẩm

  // Hàm load sản phẩm từ API
  const fetchProducts = async () => {
    try {
      const res = await API.get(`/products?page=${page}&limit=${limit}`);
      setProducts((prev) => [...prev, ...res.data.data]); // nối thêm
      const total = res.data.total;
      if (products.length + res.data.data.length >= total) {
        setHasMore(false); // hết dữ liệu
      }
    } catch (err) {
      console.error("Lỗi tải sản phẩm:", err);
    }
  };

  // Gọi API khi page thay đổi
  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Hàm xử lý scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        if (hasMore) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lazy Loading Products</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px" }}>
        {products.map((p) => (
          <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
            <img src={p.image} alt={p.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <strong>{p.price.toLocaleString()} VND</strong>
          </div>
        ))}
      </div>

      {!hasMore && <p style={{ textAlign: "center", marginTop: "20px" }}>Đã tải hết sản phẩm</p>}
    </div>
  );
}

export default App;

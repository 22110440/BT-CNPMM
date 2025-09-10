import React, { useState, useEffect } from "react";
import { getCart, addItem, updateItem, deleteItem } from "../api/cartAPI";
import Button from "./Button";
import InputText from "./InputText";
import Card from "./Card";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 1, price: 0 });

  useEffect(() => {
    getCart().then(res => setItems(res.data));
  }, []);

  const handleAdd = async () => {
    if (!newItem.name.trim()) return;
    const res = await addItem(newItem);
    setItems([...items, res.data]);
    setNewItem({ name: "", quantity: 1, price: 0 });
  };

  const handleUpdate = async (id, field, value) => {
    const updatedItem = items.find(i => i._id === id);
    const newData = { ...updatedItem, [field]: value };
    await updateItem(id, newData);
    setItems(items.map(i => (i._id === id ? newData : i)));
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setItems(items.filter(i => i._id !== id));
  };

  return (
    <div>
      <h2>Giỏ hàng</h2>
      <InputText
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        placeholder="Tên sản phẩm..."
      />
      <InputText
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        placeholder="Số lượng"
      />
      <InputText
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
        placeholder="Giá"
      />
      <Button label="Thêm" onClick={handleAdd} />

      {items.map(item => (
        <Card key={item._id}>
          <InputText
            value={item.name}
            onChange={(e) => handleUpdate(item._id, "name", e.target.value)}
          />
          <InputText
            value={item.quantity}
            onChange={(e) => handleUpdate(item._id, "quantity", e.target.value)}
          />
          <InputText
            value={item.price}
            onChange={(e) => handleUpdate(item._id, "price", e.target.value)}
          />
          <Button label="Xóa" onClick={() => handleDelete(item._id)} />
        </Card>
      ))}
    </div>
  );
}

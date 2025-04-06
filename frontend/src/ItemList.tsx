import { useEffect, useState } from "react";

// Define the shape of an Item based on your backend model
type Item = {
  id: number;
  name: string;
  description: string;
};

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data: Item[]) => setItems(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;

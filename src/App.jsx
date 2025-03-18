import "./App.css";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

function App() {
  const [items, setItems] = useState([
    "https://cdn.pixabay.com/photo/2023/11/06/09/52/mountain-8369262_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/08/09/16/19/sea-7375377_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/05/15/07/59/flowers-8763039_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/01/12/14/24/night-3078326_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/02/15/17/45/winter-7015372_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/05/18/18/12/butterfly-8002932_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/06/27/10/51/pier-8091934_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/03/06/14/58/iguana-7833655_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/09/29/12/38/winter-8283735_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/11/06/09/21/forest-7573541_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/03/24/13/39/nature-7089143_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/10/08/16/47/austria-7507345_1280.jpg",
  ]);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  const listRef = useRef(null);

  //when drag starts
  function handleDragStart(index) {
    setDraggedItemIndex(index);
  }

  function handleTouchStart(index) {
    setDraggedItemIndex(index);
    console.log(index);
  }

  //while dragging
  function handleDragOver(event) {
    event.preventDefault();
  }

  //while dropping
  function handleDrop(index) {
    if (draggedItemIndex === null) return;

    let updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedItemIndex, 1);
    const [replacedItem] = updatedItems.splice(index, 1);
    updatedItems.splice(index, 0, draggedItem);
    updatedItems.splice(draggedItemIndex, 0, replacedItem);

    setItems(updatedItems);
    setDraggedItemIndex(null);
  }

  // 🔹 Detect where the user stopped touching
  const handleTouchEnd = (event) => {
    if (draggedItemIndex === null) return;

    // Get touch position
    const touch = event.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    // Get the element at that position
    const element = document.elementFromPoint(x, y);
    if (!element) return;

    // Find the index of the dropped image
    const droppedIndex = [...listRef.current.children].indexOf(
      element.closest(".image-item")
    );

    if (droppedIndex !== -1 && droppedIndex !== draggedItemIndex) {
      // Swap images
      const newImages = [...items];
      [newImages[draggedItemIndex], newImages[droppedIndex]] = [
        newImages[droppedIndex],
        newImages[draggedItemIndex],
      ];
      setItems(newImages);
    }

    setDraggedItemIndex(null);
  };

  return (
    <div className="main">
      <h2 style={{ marginBottom: "10px" }}>Swap Images</h2>
      <ul
        ref={listRef}
        style={{
          listStyle: "none",
          padding: 0,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            //for mobile or tablet screen
            onTouchStart={() => handleTouchStart(index)}
            onTouchEnd={handleTouchEnd}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ backgroundColor: "#ddd", scale: 1.1 }}
            style={{
              padding: "12px",
              margin: "6px",
              background: draggedItemIndex === index ? "#ccc" : "#f5f5f5",
              borderRadius: "8px",
              border: "1px solid #bbb",
              cursor: "grab",
              touchAction: "none",
            }}
            className="image-item"
          >
            <img className="drag-img" src={item} alt={`image ${index + 1}`} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default App;

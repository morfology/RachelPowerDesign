import React, { useRef, useState, useEffect, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

const fetchMoreItems = (existingItems) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, i) => ({
        id: existingItems.length + i,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      }));
      resolve([...existingItems, ...newItems]);
    }, 1000);
  });
};

const Grid = () => {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => ({
    id: i,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
  })));

  const parentRef = useRef(null);

  // TanStack Virtual
  const rowVirtualizer = useVirtualizer({
    count: Math.ceil(items.length / 3), // 3 items per row
    getScrollElement: () => parentRef.current,
    estimateSize: () => 150, // Estimate height per row
  });

  // Infinite Scroll Trigger
  const lastItemRef = useRef(null);
  const observer = useRef(null);

  const loadMore = useCallback(() => {
    fetchMoreItems(items).then(setItems);
  }, [items]);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { threshold: 1 }
    );
    if (lastItemRef.current) observer.current.observe(lastItemRef.current);
  }, [loadMore]);

  return (
    <div ref={parentRef} style={{ height: "600px", overflowY: "auto", padding: "10px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow, rowIndex) => {
          return items
            .slice(virtualRow.index * 3, virtualRow.index * 3 + 3)
            .map((item, itemIndex) => (
              <div
                key={item.id}
                ref={rowIndex === rowVirtualizer.getVirtualItems().length - 1 && itemIndex === 2 ? lastItemRef : null}
                style={{
                  aspectRatio: "1 / 1",
                  backgroundColor: item.color,
                  borderRadius: "8px",
                }}
              />
            ));
        })}
      </div>
    </div>
  );
};

export default Grid;

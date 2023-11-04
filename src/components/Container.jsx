import { useCallback, useState } from "react";
import update from "immutability-helper";
import Card from "./Card";
import { data } from "../data/data";

const Container = () => {
  const [cards, setCards] = useState(data);
  const [marked, setMarked] = useState([]);

  // handle file selection
  const handleMarked = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMarked([...marked, value]);
    } else {
      setMarked(marked.filter((id) => id !== value));
    }
  };

  // handle delete marked items
  const handleDelete = () => {
    const confirmDlt = confirm("Are you sure you want to delete!");
    if (confirmDlt) {
      const filteredItems = cards.filter(
        (obj) => !marked.includes(obj.id.toString())
      );
      setMarked([]);
      setCards(filteredItems);
    }
  };

  //reorder items based on their hover position
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      })
    );
  }, []);

  return (
    <div className="gallery_container">
      <div className="gallery_wrapper">
        <div className="header">
          {marked && marked.length > 0 ? (
            <div className="marked_item">
              <p>
                {marked.length} {marked.length > 1 ? "Files" : "File"} Selected
              </p>
              <p className="dlt_btn" onClick={handleDelete}>
                Delete {marked.length > 1 ? "Files" : "File"}
              </p>
            </div>
          ) : (
            <h2>Gallery</h2>
          )}
        </div>
        <div className="gallery">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              index={index}
              card={card}
              moveCard={moveCard}
              handleMarked={handleMarked}
            />
          ))}
          <div className="card">1</div>
        </div>
      </div>
    </div>
  );
};

export default Container;

import React, { useState } from "react";

import "./list.styles.css";

const List = ({ listItems, handleClick }) => {
  const [cursor, setCursor] = useState(0);

  const handleKeyboardNavigation = (event) => {
    switch (event.keyCode) {
      case 13: // Enter
      case 32: //Space
        handleClick(listItems[cursor]);
        break;

      // Up arrow key
      case 38:
        if (cursor > 0) {
          setCursor(cursor - 1);
        }
        break;

      // Down arrow key
      case 40:
        if (cursor < listItems.length - 1) {
          setCursor(cursor + 1);
        }
        break;

      default:
        break;
    }
  };
  return (
    <div
      className="list"
      role="list"
      tabIndex="0"
      onKeyDown={(event) => handleKeyboardNavigation(event)}
    >
      {listItems.map((item, index) => (
        <div
          className={`listItem ${index === cursor ? "hovered" : ""}`}
          key={item.id}
          role="listitem"
          onClick={() => handleClick(item)}
        >
          <h3>{item.name}</h3>
          <p>{item.email}</p>
        </div>
      ))}
    </div>
  );
};

export default List;

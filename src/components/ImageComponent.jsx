import React, { useState } from "react";

const ImageComponent = ({
  task,
  handleOnDrag,
  dragOver,
  handleOnDrop,
  handleTaskSelection,
  selected,
  selectedTasks,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = () => {
    setIsHovered((prev) => !prev);
  };

  return (
    <>
      <div
        className={`box-${task.id} task`}
        key={task.id}
        draggable
        onDragStart={(e) => handleOnDrag(e, task.value)}
        onDragOver={(e) => {
          dragOver(e);
        }}
        onDrop={(e) => {
          handleOnDrop(e, task.id);
          setIsDragging(false);
        }}
        onDragEnter={(e) =>
          setIsDragging(e.target.className === `box-${task.id}`)
        }
        onDragEnd={(e) => setIsDragging(false)}
        onDragLeave={(e) => {
          if (e.target.classList.contains(`box-${task.id}`)) {
            setIsDragging(false);
          }
        }}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        style={{
          opacity: selectedTasks.includes(task.id) ? ".5" : "1",
          border: isDragging ? "2px solid #000" : "",
        }}
      >
        <div className="image-box">
          <img className={`box-${task.id}`} src={task?.imageUrl} />
          {isHovered && (
            <div className="image-overlay">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => handleTaskSelection(task.id)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageComponent;

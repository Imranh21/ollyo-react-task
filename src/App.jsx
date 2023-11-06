import { useState } from "react";
import "./App.css";
import ImageComponent from "./components/ImageComponent";

const tasks = [
  {
    id: 1,
    value: "task 1",
    imageUrl: "/images/image-1.webp",
  },
  {
    id: 2,
    value: "task 2",
    imageUrl: "/images/image-2.webp",
  },
  {
    id: 3,
    value: "task 3",
    imageUrl: "/images/image-3.webp",
  },
  {
    id: 4,
    value: "task 4",
    imageUrl: "/images/image-4.webp",
  },
  {
    id: 5,
    value: "task 5",
    imageUrl: "/images/image-5.webp",
  },
  {
    id: 6,
    value: "task 6",
    imageUrl: "/images/image-6.webp",
  },
  {
    id: 7,
    value: "task 7",
    imageUrl: "/images/image-7.webp",
  },
  {
    id: 8,
    value: "task 8",
    imageUrl: "/images/image-8.webp",
  },
  {
    id: 9,
    value: "task 9",
    imageUrl: "/images/image-9.webp",
  },
  {
    id: 10,
    value: "task 10",
    imageUrl: "/images/image-10.jpeg",
  },
  {
    id: 11,
    value: "task 11",
    imageUrl: "/images/image-11.jpeg",
  },
];

function App() {
  const [taskOrder, setTaskOrder] = useState(tasks);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleOnDrag = (e, type) => {
    e.dataTransfer.setData("type", type);
    e.dataTransfer.setData(
      "originalIndex",
      taskOrder.findIndex((task) => task.value === type)
    );
  };

  const handleOnDrop = (e, target) => {
    e.preventDefault();
    const typeee = e.dataTransfer.getData("type");
    const draggedItem = taskOrder.find((task) => task.value === typeee);
    const index = taskOrder.findIndex((task) => task.id === target);

    const updatedOrder = [...taskOrder];
    updatedOrder.splice(taskOrder.indexOf(draggedItem), 1);
    updatedOrder.splice(index, 0, draggedItem);

    setTaskOrder(updatedOrder);
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  const handleTaskSelection = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleDeleteSelectedTasks = () => {
    const updatedOrder = taskOrder.filter(
      (task) => !selectedTasks.includes(task.id)
    );
    setTaskOrder(updatedOrder);
    setSelectedTasks([]);
  };

  return (
    <div className="body">
      <div className="image-gallary">
        <div className="header">
          {selectedTasks.length ? (
            <div className="action">
              <div className="checkbox">
                <input
                  type="checkbox"
                  checked={selectedTasks}
                  onChange={() => setSelectedTasks([])}
                />
                <h3>{selectedTasks.length} Files selected</h3>
              </div>
              <button onClick={handleDeleteSelectedTasks}>Delete files </button>
            </div>
          ) : (
            <h3>Gallary</h3>
          )}
        </div>

        <div className="tasks-wrapper">
          {taskOrder.map((task) => (
            <ImageComponent
              key={task.id}
              task={task}
              handleOnDrag={handleOnDrag}
              dragOver={dragOver}
              handleOnDrop={handleOnDrop}
              selected={selectedTasks.includes(task.id)}
              handleTaskSelection={() => handleTaskSelection(task.id)}
              selectedTasks={selectedTasks}
            />
          ))}
          <div className="custom-file-input">
            <label htmlFor="file-input">
              <div className="file-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <p>Add Images</p>
              </div>
            </label>
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setTaskOrder([
                  ...taskOrder,
                  {
                    id: Math.random(),
                    value: `task ${Math.random()}`,
                    imageUrl: URL.createObjectURL(file),
                  },
                ]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

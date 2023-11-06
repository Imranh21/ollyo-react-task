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
        </div>
      </div>
    </div>
  );
}

export default App;

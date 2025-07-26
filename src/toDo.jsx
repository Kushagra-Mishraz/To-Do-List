import { useState } from "react";
import "./toDo.css";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure you want to clear all tasks?");
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} />
      <TodoList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Header() {
  return <h1>📝 To-Do List</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description.trim()) return;

    const newItem = {
      id: Date.now(),
      description,
      completed: false,
    };

    onAddItem(newItem);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to get done today?</h3>
      <input
        type="text"
        placeholder="Enter a task..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function TodoList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems = [...items];
  if (sortBy === "description")
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  else if (sortBy === "completed")
    sortedItems.sort((a, b) => Number(a.completed) - Number(b.completed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="completed">Sort by completed</option>
        </select>
        <button onClick={onClearList}>Clear All</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.completed ? { textDecoration: "line-through", color: "#999" } : {}}>
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (items.length === 0)
    return <p className="stats"><em>Start adding your tasks for the day ✅</em></p>;

  const total = items.length;
  const completed = items.filter((item) => item.completed).length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "All tasks completed! 🥳"
          : `✅ You have ${total} tasks, and completed ${completed} (${percentage}%)`}
      </em>
    </footer>
  );
}
export default App;

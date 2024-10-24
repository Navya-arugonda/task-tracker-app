// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [user, setUser] = useState(null);
  const [editTask, setEditTask] = useState(null);

  return (
    <Router>
      <div className="App">
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <>
            <TaskForm user={user} editTask={editTask} />
            <Routes>
              <Route
                path="/"
                element={<TaskList user={user} setEditTask={setEditTask} />}
              />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;

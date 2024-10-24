import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { addTask } from "../features/taskSlice";

const TaskForm = ({ user }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
    dueDate: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { ...formData, userId: user.uid };
    const docRef = await addDoc(collection(db, "tasks"), task);
    dispatch(addTask({ id: docRef.id, ...task }));
    setFormData({ title: "", description: "", status: "To Do", dueDate: "" });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task Title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task Description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />
        </div>
        <div className="flex gap-4">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

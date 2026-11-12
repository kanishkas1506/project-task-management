
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    // Load tasks from MongoDB
    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        try {
            const response = await axios.get("/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error loading tasks:", error);
            alert("Unable to load tasks");
        }
    }

    // Add task
    async function addTask() {
        if (task.trim() === "") {
            alert("Please enter a task");
            return;
        }

        try {
            await axios.post("/api/tasks", {
                title: task
            });

            setTask("");
            fetchTasks();
        } catch (error) {
            console.error("Error adding task:", error);
            alert("Unable to add task");
        }
    }

    // Update task status
    async function updateStatus(id, status) {
        try {
            await axios.patch(`/api/tasks/${id}`, {
                status: status
            });

            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
            alert("Unable to update task");
        }
    }

    // Delete task
    async function deleteTask(id) {
        try {
            await axios.delete(`/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Unable to delete task");
        }
    }

    // Display tasks by status
    function showTasks(status) {
        return tasks
            .filter((item) => item.status === status)
            .map((item) => (
                <div className="task-card" key={item._id}>
                    <h6>{item.title}</h6>
                    <p>Status: {item.status}</p>

                    <div className="task-buttons">

                        {status !== "Pending" && (
                            <button
                                className="btn btn-info btn-sm"
                                onClick={() => updateStatus(item._id, "Pending")}
                            >
                                Mark as Pending
                            </button>
                        )}

                        {status !== "Ongoing" && (
                            <button
                                className="btn btn-info btn-sm"
                                onClick={() => updateStatus(item._id, "Ongoing")}
                            >
                                Mark as Ongoing
                            </button>
                        )}

                        {status !== "Completed" && (
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => updateStatus(item._id, "Completed")}
                            >
                                Mark as Completed
                            </button>
                        )}

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteTask(item._id)}
                        >
                            Delete Task
                        </button>

                    </div>
                </div>
            ));
    }

    return (
        <div className="container-fluid main-container">

            <h2 className="text-center">Task Management System</h2>

            <div className="row input-section">
                <div className="col-md-10">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter task title"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") addTask();
                        }}
                    />
                </div>

                <div className="col-md-2">
                    <button
                        className="btn btn-primary w-100"
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                </div>
            </div>

            <div className="row task-columns">

                <div className="col-md-4">
                    <div className="task-column">
                        <h5>Pending Tasks</h5>
                        <div className="task-list">
                            {showTasks("Pending")}
                            {tasks.filter(t => t.status === "Pending").length === 0 &&
                                <p className="empty">No tasks in this category.</p>}
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="task-column">
                        <h5>Ongoing Tasks</h5>
                        <div className="task-list">
                            {showTasks("Ongoing")}
                            {tasks.filter(t => t.status === "Ongoing").length === 0 &&
                                <p className="empty">No tasks in this category.</p>}
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="task-column">
                        <h5>Completed Tasks</h5>
                        <div className="task-list">
                            {showTasks("Completed")}
                            {tasks.filter(t => t.status === "Completed").length === 0 &&
                                <p className="empty">No tasks in this category.</p>}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default App;

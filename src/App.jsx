
import React, { useState } from "react";
import "./App.css";

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    function addTask() {
        if (task.trim() === "") {
            alert("Please enter a task");
            return;
        }

        const newTask = {
            id: Date.now(),
            title: task,
            status: "Pending"
        };

        setTasks([...tasks, newTask]);
        setTask("");
    }

    function updateStatus(id, status) {
        setTasks(tasks.map((item) =>
            item.id === id
                ? { ...item, status: status }
                : item
        ));
    }

    function deleteTask(id) {
        setTasks(tasks.filter((item) => item.id !== id));
    }

    function showTasks(status) {
        return tasks
            .filter((item) => item.status === status)
            .map((item) => (
                <div className="task-card" key={item.id}>
                    <h6>{item.title}</h6>
                    <p>Status: {item.status}</p>

                    <div className="task-buttons">

                        {status !== "Pending" && (
                            <button
                                className="btn btn-info btn-sm"
                                onClick={() => updateStatus(item.id, "Pending")}
                            >
                                Mark as Pending
                            </button>
                        )}

                        {status !== "Ongoing" && (
                            <button
                                className="btn btn-info btn-sm"
                                onClick={() => updateStatus(item.id, "Ongoing")}
                            >
                                Mark as Ongoing
                            </button>
                        )}

                        {status !== "Completed" && (
                            <button
                                className="btn btn-success btn-sm"
                                onClick={() => updateStatus(item.id, "Completed")}
                            >
                                Mark as Completed
                            </button>
                        )}

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteTask(item.id)}
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

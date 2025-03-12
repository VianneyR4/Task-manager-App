import React, { useState } from 'react';
import { useTaskContext } from '../services/TaskContext';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleUpdate = async () => {
    await updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  const handleStatusToggle = async () => {
    await updateTask(task.id, {
      status: task.status === 'pending' ? 'completed' : 'pending',
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className={`text-xl font-semibold ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <button
        onClick={handleStatusToggle}
        className={`${
          task.status === 'completed' ? 'bg-gray-500' : 'bg-green-500'
        } text-white px-3 py-1 rounded hover:opacity-90`}
      >
        {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
      </button>
    </div>
  );
};

export default TaskItem; 
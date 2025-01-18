import React from 'react';

const TaskTable = ({ tasks, onEditTask, onDeleteTask }) => {
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, 
    });
  };

  return (
    tasks.length === 0 ? (
      <div className='flex items-center justify-center h-64 text-gray-400 text-5xl opacity-45 ' >
        No tasks found
      </div>
    ) : (
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="border border-gray-500 px-4 py-2">Task ID</th>
              <th className="border border-gray-500 px-4 py-2">Task Name</th>
              <th className="border border-gray-500 px-4 py-2">Status</th>
              <th className="border border-gray-500 px-4 py-2">Created At</th>
              <th className="border border-gray-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 text-white">
            {tasks.map((task) => (
              <tr key={task.id} className="border-b">
                <td className="px-4 py-2">{task.id}</td>
                <td className="px-4 py-2">{task.name}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span
                    className={`rounded-full px-4 py-1 text-white 
                      ${task.status === 'Completed' ? 'bg-green-500' : ''}
                      ${task.status === 'Pending' ? 'bg-yellow-500' : ''}
                      ${task.status === 'In Progress' ? 'bg-blue-500 inline-block' : ''}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2">{formatDateTime(task.created_at)}</td>
                <td className="px-4 py-2 space-x-2 flex items-center justify-center">
                  <button
                    className="text-gray-400 px-2 py-1 rounded hover:text-gray-200"
                    onClick={() => onEditTask(task)}
                  >
                    Update
                  </button>
                  <button
                    className="text-red-500 px-2 py-1 rounded hover:text-red-700"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default TaskTable;

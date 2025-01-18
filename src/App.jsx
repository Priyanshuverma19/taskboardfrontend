import React, { useState } from 'react';
import Header from './components/Header';
import TaskTable from './components/TaskTable';
import Pagination from './components/Pagination';
import AddTaskModal from './components/AddTaskModal';
import { useTasks } from './TaskContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { currentTasks, setTasks, handleSearch } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentTask, setCurrentTask] = useState(null);

  // Add Task
  const handleAddTask = async (task) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, task);
      setTasks((prev) => [...prev, response.data]);
      toast.success('Task added successfully!');
      setIsModalOpen(false);
      setModalMode('add');
    } catch (error) {
      toast.error('Error adding task');
      console.error('Error adding task:', error);
    }
  };

  // Update Task
  const handleUpdateTask = async (updatedTask) => {
    if (!currentTask || !currentTask.id) {
      console.error('No task selected for update');
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/tasks/${currentTask.id}`,
        updatedTask
      );
      setTasks((prev) =>
        prev.map((task) =>
          task.id === currentTask.id ? { ...task, ...response.data } : task
        )
      );
      toast.info('Task updated successfully!');
      setIsModalOpen(false);
      setModalMode('add');
    } catch (error) {
      toast.error('Error updating task');
      console.error('Error updating task:', error);
    }
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      toast.error('Task deleted successfully!');
    } catch (error) {
      toast.error('Error deleting task');
      console.error('Error deleting task:', error);
    }
  };

  const handleOpenAddTask = () => {
    setModalMode('add');
    setCurrentTask(null); 
    setIsModalOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setCurrentTask(task); 
    setModalMode('edit'); 
    setIsModalOpen(true);
  };


  return (
    <div className='bg-gray-800 h-full min-h-screen'>
      <Header onSearch={handleSearch} onOpenAddTask={handleOpenAddTask} />
      <main className="p-6 px-6 md:px-12 lg:px-24">
        <h1 className='text-xl font-semibold md:text-2xl lg:text-4xl items-center text-center text-gray-200 mb-4 lg:mb-10'>Task Management Dashboard</h1>
        <TaskTable
          tasks={currentTasks} 
          onEditTask={handleOpenEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <Pagination />
      </main>
      <AddTaskModal
        isOpen={isModalOpen}
        mode={modalMode}
        taskData={currentTask}
        onClose={() => setIsModalOpen(false)}
        onSubmit={modalMode === 'add' ? handleAddTask : handleUpdateTask}
      />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;
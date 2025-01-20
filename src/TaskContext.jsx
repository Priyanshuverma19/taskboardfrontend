import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const socket = io(`${import.meta.env.VITE_API_URL}`);

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const tasksPerPage = 8;
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  

  useEffect(() => {
    socket.on('taskAdded', (task) => {
      
      setTasks((prev) =>{
        if(prev.some((t)=>t.id === task.id)) return prev;
        return [...prev, task];
      } );
      
    });

    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === updatedTask.id ? { ...task, ...updatedTask } : task
        )
      );
      
    });

    socket.on('taskDeleted', ({ id }) => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
     
    });

    return () => {
      socket.disconnect();
    };
  }, [tasks]);

  

  const handleSearch = (searchQuery) => {
    if (!searchQuery) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
    setCurrentPage(1); 
  };

  // Pagination 
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks, 
        currentTasks, 
        tasksPerPage,
        currentPage,
        handleSearch,
        handlePageChange,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;

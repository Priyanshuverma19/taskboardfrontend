import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const AddTaskModal = ({ isOpen, mode, taskData, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      status: 'Pending',
    },
  });

  useEffect(() => {
    if (mode === 'edit' && taskData) {
      setValue('name', taskData.name);
      setValue('status', taskData.status);
    } else {
      reset(); 
    }
  }, [mode, taskData, setValue, reset]);

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    console.log(data);
    reset(); 
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded p-6 w-full max-w-md">
        <div className='flex justify-between items-center'>
          <h2 className="text-xl font-bold mb-4 text-gray-200">
            {mode === 'edit' ? 'Update Task' : 'Add New Task'}
          </h2>
          <button
            className="text-red-500 -mt-4"
            onClick={() => {
              reset();
              onClose();
            }}
          >
            Close
          </button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-gray-200">Task Name</label>
            <input
              type="text"
              {...register('name', { required: 'Task name is required' })}
              className={`w-full border rounded px-4 py-2 bg-transparent text-gray-200 disabled:opacity-50`}
              disabled={mode === 'edit'} 
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-200">Status</label>
            <select
              {...register('status', { required: 'Status is required' })}
              className="w-full border rounded px-4 py-2 bg-transparent text-gray-200"
            
            >
              <option value="Pending" className="bg-gray-800 text-gray-200">Pending</option>
              <option value="In Progress" className="bg-gray-800 text-gray-200">In Progress</option>
              <option value="Completed" className="bg-gray-800 text-gray-200">Completed</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            {mode === 'edit' ? 'Update Task' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;

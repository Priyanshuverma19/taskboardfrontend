import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTasks } from '../TaskContext';

const searchSchema = z.object({
  searchQuery: z.string().optional(),
});

const SearchForm = () => {
  const { handleSearch } = useTasks();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data) => handleSearch(data.searchQuery);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center space-x-2 px-4 justify-between">
      <input
        type="text"
        placeholder="Search Tasks"
        {...register('searchQuery')}
        className="border border-gray-500 rounded-lg w-1/2 md:w-1/2 lg:w-full px-4 py-2 text-gray-100 outline-none focus:ring-2 focus:ring-gray-500 bg-transparent"
      />
      <button type="submit" className="bg-white text-gray-800 font-semibold px-4 py-2 rounded hover:bg-gray-300">
        Search
      </button>
    </form>
  );
};

export default SearchForm;

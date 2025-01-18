import React from 'react';
import SearchForm from './SearchForm';

const Header = ({ onOpenAddTask }) => {
  return (
    <header className="bg-gray-800 text-gray-200 py-4 flex items-center justify-between px-6 md:px-12 lg:px-24 shadow-lg">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold"> Dashboard</h1>
      <SearchForm />
      <button
        className="bg-gray-700 text-white font-semibold px-8 py-2 rounded-lg hover:bg-gray-600"
        onClick={onOpenAddTask}
      >
        Add
      </button>
    </header>
  );
};

export default Header;

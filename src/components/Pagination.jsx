import React from 'react';
import ReactPaginate from 'react-paginate';
import { useTasks } from '../TaskContext';

const Pagination = () => {
  const { filteredTasks, tasksPerPage, currentPage, handlePageChange } = useTasks();

  const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);

 
  if (pageCount <= 1) {
    return null;
  }

  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      pageCount={pageCount}
      initialPage={currentPage - 1}
      onPageChange={handlePageChange}
      containerClassName={'pagination flex justify-between space-x-2 mt-4'}
      pageLinkClassName={'px-2 py-2 border rounded'}
      activeLinkClassName={'bg-gray-500 text-white '}
      previousLinkClassName={`px-4 py-2 border rounded text-gray-100 ${
        currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
      }`}
      nextLinkClassName={`px-4 py-2 border rounded text-gray-100 ${
        currentPage === pageCount ? 'cursor-not-allowed opacity-50' : ''
      }`}
      disabledLinkClassName={'cursor-not-allowed opacity-50 text-gray-300'}
    />
  );
};

export default Pagination;

import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
/**
 * Stylesheets
 */
import '../.././css/SearchBar.css';

export const SearchBar = ({ placeholder, data, handleOnAdd }) => {
  const [filteredData, setFilteredData] = React.useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchTerm(searchWord);
    const newFilter = data.filter((food) => {
      return food?.food_name?.toLowerCase().includes(searchWord?.toLowerCase());
    });
    if (!searchWord) {
      setFilteredData([]);
    } else setFilteredData(newFilter);
  };

  const clearInput = () => {
    setSearchTerm('');
    setFilteredData([]);
  };

  return (
    <div className='search flex-1'>
      <div className='flex'>
        <input
          className='rounded-bl-lg rounded-tl-lg bg-gray-200 text-gray-700 border-0 font-[18px] p-[15px] h-[52px] w-full focus:ring-0 focus:outline-none'
          type='text'
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleFilter(e)}
        />
        <div className='rounded-br-lg rounded-tr-lg bg-gray-200 h-[52px] w-[50px] grid place-content-center'>
          {filteredData.length > 0 ? (
            <AiFillCloseCircle
              onClick={() => clearInput()}
              size={20}
              className='text-gray-600 cursor-pointer'
            />
          ) : (
            <BsSearch size={20} className='text-gray-600 cursor-pointer' />
          )}
        </div>
      </div>

      <div
        className={`absolute opacity-[.93] bg-gray-100 z-50 hide-scroll mt-[5px] w-[300px] shadow-[0px_5px_15px_rgba(0,0,0,0.35)] overflow-hidden overflow-y-auto food-search-div ${
          searchTerm
            ? filteredData.length > 0
              ? 'h-[200px]'
              : 'h-[45px]'
            : 'h-[0px] opacity-[0]'
        }`}
      >
        {filteredData.length > 0 ? (
          filteredData.slice(0, 30).map((food, idx) => {
            return (
              <p
                key={idx}
                onClick={() => {
                  clearInput();
                  handleOnAdd(food);
                }}
                className='hover:bg-gray-200 pl-[10px] pr-[10px] w-full h-[50px] flex align-center text-black'
              >
                {food.food_name}
              </p>
            );
          })
        ) : (
          <h1 className='p-[10px]'>Der er ingen ingrediens ved dette navn</h1>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

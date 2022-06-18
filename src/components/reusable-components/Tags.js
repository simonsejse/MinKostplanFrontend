/**
 * Icons
 */
import { BsX } from 'react-icons/bs';

/**
 * React
 */
import { useState, forwardRef, useImperativeHandle } from 'react';

/**
 * Others
 */
import { v4 as uuidv4 } from 'uuid';

const Tags = forwardRef(({ children, text }, ref) => {
  const [meta, setMeta] = useState('');
  const [metas, setMetas] = useState([]);

  const deleteMetaById = function (id) {
    setMetas(metas.filter((meta) => meta.id !== id));
  };

  const addMeta = function (id, name) {
    setMetas([...metas, { id, name }]);
  };

  const clearMetaInput = function () {
    setMeta('');
  };

  useImperativeHandle(ref, () => {
    return {
      getTags: () => metas,
    };
  });

  return (
    <div className='w-full min-h-[46px] flex bg-gray-200 border border-gray-300 shadow-lg p-2 rounded-lg'>
      <ul className='w-full flex-wrap flex -m-[10px] flex-row pl-0'>
        {metas.map((meta) => {
          return (
            <li
              key={meta.id}
              className='m-[10px] relative flex items-center w-auto text-white mr-2 p-2 pr-8 bg-blue-500 hover:bg-blue-400 rounded-md'
            >
              <span className='font-title'>{meta.name}</span>
              <BsX
                size={35}
                fill='white'
                onClick={() => deleteMetaById(meta.id)}
                className='absolute right-0 cursor-pointer'
              />
            </li>
          );
        })}
        <input
          type='text'
          placeholder={text}
          name='meta'
          value={meta}
          onChange={(e) => setMeta(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              addMeta(uuidv4(), meta);
              clearMetaInput();
            }
          }}
          className='flex-1 bg-gray-200 border-0 focus:ring-0 focus:outline-none p-2 m-[10px]'
        />
      </ul>
    </div>
  );
});

export default Tags;

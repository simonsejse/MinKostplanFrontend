import { useState } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const DropDownSelect = ({ value, setValue }) => {
  return (
    <Menu as='div' className='mt-4 relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex justify-center max-w-40 rounded-md shadow-sm px-4 py-[12px] bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
          {value}
          <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <p
                  onClick={() => setValue('Vægttab')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Vægttab
                </p>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <p
                  onClick={() => setValue('Vedligeholdelse')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Vedligeholdelse
                </p>
              )}
            </Menu.Item>
          </div>
          <div className='py-1'>
            <Menu.Item>
              {({ active }) => (
                <p
                  onClick={() => setValue('Muskelopbygning')}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Muskelopbygning
                </p>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDownSelect;

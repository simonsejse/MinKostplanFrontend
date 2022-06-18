import { MdOutlinePrivacyTip, MdOutlineRule } from 'react-icons/md';

import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
const Footer = () => {
  return (
    <footer className='fixed bottom-0 w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-5'>
      <div className='flex justify-between p-5'>
        <nav class='flex' aria-label='Breadcrumb'>
          <ol class='inline-flex items-center space-x-1 md:space-x-3'>
            <li class='inline-flex items-center'>
              <span className='inline-flex items-center text-sm font-medium text-gray-300 hover:text-white hover:cursor-pointer'>
                <MdOutlinePrivacyTip className='mr-2 w-4 h-4' />
                Fortrolighedspolitik
              </span>
            </li>
            <li>
              <div class='flex items-center'>
                <svg
                  className='w-6 h-6 text-gray-300'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  ></path>
                </svg>

                <span className='inline-flex items-center text-sm font-medium text-gray-300 hover:text-white hover:cursor-pointer'>
                  <MdOutlineRule className='mr-2 w-4 h-4' />
                  Servicevilkår
                </span>
              </div>
            </li>
            <li aria-current='page'>
              <div class='flex items-center'>
                <svg
                  class='w-6 h-6 text-gray-300'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
                <span class='ml-1 text-sm font-medium text-gray-300 md:ml-2'>
                  Følg os
                </span>

                <BsFacebook className='ml-4 w-4 h-4 hover:fill-accent hover:cursor-pointer' />
                <BsInstagram className='ml-2 w-4 h-4 hover:fill-accent hover:cursor-pointer' />
                <BsTwitter className='ml-2 w-4 h-4 hover:fill-accent hover:cursor-pointer' />
                <BsGithub className='ml-2 w-4 h-4 hover:fill-accent hover:cursor-pointer' />
              </div>
            </li>
          </ol>
        </nav>
        <div className='inline-block'>
          <h1>&copy; 2022 Min-kostplan.dk</h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

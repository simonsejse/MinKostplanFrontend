import React from 'react';

/* Images */
import picture from '../../images/pb.jpg';
export const About = () => {
  return (
    <div className='flex-1 bg-primary'>
      <div className='p-5 pt-12 md:p-0 mx-auto h-full w-full md:w-[600px] lg:w-[800px] xl:w-[1000px] flex flex-col justify-center divide-y-8 divide-double divide-indigo-500'>
        <div className='bg-secondary p-5 rounded-md shadow-form w-full flex flex-col lg:flex-row md:space-x-12 mb-8'>
          <img
            className='mx-auto m-12 lg:m-0 rounded-full object-contain w-48 md:w-72 md:h-72'
            src={picture}
            alt='simon'
          />
          <div className='flex flex-col justify-center space-y-4'>
            <div className='m-5 lg:m-0'>
              <h1 class='text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600'>
                Simon
              </h1>
              <h3 className='font-sans font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-red-200 via-red-300'>
                21 år, sabbatår
              </h3>
            </div>
            <h3 className='m-5 lg:m-0 text-black leading-5 font-sans text-lg '>
              Hej!
              <br />
              Jeg er Simon, 21 år, og holder nuværende sabbatår.
              <br />
              Jeg er stifteren af min-kostplan.dk - og har siden d. 1. januar
              2022 haft den her drøm om at starte en hjemmeside, hvorpå man
              kunne lave kostplaner, for at gøre livet nemmere med en varieret
              kostplan.
            </h3>

            <div className='m-5 lg:m-0 flex flex-col lg:flex-row lg:space-x-4'>
              <div className='pt-8 w-full lg:w-[130px]'>
                <button class='transition ease-out delay-100 transition-duration-300 hover:-translate-y-2 w-full lg:w-[130px] relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400'>
                  <span class='w-full lg:w-[130px] relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-white hover:text-black'>
                    Kontakt Mig
                  </span>
                </button>
              </div>

              <div className='pt-8 w-full lg:w-[130px]'>
                <button class='transition ease-out delay-100 transition-duration-300 hover:-translate-y-2 w-full lg:w-[130px] relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'>
                  <span class='w-full lg:w-[130px] relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-white hover:text-black'>
                    LinkedIn
                  </span>
                </button>
              </div>
              <div className='pt-8 w-full lg:w-[130px]'>
                <button class='transition ease-out delay-100 transition-duration-300 hover:-translate-y-2 w-full lg:w-[130px] relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800'>
                  <span class='w-full lg:w-[130px] relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-white hover:text-black'>
                    E-mail
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-8 md:p-0 md:pt-8'>
          <div className='bg-secondary p-5 rounded-md shadow-form'>
            <h1 class='text-4xl font-extrabold uppercase text-black'>
              Om Min-Kostplan.dk
            </h1>
            <h3 className='text-black leading-5 font-sans text-lg'>
              Min-Kostplan.dk er en hjemmeside, hvor du kan lave kostplaner, til
              en billig pris. Hjemmesiden er kodet fra bunden af i React (ES6),
              samt backend er også kodet fra bunden og skrevet i Java i Spring
              Boot!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

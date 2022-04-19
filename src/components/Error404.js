const Error = () => {
  return (
    <div className='flex-1 bg-gray-900'>
      <div className='flex h-full items-center justify-center pb-8'>
        <div className='bg-gray-700 border-2 border-indigo-500 rounded-md flex items-center justify-center mx-4 md:w-2/3 '>
          <div className='flex flex-col items-center py-16 '>
            <img
              className='px-4 hidden md:block'
              src='https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png'
              alt=''
            />
            <img
              className='md:hidden'
              src='https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png'
              alt=''
            />
            <h1 className='px-4 pt-8 pb-4 text-center text-5xl font-bold leading-10 text-white'>
              Hovsa!{' '}
            </h1>
            <p className='px-4 pb-10 text-base leading-none text-center text-gray-200'>
              Siden du forsøgte at finde på MinKostplan.dk findes ikke!{' '}
            </p>
            <button className='mx-4 h-10 w-44 border rounded-md text-white text-base bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800'>
              Gå tilbage til forsiden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;

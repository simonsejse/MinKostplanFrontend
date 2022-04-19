const Alert = ({ show, isError, title, message, handleClose, isCloseable }) => {
  const color = isError ? 'red' : 'green';
  return (
    <div
      className={`z-10 fixed w-full h-full transition duration-300 ease-out ${
        !show && 'scale-0'
      }`}
    >
      <div className='h-full flex justify-center items-center'>
        <div
          id='alert-additional-content-2'
          className={`transform duration-300 w-full ml-2 mr-2 md:ml-0 md:mr-0 md:w-3/5 lg:w-2/5 xl:w-2/6 p-4 mb-4 rounded-lg bg-${color}-200`}
          role='alert'
        >
          <div class='flex items-center'>
            <svg
              className={`animate-pulse mr-2 w-5 h-5 text-${color}-700 dark:text-${color}-800`}
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path
                fill-rule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <h3
              class={`animate-pulse text-lg font-medium text-${color}-700 dark:text-${color}-800`}
            >
              {title || 'Info'}
            </h3>
          </div>
          <div class={`mt-2 mb-4 text-sm text-${color}-800`}>
            {message || 'Der er sket en fejl! Prøv igen!'}
          </div>
          <div class='flex'>
            <button
              type='button'
              className={`${
                !isCloseable && 'opacity-30 cursor-not-allowed'
              } bg-transparent border border-${color}-700 hover:bg-${color}-800 text-${color}-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center`}
              data-dismiss-target='#alert-additional-content-2'
              onClick={() => {
                handleClose();
              }}
              aria-label='Close'
              disabled={isCloseable === false}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;

const Alert = ({
  show,
  isError,
  title,
  message,
  handleOnClose,
  isCloseable,
}) => {
  return (
    <div
      className={`z-10 fixed w-full h-full transition duration-300 ease-out ${
        !show && 'scale-0'
      }`}
    >
      <div className='h-full flex justify-center items-center'>
        <div
          id='alert-additional-content-2'
          className={`transform duration-300 w-full ml-2 mr-2 md:ml-0 md:mr-0 md:w-3/5 lg:w-2/5 xl:w-2/6 p-4 mb-4 rounded-lg ${
            isError ? 'bg-red-200' : 'bg-green-200'
          }`}
          role='alert'
        >
          <div class='flex items-center'>
            <svg
              className={`animate-pulse mr-2 w-5 h-5 ${
                isError
                  ? 'text-red-700 dark:text-red-800'
                  : 'text-green-700 dark:text-green-800'
              }`}
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
              class={`animate-pulse text-lg font-medium ${
                isError
                  ? 'text-red-700 dark:text-red-800'
                  : 'text-green-700 dark:text-green-800'
              }`}
            >
              {title || 'Info'}
            </h3>
          </div>
          <div
            class={`overflow-auto mt-2 mb-4 text-sm ${
              isError ? 'text-red-800' : 'text-green-800'
            }`}
          >
            {message || 'Der er sket en ubehagelig ukendt fejl! Prøv igen!'}
          </div>
          <div class='flex'>
            <button
              type='button'
              className={`${
                !isCloseable && 'opacity-30 cursor-not-allowed'
              } bg-transparent border hover:text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-xs px-3 py-1.5 text-center ${
                isError
                  ? 'border-red-700 hover:bg-red-800 text-red-800 focus:ring-red-300'
                  : 'border-green-700 hover:bg-green-800 text-green-800 focus:ring-green-300'
              }`}
              data-dismiss-target='#alert-additional-content-2'
              onClick={() => {
                handleOnClose();
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

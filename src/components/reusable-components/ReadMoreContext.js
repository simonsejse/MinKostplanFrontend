import React from 'react';
/**
 * Images
 */
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import ingredients from '../../images/managerecipes/ingredients.png';
import instructions from '../../images/managerecipes/instructions.png';
import description from '../../images/managerecipes/description.png';
import about from '../../images/managerecipes/about.png';
import info from '../../images/managerecipes/info.png';
import { motion, AnimatePresence } from 'framer-motion';

const Context = React.createContext();

export const useRecipeReadMore = () => {
  return React.useContext(Context);
};

export const RecipeReadMoreProvider = ({ children }) => {
  const [state, setState] = React.useState({ isOpen: false, recipe: {} });

  function open(recipe) {
    setState({
      recipe,
      isOpen: true,
    });
  }

  function close() {
    setState({ isOpen: false, recipe: {} });
  }

  return (
    <Context.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {state.isOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.3,
                },
              }}
              exit={{
                opacity: 0,
                transition: { delay: 0.4 },
              }}
              onClick={() => {
                close();
              }}
              className='fixed h-screen w-screen top-0 left-0 bg-modalBackdrop z-50'
            />
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
                transition: {
                  duration: 0.3,
                },
              }}
              exit={{
                scale: 0,
                transition: { delay: 0.4 },
              }}
              className='fixed w-90 lg:w-[900px] xl:w-[1100px] h-fit max-h-[900px] bg-secondary rounded-md shadow-form m-auto top-0 bottom-0 left-0 right-0 p-[50px] z-50'
            >
              {/***/}
              <motion.div
                initial={{
                  x: 200,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: 0.3,
                  },
                }}
                exit={{ x: 200, opacity: 0, transition: { duration: 0.3 } }}
                id='modal-content'
                className='max-h-[700px] overflow-auto'
              >
                <header className='flex border-b-2'>
                  <h1 className='xl:max-w-[1000px] lg:max-w-[500px] uppercase font-title2 font-semibold text-gray-700 text-xl lg:text-2xl'>
                    {state.recipe?.name}
                  </h1>
                  <span className='font-text font-bold self-center ml-auto'>
                    ID: {state.recipe?.id}
                  </span>
                </header>
                <section
                  id='calorie-wrapper'
                  className='grid grid-cols-2 md:grid-cols-4 divide-x-2'
                >
                  <h1 className='font-title2 font-semibold text-gray-400 uppercase'>
                    {state.recipe?.macros?.default?.calories} kalorier
                  </h1>
                  <h1 className='font-title2 font-semibold text-gray-400 uppercase pl-4'>
                    {state.recipe?.macros?.default?.protein} protein
                  </h1>
                  <h1 className='font-title2 font-semibold text-gray-400 uppercase pl-4'>
                    {state.recipe?.macros?.default?.carbs} kulhydrater
                  </h1>
                  <h1 className='font-title2 font-semibold text-gray-400 uppercase pl-4'>
                    {state.recipe?.macros?.default?.fat} fedt
                  </h1>
                </section>
                <main className='mt-10'>
                  <div
                    id='ingredient-instruction-wrapper'
                    className='flex flex-col lg:flex-row'
                  >
                    <div id='ingredient-wrapper' className='w-full'>
                      <div id='logo-title-wrapper' className='flex space-x-2'>
                        <img
                          alt='logo'
                          src={ingredients}
                          className='w-[35px] h-[35px] object-contain'
                        />
                        <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                          <span className='border-b-2 border-black'>
                            Ingredienser
                          </span>
                        </h2>
                      </div>
                      <ul className='mt-4 list-disc list-inside text-gray-500 font-extrabold font-title text-sm lg:text-md ingredient-list'>
                        {state.recipe?.ingredients?.map((ingredient) => {
                          return (
                            <li
                              key={ingredient.id}
                              id='ingredient-item'
                              className='flex flex-col justify-center whitespace-normal'
                            >
                              <span className='before:content-["○_"] before:text-black ingredient-name'>
                                {ingredient?.measures?.amountOfType}
                                {ingredient?.measures.type},{' '}
                                {ingredient?.food?.food_name},{' '}
                                {ingredient?.measures?.amountInGrams}
                                gram.
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div
                      id='instruction-wrapper'
                      className='w-full mt-5 lg:mt-0'
                    >
                      <div id='logo-title-wrapper' className='flex space-x-2'>
                        <img
                          alt='instructions logo'
                          src={instructions}
                          className='w-[31px] h-[31px] object-contain'
                        />
                        <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                          <span className='border-b-2 border-black'>
                            Instruktioner
                          </span>
                        </h2>
                      </div>

                      <ul className='mt-4 list-decimal list-inside text-gray-500 font-extrabold font-title text-sm lg:text-md instruction-list'>
                        {state.recipe?.analyzedInstructions?.map(
                          (instruction) => {
                            return (
                              <li
                                key={instruction.id}
                                className='instruction-item'
                              >
                                <span className='instruction-name'>
                                  {instruction.step}
                                </span>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </div>

                  <div id='desc-wrapper' className='mt-5'>
                    <div id='logo-title-wrapper' className='flex space-x-2'>
                      <img
                        alt='logo'
                        src={description}
                        className='w-[31px] h-[31px] object-contain'
                      />
                      <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                        <span className='border-b-2 border-black'>
                          Beskrivelse
                        </span>
                      </h2>
                    </div>

                    <p className='mt-4 text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                      {state.recipe?.description}
                    </p>
                  </div>
                  <div id='other-desc-wrapper' className='mt-5'>
                    <div id='readyInWrapper'>
                      <div id='logo-title-wrapper' className='flex space-x-2'>
                        <img
                          alt='about logo'
                          src={about}
                          className='w-[31px] h-[31px] object-contain'
                        />
                        <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                          <span className='border-b-2 border-black'>Om</span>
                        </h2>
                      </div>

                      <span className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                        Retten koster i gns. {state.recipe?.pricePerServing} DKK
                        at lave, samt tager omtrent{' '}
                        {state.recipe?.readyInMinutes} minutter at lave og er
                        klar til at implementere til
                        <p className='lowercase'> {state.recipe?.type}.</p>
                      </span>
                    </div>
                  </div>
                  <div id='boolean-value-wrapper' className='mt-5'>
                    <div id='logo-title-wrapper' className='flex space-x-2'>
                      <img
                        alt='about logo'
                        src={info}
                        className='w-[31px] h-[31px] object-contain'
                      />
                      <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                        <span className='border-b-2 border-black'>Info</span>
                      </h2>
                    </div>

                    <div
                      id='boolean-value-list-wrapper'
                      className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 mt-4'
                    >
                      <div
                        id='boolean-value-item-wrapper'
                        className='flex items-center space-x-2'
                      >
                        {state.recipe?.vegetarian ? (
                          <FcCheckmark />
                        ) : (
                          <FcCancel />
                        )}
                        <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                          vegetarisk
                        </h1>
                      </div>
                      <div
                        id='boolean-value-item-wrapper'
                        className='flex items-center space-x-2'
                      >
                        {state.recipe?.vegan ? <FcCheckmark /> : <FcCancel />}
                        <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                          vegansk
                        </h1>
                      </div>
                      <div
                        id='boolean-value-item-wrapper'
                        className='flex items-center space-x-2'
                      >
                        {state.recipe?.glutenFree ? (
                          <FcCheckmark />
                        ) : (
                          <FcCancel />
                        )}
                        <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                          glutenfri
                        </h1>
                      </div>
                      <div
                        id='boolean-value-item-wrapper'
                        className='flex items-center space-x-2'
                      >
                        {state.recipe?.dairyFree ? (
                          <FcCheckmark />
                        ) : (
                          <FcCancel />
                        )}
                        <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                          mælkefri
                        </h1>
                      </div>
                      <div
                        id='boolean-value-item-wrapper'
                        className='flex items-center space-x-2'
                      >
                        {state.recipe?.veryHealthy ? (
                          <FcCheckmark />
                        ) : (
                          <FcCancel />
                        )}
                        <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                          sundt
                        </h1>
                      </div>
                      <div
                        id='boolean-value-item-wrapper'
                        className='flex items-center space-x-2'
                      >
                        {state.recipe?.cheap ? <FcCheckmark /> : <FcCancel />}
                        <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                          billigt
                        </h1>
                      </div>
                      <div
                        id='boolean-value-item-wrapper'
                        className='flex items-center space-x-2'
                      >
                        {state.recipe?.veryPopular ? (
                          <FcCheckmark />
                        ) : (
                          <FcCancel />
                        )}
                        <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                          populært
                        </h1>
                      </div>
                      <div
                        id='boolean-value-item-wrapper'
                        className='flex items-center space-x-2'
                      >
                        {state.recipe?.sustainable ? (
                          <FcCheckmark />
                        ) : (
                          <FcCancel />
                        )}
                        <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                          bæredygtigt
                        </h1>
                      </div>
                    </div>
                  </div>
                </main>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Context.Provider>
  );
};

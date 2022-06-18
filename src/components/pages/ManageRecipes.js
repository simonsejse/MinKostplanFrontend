import { useState, useEffect, useRef, useCallback } from 'react';
/**
 * Images
 */
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import ingredients from '../../images/managerecipes/ingredients.png';
import instructions from '../../images/managerecipes/instructions.png';
import description from '../../images/managerecipes/description.png';
import about from '../../images/managerecipes/about.png';
import info from '../../images/managerecipes/info.png';

/**
 * Components
 */
import Card from './RecipeCard';
/**
 * Services
 */
import recipeService from '../../services/recipe/recipe.service';

import Alert, { useAlert } from '../reusable-components/Alert';
import RecipeModal from '../modals/RecipeModal';

const ManageRecipes = () => {
  const [recipe, setRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  const { showSuccess, showError } = useAlert();

  const fetchRecipeById = async (id) => {
    const recipe = await recipeService.getRecipeById(id);
    console.log(recipe.data);
    setRecipe(recipe.data);
  };

  const updateRecipes = useCallback(() => {
    console.log('updating recipes..');
    recipeService.getRecipesAwaitingApproval(currentPage).then((res) => {
      setData(res.data);
    });
  }, [currentPage]);

  useEffect(() => {
    updateRecipes();
  }, [currentPage, updateRecipes]);

  const modalRef = useRef();

  return (
    <>
      <div className='flex-1 bg-primary'>
        <div className='h-full flex flex-col'>
          <RecipeModal ref={modalRef}>
            <header className='flex border-b-2'>
              <h1 className='xl:max-w-[1000px] lg:max-w-[500px] uppercase font-title2 font-semibold text-gray-700 text-xl lg:text-2xl'>
                {recipe?.name}
              </h1>
              <span className='font-text font-bold self-center ml-auto'>
                ID: {recipe?.id}
              </span>
            </header>
            <section
              id='calorie-wrapper'
              className='grid grid-cols-2 md:grid-cols-4 divide-x-2'
            >
              <h1 className='font-title2 font-semibold text-gray-400 uppercase'>
                {recipe?.macros?.default?.calories} kalorier
              </h1>
              <h1 className='font-title2 font-semibold text-gray-400 uppercase pl-4'>
                {recipe?.macros?.default?.protein} protein
              </h1>
              <h1 className='font-title2 font-semibold text-gray-400 uppercase pl-4'>
                {recipe?.macros?.default?.carbs} kulhydrater
              </h1>
              <h1 className='font-title2 font-semibold text-gray-400 uppercase pl-4'>
                {recipe?.macros?.default?.fat} fedt
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
                    {recipe?.ingredients?.map((ingredient) => {
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

                          {ingredient?.metas?.length > 0 && (
                            <span className='ml-5 before:content-["-_"]'>
                              {ingredient?.metas?.map((meta) => {
                                return (
                                  <i className='first:after:content-[" "] last:after:content-["."] after:content-[",_"]'>
                                    {meta}
                                  </i>
                                );
                              })}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div id='instruction-wrapper' className='w-full mt-5 lg:mt-0'>
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
                    {recipe?.analyzedInstructions?.map((instruction) => {
                      return (
                        <li key={instruction.id} className='instruction-item'>
                          <span className='instruction-name'>
                            {instruction.step}
                          </span>
                        </li>
                      );
                    })}
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
                    <span className='border-b-2 border-black'>Beskrivelse</span>
                  </h2>
                </div>

                <p className='mt-4 text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                  {recipe?.description}
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
                    Retten koster i gns. {recipe?.pricePerServing} DKK at lave,
                    samt tager omtrent {recipe?.readyInMinutes} minutter at lave
                    og er klar til at implementere til
                    <p className='lowercase'> {recipe?.type}.</p>
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
                    {recipe?.vegetarian ? <FcCheckmark /> : <FcCancel />}
                    <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                      vegetarisk
                    </h1>
                  </div>
                  <div
                    id='boolean-value-item-wrapper'
                    className='flex items-center space-x-2'
                  >
                    {recipe?.vegan ? <FcCheckmark /> : <FcCancel />}
                    <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                      vegansk
                    </h1>
                  </div>
                  <div
                    id='boolean-value-item-wrapper'
                    className='flex items-center space-x-2'
                  >
                    {recipe?.glutenFree ? <FcCheckmark /> : <FcCancel />}
                    <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                      glutenfri
                    </h1>
                  </div>
                  <div
                    id='boolean-value-item-wrapper'
                    className='flex items-center space-x-2'
                  >
                    {recipe?.dairyFree ? <FcCheckmark /> : <FcCancel />}
                    <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                      mælkefri
                    </h1>
                  </div>
                  <div
                    id='boolean-value-item-wrapper'
                    className='flex items-center space-x-2'
                  >
                    {recipe?.veryHealthy ? <FcCheckmark /> : <FcCancel />}
                    <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                      sundt
                    </h1>
                  </div>
                  <div
                    id='boolean-value-item-wrapper'
                    className='flex items-center space-x-2'
                  >
                    {recipe?.cheap ? <FcCheckmark /> : <FcCancel />}
                    <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                      billigt
                    </h1>
                  </div>
                  <div
                    id='boolean-value-item-wrapper'
                    className='flex items-center space-x-2'
                  >
                    {recipe?.veryPopular ? <FcCheckmark /> : <FcCancel />}
                    <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                      populært
                    </h1>
                  </div>
                  <div
                    id='boolean-value-item-wrapper'
                    className='flex items-center space-x-2'
                  >
                    {recipe?.sustainable ? <FcCheckmark /> : <FcCancel />}
                    <h1 className='text-gray-500 font-extrabold font-title text-sm lg:text-md'>
                      bæredygtigt
                    </h1>
                  </div>
                </div>
              </div>
            </main>
          </RecipeModal>

          <header className='p-5 bg-gradient-to-r from-accent via-indigo-600/[.9] to-button/[.8]'>
            <h1 className='justify-self-start text-white text-center font-title text-3xl'>
              Opskrifter afventer godkendelse
            </h1>
            <p className='justify-self-start text-white text-center font-title text-md'>
              Her kan du ned- og opstemme forskellige opskrifter uploadet af
              forbrugere!
            </p>
          </header>
          <div className='flex flex-col'>
            <div
              id='grid-wrap'
              className='p-[25px] h-fit grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'
            >
              {data.content &&
                data.content.length > 0 &&
                data?.content?.map((recipe) => {
                  return (
                    <Card
                      updateRecipes={updateRecipes}
                      recipe={recipe}
                      modalRef={modalRef}
                      fetchRecipeById={fetchRecipeById}
                    />
                  );
                })}
            </div>
            <nav
              class='mx-auto relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              <a
                href='#'
                class='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              >
                <span class='sr-only'>Forrige</span>

                <svg
                  class='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fill-rule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clip-rule='evenodd'
                  />
                </svg>
              </a>
              {data.totalPages < 6 && (
                <>
                  {' '}
                  <a
                    href='#'
                    aria-current='page'
                    class='z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  >
                    {' '}
                    1{' '}
                  </a>
                  <a
                    href='#'
                    class='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  >
                    {' '}
                    2{' '}
                  </a>
                </>
              )}

              <a
                href='#'
                class='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
              >
                <span class='sr-only'>Næste</span>

                <svg
                  class='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fill-rule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clip-rule='evenodd'
                  />
                </svg>
              </a>
            </nav>

            {/*<div className='mx-auto flex text-center text-black font-poppins space-x-3'>
              <button
                onClick={() => {
                  if (page - 1 < 0) {
                    return showAlert(
                      <p>Du kan ikke gå til forrige side.</p>,
                      true
                    );
                  }
                  setPage((page) => page - 1);
                }}
                className='border-sky-500 border-2 p-2 w-[130px] rounded-lg hover:bg-sky-400 hover:border-sky-600 hover:text-white'
              >
                Forrige side
              </button>
              <button
                onClick={() => {
                  if (page + 2 > data.totalPages) {
                    return showAlert(
                      <p>Du kan ikke gå til næste side.</p>,
                      true
                    );
                  }
                  setPage((page) => page + 1);
                }}
                className='border-sky-500 border-2 p-2 w-[130px] rounded-lg hover:bg-sky-400 hover:border-sky-600 hover:text-white'
              >
                Næste side
              </button>
              </div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageRecipes;

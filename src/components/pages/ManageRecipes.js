import { useState, useEffect, useRef } from 'react';
/**
 * Images
 */
import {
  HiOutlineThumbDown,
  HiOutlineThumbUp,
  HiOutlineInformationCircle,
  HiOutlineBadgeCheck,
  HiOutlineTrash,
} from 'react-icons/hi';
import { FcCheckmark, FcCancel } from 'react-icons/fc';
import ingredients from '../../images/managerecipes/ingredients.png';
import instructions from '../../images/managerecipes/instructions.png';
import description from '../../images/managerecipes/description.png';
import about from '../../images/managerecipes/about.png';
import info from '../../images/managerecipes/info.png';
/**
 * Services
 */
import recipeService from '../../services/recipe/recipe.service';

import RecipeModal from '../modals/RecipeModal';

const ManageRecipes = () => {
  const [recipe, setRecipe] = useState(null);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const fetchRecipeById = async (id) => {
    const recipe = await recipeService.getRecipeById(id);
    console.log(recipe.data);
    setRecipe(recipe.data);
  };

  useEffect(() => {
    recipeService.getRecipesAwaitingApproval().then((res) => {
      setData(res.data);
    });
  }, [page]);

  const modalRef = useRef();

  return (
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
                  {recipe?.ingredients.map((ingredient) => {
                    return (
                      <li
                        key={ingredient.id}
                        id='ingredient-item'
                        className='flex flex-col whitespace-normal'
                      >
                        <span className='before:content-["∗_"] before:text-black ingredient-name'>
                          {ingredient?.food?.food_name}
                        </span>
                        <span className='ml-5 before:content-["-_"]'>
                          {ingredient?.food?.food_type}
                        </span>
                        <div className='divide-x divide-gray-400'>
                          <span className='ml-5 mr-2 before:content-["-_"]'>
                            {ingredient?.measures?.amountOfType}
                            {ingredient?.measures.type}
                          </span>
                          <span className='pl-2'>
                            {ingredient?.measures?.amountInGrams}
                            gram
                          </span>
                        </div>
                        {ingredient?.metas.length > 0 && (
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
                    className='w-[35px] h-[35px] object-contain'
                  />
                  <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                    <span className='border-b-2 border-black'>
                      Instruktioner
                    </span>
                  </h2>
                </div>

                <ul className='mt-4 list-decimal list-inside text-gray-500 font-extrabold font-title text-sm lg:text-md instruction-list'>
                  {recipe?.analyzedInstructions.map((instruction) => {
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
                  className='w-[35px] h-[35px] object-contain'
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
                    className='w-[35px] h-[35px] object-contain'
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
                  className='w-[35px] h-[35px] object-contain'
                />
                <h2 className='uppercase text-xl lg:text-2xl font-title2 text-gray-700 self-center'>
                  <span className='border-b-2 border-black'>Info</span>
                </h2>
              </div>

              <div
                id='boolean-value-list-wrapper'
                className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 mt-4'
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
        <header className='p-10 bg-gradient-to-r from-accent via-indigo-600/[.9] to-button/[.8]'>
          <h1 className='justify-self-start text-white text-center font-title text-3xl'>
            Opskrifter afventer godkendelse
          </h1>
          <p className='justify-self-start text-white text-center font-title text-md'>
            Her kan du ned- og opstemme forskellige opskrifter uploadet af
            forbrugere!
          </p>
        </header>
        <div className='mb-10 h-full flex justify-center items-center'>
          <div className='relative h-3/4 w-90 bg-secondary shadow-form rounded'>
            <h1 className='p-5 justify-self-start text-black text-center font-title text-3xl'>
              Opskrifter
            </h1>
            <div className='overflow-y-auto h-85-per p-5'>
              <table class='w-full table-auto divide-y-2 divide-button'>
                <thead>
                  <tr>
                    <th className='text-left font-title'>ID</th>
                    <th className='text-left font-title'>Opskrift navn</th>
                    <th className='text-left font-title'>Beskrivelse</th>
                    <th className='text-left font-title'>Lavet af</th>
                  </tr>
                </thead>
                <tbody className='divide-y'>
                  {data.content &&
                    data.content.length > 0 &&
                    data?.content?.map((recipe) => {
                      return (
                        <tr>
                          <td>{recipe.id}</td>
                          <td>{recipe.name}</td>
                          <td>{recipe.description}</td>
                          <td>{recipe.createdBy}</td>

                          <td>
                            <HiOutlineThumbUp
                              size={20}
                              className='duration-300 ease-in-out hover:-translate-y-1 cursor-pointer fill-green-400 hover:fill-green-600 hover:text-white hover:scale-125 hover:animate-pulse'
                            />
                          </td>
                          <td>
                            <HiOutlineThumbDown
                              size={20}
                              className='duration-300 ease-in-out hover:translate-y-1 cursor-pointer fill-red-400 hover:fill-red-600 hover:text-white hover:scale-125 hover:animate-pulse'
                            />
                          </td>
                          <td>
                            <HiOutlineInformationCircle
                              size={20}
                              onClick={() => {
                                modalRef.current.open();
                                fetchRecipeById(recipe.id);
                              }}
                              className='transition duration-300 ease-in-out cursor-pointer fill-blue-400 hover:fill-blue-600 hover:text-white hover:scale-150 hover:animate-pulse'
                            />
                          </td>
                          <td>
                            <HiOutlineBadgeCheck
                              size={20}
                              className='transition duration-300 ease-in-out cursor-pointer fill-green-400 hover:fill-green-600 hover:text-white hover:scale-150 hover:animate-pulse'
                            />
                          </td>
                          <td>
                            <HiOutlineTrash
                              size={20}
                              className='duration-300 ease-in-out cursor-pointer fill-red-400 hover:fill-red-600 hover:text-white hover:scale-150 hover:animate-pulse'
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <footer className='w-full absolute bottom-0'>
              <div className='flex justify-center'>
                <h1>1</h1>
                <h1>2</h1>
                <h1>3</h1>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRecipes;

/**
 * Logos
 */
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
  BsCheckLg,
  BsInfoLg,
  BsXLg,
} from 'react-icons/bs';

/**
 * Services
 */
import recipeService from '../../services/recipe/recipe.service';
import { useAlert } from '../reusable-components/Alert';

const Card = ({ recipe, modalRef, fetchRecipeById, updateRecipes }) => {
  const { showSuccess, showError } = useAlert();
  return (
    <div
      id='item-wrap'
      //h-[700px]
      className='bg-secondary rounded-lg p-[50px] shadow-form w-[347px] relative'
    >
      <div className='absolute top-0 right-0 pr-5 pt-5'>
        <p className='text-gray-500 font-semibold font-poppins text-sm lg:text-md'>
          ID: <span className='text-gray-600 font-bold'>{recipe.id}</span>
        </p>
      </div>
      <div
        id='item-content-wrap'
        className='h-full overflow-y-auto hide-scroll flex flex-col'
      >
        <header className='h-[100px]'>
          <h1 className='mt-1.5 text-gray-500 font-bold font-poppins text-sm lg:text-md'>
            {recipe.name}
          </h1>
          <div
            id='vote-wrap'
            className='text-sm font-poppins text-gray-500 font-semibold flex justify-between'
          >
            <p>Upvotes: {recipe.upvotes}</p>
            <p>Downvotes: {recipe.downvotes}</p>
          </div>
          <p className='mt-auto text-gray-400 font-medium font-poppins text-sm lg:text-md after:content-["."]'>
            Indsendt af <i className='text-gray-500'>{recipe.createdBy}</i>
          </p>
        </header>
        <section className='flex flex-col'>
          <div className='mt-6 mb-6 flex justify-center items-center'>
            <img
              alt='recipe'
              src='https://www.kitchensanctuary.com/wp-content/uploads/2020/04/Chicken-Fried-Rice-square-FS-.jpg'
              className='w-full object-contain rounded-lg shadow-form'
            />
          </div>

          <div className='h-[80px] truncate-text-4-lines text-gray-500 font-medium font-poppins text-sm lg:text-md'>
            {recipe.description}
          </div>
        </section>
        <p
          onClick={() => {
            fetchRecipeById(recipe.id);
            modalRef.current.open();
          }}
          className='cursor-pointer mt-auto pb-2 pt-2 font-poppins text-accent font-medium underline'
        >
          Læs mere..
        </p>
        <footer className='mt-auto'>
          <div id='icons-wrap' className='flex justify-center space-x-2 pb-1'>
            <div
              id='icon'
              className='transition duration-300 ease-out hover:-translate-y-1 hover:bg-gray-400 p-4 bg-primary shadow-form w-fit h-fit rounded-full'
            >
              <BsCheckLg
                onClick={() => {
                  if (
                    window.confirm(
                      'Er du sikker på at denne opskrift skal accepteres?!'
                    )
                  ) {
                    recipeService.confirmRecipeById(recipe.id).then(
                      (res) => {
                        showSuccess({ message: res.data });
                        updateRecipes();
                      },
                      (err) => {
                        showError({
                          message:
                            'Du har vidst ikke helt tilladdelse til dette!',
                        });
                      }
                    );
                  }
                }}
                fill='green'
                size={15}
              />
            </div>
            <div
              id='icon'
              className='transition duration-300 ease-out hover:-translate-y-1 hover:bg-gray-400 p-4 mt-4 bg-primary shadow-form w-fit rounded-full'
            >
              <BsFillHandThumbsUpFill
                fill='green'
                size={25}
                onClick={() => {
                  recipeService
                    .createNewRecipeVoteByUserAndRecipe(recipe.id, true)
                    .then(() => {
                      updateRecipes();
                    });
                  showSuccess({
                    message: `Du har opstemt opskriften ${recipe.name}. Tak for din støtte!`,
                  });
                }}
              />
            </div>
            <div
              id='icon'
              className='transition duration-300 ease-out hover:-translate-y-1 hover:bg-gray-400 p-4 mt-4 bg-primary shadow-form w-fit rounded-full'
            >
              <BsFillHandThumbsDownFill
                fill='red'
                size={25}
                onClick={() => {
                  recipeService
                    .createNewRecipeVoteByUserAndRecipe(recipe.id, false)
                    .then(() => {
                      updateRecipes();
                    });
                  showSuccess({
                    message: `Du har nedstemt opskriften ${recipe.name}! Tak for din støtte!`,
                  });
                }}
              />
            </div>
            <div
              id='icon'
              className='transition duration-300 ease-out hover:-translate-y-1 hover:bg-gray-400 p-4 bg-primary shadow-form w-fit h-fit rounded-full'
            >
              <BsXLg
                onClick={() => {
                  if (
                    window.confirm(
                      'Er du sikker på at du vil slette opskriften, dette kan ikke fortrydes!?'
                    )
                  ) {
                    recipeService.deleteRecipeById(recipe.id).then(
                      (res) => {
                        showSuccess({ message: `${res.data}` });
                        updateRecipes();
                      },
                      (err) => {
                        showError({
                          message: `Du har vidst ikke helt tilladdelse til dette!`,
                        });
                      }
                    );
                  }
                }}
                fill='red'
                size={15}
              />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Card;

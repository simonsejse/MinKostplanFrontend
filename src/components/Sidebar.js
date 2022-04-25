/**
 * React stuff
 */
import { useNavigate } from 'react-router-dom';
/**
 * Services
 */
import authService from '../services/auth/auth.service';

/**
 * Svgs
 */
import { BiFoodMenu, BiSupport } from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import { MdOutlineSpaceDashboard, MdAdminPanelSettings } from 'react-icons/md';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { GiFat, GiShoppingCart, GiHotMeal } from 'react-icons/gi';
import { FiSettings, FiLogOut } from 'react-icons/fi';

/**
 * Contexts
 */
import { useAuth } from '../contexts/auth.context';
import { useNavigation } from '../contexts/nav.context';

/**
 * Reducers
 */
import { actions } from '../reducers/nav.reducer';

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);

  const { navState, dispatch } = useNavigation();

  if (user == null) {
    return <Loading />;
  }

  return (
    <div
      className={`h-screen w-full fixed sm:relative z-40 ${
        navState.full ? 'sm:w-64' : 'sm:w-20'
      } flex justify-between`}
    >
      {/* Mobile Menu Toggle*/}
      <button
        onClick={() => dispatch({ type: actions.TOGGLE_NAV_MOBILE })}
        className='sm:hidden absolute top-5 right-5 focus:outline-none z-50 text-white'
      >
        {/* Menu Icons */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-6 w-6 ${navState.navOpen && 'hidden'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M4 6h16M4 12h16M4 18h16'
          />
        </svg>

        {/* Close Icons */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-6 w-6 ${!navState.navOpen && 'hidden'}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>

      <div
        className={`h-screen bg-accent transition-all duration-300 space-y-2 fixed ${
          navState.full ? 'w-64' : 'w-full sm:w-20'
        } ${navState.navOpen ? 'top-0 left-0' : 'top-0 -left-full sm:left-0'}`}
      >
        {navState.full ? (
          <h1 className='text-white font-black py-7 text-2xl px-4'>
            MinKostplan
            <hr className='border-gray-700' />
          </h1>
        ) : (
          <GiFat className='text-white text-4xl my-7 mx-auto' />
        )}
        <div className='px-4 space-y-2'>
          {/* Sidebar toggle */}
          <button
            onClick={() => {
              dispatch({ type: actions.TOGGLE_FULL });
            }}
            className='hidden sm:block focus:outline-none absolute p-1 -right-3 top-10 bg-gray-900 rounded-full shadow-md'
          >
            <BsChevronDown
              className={`fill-red-700 h4 w-4 transition-all text-white duration-300 transform ${
                navState.full ? 'rotate-90' : '-rotate-90'
              }`}
            />
          </button>

          {/* Home */}
          <div
            onClick={() => {
              dispatch({ type: actions.SWITCH_TAB, payload: 'home' });
              navigate('/home');
            }}
            className={`relative flex items-center hover:text-gray-200 hover:bg-accent space-x-2 rounded-md p-2 cursor-pointer text-white ${
              navState.full ? 'justify-start' : 'sm:justify-center'
            } ${navState.active === 'home' && 'bg-accent'}`}
          >
            <MdOutlineSpaceDashboard className='h-6 w-6' />
            <h1 className={`${!navState.full && 'sm:hidden'}`}>Hjem</h1>
          </div>
          <hr className='border-gray-700' />

          {/* Kostplan */}
          <div className='relative'>
            <div
              onClick={() => {
                dispatch({
                  type: actions.TOGGLE_DROPDOWN,
                  payload: 'dpDropdown',
                });
              }}
              className={`flex justify-between text-gray-400 hover:text-gray-200 hover:bg-accent items-center space-x-2 rounded-md p-2 cursor-pointer ${
                navState.full ? 'justify-start' : 'sm:justify-center'
              }`}
            >
              <div className='relative flex space-x-2 items-center text-white'>
                <BiFoodMenu className='h-6 w-6' />
                <h1 className={`${!navState.full && 'sm:hidden'} text-white`}>
                  Kostplan
                </h1>
              </div>
              <BsChevronDown
                className={`h-3 w-3 ${
                  !navState.full && 'sm:hidden'
                } transition-all text-white duration-300 transform ${
                  navState.dpDropdown.open && 'rotate-180'
                }`}
              />
            </div>
            <hr className='border-gray-700' />
            {/* Dropdown Items */}

            {navState.dpDropdown.open && (
              <>
                <div
                  className={`text-gray-400 space-y-3 ${
                    navState.full
                      ? navState.dropdown.expandedClass
                      : navState.dropdown.shrinkClass
                  }`}
                >
                  <div
                    onClick={() => {
                      dispatch({ type: actions.SWITCH_TAB, payload: 'diets' });
                      navigate('/diets');
                    }}
                    className={`w-full h-full text-white ${
                      navState.full ? 'p-2 rounded-md' : 'p-1 rounded-md'
                    } ${navState.active === 'diets' && 'bg-accent'}`}
                  >
                    <h1 className='hover:text-gray-200 cursor-pointer'>
                      Dine kostplaner
                    </h1>
                  </div>
                  <div
                    onClick={() => {
                      dispatch({
                        type: actions.SWITCH_TAB,
                        payload: 'create-diet-plan',
                      });
                      navigate('/create-diet-plan');
                    }}
                    className={`w-full h-full text-white ${
                      navState.full ? 'p-2 rounded-md' : 'p-3 rounded-md'
                    } ${navState.active === 'create-diet-plan' && 'bg-accent'}`}
                  >
                    <h1 className='hover:text-gray-200 cursor-pointer'>
                      Opret kostplan
                    </h1>
                  </div>
                </div>
                <hr className='border-gray-700' />
              </>
            )}

            {/* Opret måltid */}
            <div
              onClick={() => {
                dispatch({
                  type: actions.SWITCH_TAB,
                  payload: 'create-recipe',
                });
                navigate('/create-recipe');
              }}
              className={`relative flex items-center hover:text-gray-200 hover:bg-accent space-x-2 rounded-md p-2 cursor-pointer text-white ${
                navState.full ? 'justify-start' : 'sm:justify-center'
              } ${navState.active === 'create-recipe' && 'bg-red-600'}`}
            >
              <GiHotMeal className='h-6 w-6' />
              <h1 className={`${!navState.full && 'sm:hidden'}`}>
                Opret måltid
              </h1>
            </div>
            <hr className='border-gray-700' />

            {/* Shop */}
            <div
              onClick={() => {
                dispatch({ type: actions.SWITCH_TAB, payload: 'membership' });
                navigate('/membership');
              }}
              className={`relative flex items-center text-white hover:text-gray-200 hover:bg-accent space-x-2 rounded-md p-2 cursor-pointer ${
                navState.full ? 'justify-start' : 'sm:justify-center'
              } ${navState.active === 'membership' && 'bg-accent'}`}
            >
              <GiShoppingCart className='h-6 w-6' />
              <h1 className={`${!navState.full && 'sm:hidden'}`}>
                Medlemsskab
              </h1>
            </div>
            <hr className='border-gray-700' />

            {/* About */}
            <div
              onClick={() => {
                dispatch({ type: actions.SWITCH_TAB, payload: 'about' });
                navigate('/about');
              }}
              className={`text-white relative flex items-center hover:text-gray-200 hover:bg-accent space-x-2 rounded-md p-2 cursor-pointer ${
                navState.full ? 'justify-start' : 'sm:justify-center'
              } ${navState.active === 'about' && 'bg-accent'}`}
            >
              <IoMdInformationCircleOutline className='h-6 w-6' />
              <h1 className={`${!navState.full && 'sm:hidden'}`}>Om</h1>
            </div>
            <hr className='border-gray-700' />

            {/* Support */}
            <div
              onClick={() => {
                dispatch({ type: actions.SWITCH_TAB, payload: 'support' });
                navigate('/support');
              }}
              className={`text-white relative flex items-center hover:text-gray-200 hover:bg-accent space-x-2 rounded-md p-2 cursor-pointer ${
                navState.full ? 'justify-start' : 'sm:justify-center'
              } ${navState.active === 'support' && 'bg-accent'}`}
            >
              <BiSupport className='h-6 w-6' />
              <h1 className={`${!navState.full && 'sm:hidden'}`}>Support</h1>
            </div>
            <hr className='border-gray-700' />

            {/* Settings */}
            <div
              onClick={() => {
                dispatch({ type: actions.SWITCH_TAB, payload: 'settings' });
                navigate('/settings');
              }}
              className={`text-white relative flex items-center hover:text-gray-200 hover:bg-accent space-x-2 rounded-md p-2 cursor-pointer ${
                navState.full ? 'justify-start' : 'sm:justify-center'
              } ${navState.active === 'settings' && 'bg-accent'}`}
            >
              <FiSettings className='h-6 w-6' />
              <h1 className={`${!navState.full && 'sm:hidden'}`}>
                Indstillinger
              </h1>
            </div>
            <hr className='border-gray-700' />

            {user.roles.includes('ROLE_ADMIN') && (
              <>
                {/* Admin */}
                <div className='relative'>
                  <div
                    onClick={() => {
                      dispatch({
                        type: actions.TOGGLE_DROPDOWN,
                        payload: 'adminDropdown',
                      });
                    }}
                    className={`flex justify-between text-gray-400 hover:text-gray-200 hover:bg-accent items-center space-x-2 rounded-md p-2 cursor-pointer ${
                      navState.full ? 'justify-start' : 'sm:justify-center'
                    }`}
                  >
                    <div className='text-white relative flex space-x-2 items-center'>
                      <MdAdminPanelSettings className='h-6 w-6' />
                      <h1 className={`${!navState.full && 'sm:hidden'}`}>
                        Admin
                      </h1>
                    </div>
                    <BsChevronDown
                      className={`h-3 w-3 ${
                        !navState.full && 'sm:hidden'
                      } transition-all text-white duration-300 transform ${
                        navState.adminDropdown.open && 'rotate-180'
                      }`}
                    />
                  </div>
                  <hr className='border-gray-700' />
                  {/* Dropdown Items */}

                  {navState.adminDropdown.open && (
                    <>
                      <div
                        className={`text-gray-400 space-y-3 ${
                          navState.full
                            ? navState.dropdown.expandedClass
                            : navState.dropdown.shrinkClass
                        }`}
                      >
                        <div
                          onClick={() => {
                            dispatch({
                              type: actions.SWITCH_TAB,
                              payload: 'create-meal',
                            });
                            navigate('/admin/create-meal');
                          }}
                          className={`text-white w-full h-full ${
                            navState.full ? 'p-2 rounded-md' : 'p-3 rounded-md'
                          } ${
                            navState.active === 'create-meal' && 'bg-accent'
                          }`}
                        >
                          <h1 className='hover:text-gray-200 cursor-pointer'>
                            Smth
                          </h1>
                        </div>
                      </div>
                      <hr className='border-gray-700' />
                    </>
                  )}
                </div>
              </>
            )}

            {/* Log out */}
            {user && (
              <div
                onClick={() =>
                  authService
                    .logOut()
                    .then(() => console.log('Log out babygirl'))
                }
                className={`text-white relative flex items-center hover:text-gray-200 hover:bg-gray-800 space-x-2 rounded-md p-2 cursor-pointer ${
                  navState.full ? 'justify-start' : 'sm:justify-center'
                }`}
              >
                <FiLogOut className='h-6 w-6' />
                <h1 className={`${!navState.full && 'sm:hidden'}`}>Log ud</h1>
              </div>
            )}
          </div>
        </div>

        <div className='w-full absolute bottom-10 flex flex-col p-4'>
          <div
            className={`text-gray-400 ${
              !navState.full && !navState.navOpen && 'hidden'
            }`}
          >
            <h1 className='text-4xl'>Hej,</h1>
            <h2 className='text-gray-600 text-2xl'>{user?.username}!</h2>
          </div>
          <hr className='border-gray-700' />
          <div className='flex justify-center mt-12'>
            <img
              src='https://i.stack.imgur.com/l60Hf.png'
              className={`transition-all duration-1000 rounded-full object-cover ${
                navState.full || navState.navOpen ? 'h-20 w-20' : 'h-12 w-12'
              }`}
              alt='profile'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Loading = () => {
  return <h1>Loading...</h1>;
};

export default Sidebar;

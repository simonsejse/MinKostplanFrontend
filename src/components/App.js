/**
 * React Stuff
 */
import { Routes, Route, useLocation } from 'react-router-dom';

/**
 * Components
 */
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Sidebar from './Sidebar';
import ProtectedRoute from './ProtectedRoute';
import Error from './Error404';
import About from './pages/About';
import CreateRecipe from './pages/CreateRecipe';
import Support from './pages/Support';
import ManageRecipes from './pages/ManageRecipes';
import { DragDropContext } from 'react-beautiful-dnd';
/**
 * Custom React Providers
 */
import { NavigationProvider } from '../contexts/nav.context';
import { AuthProvider } from '../contexts/auth.context';
import CreateDietPlan from './pages/CreateDietPlan';

/**
 * Contexts needed throughout the application
 */

const App = () => {
  const loc = useLocation();

  return (
    <AuthProvider>
      <NavigationProvider>
        {/* 
        we say the div is flex, and then basically have 2 elements the sidebar and then 
        the page itself then we tell the pages to flex-1 since it tells it to grow so much it can 
        take up the rest of the space
        other explanation:
        Wrapper for the whole routes then we use flex-1 (flex-grow-1) inside each element to tell
         take as much space as you can within your parent flex container.*/}

        <div className='flex'>
          {loc.pathname !== '/login' && loc.pathname !== '/register' && (
            <Sidebar />
          )}
          <Routes>
            <Route
              exact
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path='support'
              element={
                <ProtectedRoute>
                  <Support />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path='home'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path='create-recipe'
              element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path='about'
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path='/create-diet-plan'
              element={
                <ProtectedRoute>
                  <CreateDietPlan />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path='admin/create-meal'
              element={
                <ProtectedRoute>
                  <CreateRecipe />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path='manage/recipes'
              element={
                <ProtectedRoute>
                  <ManageRecipes />
                </ProtectedRoute>
              }
            />

            <Route exact path='logout' />

            <Route exact path='login' element={<Login />} />
            <Route exact path='register' element={<Register />} />
            <Route path='*' element={<Error />} />
          </Routes>
        </div>
      </NavigationProvider>
    </AuthProvider>
  );
};

export default App;

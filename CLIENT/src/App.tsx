// --------------- IMPORTS ---------------
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'
import Root from './components/Pages/Root';
import HomePage from './components/Pages/Homepage';
import ErrorPage from './components/Pages/Error';


// --------------- COMPONENT ---------------
// ROUTER:
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        // note: is it element: <HomePage/> or:
        // Component: HomePage,
        // ?
        children: [
            {
                path: "/",
                element: <HomePage />
            },
        ],
        errorElement: <ErrorPage />
    },
]);


function App() {

    return (
        <RouterProvider
            router={router}
        />
    );
};


// --------------- EXPORTS ---------------
export default App;
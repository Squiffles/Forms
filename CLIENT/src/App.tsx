// --------------- IMPORTS ---------------
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'
import Root from './components/Pages/Root';
import HomePage from './components/Pages/Homepage';
import Form from './components/Pages/Form/Form';
import Success from './components/Pages/Success';
import Results from './components/Pages/Results';
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
            {
                path: "/form",
                element: <Form />
            },
            {
                path: "/success",
                element: <Success />
            },
            {
                path: "/results",
                element: <Results />
            }
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
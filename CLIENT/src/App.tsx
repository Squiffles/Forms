// --------------- IMPORTS ---------------
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css'
import Root from './components/Pages/Root';
import HomePage from './components/Pages/Homepage';
import Form from './components/Pages/Form';
import Success from './components/Pages/Success';
import Answers from './components/Pages/Answers';
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
                path: "/answers",
                element: <Answers />
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
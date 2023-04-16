import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import QuestionListPage from './app/pages/QuestionListPage';
import QuestionDetailsPage from './app/pages/QuestionDetailsPage';
import HomePage from './app/pages/HomePage';
import useNetworkStatus from './app/hooks/useNetworkStatus';
import Loading from "./app/layout/Loading";


function App() {
  const isOnline = useNetworkStatus();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      path: "/questions",
      element: <QuestionListPage/>
     },
     {
      path: "/questions/:questionId",
      element: <QuestionDetailsPage/>
     },
     { 
      path: "/*",
      element: <div>Not Found</div>
     }
  ]);

  return (
    <>
      {!isOnline ? <Loading content="Connection Lost"/> : null}
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

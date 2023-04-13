import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import QuestionListPage from './app/pages/QuestionListPage';
import QuestionDetailsPage from './app/pages/QuestionDetailsPage';



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <QuestionListPage/>,
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
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

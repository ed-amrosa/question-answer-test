import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import QuestionListPage from './features/question/QuestionListPage';
import QuestionDetailsPage from './features/question/QuestionDetailsPage';
import HomePage from './features/home/HomePage';
import useNetworkStatus from './app/hooks/useNetworkStatus';
import Loading from "./app/layout/Loading";


function App() {
  //Detects if user is connected to the internet
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

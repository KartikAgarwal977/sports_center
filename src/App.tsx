import './App.css'
import { RouterProvider } from "react-router-dom";
import router from './routes';

function App() {
  

  return (
    <>
      <div className='h-screen w-full mx-auto py-2'>
      <RouterProvider router={router} />
      </div> 
    </>
  )
}

export default App

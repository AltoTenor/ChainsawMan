import { Suspense, useState } from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import Three from './Three'

function App() {
    const [start,setStart] = useState(false);
    if ( start ){
        return (
            <Canvas id='canvas' shadows>
                <Suspense>
                    <Three/>
                </Suspense>
            </Canvas>
        )}
    else{
        return(
            <div className="wrapper flex  h-screen w-screen items-center justify-center">
            <button 
                    type="button" 
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    // className=""
                    style={{color:"#ffffff"}}
                    onClick={()=>{setStart(true)}}>
                Make a Deal with the Devil
            </button>
        </div>
        )
    }
}

export default App;

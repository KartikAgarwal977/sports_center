import Navbar from "./navibar"
import { Outlet } from "react-router-dom"

const FrameLayout = () => {
    return (
        <>
            <Navbar/>
            <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 p-6 rounded-lg">
                    <Outlet />
            </div>
            </main>
        </>
        
    )
}

export default FrameLayout

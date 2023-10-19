import Navbar from "./navibar"
import { Outlet } from "react-router-dom"

const FrameLayout = () => {
    return (
        <>
            <Navbar/>
            <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 dark:bg-slate-900">
                    <Outlet />
            </div>
            </main>
        </>
        
    )
}

export default FrameLayout
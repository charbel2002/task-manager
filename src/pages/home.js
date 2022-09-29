import "../styles/home.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

    export default function Home()
    {

        const navigate = useNavigate();

        useEffect(() => {

            if(localStorage.getItem('log'))
            {
                navigate('/account')
            }

        })

        return (
            <>
            
                <section id="app-home" className="lg:h-screen h-screen w-full lg:w-full lg:bg-gray-50 lg:items-center lg:flex-col lg:flex-wrap overflow-scroll pb-10">

                    <div className="lg:text-xl text-xl lg:text-black lg:font-extrabold font-extrabold lg:py-10 py-5 text-center">Your task manager</div>

                    <div id="app-context" className="lg:h-48 h-32 w-32 md:h-48 md:w-48 sm:h-48 sm:w-48 lg:w-48 lg:rounded-full rounded-full lg:mx-auto mx-auto lg:bg-gray-300 bg-gray-300 shadow-lg">

                    </div>

                    <div className="w-10/12 mx-auto lg:py-5 py-5 lg:text-lg text-lg lg:font-extrabold font-extrabold text-center">
                        Welcome into your favourite task manager
                    </div>

                    <div className="lg:w-5/12 w-10/12 mx-auto lg:text-center text-center lg:text-gray-700 text-gray-700">
                        Create your daily tasks, monitor them, modify then or simply delete them 
                        when completed. Hope you will have a great experiment out of this app.
                    </div>

                    <div className="lg:w-full">

                        <Link to="/signup" className="lg:bg-blue-800 bg-blue-800 hover:lg:bg-blue-600 hover:bg-blue-600 lg:text-white text-white lg:p-3 p-3 lg:w-3/12 w-8/12 md:w-6/12 sm:w-7/12 lg:rounded-sm rounded-sm lg:mx-auto mx-auto lg:mt-5 mt-5 lg:flex flex lg:items-center items-center lg:justify-center justify-center">Register</Link>

                        <Link to="/signin" className="lg:bg-gray-500 bg-gray-500 hover:lg:bg-gray-700 hover:bg-gray-700 lg:text-white text-white lg:p-3 p-3 lg:w-3/12 w-8/12 md:w-6/12 sm:w-7/12 lg:rounded-sm rounded-sm lg:mx-auto mx-auto lg:mt-5 mt-5 lg:flex flex lg:items-center items-center lg:justify-center justify-center">Login</Link>

                    </div>

                </section>
            
            </>
        )

    }
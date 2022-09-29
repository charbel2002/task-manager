import { useContext, useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { db } from "../../firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function AddSurface(props)
{

    const {taskInterface,setTaskInterface} = useContext(props.context)

    const {user,setUser} = useContext(props.userContext)

    const {todos,setTodos} = useContext(props.todosAbstractContextAsProps)

    const [label,setLabel] = useState("");

    const todoCollection = collection(db,'todos')

    const fadeView = (e) => {

        if(e.target.matches('#add-task-view'))
        {
            setTaskInterface(false)
        }

    }

    const createTodo = async () => {

        await addDoc(todoCollection,{
            label:label,
            user_id:user.id
        })

    }

    const fetchTodos = async () => {

        let data = await getDocs(todoCollection);

        setTodos(data.docs.map(doc => ({...doc.data(),id:doc.id})))

    }

    const addTodo = async (e) => {

        e.preventDefault()

        await validateForm()
        .then(async res => {

            if(res)
            {
                /*
                
                    -We add the todo to firebase
                    -We rerender the app to auto show all todos
                
                */

                const id = toast.loading("Please wait...");

                await createTodo()
                .then(async () => {
                    /*
                    
                        -Then render success toast
                        -Fetch todos
                        -Reset todos state var
                        -Then set the taskInterface state to false
                    
                    */
                        toast.update(id, {render: "Task successfully added", type: "success", isLoading: false});

                    await fetchTodos()
                    .then(() => setTaskInterface(false))

                })

            }
            else{
                toast.error('Empty task error');
            }

        })

    }

    const validateForm = () => {

        return new Promise((resolve,reject) => {

            if(label == "" || label == " " || label == null)
            {
                resolve(false)
            }
            else{
                resolve(true)
            }

        })

    }

    return (
        <>

            <section id="add-task-view" onClick={fadeView} className="lg:fixed fixed lg:top-0 top-0 lg:left-0 left-0 lg:right-0 right-0 lg:bottom-0 bottom-0 lg:bg-slate-900 bg-slate-900 lg:bg-opacity-70 bg-opacity-70 lg:flex flex lg:items-center items-center lg:justify-center justify-center">

                <article className="lg:w-6/12 w-10/12 lg:bg-white bg-white lg:h-48 h-48 lg:rounded-sm rounded-sm lg:relative relative">

                    <form className="" onSubmit={addTodo}>

                        <header className="lg:text-xl text-xl lg:font-extrabold font-extrabold lg:p-3 p-3 lg:text-center text-center">
                            Add new task
                        </header>

                        <div className="">
                            <input onInput={(e) => setLabel(e.target.value)} autoComplete="off" className="lg:block block lg:w-11/12 w-11/12 lg:bg-gray-300 bg-gray-300 lg:mx-auto mx-auto lg:rounded-lg rounded-lg lg:p-3 p-3 focus:lg:outline-none focus:outline-none focus:lg:border-none focus:border-none" name="tasklabel" placeholder="Fill your task in"/>
                        </div>

                        <button type="submit" className="lg:w-10 w-10 lg:h-10 h-10 lg:bg-gray-500 bg-gray-500 hover:lg:bg-gray-400 hover:bg-gray-400 lg:rounded-full rounded-full lg:flex flex lg:items-center items-center lg:justify-center justify-center lg:shadow-2xl shadow-2xl lg:mx-auto mx-auto lg:my-5 my-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>

                    </form>

                    <ToastContainer />

                </article>

            </section>

        </>
    );

}
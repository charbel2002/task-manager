import { useContext } from "react"
import { db } from "../../firebase-config"
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore"
import { ToastContainer, toast } from 'react-toastify';


export default function DeleteInterface(props)
{

    const {deleteInterfaceState,setDeleteInterfaceState} = useContext(props.interfaceStateAsProps)

    const todoCollection = collection(db,'todos')

    const {todoId,setTodoId} = useContext(props.context)

    const {todos,setTodos} = useContext(props.todoContextAsProps)

    const hideInterface = (e) => {

        if(e.target.matches('#delete-interface'))
        {
            setDeleteInterfaceState(false)
        }

    }

    const userCanceled = () => {

        setDeleteInterfaceState(false)

    }

    const fetchTodos = async () => {

        let data = await getDocs(todoCollection);

        setTodos(data.docs.map(doc => ({...doc.data(),id:doc.id})))

    }

    const userAccepted =async () => {

        const id = toast.loading("Processing...");

        const userDoc = doc(db,'todos',todoId)
        await deleteDoc(userDoc)
        .then(async () => {

            toast.update(id, {render: "Task deleted", type: "success", isLoading: false});

            await fetchTodos();

            setDeleteInterfaceState(false)

        })

    }

    return (

        <>
        
            <section id="delete-interface" onClick={hideInterface} className="lg:fixed fixed lg:top-0 top-0 lg:left-0 left-0 lg:right-0 right-0 lg:bottom-0 bottom-0 lg:bg-slate-900 bg-slate-900 lg:bg-opacity-70 bg-opacity-70 lg:flex flex lg:items-center items-center lg:justify-center justify-center">

                <article className="lg:bg-white bg-white lg:w-5/12 w-10/12 md:w-6/12 sm:w-7/12 lg:rounded-md rounded-md">

                    <header className="lg:flex flex lg:items-center items-center lg:justify-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                        </svg>
                    </header>

                    <div className="lg:text-center text-center lg:font-extrabold font-extrabold">
                        Are you sure you want to remove this task ?
                    </div>

                    <div className="lg:flex flex lg:justify-center justify-center lg:items-center items-center lg:p-3 p-3">

                        <button onClick={userAccepted} className="lg:bg-green-700 bg-green-700 lg:rounded-md rounded-md lg:mr-5 mr-5">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </button>

                        <button onClick={userCanceled} className="lg:bg-red-700 bg-red-700 lg:rounded-md rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                    </div>

                    <ToastContainer/>

                </article>

            </section>
        
        </>

    )

}
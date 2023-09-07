import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { setLoader } from '../redux/slices/Loader'
import { toast } from 'react-hot-toast'

const CTC = () => {

    const dispatch = useDispatch()
    
    const loader = useSelector((state)=>state.loader.value)

    const [formData, setFormData] = useState({
        email: '', amount: 1, firstName: '', lastName: ''
    })

    function handleOnChange(e){
        setFormData((prev)=>({
            ...prev, 
            [e.target.name] : e.target.value
        }))
    }

    async function submitHandler(e){
        try{
            e.preventDefault()
            dispatch(setLoader(true))
            // api call
            
            setFormData({
                email: '', amount: 1, firstName: '', lastName: ''
            })
            // if(response.data.success){
                // dispatch(setLoader(false))
                // navigate('/signup')

                // toast success
            // } else{
            //     dispatch(setLoader(false))
            //     // error toast message
            //     toast.error(data.message)
            // }
            

        } catch(error){
            setFormData({
                email: '', amount: 1, firstName: '', lastName: ''
            })
            dispatch(setLoader(false))
            // toast
            toast.error("Network Issue")
            console.log(error.message)
        }
    }


  return (
    loader? (<Spinner/>): (  
        <div className='flex justify-center items-center  lg:w-[40%] md:w-[50%] w-[90%] mx-auto py-[50px] pt-[75px] min-h-screen'>

            <form 
                onSubmit={(e)=>{submitHandler(e)}}
                className='w-full'
            >
                <fieldset className='border rounded-lg px-5 py-5 pt-2 flex flex-col justify-center gap-5'>
                    <legend className='ml-2 px-1 py-4'>CTC Registration</legend>

                    <div className='flex gap-1 md:flex-row flex-col'>
                        <div  className='flex flex-col'>
                            <label>
                                First Name
                            </label>
                            <input
                            name='firstName'
                            type='text' 
                            placeholder='Enter first name'
                            value= {formData.firstName}
                            onChange={(e)=>{handleOnChange(e)}}
                            className='my-2 rounded-md py-2 px-5 outline-none'
                            />
                        </div>
                        <div  className='flex flex-col'>
                            <label>
                                Last Name
                            </label>
                            <input
                            name='lastName'
                            type='text' 
                            placeholder='Enter last name'
                            value= {formData.lastName}
                            onChange={(e)=>{handleOnChange(e)}}
                            className='my-2 rounded-md py-2 px-5 outline-none'
                            />
                        </div>
                    </div>


                    <div  className='flex flex-col'>
                        <label>
                            Official Email Address
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        name='email'
                        type='email' 
                        placeholder='Enter email'
                        value= {formData.email}
                        onChange={(e)=>{handleOnChange(e)}}
                        required
                        className='my-2 rounded-md py-2 px-5 outline-none'
                        />
                    </div>
                    <div  className='flex flex-col'>
                        <label>
                            Amount
                            <sup className='text-[#EF476F] text-md'>*</sup>
                        </label>
                        <input
                        readOnly
                        type='number' 
                        value= '3300'
                        className='my-2 rounded-md py-2 px-5 outline-none cursor-no-drop'
                        />
                    </div>

                    <div>
                        <Button text='Sign Up' type='submit'></Button>
                    </div>

                    <div>
                        Already Done? <Link to='/signup' className='text-[#EF476F]'>Sign up</Link>
                    </div>

                </fieldset>
            </form>


        </div>
    )
  )
}

export default CTC
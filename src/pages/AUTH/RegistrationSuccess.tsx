import { useNavigate } from 'react-router-dom'
import { paths } from '../../path/path'

export default function RegistrationSuccess() {
    const navigate = useNavigate()
  return (
    <div className='w-full py-44'>
        <h1 className='text-3xl font-bold text-center'>Check your email</h1>
        <p className='text-lg font-medium w-[40%] mx-auto my-12 text-center'>We have receive your registration info, please check your email (d********com) for the confirmation link to sign in (please note to check your spam folder too, in case you don’t get it in your inbox)</p>
        <div className='flex justify-center items-center'>
            <button className='py-3 px-6 border-2 hover:bg-[#004663] font-bold cursor-pointer hover:text-white' onClick={()=>navigate(paths.VERIFICATION)}>Resend email</button>
        </div>
    </div>
  )
}

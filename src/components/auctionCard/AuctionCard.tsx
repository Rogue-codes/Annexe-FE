import { useNavigate } from 'react-router-dom'
import { mona, } from '../../assets'
import { paths } from '../../path/path'

export default function AuctionCard() {
    const navigate = useNavigate()
  return (
    <div className='w-[23%] mb-12'>
        <div className='w-full h-[271px]'>
            <img src={mona} className='w-full h-full object-cover' alt="" />
        </div>
        <div className='mt-3'>
            <h1 className='text-2xl font-bold'>Mona Lisa</h1>
            <p className='mt-1'>by <b>Leonardo Da Vinci</b></p>
        </div>

        <div className='w-full text-xl border-b pb-2 my-3'>
            <p>current bid: <b>$700</b></p>
        </div>

        <div className='flex w-full justify-start gap-1 items-center'>
            <div className='w-2 h-2 rounded-full bg-[#5EB926]'>

            </div>
            <p className='text-xs italic'>auction ends in: 14.9.2022 10:00:00 GMT+8</p>
        </div>

        <button className='py-2 cursor-pointer px-5 mt-6 border-2 hover:bg-[#004663] hover:text-white transition-all' onClick={()=>navigate(paths.AUCTION)}>
        Bid now
        </button>
      
    </div>
  )
}

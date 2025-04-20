import { reg, reg2 } from '../../assets'

interface IRegister {
    activeTab: number
}
export default function Register({activeTab}:IRegister) {
  return (
    <div className='relative h-[20rem] w-full'>
        <div className='absolute w-full left-0 top-0'>
            {activeTab === 0 ? <img src={reg} className='w-full h-full object-cover' alt="" /> : <img src={reg2} className='w-full h-full object-cover' alt=""/>}
        </div>

        <div className='relative z-20 flex justify-center h-full items-center gap-16'>
            <p className='w-[27rem] text-justify leading-10 text-2xl font-bold text-white'>Register and complete your info and get 10% Buyer Premium for the first purchase</p>
            <button className='w-[25.5rem] text-2xl h-[5rem] border-2 text-white font-bold'>Register to  get started</button>
        </div>
    </div>
  )
}

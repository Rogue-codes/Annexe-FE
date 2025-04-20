import { bgb } from '../../assets'

interface IHero {
  label?:string;
}
export default function Hero({label}:IHero) {
  return (
    <div className='relative h-[347px] '>
        <div className='w-full h-full bg-[#004663]'>
          <p className='text-[126px] font-bold text-white z-50 relative text-end pt-52 pr-8'>{label}</p>
        </div>
        <div className='w-full h-full absolute left-0 top-0'>
            <img src={bgb} className='w-full h-full object-cover' alt="" />
        </div>
    </div>
  )
}

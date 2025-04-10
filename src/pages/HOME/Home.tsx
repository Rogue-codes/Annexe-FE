import { blurImg } from '../../assets'
import Carousel from '../../components/Carousel/Carousel'
import ValueBuySell from './ValueBuySell'
import LatestAuction from './LatestAuction'
import About from './About'

export default function Home() {
  return (
    <div className='pt-24'>
      <div className='w-full h-screen relative'>
        <div className='w-full h-full absolute z-10 left-0 top-0 flex justify-center items-center  blur-xl'>
          <img src={blurImg} height={500} width={500} alt="" />
        </div>
          <div className='w-[347px] absolute top-44 bg-[#00456388] rounded-full left-[28%] h-[347px]  blur-xl'></div>

          <Carousel/>
      </div>
      <ValueBuySell/>
      <LatestAuction label="Latest Auction"/>
      <div className='w-full my-16 flex justify-center items-center'>
        <div className='border border-gray-300 w-[70%] '></div>
      </div>
      <LatestAuction label='Latest Result'/>
      <About/>
    </div>
  )
}

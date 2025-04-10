import { buyvalue } from '../../assets'

export default function ValueBuySell() {
  return (
    <div className='h-[51rem] gap-16 flex justify-center items-center primary-bg w-full'>
      <div className=' h-[45rem] -mb-56 top-[40%] left-[23%] w-[25vw] bg-white'>
        <img src={buyvalue} className='w-full h-full object-cover' alt="" />
      </div>
      <div className='w-[30%]'>
        <div className='-ml-24'>
            <h1 className='text-7xl font-bold w-[60%] text-white'>Value, Buy, Sell</h1>            
        </div>

        <div className='my-8'>
            <p className='text-2xl font-medium text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar interdum enim a vestibulum, nunc cras. Gravida morbi sit sed egestas cursus risus imperdiet bibendum nisl enim.</p>
        </div>

        <div className='flex justify-start items-center gap-5'>
            <button className='border-2 cursor-pointer border-white text-white p-3 font-bold hover:bg-white hover:text-[#004663] transition-all'>Bid your Item</button>
            <button className='border-2 cursor-pointer border-white text-white p-3 font-bold hover:bg-white hover:text-[#004663] transition-all'>Become a Seller</button>
        </div>

      </div>
    </div>
  )
}

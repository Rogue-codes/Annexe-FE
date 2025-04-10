/* eslint-disable @typescript-eslint/no-explicit-any */

interface ICarouselContainer {
  product?: string;
  creator?: string;
  img?: string;
  price?: number;
  startDate?: any;
  mainText?: string
  subText?: string
}

export default function CarouselContainer({ creator, startDate, img, mainText, price, product, subText }: ICarouselContainer) {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[30%] h-full flex justify-start items-center">
        <div>
          <h1 className="text-7xl font-bold w-[90%]">{product || mainText}</h1>
          {!mainText && <>
            <p className="my-2">by <b>{creator}</b></p>
            {price && <p>bid start from <b>{price}</b></p>}
            {startDate && <p>available to bid on <b>{startDate}</b></p>}

            <button className="w-28 h-11 border-2 mt-8 cursor-pointer hover:bg-[#004663] hover:text-white transition-all">View item</button>
          </>}
          {mainText && <button className="px-3 h-11 border-2 mt-8 cursor-pointer hover:bg-[#004663] hover:text-white transition-all">Register to redeem</button>}
        </div>

      </div>

      <div className="w-[30%] h-full flex justify-center items-center">
        {
          img ? <img src={img} className="h-full" alt="" /> : <p className="text-4xl leading-16">{subText}</p>
        }

      </div>
    </div>
  )
}

interface ICarouselTabs {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>
  tabs: {
    label: string;
    desc: string;
  }[]
  activeIndex: number
}

export default function CarouselTabs({activeIndex,setActiveIndex,tabs}:ICarouselTabs) {

  return (
    <div className='absolute bottom-0 left-0 w-[50%] flex justify-center items-center'>
      {
        tabs.map((tab, index) => (
          <div key={index} className={`${index !== tabs.length - 1 && "border-r-2 "} ${activeIndex === index ? "border-b-6 border-[#004663]" : "border-b-0"} h-24 justify-center transition-all flex flex-col gap-2 px-10`}>
            <div className='text-[#004563] font-bold text-[16px]'>{tab.label}</div>
            <div className='text-[#004563] font-normal text-[14px]'>{tab.desc}</div>
          </div>
        ))
      }
    </div>
  )
}

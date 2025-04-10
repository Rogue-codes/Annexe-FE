/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import CarouselTabs from './CarouselTabs'
import CarouselContainer from './CarouselContainer'
import { greekwoman, monalisa, plant } from '../../assets';

interface ICarouselItems{
    mainText?:string;
    subtext?:string;
    product?:string;
    creator?:string;
    price?:number;
    startDate?:any;
    img?:string;
}
export default function Carousel() {
    const [activeIndex, setActiveIndex] = useState(0)

    const tabs = [
        { 
            label:"10% Buyer's Pre..",
            desc:"Announcement"
        },
        { 
            label:"Mona Lisa",
            desc:"Upcoming item"
        },
        { 
            label:"Greek woman..",
            desc:"Bid item"
        },
        { 
            label:"Plant & Pots",
            desc:"Bid item"
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex === tabs.length-1 ? 0 : prevIndex + 1))
        }, 5000)
        
        // Clean up the interval when component unmounts
        return () => clearInterval(interval)
    }, [tabs.length])

    const carouselItems:ICarouselItems[] = [
        {
            mainText:"10% off Buyer’s Premium ",
            subtext:"for your first purchase by completing your account info"
        },
        {
            product:"Mona Lisa",
            creator:"by Leonardo Da Vinci",
            startDate:"available to bid on 05.09.22",
            img:monalisa
        },
        {
            product:"Greek woman with baskets",
            creator:"by Steven Alvs",
            price:500,
            img:greekwoman
        },
        {
            product:"Plant & Pots",
            creator:"by Jose Guillermo",
            price:1200,
            img:plant
        },
    ]

    return (
        <div className='w-full h-[88vh] z-50 relative'>
            <div className='w-full h-full flex justify-center'>
                <CarouselContainer creator={carouselItems[activeIndex].creator} img={carouselItems[activeIndex].img} mainText={carouselItems[activeIndex].mainText} price={carouselItems[activeIndex].price} product={carouselItems[activeIndex].product} startDate={carouselItems[activeIndex].startDate} subText={carouselItems[activeIndex].subtext} />
            </div>
            <CarouselTabs tabs={tabs} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        </div>
    )
}
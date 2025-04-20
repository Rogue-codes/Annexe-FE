import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface ISortingOptions{
    type:"price"|"end date";
    label:string;
    option:string
}

const sortingOptionsArr:ISortingOptions[] = [
    {
        label:"low to high",
        option:"low-high",
        type:"price"
    },
    {
        label:"high to low",
        option:"high-low",
        type:"price"
    },
    {
        label:"low to high",
        option:"asc",
        type:"end date"
    },
    {
        label:"high to low",
        option:"desc",
        type:"end date"
    }
]
export default function Sort() {
    const [showDropDown,setShowDropDown] = useState(false)
  return (
    <div className='w-full absolute z-50 flex px-14 mt-11 gap-5 justify-end items-start'>
        <p className='text-lg font-medium'>Sort auctions by</p>
        <div className={`${showDropDown ? "h-[246px]" : "h-[46px]"} w-[19rem] bg-white px-4 transition-all border-2`} onClick={()=>setShowDropDown(!showDropDown)}>
            <div className="flex cursor-pointer justify-start h-[46px] items-center gap-4">
                <p>Default Sorting</p>
                <FaChevronDown className={`${showDropDown ? "rotate-180" : "rotate-0"} transition-all`} />
            </div>
            {
                showDropDown && (
                    <div>
                        {
                            sortingOptionsArr.map((option,index)=>(
                                <div key={index} className="font-bold cursor-pointer py-2">
                                    <p>sort {option.type === "price" ? `by ${option.type}` : `auction by ${option.type} (${option.option})`}</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    </div>
  )
}

import React from 'react'
import AuctionCard from '../../components/auctionCard/AuctionCard'

interface ILatestAuction {
    label: string
}
export default function LatestAuction({label}:ILatestAuction) {
    return (
        <div className='mt-34 w-full px-44'>
            <div className='w-full flex justify-between items-center mb-10'>
                <h1 className='text-[40px] font-bold'>{label}</h1>
                <p className='font-medium cursor-pointer'>See all auction</p>
            </div>

            <div className='flex justify-start flex-wrap gap-16 items-center w-full'>
                <AuctionCard />
                <AuctionCard />
                <AuctionCard />
                <AuctionCard />
                <AuctionCard />
            </div>

        </div>
    )
}

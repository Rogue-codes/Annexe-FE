import { IoMdCloseCircleOutline } from "react-icons/io";

interface ISearchPopUp {
    setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SearchPopUp({setShowSearchModal}:ISearchPopUp) {
  return (
    <div className='fixed left-0 top-0 h-screen w-full primary-bg flex justify-center items-center'>
        <IoMdCloseCircleOutline className="absolute top-5 right-6 cursor-pointer" color="white" size={45} onClick={()=>setShowSearchModal(false)} />

      <div className='w-[60%] flex justify-between items-end'>
        <input type="text" className='border-b-2 focus:outline-none text-white border-white w-[80%] h-[82px] text-2xl placeholder:italic placeholder:text-2xl font-light' placeholder='search for painting, statue or ar art being auctioned' name="" id="" />
        <button className='w-[174px] h-[82px] text-3xl font-bold text-white border-2 border-white hover:bg-white hover:text-[#004663] transition-all cursor-pointer'>Search</button>
      </div>
    </div>
  )
}

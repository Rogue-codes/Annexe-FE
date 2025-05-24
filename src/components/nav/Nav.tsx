import { IoSearch } from 'react-icons/io5'
import { logo } from '../../assets'
import { paths } from '../../path/path'
import { useNavigate } from 'react-router-dom'
import SearchPopUp from './SearchPopUp'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CgProfile } from 'react-icons/cg'

interface ILink {
  label: string
  path: string
}
export default function Nav() {
  const navigate = useNavigate()
  const links: ILink[] = [
    {
      label: "Home",
      path: paths.HOME
    },
    {
      label: "Auction",
      path: paths.AUCTIONS
    },
    {
      label: "Results",
      path: paths.RESULT
    }
    ,
    {
      label: "Value, Buy, Sell",
      path: paths.BVS
    },
    {
      label: "About Us",
      path: paths.ABOUT
    },
    {
      label: "Contact Us",
      path: paths.CONTACT
    }
  ]

  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const [showSearchModal,setShowSearchModal] = useState(false)
  return (
    <nav className="w-full bg-white fixed left-0 top-0 z-[99999] h-[108px] flex justify-between items-center px-12">
      <div>
        <img src={logo} alt="" />
      </div>

      <div className="flex w-[70%] justify-between items-center h-full">
        {links.map((link) => (
          <div onClick={() => navigate(link.path)} className="cursor-pointer">
            {link.label}
          </div>
        ))}

        <div
          className="w-12 cursor-pointer h-12 flex justify-center items-center rounded-full primary-bg"
          onClick={() => setShowSearchModal(true)}
        >
          <IoSearch size={20} color="white" />
        </div>
        {isAuthenticated ? (
          <div className="">
            <CgProfile size={40} cursor="pointer" color=" #004663" onClick={()=>navigate(paths.PROFILE)} />
          </div>
        ) : (
          <div className="w-[94px] h-[38px] rounded-3xl primary-bg text-white poppins-semibold flex justify-center items-center cursor-pointer">
            Sign In
          </div>
        )}
      </div>

      {showSearchModal && (
        <SearchPopUp setShowSearchModal={setShowSearchModal} />
      )}
    </nav>
  );
}

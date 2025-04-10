import { fb, IG, tw } from "../../assets";

export default function Footer() {
  return (
    <div className='text-white w-full px-12 py-12 bg-[#323232]'>
      <div className=" flex justify-start items-start w-full">
        <div className="w-[40%]">
        <h1 className="text-6xl font-bold w-[50%] text-white">Annexe Auction</h1>
        <p className="text-lg my-5">Wisma Geha, Jl. Timor No.25, RT.9/RW.4, </p>
        <p className="text-lg my-5">Gondangdia, Kec. Menteng, Kota Jakarta </p>
        <p className="text-lg my-5">Pusat, Daerah Khusus Ibukota Jakarta 10350</p>
        <p className="text-lg my-5">p. 0813-1066-8211</p>
        <p className="text-lg my-5">p. 0813-1066-8211</p>
        <p className="text-lg my-5">e. info@annexe-auction.online</p>
      </div>

      <div className="mt-24">
        <p className="text-lg font-bold">subscribe to our newsletter</p>

        <div className="w-[36rem] flex justify-between items-end">
          <input type="text" className="border-b-2 w-[85%] focus:outline-none" name="" id="" />
          <button className="border w-[75px] h-[45px] border-white text-md cursor-pointer hover:bg-[#004663] transition-all">Send</button>
        </div>

        <div className="flex justify-start gap-12 items-center mt-10">
          <p>Consign with us</p>
          <p>Terms & Conditions</p>
        </div>

        <div className="flex justify-start gap-12 items-center mt-10">
          <p>Consign with us</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
      </div>

      <div className="flex justify-between items-center mt-24">
        <p>© 2022 Annexe Auction Online. All rights reserved</p>

        <div className="w-[60%] border-b border-white"></div>

        <div className="flex justify-between items-center gap-5">
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-white">
            <img src={IG} alt="" />
          </div>
          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-white">
          <img src={fb} alt="" />
          </div>

          <div className="w-8 h-8 rounded-full flex justify-center items-center bg-white">
          <img src={tw} alt="" />
          </div>
        </div>
      </div>

    </div>
  )
}

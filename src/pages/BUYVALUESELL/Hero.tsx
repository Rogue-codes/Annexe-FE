import { bvs } from "../../assets";

export default function Hero() {
  return (
    <div className="primary-bg pt-24 h-[36rem] w-full text-white flex ">
      <div className="w-[60%] h-[37rem]">
        <img src={bvs} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="w-[40%]">
        <h1 className="text-[90px] -ml-8 font-bold w-[70%] leading-20">Value, Buy, Sell</h1>
        <p className="w-[435px] mt-12 text-lg pl-16 leading-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar
          interdum enim a vestibulum, nunc cras. Gravida morbi sit sed egestas
          cursus risus imperdiet bibendum nisl enim.
        </p>
      </div>
    </div>
  );
}

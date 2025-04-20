interface IButton {
    text:string;
    onclick: ()=>void;
    disabled?:boolean;
    className_:string;
}
export default function Button({disabled,onclick,text}:IButton) {
  return (
    <button disabled={disabled} className={`px-5 font-bold text-white py-3 border-2 hover:bg-white hover:text-[#004663] transition-all cursor-pointer`} onClick={onclick}>{text}</button>
  )
}

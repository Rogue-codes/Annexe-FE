
interface IContent {
  contentArr: {
    img: string;
    label: string;
  }[];
  activeTab: number
}
export default function Content({activeTab, contentArr }: IContent) {
  return (
    <div className="my-12">
      <p className="text-center mx-auto w-[540px] text-xl font-bold leading-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar
        interdum enim a vestibulum, nunc cras. Gravida morbi sit sed egestas
        cursus risus imperdiet bibendum nisl enim.
      </p>

      <div className="w-full flex mt-12 justify-center items-start gap-5">
        {contentArr.map((content, index) => (
          <div key={index}>
            <div className={`${activeTab === 0 ? "primary-bg" : "bg-[#2490BD]"} transition-all w-[191px] h-[191px] rounded-full  flex justify-center items-center`}>
              <img src={content.img} alt="" />
            </div>
            <p className="w-[191px] mt-5 text-center">{content.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

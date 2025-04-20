
export default function Timer() {
  return (
    <div>
      <p className="text-lg pb-2">Time left</p>

      <div className="flex justify-start items-center gap-7">
        <div className="flex flex-col justify-center items-center">
          <div className="w-[127px] mb-3 h-[74px] bg-[#004663] flex justify-center items-center">
            <p className="text-5xl font-bold text-white">07</p>
          </div>
          <small>days</small>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="w-[127px] mb-3 h-[74px] bg-[#004663] flex justify-center items-center">
            <p className="text-5xl font-bold text-white">18</p>
          </div>
          <small>hours</small>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="w-[127px] mb-3 h-[74px] bg-[#004663] flex justify-center items-center">
            <p className="text-5xl font-bold text-white">35</p>
          </div>
          <small>minutes</small>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="w-[127px] mb-3 h-[74px] bg-[#004663] flex justify-center items-center">
            <p className="text-5xl font-bold text-white">47</p>
          </div>
          <small>seconds</small>
        </div>
      </div>
    </div>
  );
}

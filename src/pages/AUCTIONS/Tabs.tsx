import { useState, useRef, useEffect } from "react";

interface ITab {
  options: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

export default function Tabs({ activeTab, options, setActiveTab }: ITab) {
  // Change to proper type for refs array
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  
  // Make sure array is initialized with the right length
  useEffect(() => {
    tabRefs.current = tabRefs.current.slice(0, options.length);
    while (tabRefs.current.length < options.length) {
      tabRefs.current.push(null);
    }
  }, [options.length]);
  
  // Update the indicator position when activeTab changes
  useEffect(() => {
    const updateIndicator = () => {
      const currentTab = tabRefs.current[activeTab];
      if (currentTab) {
        const containerLeft = tabRefs.current[0]?.offsetLeft || 0;
        setIndicatorStyle({
          left: currentTab.offsetLeft - containerLeft,
          width: currentTab.offsetWidth
        });
      }
    };
    
    updateIndicator();
    // Also update on window resize to handle responsive layouts
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab, options]);

  return (
    <div className="relative border-b-2 flex mx-14 justify-start items-center gap-6">
      {options.map((option, index) => (
        <div
          key={index}
          // Fix the ref callback to properly handle TypeScript types
          ref={(el) => {
            tabRefs.current[index] = el;
            return undefined;
          }}
          className={`${
            activeTab === index
              ? "text-2xl font-bold text-black pb-4"
              : "text-lg text-gray-500 pb-4"
          } transition-all cursor-pointer`}
          onClick={() => setActiveTab(index)}
        >
          {option}
        </div>
      ))}

      <div 
        className="border-b-4 absolute bottom-0 transition-all duration-300"
        style={{ 
          left: `${indicatorStyle.left}px`, 
          width: `${indicatorStyle.width}px` 
        }}
      />
    </div>
  );
}
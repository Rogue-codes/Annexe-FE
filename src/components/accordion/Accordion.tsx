import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  
  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla enim a vestibulum, nunc eros. Gravida morbi sed egestas cursus risus imperdiet. Elementum nisi erom."
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla enim a vestibulum, nunc eros. Gravida morbi sed egestas cursus risus imperdiet. Elementum nisi erom."
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla enim a vestibulum, nunc eros. Gravida morbi sed egestas cursus risus imperdiet. Elementum nisi erom."
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla enim a vestibulum, nunc eros. Gravida morbi sed egestas cursus risus imperdiet. Elementum nisi erom."
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla enim a vestibulum, nunc eros. Gravida morbi sed egestas cursus risus imperdiet. Elementum nisi erom."
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla enim a vestibulum, nunc eros. Gravida morbi sed egestas cursus risus imperdiet. Elementum nisi erom."
    }
  ];

  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-white mt-12 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Question</h2>
        
        {/* First FAQ is open by default */}
        <div className="mb-6">
          <div 
            className="flex justify-between items-center cursor-pointer" 
            onClick={() => toggleFAQ(0)}
          >
            <h3 className="font-medium">{faqs[0].question}</h3>
            <div className="text-xl">
              {openIndex === 0 ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
          
          {openIndex === 0 && (
            <div className="mt-2 mb-4 text-gray-600">
              <p>{faqs[0].answer}</p>
            </div>
          )}
          <div className="border-b mt-4"></div>
        </div>
        
        {/* Rest of the FAQs */}
        {faqs.slice(1).map((faq, index) => {
          // Adding 1 to index because we already rendered the first FAQ
          const actualIndex = index + 1;
          
          return (
            <div key={actualIndex} className="mb-6">
              <div 
                className="flex justify-between items-center cursor-pointer" 
                onClick={() => toggleFAQ(actualIndex)}
              >
                <h3 className="font-medium">{faq.question}</h3>
                <div className="text-xl">
                  {openIndex === actualIndex ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              </div>
              
              {openIndex === actualIndex && (
                <div className="mt-2 mb-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
              <div className="border-b mt-4"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
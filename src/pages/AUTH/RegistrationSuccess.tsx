import { useNavigate } from "react-router-dom";
import { paths } from "../../path/path";
import { useEffect, useState } from "react";

export default function RegistrationSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(120); // 2 minutes in seconds
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Start countdown only if button is disabled
    if (countdown > 0 && isButtonDisabled) {
      const timer = setInterval(() => {
        setCountdown((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (countdown === 0 && isButtonDisabled) {
      // Enable button when countdown reaches zero
      setIsButtonDisabled(false);
    }
  }, [countdown, isButtonDisabled]);

  const handleResendEmail = () => {
    // Reset the countdown and disable button
    setCountdown(120);
    setIsButtonDisabled(true);

    // Navigate to verification page
    navigate(paths.VERIFICATION);
  };

  // Format the time to display minutes and seconds
  const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="w-full py-44">
      <h1 className="text-3xl font-bold text-center">Check your email</h1>
      <p className="text-lg font-medium w-[40%] mx-auto my-12 text-center">
        We have receive your registration info, please check your email
        (d********com) for the confirmation link to sign in (please note to
        check your spam folder too, in case you don't get it in your inbox)
      </p>
      <div className="flex flex-col items-center justify-center">
        <button
          className={`py-3 px-6 border-2 font-bold ${
            isButtonDisabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "hover:bg-[#004663] cursor-pointer hover:text-white"
          }`}
          onClick={handleResendEmail}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled
            ? `Resend email (${formatTime(countdown)})`
            : "Resend email"}
        </button>
      </div>
    </div>
  );
}

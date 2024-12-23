import { IconType } from "react-icons";
import { useCallback } from "react";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  ariaLabel: string;
}

const AuthSocialButton = ({ icon: IconComponent, onClick, ariaLabel }: AuthSocialButtonProps) => {
  const handleButtonClick = useCallback(() => {
    try {
      onClick();
    } catch (error) {
      console.error("Error in button click handler:", error);
    }
  }, [onClick]);

  return (
    <div
      onClick={handleButtonClick}
      role="button"
      aria-label={ariaLabel}
      className="inline-flex justify-center items-center p-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 active:ring-2 ring-blue-300 transition duration-300 cursor-pointer"
    >
      <IconComponent className="text-2xl" />
    </div>
  );
};

export default AuthSocialButton;

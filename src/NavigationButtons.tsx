import React from 'react';
import { ArrowRight } from 'lucide-react';

interface NavigationButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary',
  className = ''
}) => {
  const baseStyles = "inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium";
  const variantStyles = variant === 'primary' 
    ? "bg-[#006D5B] text-white hover:bg-[#005A4B]" 
    : "border border-[#006D5B] text-[#006D5B] hover:bg-[#006D5B] hover:text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
      <ArrowRight className="h-5 w-5" />
    </button>
  );
};

export default NavigationButton;
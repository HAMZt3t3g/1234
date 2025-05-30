import React from 'react';

interface NavbarLinkProps {
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 text-white transition-colors duration-200 hover:text-white/90 group ${
        isActive ? 'text-white' : 'text-white/80'
      }`}
    >
      {children}
      <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-white transition-transform duration-200 origin-left ${
        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
      }`}></span>
    </button>
  );
};

export default NavbarLink;
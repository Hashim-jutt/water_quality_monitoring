'use client';

import Link from 'next/link';
import { useState } from 'react';

const SideBar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      title: 'Real-Time Data',
      href: '/realtime-page',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      )
    },
    {
      title: 'All Records',
      href: '/all-records',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    // {
    //   title: 'Analytics',
    //   href: '/analytics',
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="20"
    //       height="20"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <line x1="18" y1="20" x2="18" y2="10"></line>
    //       <line x1="12" y1="20" x2="12" y2="4"></line>
    //       <line x1="6" y1="20" x2="6" y2="14"></line>
    //     </svg>
    //   )
    // },
    // {
    //   title: 'Alerts',
    //   href: '/alerts',
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="20"
    //       height="20"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     >
    //       <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    //       <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    //     </svg>
    //   )
    // }
  ];

  return (
    <div className="flex h-screen">
      <div
        className={`${open ? 'w-64' : 'w-20'} 
        bg-gradient-to-b from-blue-900 to-blue-800 
        h-screen p-4 pt-8 relative duration-300 
        shadow-lg`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`absolute -right-3 z-50 top-9 
    w-6 h-6 bg-white rounded-full 
    flex items-center justify-center
    shadow-md hover:bg-blue-100 border border-blue-200
    transition-all duration-300
    ${open ? 'rotate-180' : ''}`}
          style={{
            transform: open ? 'translateX(0) rotate(180deg)' : 'translateX(0)'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Logo */}
        <Link href='/realtime-page'>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-3.72-4-7.25-4-7.25S3 8.53 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                <path d="M12.56 6.6A10.97 10.97 0 0 1 14 3.02c.5 2.5 2 4.9 4 6.5 3.5 2 4 3.5 4 5.5a6.98 6.98 0 0 1-11.91 4.97" />
              </svg>
            </div>
            <h1
              className={`text-white text-xl font-semibold whitespace-nowrap ${!open && 'hidden'
                }`}
            >
              AQUA CHECK
            </h1>
          </div>
        </Link>

        {/* Menu Items */}
        <nav className="mt-10">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <div
                    className={`
                    flex items-center p-3 rounded-lg
                    text-white hover:bg-blue-700
                    transition-colors duration-200
                    ${open ? 'justify-start space-x-3' : 'justify-center'}
                  `}
                  >
                    <div className="w-6 h-6 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className={`${!open && 'hidden'}`}>{item.title}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile (Bottom) */}
        <div
          className={`absolute bottom-4 left-0 right-0 px-4 ${!open && 'hidden'
            }`}
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-700">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Admin</p>
              <p className="text-blue-200 text-xs">admin@aquacheck.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

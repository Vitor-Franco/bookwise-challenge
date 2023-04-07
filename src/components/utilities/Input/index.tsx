import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode
}

export function Input({ icon, className, ...rest }: InputProps) {
  return (
    <div className="relative flex items-center gap-3">
      <input
        className={`w-full h-12 px-5 pr-[calc(1.25rem_+_20px)] text-gray-100 bg-gray-800 rounded-[4px] border border-gray-500 placeholder:text-gray-400 placeholder:text-sm focus:outline-none focus:ring focus:ring-green-900 focus:ring-opacity-50 ${className}`}
        {...rest}
      />
      <div className="absolute inset-y-0 right-0 flex items-center gap-3 px-4 text-gray-500 pointer-events-none">
        {icon}
      </div>
    </div>
  )
}

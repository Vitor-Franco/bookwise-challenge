import React from 'react'

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className, ...rest }: TextAreaProps) {
  return (
    <div className="relative">
      <textarea
        {...rest}
        className={`bg-gray-800 resize-none w-full rounded-[4px] min-h-[164px] border border-gray-500 mt-6 text-gray-200 text-sm placeholder:text-gray-400 py-[14px] px-5 box-border focus:border-green-100 focus:outline-none pb-4 ${className}`}
      />
      <span className="absolute text-xs text-gray-400 bottom-3 right-2">
        {(rest.value && String(rest.value).length) || 0}/{rest.maxLength}
      </span>
    </div>
  )
}

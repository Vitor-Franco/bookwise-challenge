import clsx from 'clsx'
import React from 'react'

interface CategoryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string
  isActive: boolean
}

export function Category({
  name,
  isActive,
  className,
  ...rest
}: CategoryProps) {
  return (
    <button
      className={clsx(
        `rounded-full w-fit flex items-center justify-center py-1 px-4 ${className}`,
        {
          'border border-purple-100': !isActive,
          'border border-purple-200 bg-purple-200': isActive,
        },
      )}
      {...rest}
    >
      <span
        className={clsx('text-md', {
          'text-purple-100': !isActive,
          'text-gray-100': isActive,
        })}
      >
        {name}
      </span>
    </button>
  )
}

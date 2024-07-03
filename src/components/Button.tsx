import * as React from 'react'

const Loading = () => {
  return (
    <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle
        className="stroke-green-400"
        cx="12"
        cy="12"
        r="10"
        strokeWidth="4"
      ></circle>
      <path
        className="fill-white"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ disabled, ...props }, ref) => {
  return (
    <button
      className={
        'flex justify-center rounded-xl bg-green-500 px-5 py-4 font-semibold text-white' +
        ' ' +
        `hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-900 ${disabled ? 'cursor-not-allowed' : ''} `
      }
      ref={ref}
      {...props}
    >
      {disabled ? <Loading /> : props.children}
    </button>
  )
})

export default Button

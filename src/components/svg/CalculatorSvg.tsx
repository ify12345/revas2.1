import * as React from 'react'


export default function CalculatorSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
  >
    <path
      fill="#34C759"
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm0 16H5V5h14v14Z"
    />
    <path
      fill="#34C759"
      d="M11.25 7.72h-5v1.5h5v-1.5ZM18 15.75h-5v1.5h5v-1.5ZM18 13.25h-5v1.5h5v-1.5ZM8 18h1.5v-2h2v-1.5h-2v-2H8v2H6V16h2v2ZM14.09 10.95l1.41-1.41 1.41 1.41 1.06-1.06-1.41-1.42 1.41-1.41L16.91 6 15.5 7.41 14.09 6l-1.06 1.06 1.41 1.41-1.41 1.42 1.06 1.06Z"
    />
  </svg>
  )
}

import * as React from 'react'
import { SVGProps } from 'react'

export default function GoArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
    >
      <path
        fill="#000"
        d="m12 4.242-1.41 1.41 5.58 5.59H4v2h12.17l-5.58 5.59 1.41 1.41 8-8-8-8Z"
      />
    </svg>
  )
}

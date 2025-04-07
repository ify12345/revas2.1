import * as React from 'react'
import { SVGProps } from 'react'

export default function ShieldSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={44}
      height={45}
      fill="none"
    >
      <path
        fill="#000"
        d="M22 2.544 5.5 9.878v11c0 10.174 7.04 19.69 16.5 22 9.46-2.31 16.5-11.826 16.5-22v-11L22 2.544Zm0 20.148h12.833C33.862 30.246 28.82 36.974 22 39.082V22.712H9.167V12.26L22 6.559v16.133Z"
      />
    </svg>
  )
}

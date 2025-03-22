import * as React from 'react'

export default function CheckSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={121}
      height={120}
      fill="none"
    >
      <circle cx={60.5} cy={60} r={54.375} fill="#F1F5F9" />
      <foreignObject width={103.8} height={103.8} x={8.1} y={8.6}>
        <div
          style={{
            backdropFilter: 'blur(5.95px)',
            clipPath: 'url(#a)',
            height: '100%',
            width: '100%',
          }}
        />
      </foreignObject>
      <g data-figma-bg-blur-radius={11.9} filter="url(#b)">
        <circle cx={60} cy={60.5} r={40} fill="url(#c)" />
      </g>
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={6}
        d="M78.25 47.125 54.187 71.188 43.25 60.25"
      />
      <defs>
        <linearGradient
          id="c"
          x1={60}
          x2={60}
          y1={20.5}
          y2={100.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#212224" />
          <stop offset={1} stopColor="#050A18" />
        </linearGradient>
        <clipPath id="a" transform="translate(-8.1 -8.6)">
          <circle cx={60} cy={60.5} r={40} />
        </clipPath>
        <filter
          id="b"
          width={103.8}
          height={103.8}
          x={8.1}
          y={8.6}
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={5} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.52 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3026_313820" />
        </filter>
      </defs>
    </svg>
  )
}

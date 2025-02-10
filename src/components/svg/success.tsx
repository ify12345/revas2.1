import * as React from 'react'

export default function Success() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="40" cy="40" r="36.25" fill="#ECFDF5" />
      <g filter="url(#filter0_bi_2739_176619)">
        <circle
          cx="39.6667"
          cy="40.3327"
          r="26.6667"
          fill="url(#paint0_linear_2739_176619)"
        />
      </g>
      <path
        d="M51.8333 31.416L35.7917 47.4577L28.5 40.166"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <filter
          id="filter0_bi_2739_176619"
          x="5.06667"
          y="5.73268"
          width="69.2026"
          height="69.2007"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="3.96667" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2739_176619"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2739_176619"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2.66667" />
          <feGaussianBlur stdDeviation="3.33333" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.52 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_2739_176619"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2739_176619"
          x1="39.6667"
          y1="13.666"
          x2="39.6667"
          y2="82.7493"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#2BB329" />
          <stop offset="1" stop-color="#052A04" />
        </linearGradient>
      </defs>
    </svg>
  )
}

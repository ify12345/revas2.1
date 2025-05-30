import React from 'react'
import CelebrateSvg from '@/components/svg/Celebrate'

interface ProfitMarginDisplayProps {
  profitMargin: number | null
}

const ProfitMarginDisplay: React.FC<ProfitMarginDisplayProps> = ({
  profitMargin,
}) => {
  // console.log(profitMargin)
  return (
    <div className="border border-stroke px-4 py-4 rounded-lg flex gap-3">
      <CelebrateSvg />
      <div className="flex flex-col">
        <p className="text-primary">
          {profitMargin !== null && !isNaN(profitMargin) ? (
            <>
              You're in the{' '}
              <span
                className={`text-sm font-semibold mt-2 ${
                  profitMargin < 0
                    ? 'text-danger'
                    : profitMargin >= 5
                      ? 'text-success'
                      : 'text-warning'
                }`}
              >
                {profitMargin < 0 ? 'Red' : 'Green'} {profitMargin.toFixed(2)}%
              </span>
            </>
          ) : (
            <span className="text-sm text-gray-500">
              {profitMargin !== null
                ? 'You have not inputted anything'
                : 'Invalid input'}
            </span>
          )}
        </p>
        <p className="text-gray_light text-sm">
          You{' '}
          {profitMargin !== null && profitMargin >= 5 ? 'can' : "can't"}{' '}
          proceed with this transaction
        </p>
      </div>
    </div>
  )
}
export default ProfitMarginDisplay

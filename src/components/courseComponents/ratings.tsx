import React from 'react';

interface RatingData {
  stars: number;
  count: number;
  percentage: number;
}

interface RatingReviewProps {
  totalRating: number;
  averageRating: number;
  ratings: RatingData[];
}

const Rating: React.FC <RatingReviewProps> = ({ totalRating, averageRating, ratings}) => {

  return (
    <div className='font-neue-haas'>
      <h3 className='font-bold text-[16px] text-[#253B4B] leading-5 mb-6'>Review Summary</h3>
      <div className='grid grid-cols-footer'>
        <div>
          <div className='text-[#60269E] text-[64px] leading-[76px] font-bold'>4.8</div>
          <div>
            <p>Course rating</p>
            <div className='text-2xl text-[#DFB300]'> {'★'.repeat(Math.floor(averageRating)) + (averageRating % 1 >= 0.5 ? '★' : '☆')}</div>
          </div>
        </div>
        <div>
          {ratings.map((rat) => (
            <div key={rat.stars} className='flex items-center mb-3'>
            <div className='flex-auto mr-3' 
            // style={{ flex: 3, marginRight: '10px' }} 
            >
              <div className='bg-[#D9D9D9] h-[10px] relative rounded-[5px]'>
                <div
                  style={{
                    backgroundColor: '#60269E',
                    width: `${rat.percentage}%`,
                    height: '100%',
                    borderRadius: '5px',
                  }}
                  // className={`bg-[#60269E] w-[${rat.percentage}%] h-[100%] rounded-[5px]`}
                ></div>
              </div>
            </div>
            <div 
            // style={{ flex: 1, color: '#FFD700' }}
            className='text-[#DFB300] text-lg'
            >
              {'★'.repeat(rat.stars)}
             <span className='text-[#626262]'>{'★'.repeat(5 - rat.stars)}</span>
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Rating
import React from "react";
import pic from '../../../public/images/animoji.svg'
import Image from "next/image";

function userData (name: string, star:number, commentDate: string, comment: string) {
  return {name, commentDate, comment}
}

let data = [
  userData("John Doe", 3, "2 days ago", "Design thinking is a human centered approach to problem solving. It starts with the users in mind and ends with a solution designed specially to meet their needs. The core of design thinking is empathy. All other key factors needed to make design thinking work include; team work, iteration and curiosity, as well as testing the solution."),
  userData("John Doe", 2, "2 days ago", "Design thinking is a human centered approach to problem solving. It starts with the users in mind and ends with a solution designed specially to meet their needs. The core of design thinking is empathy. All other key factors needed to make design thinking work include; team work, iteration and curiosity, as well as testing the solution."),
  userData("John Doe", 4, "2 days ago", "Design thinking is a human centered approach to problem solving. It starts with the users in mind and ends with a solution designed specially to meet their needs. The core of design thinking is empathy. All other key factors needed to make design thinking work include; team work, iteration and curiosity, as well as testing the solution.")
]

const UserReview: React.FC  = (props) => {

  return (
    <div className="font-neue-haas mt-6">
      <h3 className="text-2xl text-[#253B4B] font-semibold mb-6">Reviews</h3>
      <div>
        {data.map((data, index) => 
          <div key={index} className="mb-6 border-b border-[#C4C4C4]">
            <div className="flex gap-2 items-center mb-3">
              <Image src={pic} alt="prof pic"/>
              <p className="text-lg font-semibold">{data.name}</p>
            </div>
            <div className="flex gap-2 items-center mb-3">
            <div className='text-[#DFB300] text-lg'>
              {'★'}
             <span className='text-[#626262]'>{'★'.repeat(4)}</span>
            </div>
              <p className="text-base">{data.commentDate}</p>
            </div>
            <p className="mb-2 text-base">{data.comment}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserReview;
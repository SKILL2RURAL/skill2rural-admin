import React from "react";
import pic from '../../../public/images/profPic.png'
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
    <div>
      <h3>Reviews</h3>
      <div>
        {data.map((data, index) => 
          <div key={index}>
            <div>
              <Image src={pic} alt="prof pic"/>
              <p>{data.name}</p>
            </div>
            <div>
              <Image src={pic} alt="star rating"/>
              <p>{data.commentDate}</p>
            </div>
            <p>{data.comment}</p>
            <hr />
          </div>
        )}
      </div>
    </div>
  )
}

export default UserReview;
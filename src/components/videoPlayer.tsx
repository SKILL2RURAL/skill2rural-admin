"use client";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { play } from "@/assets/icons";
import { useAppSelector } from "@/redux/hooks";

const VideoPlayer: React.FC = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const { courseDetails } = useAppSelector((state) => state.admin);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      // style={{
      //   backgroundImage: `url(${courseDetails?.thumbnail_image})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <ReactPlayer
        url={courseDetails?.video_url}
        playing={playing}
        controls
        width="100%"
        height="387px"
        light={courseDetails?.thumbnail_image}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* {!playing && (
        <button
          onClick={handlePlay}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-[#60269E] rounded-full hover:bg-opacity-90 transition-colors"
          aria-label="Play video"
        >
          <Image src={play} alt="Play button" width={56} height={56} />
        </button>
      )} */}
    </div>
  );
};

export default VideoPlayer;

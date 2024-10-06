"use client";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import thumbnail from "../../public/images/videoplayer-thumbnail.png";
import { play } from "@/assets/icons";
import Image from "next/image";

const thumbImg: any = thumbnail;

const VideoPlayer: React.FC = () => {
  const [playing, setPlaying] = useState<boolean>(false);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  return (
    <div className="text-center relative rounded-lg bg-[url(../../public/images/videoplayer-thumbnail.png)] object-contain">
      <ReactPlayer
        url=""
        light="../../public/images/videoplayer-thumbnail.png" // Custom image URL as thumbnail
        playing={playing}
        controls
        width="80%"
        height="387px"
      />

      <button
        onClick={handlePlay}
        className="px-[10px] py-5 mt-5 cursor-pointer bg-[#60269E] h-[112px] w-[112px] rounded-[50%] absolute top-[35%] left-[40%]"
      >
        {playing ? (
          "Pause"
        ) : (
          <Image className="mx-auto" src={play} alt="play btn" />
        )}
      </button>
    </div>
  );
};

export default VideoPlayer;

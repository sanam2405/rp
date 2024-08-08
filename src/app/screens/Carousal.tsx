"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import "swiper/swiper-bundle.css";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useAudio } from "../context";
import { GITHUB_URI, MEDIA } from "../constants";

const currentMedia = [MEDIA.SANAM_VIDEO, MEDIA.RP_VIDEO, MEDIA.SHEY_JE_VIDEO];

export const Carousal: FC = () => {
  const [click, setClick] = useState(true);
  const navigate = useRouter();
  const { play, stopPlay, isPlaying } = useAudio();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const formattedDate = `April 3, ${year}`;
  const [caption, setCaption] = useState(
    "তুমি শ্যামলা বঙ্গদেশ, তুমি ইঙ্গো SMS <br/> তুমি অং-বং ভবজলধি নুলিয়া আ... <br/> বধূ চোক্ষে এসো, অন্ধ হোক <br/> কক্ষে এসো নিন্দে হোক <br/> বক্ষে এসো গীতগোবিন্দ ভুলিয়া :) ",
  );
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 786px)");
    setIsLargeScreen(mediaQuery.matches);

    const handleResize = () => {
      setIsLargeScreen(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  const handleClick = () => {
    setClick(!click);
    stopPlay();
    navigate.push("/");
  };

  const handleVideoPlay = (src: string) => {
    stopPlay();
    let newCaption = "";
    switch (src) {
      case MEDIA.RP_VIDEO:
        newCaption =
          "গুনে গুনে দেখি অবেলার স্বপ্নটায়, আঁকা ছিলো কত শত কবিতায় <br/> স্বপ্নের সেই কবিতার ছন্দতে, মিশে ছিলো তার হাসিমাখা ছবিটা <br/> যা আঁকা ছিলো অদ্ভুত রঙ তুলি, যা জমা থাকে আমার মনে মাঝে <br/> বর হয়ে আমি চড়ছি ঘোড়ায়, আড়ালে তুমি লুকিয়ে আছো বৌ সাজে :) <br/> আমার এই স্বপ্ন কি শুধু, স্বপ্ন হয়ে হাসাবে আমায় ? <br/> তেমন সাহস নেই আমার, তোমাকে কিভাবে প্রস্তাব জানাই ?";
        break;
      case MEDIA.SANAM_VIDEO:
        newCaption =
          "গুনগানের হাজার বুলি, শুধুই সময় নষ্ট<br/> আঁকছো ছবি সমস্ত দিন, রঙ সবই অস্পষ্ট <br/> সুখের থেকেও হাজার গুনে দুঃখ অনেক ভালো<br/> তাইতো বলি আমায় বরং<br/> ঘেন্না কর, ঘেন্না কর";
        break;
      case MEDIA.SHEY_JE_VIDEO:
        newCaption =
          "ভালোবাসার মানুষের ঘেন্নাটাও এক প্রকার প্রেমের জন্ম দেয় <br/> ঘেন্না হোক বা ভালোবাসা, <br/> যাক অবশেষে কিছু তো একটা করলো সে :) <br/> অগত্যা তার প্রিয় গায়ক অরিজিৎ সিং এর কণ্ঠে <br/> আমার অন্যতম প্রিয় সঙ্গীতশিল্পী ও সুরকার <br/> শায়ান চৌধুরী অর্ণবের গান রাখা থাকলো তার জন্য";
        break;
      default:
        newCaption =
          "তুমি শ্যামলা বঙ্গদেশ, তুমি ইঙ্গো SMS <br/> তুমি অং-বং ভবজলধি নুলিয়া আ... <br/> বধূ চোক্ষে এসো, অন্ধ হোক <br/> কক্ষে এসো নিন্দে হোক <br/> বক্ষে এসো গীতগোবিন্দ ভুলিয়া :) ";
    }
    setCaption(newCaption);
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying && !isVideoPlaying) {
      play();
    }
  }, [play, isPlaying, isVideoPlaying]);

  return (
    <div className="flex justify-center items-center min-h-screen p-4 drop-shadow-xl">
      <Card
        className="w-full max-w-lg h-auto flex flex-col shadow-2xl"
        id="sanamCarousal"
      >
        <div className="flex-grow shadow-md">
          <CardHeader
            avatar={
              <Avatar
                src={MEDIA.AVATAR_IMG}
                className="rounded-full cursor-pointer"
              />
            }
            title="__bokaboka__"
            subheader={formattedDate}
            action={
              <IconButton>
                <GitHubIcon
                  onClick={() => {
                    window.location.href = `${GITHUB_URI}#readme`;
                  }}
                  className="text-gray-500 hover:text-gray-950"
                />
              </IconButton>
            }
          />
          <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={0}
            grabCursor
            keyboard={{ enabled: true }}
            navigation
            pagination={{ clickable: true }}
            loop={false}
            className="aspect-w-1 aspect-h-1 h-96 relative"
          >
            {currentMedia.map((item, index) => (
              <SwiperSlide key={index} className="relative h-full">
                <div className="relative group h-full">
                  {item.endsWith(".mp4") ? (
                    <div className="absolute inset-0">
                      <video
                        className="w-full h-full object-cover"
                        loop
                        onPlay={() => handleVideoPlay(item)}
                        onPause={handleVideoPause}
                      >
                        <source src={item} type="video/mp4" />
                        Shey Je Boshe Ache Eka Eka
                      </video>
                      <div
                        className={`absolute inset-0 flex justify-center items-center transition-opacity cursor-pointer ${isLargeScreen ? "opacity-0 group-hover:opacity-100" : "group-hover:opacity-100"}`}
                      >
                        <button
                          className="p-2 bg-slate-50 bg-opacity-100 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            const video = e.currentTarget
                              .closest(".group")
                              ?.querySelector("video");
                            if (video) {
                              if (isVideoPlaying) {
                                video.pause();
                              } else {
                                video.play();
                              }
                            }
                          }}
                        >
                          {isVideoPlaying ? (
                            <PauseIcon className="text-red-600" />
                          ) : (
                            <PlayArrowIcon className="text-red-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <CardMedia
                      component="img"
                      className="w-full h-full object-cover object-top"
                      image={item}
                      alt={`media-${index}`}
                      style={{ aspectRatio: "1/1" }}
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <CardActions disableSpacing>
          <IconButton>
            <Favorite
              onClick={handleClick}
              className="text-gray-500 hover:text-red-500"
            />
          </IconButton>
          <IconButton>
            <CommentIcon
              onClick={handleClick}
              className="text-gray-500 hover:text-blue-500"
            />
          </IconButton>
          <IconButton>
            <ShareIcon
              onClick={handleClick}
              className="text-gray-500 hover:text-green-700"
            />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            // className='tiro-bangla-regular'
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

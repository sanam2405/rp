import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const currentMedia = [MEDIA.SANAM_IMG, MEDIA.RP_IMG, MEDIA.SHEY_JE_VID];

export const Carousal: FC = () => {
  const [click, setClick] = useState(true);
  const navigate = useNavigate();
  const { play, stopPlay, isPlaying } = useAudio();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const formattedDate = `April 3, ${year}`;
  const [caption, setCaption] = useState(
    "তুমি শ্যামলা বঙ্গদেশ, তুমি ইঙ্গো SMS <br /> তুমি অং-বং ভবজলধি নুলিয়া আ... <br /> বঁধু চোক্ষে এসো, অন্ধ হোক <br /> কক্ষে এসো নিন্দে হোক <br /> বক্ষে এসো গীতগোবিন্দ ভুলিয়া :) ",
  );
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleClick = () => {
    setClick(!click);
    stopPlay();
    navigate("/");
  };

  const handleVideoPlay = () => {
    stopPlay();
    setCaption(
      "ভালোবাসার মানুষের ঘেন্নাটাও এক প্রকার প্রেমের জন্ম দেয় <br /> ঘেন্না হোক বা ভালোবাসা, <br /> যাক অবশেষে কিছু তো একটা করলো সে :) <br /> অগত্যা তার প্রিয় গায়ক অরিজিৎ সিং এর কণ্ঠে <br /> আমার অন্যতম প্রিয় সঙ্গীতশিল্পী ও সুরকার <br /> শায়ান চৌধুরী অর্ণবের গান রাখা থাকলো তার জন্য",
    );
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
      <Card className="w-full max-w-lg h-auto flex flex-col shadow-2xl">
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
                        controls
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                      >
                        <source src={item} type="video/mp4" />
                        Shey Je Boshe Ache Eka Eka
                      </video>
                      <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <button
                          className="p-2 bg-white bg-opacity-75 rounded-full"
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
                            <PauseIcon className="text-gray-700" />
                          ) : (
                            <PlayArrowIcon className="text-gray-700" />
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
            className="tiro-bangla-regular"
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

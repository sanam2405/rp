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
import { Favorite, MoreVert } from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useAudio } from "../context";

const media = ["/sanam.jpg", "/rp.jpg", "/sheyje_arijit_square.mp4"];
const avatarImage = "/rimjhim.svg";

export const Carousal: FC = () => {
  const [click, setClick] = useState(true);
  const navigate = useNavigate();
  const { play, stopPlay, isPlaying } = useAudio();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const formattedDate = `April 3, ${year}`;
  const [caption, setCaption] = useState(
    "Congratulations for your success in your debut GB <br /> And lastly, cheers that we both made it to internships and placements :)",
  );
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleClick = () => {
    setClick(!click);
    // play();
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
    <div className="flex justify-center items-center min-h-screen drop-shadow-xl">
      <Card className="w-full max-w-lg h-1/3 flex flex-col shadow-2xl">
        <div className="flex-grow shadow-md">
          <CardHeader
            avatar={
              <Avatar
                src={avatarImage}
                className="rounded-full cursor-pointer"
              />
            }
            title="__bokaboka__"
            subheader={formattedDate}
            action={
              <IconButton>
                <MoreVert />
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
            breakpoints={{}}
          >
            {media.map((item, index) => (
              <SwiperSlide key={index}>
                {item.endsWith(".mp4") ? (
                  <div className="relative group">
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
                    <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
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
                    className="w-full h-full object-cover"
                    image={item}
                  />
                )}
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
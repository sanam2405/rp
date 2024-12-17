"use client";

import { CarouselSkeleton } from "@/components";
import { useAudio } from "@/context";
import { Favorite } from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/Comment";
import GitHubIcon from "@mui/icons-material/GitHub";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { GITHUB_URI, MEDIA } from "@rp/constants";
import DOMPurify from "isomorphic-dompurify";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { FC, useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

interface ICurrentMedia {
  src: string;
  caption: string;
}
const currentMedia: ICurrentMedia[] = [
  {
    src: MEDIA.SANAM_VIDEO,
    caption:
      "গুনগানের হাজার বুলি, শুধুই সময় নষ্ট <br/> আঁকছো ছবি সমস্ত দিন, রঙ সবই অস্পষ্ট <br/> সুখের থেকেও হাজার গুনে দুঃখ অনেক ভালো <br/> তাইতো বলি আমায় বরং <br/> ঘেন্না কর, ঘেন্না কর",
  },
  {
    src: MEDIA.RP_VIDEO,
    caption:
      "গুনে গুনে দেখি অবেলার স্বপ্নটায়, আঁকা ছিলো কত শত কবিতায় <br/> স্বপ্নের সেই কবিতার ছন্দতে, মিশে ছিলো তার হাসিমাখা ছবিটা <br/> যা আঁকা ছিলো অদ্ভুত রঙ তুলি, যা জমা থাকে আমার মনে মাঝে <br/> বর হয়ে আমি চড়ছি ঘোড়ায়, আড়ালে তুমি লুকিয়ে আছো বৌ সাজে :) <br/> আমার এই স্বপ্ন কি শুধু, স্বপ্ন হয়ে হাসাবে আমায় ? <br/> তেমন সাহস নেই আমার, তোমাকে কিভাবে প্রস্তাব জানাই ?",
  },
  {
    src: MEDIA.SHEY_JE_VIDEO,
    caption:
      "ভালোবাসার মানুষের ঘেন্নাটাও এক প্রকার প্রেমের জন্ম দেয় <br/> ঘেন্না হোক বা ভালোবাসা, <br/> যাক অবশেষে কিছু তো একটা করলো সে :) <br/> অগত্যা তার প্রিয় গায়ক অরিজিৎ সিং এর কণ্ঠে <br/> আমার অন্যতম প্রিয় সঙ্গীতশিল্পী ও সুরকার <br/> শায়ান চৌধুরী অর্ণবের গান রাখা থাকলো তার জন্য",
  },
  {
    src: MEDIA.JUTTI_VIDEO,
    caption:
      "<q><i>If you save every photo, then your phone will surely burst one day :) </i></q> <br/> ~ <i>Rimjhim</i>, circa 2022",
  },
  {
    src: MEDIA.NODE_VIDEO,
    caption:
      "তুমি ক্রোধের আগুনে জমে থাকা ব্যাথা, <br> আমার শেষ বিকেলের ধোঁকা <br> কোন রোদেলা দুপুরে তোমায় ফিরে পাবো বলে <br> অর্থহীন খোঁজা :) <br/> <i> about trees and graphs </i> <br/> <i> and nodes and habits </i>",
  },
  {
    src: MEDIA.MURAL_VIDEO,
    caption:
      "আসলে বড় হওয়া ব্যাপারটাই খুব কঠিন। জীবনে যখন যেমনটি ভেবেছিলাম তা কিছুই হয়নি। রবীন্দ্রনাথ নিজেই লিখেছিলেন - চাইলাম জামা, পাইলাম মোজা, মোজা দিয়েই জামার কাজ চালানোর চেষ্টা করছি। <br /> অগত্যা, হ্যাঁ আমি আজও কোটা ফ্যাক্টরি দেখিনি। ঠাকুমার ঘরের দেওয়ালে সেই দিদির আর আমার নাম লেখা, আমার নামের পাশে আজও ফাঁকা পরে রয়েছে। আর অচিরেই হারিয়ে গেছে স্পটিফাই এর সেই প্লেলিস্ট।",
  },
  {
    src: MEDIA.CAFE_VIDEO,
    caption:
      "আজ ভেঙ্গে যাব, কাল জুড়ে যাব <br /> তবু ভাঙ্গতে জুড়তে চলেছি <br /> কালবোশেখিটা তোমাদের দেব <br /> খুঁজে আনতেই চলেছি।",
  },
];

export const Carousal: FC = () => {
  const [click, setClick] = useState(true);
  const navigate = useRouter();
  const { pause, resume, isPlaying } = useAudio();
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const formattedDate = `April 3, ${year}`;
  const [caption, setCaption] = useState(
    "তুমি শ্যামলা বঙ্গদেশ, তুমি ইঙ্গো SMS <br/> তুমি অং-বং ভবজলধি নুলিয়া আ... <br/> বধূ চোক্ষে এসো, অন্ধ হোক <br/> কক্ষে এসো নিন্দে হোক <br/> বক্ষে এসো গীতগোবিন্দ ভুলিয়া :)",
  );
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const posthog = usePostHog();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(min-width: 786px)");
      setIsLargeScreen(mediaQuery.matches);

      const handleResize = () => {
        setIsLargeScreen(mediaQuery.matches);
      };

      mediaQuery.addEventListener("change", handleResize);
      return () => {
        mediaQuery.removeEventListener("change", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // time for media assets to load
    return () => clearTimeout(timer);
  }, []);

  const handleLikeClick = () => {
    setClick(!click);
    if (isPlaying) {
      pause();
    }
    navigate.push("/preface");
  };

  const handleCommentClick = () => {
    setClick(!click);
    if (isPlaying) {
      pause();
    }
    navigate.push("/redit");
  };

  const handleShareClick = () => {
    setClick(!click);
    if (isPlaying) {
      pause();
    }
    window.open(
      "https://open.spotify.com/playlist/5VOcst0tGcSUNi8QInDcPX",
      "_blank",
    );
  };

  const handleVideoPlay = (currentMedia: ICurrentMedia) => {
    if (isPlaying) {
      pause();
    }
    let newCaption = "";
    switch (currentMedia.src) {
      case MEDIA.RP_VIDEO:
        newCaption = currentMedia.caption;
        break;
      case MEDIA.SANAM_VIDEO:
        newCaption = currentMedia.caption;
        break;
      case MEDIA.SHEY_JE_VIDEO:
        newCaption = currentMedia.caption;
        break;
      case MEDIA.JUTTI_VIDEO:
        newCaption = currentMedia.caption;
        break;
      case MEDIA.NODE_VIDEO:
        newCaption = currentMedia.caption;
        break;
      case MEDIA.MURAL_VIDEO:
        newCaption = currentMedia.caption;
        break;
      case MEDIA.CAFE_VIDEO:
        newCaption = currentMedia.caption;
        break;
      default:
        newCaption =
          "তুমি শ্যামলা বঙ্গদেশ, তুমি ইঙ্গো SMS <br/> তুমি অং-বং ভবজলধি নুলিয়া আ... <br/> বধূ চোক্ষে এসো, অন্ধ হোক <br/> কক্ষে এসো নিন্দে হোক <br/> বক্ষে এসো গীতগোবিন্দ ভুলিয়া :)";
    }
    setCaption(newCaption);
    setIsVideoPlaying(true);
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
    resume();
    posthog.capture("bokaboka.music_loop_started");
  };

  if (isLoading) {
    return <CarouselSkeleton />;
  }

  return (
    <div className="flex justify-center items-center h-screen p-4 drop-shadow-xl overflow-hidden">
      <Card
        className="w-full max-w-lg flex flex-col shadow-2xl max-h-[90vh]"
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
                    posthog.capture("bokaboka.button_clicked", {
                      buttonName: "githubButton",
                    });
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
                  {item.src.endsWith(".mp4") ? (
                    <div className="absolute inset-0">
                      <video
                        className="w-full h-full object-cover"
                        loop
                        preload="auto"
                        playsInline
                        onPlay={() => {
                          posthog.capture("bokaboka.media_play_started", {
                            mediaName: item.src,
                            caption: item.caption,
                          });
                          handleVideoPlay(item);
                        }}
                        onPause={() => {
                          posthog.capture("bokaboka.media_play_paused", {
                            mediaName: item.src,
                            caption: item.caption,
                          });
                          handleVideoPause();
                        }}
                      >
                        <source src={item.src} type="video/mp4" />
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
                                posthog.capture("bokaboka.media_play_paused", {
                                  mediaName: item.src,
                                  caption: item.caption,
                                });
                              } else {
                                video.play();
                                posthog.capture(
                                  "bokaboka.media_play_paused_resumed",
                                  {
                                    mediaName: item.src,
                                    caption: item.caption,
                                  },
                                );
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
                      image={item.src}
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
              onClick={() => {
                posthog.capture("bokaboka.button_clicked", {
                  buttonName: "likeButton",
                });
                handleLikeClick();
              }}
              className="text-gray-500 hover:text-red-500"
            />
          </IconButton>
          <IconButton>
            <CommentIcon
              onClick={() => {
                posthog.capture("bokaboka.button_clicked", {
                  buttonName: "commentButton",
                });
                handleCommentClick();
              }}
              className="text-gray-500 hover:text-blue-500"
            />
          </IconButton>
          <IconButton>
            <ShareIcon
              onClick={() => {
                posthog.capture("bokaboka.button_clicked", {
                  buttonName: "shareButton",
                });
                handleShareClick();
              }}
              className="text-gray-500 hover:text-green-700"
            />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(caption) }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

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
import { useAudio } from "../context";

const images = ["/sanam.jpg", "rp.jpg"];
const avatarImage = "/rimjhim.svg";

export const Carousal: FC = () => {
  const [click, setClick] = useState(true);
  const navigate = useNavigate();
  const { play, isPlaying } = useAudio();

  const handleClick = () => {
    setClick(!click);
    play();
    navigate("/");
  };

  useEffect(() => {
    if (!isPlaying) {
      play();
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg h-1/3 flex flex-col">
        <div className="flex-grow">
          <CardHeader
            avatar={<Avatar src={avatarImage} />}
            title="__bokaboka__"
            subheader={new Date().toDateString()}
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
            loop
            breakpoints={{}}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <CardMedia component="img" className="w-full" image={image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <CardActions disableSpacing>
          <IconButton>
            <Favorite onClick={handleClick} />
          </IconButton>
          <IconButton>
            <CommentIcon onClick={handleClick} />
          </IconButton>
          <IconButton>
            <ShareIcon onClick={handleClick} />
          </IconButton>
        </CardActions>

        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="tiro-bangla-regular"
          >
            Congratulations for your success in your debut GB <br />
            And lastly, cheers that we both made it to internships and
            placements :)
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

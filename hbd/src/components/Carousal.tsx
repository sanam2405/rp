import { FC } from "react";
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

const images = ["/sanam.jpg", "rp.jpg"];
const avatarImage = "/rimjhim.svg";

export const Carousal: FC = () => {
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
            <Favorite />
          </IconButton>
          <IconButton>
            <CommentIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
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

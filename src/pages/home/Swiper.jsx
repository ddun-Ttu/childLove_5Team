import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";

// import { useRouter } from "next/navigation"; // 이거 useNavigate로 수정

import Img from "./img";

SwiperCore.use([Autoplay, Pagination]);

export const SwiperBanner = ({ images }) => {
  //   const router = useRouter(); // 마찬가지로 useNavigate로 수정
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {images.map((image) => {
          return (
            <SwiperSlide key={image.id}>
              <div className="w-full h-[50vh] cursor-pointer">
                <Img
                  src={image.img}
                  alt="image"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SwiperBanner;

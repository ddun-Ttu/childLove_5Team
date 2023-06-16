import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { useRouter } from "next/navigation"; // 이거 useNavigate로 수정

const Carousel = ({ images }) => {
  const router = useRouter(); // 마찬가지로 useNavigate로 수정
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
              <div
                className="w-full h-[50vh] cursor-pointer"
                onClick={() => router.push(image.routerUrl)}
              >
                <image
                  src={image.imageUrl}
                  alt="image"
                  fill
                  style={{ objectFit: "cover" }}
                />{" "}
                그리고 이것도 아마 안될 수도 있어요 image 아니면 img
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Carousel;

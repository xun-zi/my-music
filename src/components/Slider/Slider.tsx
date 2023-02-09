import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from "swiper"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SliderContainer } from "./Style"
import { banner } from '@/api/type';




interface Props {
    bannerList: banner[]
}

export default function Slider(props: Props) {
    const { bannerList } = props;

    return (
        <SliderContainer>
            <Swiper
                modules={[Autoplay, Pagination]}
                // navigation
                loop
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
            >
                {
                    bannerList.map(({ imageUrl }, key) => {

                        return (<SwiperSlide key={key}>
                            <div className='slider-slider'>
                                <img src={imageUrl} width="100%" />
                            </div>
                        </SwiperSlide>)
                    })
                }
            </Swiper>
            <div className='before'></div>
        </SliderContainer>
    );
}
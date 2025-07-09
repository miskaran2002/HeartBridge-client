import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const banners = [
    {
        image: 'https://i.ibb.co/LdsJLTps/pexels-leeloothefirst-5055783.jpg',
        title: 'Find Your Perfect Life Partner',
        subtitle: 'Join thousands who found love on HeartBridge',
    },
    {
        image: 'https://i.ibb.co/dJm2fxRH/pexels-dirrez-3687688.jpg',
        title: 'Where Love Begins',
        subtitle: 'We connect hearts, not just profiles',
    },
    {
        image: 'https://i.ibb.co/3mSDLtVQ/pexels-pixabay-267684.jpg',
        title: 'Your Dream Match Awaits',
        subtitle: 'Explore genuine biodatas with trust',
    },
    {
        image: 'https://i.ibb.co/TM81yL6m/pexels-alexander-mass-748453803-31762915.jpg',
        title: 'Build a Life Together',
        subtitle: 'Verified members. Real intentions.',
    },
    {
        image: 'https://i.ibb.co/5h0K53bw/pexels-anna-frolova-1453685099-26741261.jpg',
        title: 'Culturally Connected Matches',
        subtitle: 'From Barisal to Sylhet — we bridge hearts',
    },
    {
        image: 'https://i.ibb.co/XrRC7DHC/pexels-eberhardgross-32878027.jpg',
        title: 'Secure. Simple. Serene.',
        subtitle: 'Your privacy and happiness matter to us',
    },
];

const HeroBannerSlider = () => {
    return (
        <div className="w-full">
            <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[300px] md:h-[500px]">
                            {/* Background image */}
                            <img
                                src={banner.image}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            {/* Overlay text */}
                            <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-center text-center px-4">
                                <div className="bg-gray-50 bg-opacity-80 rounded-lg px-4 py-3 max-w-[90%] md:max-w-[70%]">
                                    <h2 className="text-xl md:text-4xl font-bold text-secondary drop-shadow mb-2">
                                        {banner.title}
                                    </h2>
                                    <p className="text-sm md:text-lg text-primary">
                                        {banner.subtitle}
                                    </p>
                                </div>
                            </div>


                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroBannerSlider;

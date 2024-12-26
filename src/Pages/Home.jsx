
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import MarathonCard from "../Components/MarathonCard";

const Home = () => {
  const [limited, setLimited] = useState([]);

  useEffect(() => {
    const fethcing = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons/limited`,)
        setLimited(data);
    }
    fethcing()
}, [setLimited])
  return (
    <div>
      {/* Banner Section */}
      <div className="banner-section">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={30}
          slidesPerView={1}
          className="w-full h-[400px]"
        >
          <SwiperSlide>
            <div className="flex items-center justify-center bg-blue-500 h-full text-white text-2xl">
              Slide 1: Upcoming Marathon Highlights
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center bg-green-500 h-full text-white text-2xl">
              Slide 2: Register Now for Exclusive Events
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-center justify-center bg-red-500 h-full text-white text-2xl">
              Slide 3: Don&apos;t Miss Out on the Fun!
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div>
      <h1 className="text-3xl font-bold text-center my-6">New Marathons</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          {
            limited.map(l => <MarathonCard key={l._id} marathon={l}></MarathonCard>)
          }
        </div>
      </div>

      {/* Upcoming Marathons Section */}
      <div className="upcoming-marathons-section mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Upcoming Marathons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Static Content for Marathon Cards */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start"
            >
              <h3 className="text-xl font-bold mb-2">Marathon {index + 1}</h3>
              <p className="text-gray-600">Location: Random City {index + 1}</p>
              <p className="text-gray-600">Event Date: {`2024-12-${index + 10}`}</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                See Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Extra Sections */}
      <div className="extra-sections mt-16">
        {/* Extra Section 1 */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose Our Marathons?</h2>
          <p className="text-center text-gray-700 px-4 md:px-20">
            Our events are organized with precision, ensuring a great experience for all participants.
            Join us for fun, fitness, and an unforgettable journey.
          </p>
        </div>

        {/* Extra Section 2 */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-4">Volunteer Opportunities</h2>
          <p className="text-center text-gray-700 px-4 md:px-20">
            Want to make a difference? Become a volunteer and help us bring these marathons to life!
            Join our team and be a part of something amazing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

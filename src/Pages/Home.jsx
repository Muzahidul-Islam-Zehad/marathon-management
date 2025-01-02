
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
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    const fethcing = async () => {
      setFetch(true);
      const { data } = await axios.get(`${import.meta.env.VITE_url}/marathons/limited`,)
      setLimited(data);
      setFetch(false);
    }
    fethcing()
  }, [setLimited])
  return (
    <div className="w-11/12 mx-auto my-6">
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
            <div className="flex items-end justify-start h-full text-white text-2xl bg-[url('https://i.ibb.co.com/Tw2QwP4/banner-1.jpg')] bg-no-repeat bg-cover bg-center">
              <div className="p-4 ">
                <p className="text-3xl font-bold">Explore The Exclusive Events</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-end justify-start  h-full text-white text-2xl bg-[url('https://i.ibb.co.com/5RQqRq5/banner-2.jpg')] bg-no-repeat bg-cover bg-center">
              <div className="p-4 ">
                <p className="text-3xl font-bold">Register Now for Exclusive Events</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex items-end justify-start h-full text-white text-2xl bg-[url('https://i.ibb.co.com/YhDg3Dq/banner-3.jpg')] bg-no-repeat bg-cover bg-center">
              <div className="p-4 ">
                <p className="text-3xl font-bold">Don&apos;t Miss Out on the Fun!</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="">
        <h1 className="text-3xl font-bold text-center my-6">New Marathons</h1>

        {
          fetch ?
            <div className="flex items-center justify-center w-full">
              <span className="loading loading-infinity w-20"></span>
            </div>
            :
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
              {
                limited.map(l => <MarathonCard key={l._id} marathon={l}></MarathonCard>)
              }
            </div>
        }

      </div>

      {/* Upcoming Marathons Section */}
      <div className="upcoming-marathons-section mt-10">
        <h2 className="text-3xl font-bold text-center mb-6">Upcoming Marathons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Static Content for Marathon Cards */}

          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-bold mb-2">Ronaldo Marathon League</h3>
            <p className="text-gray-600">Location: United City </p>
            <p className="text-gray-600">Event Date: {`1-12-24`}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              See Details
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-bold mb-2">Albartigo Marathon League</h3>
            <p className="text-gray-600">Location: United State </p>
            <p className="text-gray-600">Event Date: {`3-2-25`}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              See Details
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-bold mb-2">Naruto Marathon League</h3>
            <p className="text-gray-600">Location: Konoha Village </p>
            <p className="text-gray-600">Event Date: {`1-2-25`}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              See Details
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-bold mb-2">Luffy Marathon League</h3>
            <p className="text-gray-600">Location: Wind Mill Village</p>
            <p className="text-gray-600">Event Date: {`3-2-25`}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              See Details
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-bold mb-2">Ichigo Marathon League</h3>
            <p className="text-gray-600">Location: Soul Society </p>
            <p className="text-gray-600">Event Date: {`1-4-25`}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              See Details
            </button>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start">
            <h3 className="text-xl font-bold mb-2">Johan Marathon League</h3>
            <p className="text-gray-600">Location: Mad City </p>
            <p className="text-gray-600">Event Date: {`1-5-25`}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              See Details
            </button>
          </div>
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

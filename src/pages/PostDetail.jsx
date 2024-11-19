import React from "react";
import Breadcrum from "../components/breadcrum";
import { useParams } from "react-router-dom";
import Sidebar from "../components/menu/Sidebar";
import Footer from "../components/menu/Footer";

import banner from "../assets/img/01.jpg";
import img1 from "../assets/img/08.jpg";
import img2 from "../assets/img/02.jpg";
import { FaRegClock } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

export default function PostDetail() {
  window.scroll(0, 0);
  const { slug } = useParams();

  return (
    <div>
      <Breadcrum
        text={[
          { title: "Home", url: "/" },
          { title: "Category", url: "" },
          { title: slug, url: "" },
        ]}
      />

      <div className="flex gap-4 lg:px-20 md:px-10 px-4 my-6">
        <div className="lg:w-[75%] md:w-[75%] w-[100%] font-imperial">
          <img src={banner} alt="" className="w-full h-[400px]" />
          <div className="text-lg flex flex-wrap lg:gap-10 gap-2 mt-8 font-semibold">
            <p>
              <span className="font-light">By</span> Elon Mask - 14 Jan, 2024
            </p>
            <p className="flex items-center gap-2">
              <FaRegClock /> 120 Minute Read
            </p>
            <p className="flex items-center gap-2">
              <FaChartSimple /> 2.1k Views
            </p>
          </div>
          <h1 className="my-6 lg:text-5xl md:text-4xl text-2xl font-semibold">
            Vision without Execution is Hallucination
          </h1>

          <p>
            About one year ago, my wife and I discovered black mold in our
            kitchen and it was horrifying. We immediately cleaned & disinfected
            the everything in the cabinets to make sure that the mold was gone.
            Two weeks later, all of the mold was back and it was frustrating
            because we didn’t know where it was coming from. We ended up
            cleaning it all again, praying that it wouldn’t return.
            <br />A few weeks later, I was throwing our trash away outside and
            as I walked toward the back of the house, I heard what sounded like
            water spraying on the ground. I got closer to the sound and realized
            it was coming from under our house. So I looked through one of the
            vents under our house and saw that one of our hot water pipes was
            shooting water under our house.
          </p>

          <div className="lg:flex md:flex gap-2 my-6">
            <img src={img1} alt="" />
            <p>
              I got super nervous and decided to grab a flashlight to see how
              bad the damage was. Fearing the worst, I turned on the light and
              found a lake of steamy, hot water under our house. My heart sank
              because I now knew the reason why there was mold in our kitchen.
              <br />
              <br />
              My wife, Julie, started dreaming and she had a vision for what she
              wanted our new kitchen to look like. She knew what color cabinets,
              what kind of appliances, the layout, the backsplash, the color
              paint, and even what type of lighting she wanted.
              <br />
              <br />I got super nervous and decided to grab a flashlight to see
              how bad the damage was. Fearing the worst, I turned on the light
              and found a lake of steamy, hot water under our house. My heart
              sank because I now knew the reason why there was mold in our
              kitchen.
            </p>
          </div>

          <p>
            I, on the other hand, couldn’t picture this new kitchen because all
            I saw were giant holes in the walls and dust everywhere. Our house
            was a giant mess for 6 months! Let’s just say that our family of
            five ate A LOT of microwaved Dino Chicken Nuggets. All throughout
            the process, my wife kept encouraging me to trust the process. Even,
            in my questioning and worry, I knew my wife had a vision for this
            new kitchen, I just needed to trust her.
            <br />
            <h1 className="my-6 text-4xl font-semibold">
              There is power when you have vision.
            </h1>
            Vision is being able to see before and beyond what others can see,
            while also painting a practical picture of how to get there. At
            Newbreak, our vision is to “Develop Christ centered leaders who
            change their world.”
            <br />
            <br />
            While we can say those words all day, the reality is this… “Vision
            without execution is hallucination.” – Thomas Edison For example, in
            our kitchen remodel, all I saw were holes in the walls for months.
            But then something amazing happened…we started taking steps to add
            things to our kitchen.
          </p>
          <img src={img2} alt="" className="w-full h-[400px] my-4" />
          <h1 className="my-6 text-4xl font-semibold">
            Three ways we'll turn vision into reality.
          </h1>
          <p>
            Consecrate means to make something sacred or holy. We do this by
            giving priority to spiritual things over physical things. The most
            dangerous Christian is the one who settles for living a “good
            enough” faith. There is nothing the devil loves more than a
            Christian who stops living a life of purpose. Whether you have been
            following Jesus for decades, or you just began your relationship
            with Him yesterday, we all can take a next step toward Jesus.
            <br />
            <br />
            Let this be the year where we consecrate ourselves for the Kingdom
            of God through prayer and studying God’s word. We are going to be a
            church that prays first in all things. We are going to be a church
            that doesn’t just try to get through the Bible in a year, but a
            church that gets the Bible through us this year.
            <br />
            <br />
            As we take steps of faith this year, it’s going to require a lot of
            courage. We believe God is going to ask us to step out of our
            comfort zone to make an impact this year. It may be scary serving,
            loving, and leading others but that is a good place to be. God
            promises to be with us through the highs and lows of life. Let’s
            take steps of courage as a church this year!
          </p>
          <div className="lg:flex md:flex gap-2 my-6">
            <img src={img1} alt="" />
            <p>
              I got super nervous and decided to grab a flashlight to see how
              bad the damage was. Fearing the worst, I turned on the light and
              found a lake of steamy, hot water under our house. My heart sank
              because I now knew the reason why there was mold in our kitchen.
              <br />
              <br />
              My wife, Julie, started dreaming and she had a vision for what she
              wanted our new kitchen to look like. She knew what color cabinets,
              what kind of appliances, the layout, the backsplash, the color
              paint, and even what type of lighting she wanted.
              <br />
              <br />I got super nervous and decided to grab a flashlight to see
              how bad the damage was. Fearing the worst, I turned on the light
              and found a lake of steamy, hot water under our house. My heart
              sank because I now knew the reason why there was mold in our
              kitchen.
            </p>
          </div>

          {/* Comment  */}
          <div className="my-10">
            <h3
              className="text-3xl mt-6 mb-4 font-semibold"
              style={{ fontFamily: "URW Imperial W01 Regular" }}
            >
              Leave A Reply
            </h3>
            <p>
              Your email address will not be published. Repuired fields are
              marked*
            </p>
            <div className="pt-10 pb-6">
              <label htmlFor="comment"> Comment*</label>
              <textarea
                type="text"
                rows={4}
                className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
                placeholder="type here..."
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
                  placeholder="Your Email"
                />
              </div>

              <input
                type="text"
                className="w-full border border-gray-400 rounded outline-none my-2 p-4 focus:border-primary transition duration-300 "
                placeholder="Website"
              />
            </div>
            <button className="w-full py-3 bg-primary text-lg text-white rounded hover:bg-gray-900 transition duration-300">
              Submit
            </button>
          </div>
        </div>
        <div className="w-[25%] lg:block hidden">
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
}

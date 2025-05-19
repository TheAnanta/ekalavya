"use client";
import Marquee from "react-fast-marquee";
// import Swiper JS
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function Home() {
  return (
    <div className="min-mobile-h-screen">
      <div className="min-mobile-h-screen flex flex-col">
        <div className="bg-black text-white w-full py-2 flex items-center text-sm uppercase">
          <Marquee>
            {[0, 1, 2].map(() => {
              return (
                <div className="flex items-center">
                  <p className="mx-4">
                    Join the <b>WOW 2025 challenge</b> and bag a chance to win
                    cool swags
                  </p>
                  <button className="py-1 px-4 text-[0.7rem] rounded-full border border-white uppercase font-bold">
                    Participate Now
                  </button>
                </div>
              );
            })}
          </Marquee>
        </div>
        <nav className="p-4 flex justify-between">
          <div className="flex gap-4 items-center flex-row-reverse w-max">
            <span className="material-symbols-outlined !text-2xl">menu</span>
            <button className="border-2 border-black py-2 px-8 rounded-full font-medium text-sm">
              sign in
            </button>
            {/* {<span className="material-symbols-outlined !text-3xl">
              account_circle
            </span>} */}
          </div>
          <img src="theananta.png" className="h-8 mr-3" />
        </nav>
        <main className="relative flex flex-col justify-end grow items-center overflow-hidden">
          <img
            src="badge.png"
            className="max-w-[80px] md:max-w-[120px] absolute top-[4%] right-[8%]"
          />

          <img
            src="cloud-left.png"
            className="max-w-[80px] md:max-w-[120px] absolute top-[16%] left-0"
          />
          <img
            src="cloud-right-top.png"
            className="max-w-[90px] md:max-w-[140px] absolute top-[4%] left-[12%]"
          />
          <img
            src="cloud-right-bottom.png"
            className="max-w-[80px] md:max-w-[140px] absolute top-[24%] right-0"
          />
          <h1 className="text-2xl md:text-5xl font-bold !font-[Google_Sans_Display]">
            Let's Go Camping!
          </h1>
          {/* <h3 className="font-medium text-xl">Lorem ipsum dolor</h3> */}
          <p className="text-sm md:text-base mt-2 mb-4 max-w-[36ch] text-center line-clamp-3">
            Upskill with our self-paced online program and build solutions for
            problems around you.
          </p>
          <button className="border-2 border-[var(--android-primary-color)] py-2 px-6 rounded-full font-medium text-[var(--android-primary-color)]">
            Register Now
          </button>
          <img
            src="compose-world.png"
            className="mt-12 w-full scale-120 -translate-x-2 -translate-y-2 md:scale-[unset] md:max-w-[800px] md:translate-y-1 object-bottom"
          />
        </main>
      </div>
      <div className="bg-[#073042] text-white -translate-y-[1px] relative z-5 flex w-full flex-col md:flex-row">
        <div className="p-[32px] md:px-[64px] md:pb-[72px] md:pt-[56px]">
          <h3 className="text-2xl font-medium">Program Overview</h3>
          <div className="flex flex-col md:flex-row gap-y-8 md:gap-x-8 md:gap-y-[unset]">
            <div>
              <p className="max-w-[400px] mt-4">
                Your camp leader is going to help you navigate through the
                hurdles you will face and complete the task if you ever get
                struck, making sure nothing obstructs you from mastering the
                course from <span className="font-medium">Zero to Hero</span>.
                <br />
                <br />
                Learning code and development has never been easier, just follow
                the below steps:
              </p>
              <br />
              <div className="leading-[3.5rem]">
                <p>
                  <span className="rounded-full px-4 py-2 bg-[#f86734] aspect-square mr-4">
                    1
                  </span>{" "}
                  Watch a video
                </p>
                <p>
                  <span className="rounded-full px-4 py-2 bg-[#f86734] aspect-square  mr-4">
                    2
                  </span>{" "}
                  Read through the blog
                </p>
                <p>
                  <span className="rounded-full px-4 py-2 bg-[#f86734] aspect-square  mr-4">
                    3
                  </span>{" "}
                  Follow along the codelab
                </p>
                <p>
                  <span className="rounded-full px-4 py-2 bg-[#f86734] aspect-square  mr-4">
                    4
                  </span>{" "}
                  Complete the assignment
                </p>
                <p>
                  <span className="rounded-full px-4 py-2 bg-[#f86734] aspect-square  mr-4">
                    5
                  </span>{" "}
                  Take the online quiz
                </p>
              </div>
            </div>
            <p className="max-w-[400px] mt-4">
              <span className="text-xl font-bold leading-10">Leaderboard</span>{" "}
              <br />
              Get your adorable swags by completing the pathways and unlocking
              your badges along the way. Make sure to recieve 80% or above in
              the quizes to be eligible.
              <br />
            </p>
          </div>
        </div>

        <img
          src="register-cliff-hero.png"
          className="mt-auto ml-auto max-h-[400px]"
        />
      </div>
      <div className="relative z-5 flex w-full flex-col md:flex-row">
        <div className="md:absolute top-4 left-4 p-8">
          <h3 className="max-w-[16ch] text-2xl font-medium">
            Here's what our campers had to say
          </h3>
          <p className="text-sm max-w-[32ch] mt-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non fuga
            omnis dolore natus, cum, quam quibusdam eum accusantium, quo eius
            fugiat.
          </p>
        </div>
        <div className="md:absolute top-12 right-0 md:w-[75%] z-10">
          <div className="relative mt-6 lg:mt-12 group/swiper">
            <Swiper
              autoplay={{
                pauseOnMouseEnter: true,
              }}
              allowTouchMove={true}
              spaceBetween={16}
              slidesPerView={1}
              initialSlide={0}
              modules={[Autoplay, Navigation, FreeMode]}
              freeMode={true}
              centeredSlidesBounds={true}
              centeredSlides={true}
              loop={true}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                440: {
                  spaceBetween: 20,
                  slidesPerView: 1,
                },
                1024: {
                  centeredSlidesBounds: false,
                  centeredSlides: false,
                  spaceBetween: 32,
                },
              }}
            >
              {[
                {
                  name: "Michalenga Verylongname",
                  designation: "Lorem ipsum",
                  pronoun: "she/her",
                  image: "camp-leader-female.png",
                  content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium harum quisquam voluptates at, reiciendis similique ut saepe minus, consequatur cumque beatae dignissimos eum eligendi. Dolorem possimus vero facilis nobis quidem.`,
                },
                {
                  name: "Gautam",
                  designation: "SWE Intern",
                  pronoun: "he/him",
                  image: "camp-leader.png",
                  content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium harum quisquam voluptates at, reiciendis similique ut saepe minus, consequatur cumque beatae dignissimos eum eligendi. Dolorem possimus vero facilis nobis quidem.`,
                },
                {
                  name: "Kimish Choudhary",
                  designation: "Frontend Intern",
                  pronoun: "she/her",
                  image: "camp-leader-female.png",
                  content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium harum quisquam voluptates at, reiciendis similique ut saepe minus, consequatur cumque beatae dignissimos eum eligendi. Dolorem possimus vero facilis nobis quidem.`,
                },
                {
                  name: "Vijay Kagupati",
                  designation: "VP, E-Club GITAM",
                  pronoun: "she/her",
                  image: "camp-leader.png",
                  content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium harum quisquam voluptates at, reiciendis similique ut saepe minus, consequatur cumque beatae dignissimos eum eligendi. Dolorem possimus vero facilis nobis quidem.`,
                },
              ].map((testimonial, index) => {
                return (
                  <SwiperSlide key={index} className="!w-max">
                    <div className="shadow-lg shadow-stone-200/70 w-max p-6 rounded-xl border border-gray-200/75 bg-white">
                      <div className="flex gap-4 items-center">
                        <img src={testimonial.image} className="h-20 mr-3" />
                        <div>
                          <p className="md:text-xl font-medium">
                            {testimonial.name}{" "}
                            <span className="text-sm mx-2 bg-[var(--android-primary-color)] p-2 text-white rounded-xl">
                              {testimonial.pronoun}
                            </span>
                          </p>

                          <p className="text-sm opacity-70">
                            {testimonial.designation}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm max-w-[24ch] md:max-w-[36ch] mt-4 line-clamp-5">
                        {testimonial.content}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="absolute items-center justify-between z-[5] flex h-full top-0 w-full px-11 pointer-events-none">
              <div className="swiper-button-prev bg-white border-black border-[2px] cursor-pointer !w-[3.5rem] !h-[3.5rem] rounded-full items-center justify-center flex !text-black font-bold !font-[2.2rem] group-hover/swiper:scale-100 scale-0 transition duration-300 -translate-x-[150%] group-hover/swiper:translate-x-0 group-hover/swiper:!pointer-events-auto"></div>
              <div className="swiper-button-next  bg-white border-black border-[2px] cursor-pointer !w-[3.5rem] !h-[3.5rem] rounded-full items-center justify-center flex !text-black font-bold group-hover/swiper:scale-100 scale-0 transition duration-300 translate-x-[150%] group-hover/swiper:translate-x-0 group-hover/swiper:!pointer-events-auto"></div>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <img
            src="trees-bottom.png"
            className="mt-auto max-h-[200px] -scale-x-100"
          />
          <img
            src="camp-viewpoint.png"
            className="mt-4 md:mt-[200px] mr-auto max-h-[400px] md:-scale-x-100"
          />
          <img
            src="mountains-bottom.png"
            className="hidden md:block mt-auto ml-auto max-h-[300px] "
          />
        </div>
      </div>
      <div className="bg-[var(--android-primary-color)] text-white p-[20px] md:pt-[60px] md:pb-[72px] md:px-[64px] relative z-5 flex justify-between flex-col-reverse md:flex-row gap-y-4 md:gap-y-[unset] w-full">
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-2xl font-bold">The Ekalavya Camp</h4>
            <p>
              © the ananta studio 2025.{" "}
              <span className="opacity-50 text-white font-normal">
                All Rights Reserved
              </span>
            </p>
          </div>
          <div className="mt-6">
            <a href="/privacy-policy" className="text-sm">
              Privacy Policy
            </a>
            <a href="terms-conditions" className="text-sm ml-8">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-lg font-medium">Reach out to me at</p>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-white font-normal mr-4">
              alternate_email
            </span>
            <a href="mailto:me@manasmalla.dev">me@manasmalla.dev</a>
          </div>
          <div className="flex items-center">
            <span className="material-symbols-outlined text-white font-normal mr-4">
              call
            </span>
            <a href="tel:9059145216">+91 90591 45216</a>
          </div>
          <div className="flex">
            <span className="material-symbols-outlined text-white font-normal mr-4">
              apartment
            </span>
            <span className="text-white font text-sm md:text-base">
              Uma Sivam Residency, T.P.T Colony,
              <br />
              Seethammadhara, Visakhpatnam, AP - 530013
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

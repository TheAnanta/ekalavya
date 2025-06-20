/*eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Marquee from "react-fast-marquee";
// import Swiper JS
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Link from "next/link";
import SignInButton from "@/components/sign_in_button";

export default function Home() {
  return (
    <div className="min-mobile-h-screen">
      <div className="min-mobile-h-screen flex flex-col">
        <div className="bg-black text-white w-full py-2 flex items-center text-sm uppercase">
          <Marquee>
            {[0, 1, 2].map((_, index) => {
              return (
                <div className="flex items-center" key={index}>
                  <p className="mx-4">
                    Join the <b>WOW 2025 challenge</b> and bag a chance to win
                    cool swags
                  </p>
                  <a
                    href="/wow-campaign"
                    className="py-1 px-4 text-[0.7rem] rounded-full border border-white uppercase font-bold"
                  >
                    Participate Now
                  </a>
                </div>
              );
            })}
          </Marquee>
        </div>
        <nav className="p-4 flex justify-between">
          <div className="flex gap-4 items-center flex-row-reverse w-max">
            <span className="material-symbols-outlined !text-2xl">menu</span>
            <SignInButton />
          </div>
          <Link href="/">
            <img src="theananta.png" className="h-8 mr-3" />
          </Link>
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
            Let&apos;s Go Camping!
          </h1>
          {/* <h3 className="font-medium text-xl">Lorem ipsum dolor</h3> */}
          <p className="text-sm md:text-base mt-2 mb-4 max-w-[36ch] text-center line-clamp-3">
            Upskill with our self-paced online program and build solutions for
            problems around you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-6 max-w-[600px]">
            <p className="py-3 text-sm px-6 border border-[var(--android-primary-color)] rounded-full">
              Android
            </p>
            <p className="py-3 text-sm px-6 border border-[var(--android-primary-color)] rounded-full">
              Generative AI
            </p>
            <p className="py-3 text-sm px-6 border border-[var(--android-primary-color)] rounded-full">
              Cloud
            </p>
            <p className="py-3 text-sm px-6 border border-[var(--android-primary-color)] rounded-full">
              Machine Learning
            </p>
            <p className="py-3 text-sm px-6 border border-[var(--android-primary-color)] rounded-full">
              Backend
            </p>
            <p className="py-3 text-sm px-6 border border-[var(--android-primary-color)] rounded-full">
              Firebase
            </p>
            <p className="py-3 text-sm px-6 border border-[var(--android-primary-color)] rounded-full">
              Flutter
            </p>
            <p className="py-3 text-sm px-6 border border-[var(--android-primary-color)] rounded-full">
              Frontend
            </p>
            <p className="py-3 text-sm px-6 border border-[var(--android-primary-color)] rounded-full">
              Vertex AI
            </p>
          </div>
          <Link
            href="/courses"
            className="border-2 border-[#073042] bg-[var(--android-primary-color)] py-2 px-6 rounded-full font-medium text-white"
          >
            Enroll Now
          </Link>
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
            Here&apos;s what our campers had to say
          </h3>
          <p className="text-sm max-w-[32ch] mt-2">
            Our campers are the best part of the camp, they are the ones making
            the camp a better place to learn and grow. Here&apos;s what they had
            to say about their experience at the Ekalavya Camp.
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
                0: {
                  spaceBetween: 20,
                  slidesPerView: 1,
                },
                768: {
                  spaceBetween: 20,
                  slidesPerView: 3,
                },
                1024: {
                  centeredSlidesBounds: false,
                  centeredSlides: false,
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
              }}
            >
              {[
                {
                  name: "Nilanjana",
                  designation: "SWE Intern",
                  pronoun: "she/her",
                  image: "camp-leader-female.png",
                  content: `Ekalavya helped me to become serious about my coding skills, it made me realise how far behind I am, and the networking helped me practice my dsa and plan out my projects. You have also networked with us and guided us on projects`,
                },
                {
                  name: "Gautam",
                  designation: "SWE Intern",
                  pronoun: "he/him",
                  image: "camp-leader.png",
                  content: `Unlike passive video lectures, Ekalavya made me think. Solving problems together, peer reviews, and community sprints pushed me to actually learn, not just complete tasks.`,
                },
                {
                  name: "Kimish Choudhary",
                  designation: "Frontend Intern",
                  pronoun: "she/her",
                  image: "camp-leader-female.png",
                  content: `I never thought learning could be this collaborative. Ekalavya’s peer-driven sessions gave me the confidence to speak up, ask questions, and actually enjoy studying. It’s not just a platform—it’s a movement.`,
                },
                {
                  name: "Vijay Kagupati",
                  designation: "VP, E-Club GITAM",
                  pronoun: "her/him",
                  image: "camp-leader.png",
                  content: `It is a great community for developers of all kinds! It has been my go-to place for random chats, sharing stuff about all things computer science. The people here are extremely fun and knowledgeable which made the experience all the much better!`,
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
            <a href="mailto:ekalavya@theananta.in">ekalavya@theananta.in</a>
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
            <span className="text-white font text-sm md:text-base max-w-[32ch]">
              <b>The Ananta Studio</b>, Uma Sivam Residency, T.P.T Colony,
              Seethammadhara, Visakhpatnam, Andhra Pradesh - 530013
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

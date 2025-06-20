/*eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable @typescript-eslint/no-unused-vars */
/*eslint-disable react-hooks/rules-of-hooks */
"use client";
import composeCourse from "@/data/android-basics-with-compose.json";
import webCourse from "@/data/full-stack-basics.json";
import firebaseCourse from "@/data/firebase_get_cloud_ready.json";
import genkitCourse from "@/data/machine-learning-genai.json";
import flutterCourse from "@/data/flutter-basics-with-dart.json";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/LoadingAnimation/page";
import SignInButton from "@/components/sign_in_button";
import { useAuthContext } from "@/context/AuthContext";
import MockApiProvider from "@/lib/api_hoster";

export default function CoursePage() {
  const apiHost = "http://127.0.0.1:5001/ekalavya-theananta/asia-south1/api";
  const courseId = useParams()["course-id"];

  const user = useAuthContext();
  const [isEnrolled, setIsEnrolled] = useState(false);
  useEffect(() => {
    if (user) {
      user?.getIdTokenResult().then((token) => {
        setIsEnrolled(
          (token.claims.courses as string[]).includes(courseId as string)
        );
      });
    }
  }, [user]);

  const [eventData, setGetCourse] = useState<any>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [expandedStates, setExpandedStates] = useState<{
    [key: string]: boolean;
  }>({});
  useEffect(() => {
    async function fetchCourse() {
      try {
        const data = await MockApiProvider.fetchCourseById(
          courseId?.toString() || ""
        );
        console.log("Course data fetched successfully:", data);
        setGetCourse(data);

        setExpandedStates(
          (data.courseOutline || []).reduce(
            (acc: { [key: string]: boolean }, item: any, index: number) => {
              acc[`week-${index + 1}`] = false; // Initialize all weeks as collapsed
              item.pathways.forEach((pathway: any, pathwayIndex: number) => {
                acc[`week-${index + 1}-pathway-${pathwayIndex + 1}`] = false; // Initialize all pathways as collapsed
              });
              return acc;
            },
            {}
          )
        ); // Reset expanded states when loading is complete
      } catch (error) {
        console.error("Error fetching course data:", error);
        alert("Error fetching course data. Please try again later.");
      } finally {
        setLoadingCourse(false);
      }
    }
    fetchCourse();
  }, [courseId, apiHost]);
  return (
    <div className="px-6 md:px-12 py-6">
      <nav className="p-4 flex justify-between">
        <div className="flex gap-4 items-center flex-row-reverse w-max">
          <span className="material-symbols-outlined !text-2xl">menu</span>
          <SignInButton />
        </div>
        <div className="flex items-center">
          <Link href="/" className="absolute right-40">
            <img src="/badge.png" className="h-16" />
          </Link>
          <img src="/theananta.png" className="h-8 mr-3" />
        </div>
      </nav>
      <main className="mt-2 md:px-4 gap-8 relative flex flex-col md:flex-row grow items-start overflow-hidden">
        {!loadingCourse && eventData ? (
          <>
            <div className="md:w-[60%] w-full md:aspect-[3.6] shrink-0">
              <img
                className="aspect-[2.4] md:aspect-auto object-cover rounded-2xl w-full h-full object-bottom"
                src={eventData.coverImage}
              />
              <div className="flex items-end">
                <div className="grow">
                  <h1 className="mt-8 text-5xl font-bold whitespace-pre-wrap leading-[150%]">
                    {eventData.courseName}
                  </h1>
                  <h3 className="mt-2 text-xl max-w-[42ch] font-medium">
                    {eventData.courseSubtitle}
                  </h3>
                  <p
                    className="max-w-[48ch] mt-4"
                    dangerouslySetInnerHTML={{
                      __html: eventData.courseDescription,
                    }}
                  ></p>
                </div>
                {!isEnrolled ? (
                  <Link
                    href={"/checkout?courseId=" + courseId}
                    className="border-2 border-[var(--android-primary-color)] hover:bg-[var(--android-primary-color)] hover:text-white text-[var(--android-primary-color)] py-2 px-6 rounded-full font-medium"
                  >
                    Enroll Now
                  </Link>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="text-end mb-28">
                      <p className="text-5xl  text-[var(--android-primary-color)]">
                        0%
                      </p>
                      <p className="text-sm opacity-60">completed</p>
                    </div>
                    <div className="grow" />
                    <Link
                      href={`/course/${courseId}/${eventData.courseOutline[0].unitId}`}
                      className="flex text-sm gap-2 items-center border-2 hover:bg-[var(--android-primary-color)] hover:text-white border-[var(--android-primary-color)] px-4 text-[var(--android-primary-color)] py-2 rounded-full font-bold"
                    >
                      Resume{" "}
                      <span className="material-symbols-outlined !font-bold !text-[16px]">
                        arrow_forward
                      </span>
                    </Link>
                  </div>
                )}
              </div>
              <p className="mt-4 font-medium text-xl">Course Outline</p>
              <div className="gap-x-8 gap-y-4 mt-4">
                {eventData.courseOutline.map((item: any, weekindex: number) => {
                  return (
                    <div key={weekindex}>
                      <div className="ml-8 my-8">
                        <a href={`/course/${courseId}/${item.unitId}`}>
                          <h4 className="text-xl font-semibold hover:text-[#3ddc84]">
                            Unit {weekindex + 1}: {item.unitName}
                          </h4>
                        </a>
                        <p className="opacity-50">
                          {item.pathways.length} pathways | Duration:{" "}
                          {item.pathways.reduce(
                            (acc: number, curr: any) =>
                              acc + Math.ceil(curr.pathwayDuration / 60),
                            0
                          )}{" "}
                          hours
                        </p>
                      </div>
                      <ul className="bg-blue-50 w-full my-4 rounded-2xl border-stone-200 border">
                        {item.pathways.map((pathway: any, index: number) => {
                          // const [isExpanded, setExpand] = useState(false);
                          return (
                            <div key={index} className="p-6 w-full">
                              <div
                                onClick={() => {
                                  // setExpand(!isExpanded);
                                  setExpandedStates((prev) => ({
                                    ...prev,
                                    [`week-${index + 1}-pathway-${index + 1}`]:
                                      !prev[
                                        `week-${index + 1}-pathway-${index + 1}`
                                      ],
                                  }));
                                }}
                                className={`flex gap-4 items-center cursor-pointer ${
                                  expandedStates[
                                    `week-${index + 1}-pathway-${index + 1}`
                                  ]
                                    ? "border-b pb-6"
                                    : ""
                                }  border-stone-200`}
                              >
                                <img
                                  className="size-24"
                                  src={pathway.pathwayBadge}
                                />
                                <div>
                                  <a
                                    href={`/course/${courseId}/${item.unitId}/${pathway.pathwayId}`}
                                  >
                                    <p
                                      key={index}
                                      className="text-xl font-medium hover:text-[#3ddc84]"
                                    >
                                      {pathway.pathwayName}
                                    </p>
                                  </a>
                                  <p>
                                    Pathway {index + 1} | Duration:{" "}
                                    {Math.ceil(pathway.pathwayDuration / 60)}{" "}
                                    hours
                                  </p>
                                </div>
                                <p className="material-symbols-outlined ml-auto mr-4">
                                  {expandedStates[
                                    `week-${index + 1}-pathway-${index + 1}`
                                  ]
                                    ? "keyboard_arrow_up"
                                    : "keyboard_arrow_down"}
                                </p>
                              </div>
                              {expandedStates[
                                `week-${index + 1}-pathway-${index + 1}`
                              ] && (
                                <ul className="list-inside ml-8 mt-8">
                                  {pathway.resources.map(
                                    (contentJSON: object, index: number) => {
                                      const content = {
                                        title: Object.entries(contentJSON)
                                          ?.find(([k, v]) =>
                                            k.includes("Name")
                                          )?.[1]
                                          .toString(),
                                        type: Object.entries(contentJSON)
                                          ?.find(([k, v]) =>
                                            k.includes("Id")
                                          )?.[1]
                                          .toString()
                                          .split("-")[0],
                                      };
                                      return (
                                        <li
                                          key={index}
                                          className="flex gap-4 items-center my-4"
                                        >
                                          <span className="material-symbols-outlined">
                                            {content.type === "video"
                                              ? "video_library"
                                              : content.type === "article"
                                              ? "subject"
                                              : content.type === "quiz"
                                              ? "quiz"
                                              : content.type === "assignment"
                                              ? "assignment"
                                              : content.type === "project"
                                              ? "code"
                                              : content.type === "discussion"
                                              ? "forum"
                                              : content.type === "assessment"
                                              ? "assessment"
                                              : content.type === "codelab"
                                              ? "code"
                                              : content.type === "webinar"
                                              ? "live_tv"
                                              : content.type === "event"
                                              ? "event_note"
                                              : ""}
                                          </span>
                                          <div>
                                            <p className="font-medium">
                                              {content.title}
                                            </p>
                                            <p className="opacity-60 text-sm">
                                              {content.type
                                                .split("")[0]
                                                .toUpperCase() +
                                                content.type.slice(1)}
                                            </p>
                                          </div>
                                        </li>
                                      );
                                    }
                                  )}
                                </ul>
                              )}
                            </div>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grow">
              <div
                className={`rounded-2xl -translate-y-[1px] relative z-5 p-[32px] md:px-[64px] md:pb-[72px] md:pt-[56px]`}
                style={{
                  backgroundColor:
                    (eventData as any).campLeaderCardColor ??
                    "var(--android-primary-color)",
                  color: (eventData as any).campLeaderCardTextColor ?? "#FFF",
                }}
              >
                <h3 className="text-2xl font-medium">
                  Camp Leader{eventData.campLeaders.length > 1 ? "s" : ""}
                </h3>
                {eventData.campLeaders.map((leader: any, index: number) => {
                  return (
                    <>
                      <div className="shrink-0 flex items-center gap-8">
                        <img src={leader.image} className="w-32 h-32 mt-10" />
                        <div>
                          <h4 className="text-xl font-semibold mt-6">
                            {leader.name}
                          </h4>
                          <p className="font-medium text-lg">
                            {leader.communityTitle}
                          </p>
                          <p className="">{leader.designation}</p>
                        </div>
                      </div>
                      <div className="flex md:justify-between flex-col md:flex-row">
                        <div>
                          <p
                            className="max-w-[400px] mt-4"
                            dangerouslySetInnerHTML={{
                              __html: leader.bio[0],
                            }}
                          ></p>
                        </div>
                        <div>
                          <p
                            className="max-w-[400px] mt-4"
                            dangerouslySetInnerHTML={{
                              __html: leader.bio[1],
                            }}
                          ></p>
                        </div>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: leader.bio[2],
                        }}
                      ></p>
                      {eventData.campLeaders.length > 0 &&
                        index + 1 != eventData.campLeaders.length && (
                          <div className="w-full h-[1.5px] mt-6 bg-black/12"></div>
                        )}
                    </>
                  );
                })}
              </div>
              <div
                className=" -translate-y-[1px] relative z-5 p-[32px] md:px-[64px] md:py-[56px] rounded-2xl mt-4"
                style={{
                  backgroundColor:
                    (eventData as any).benefitsCardColor ?? "#4285f4",
                  color: (eventData as any).benefitsCardTextColor ?? "#FFF",
                }}
              >
                <h3 className="font-medium text-4xl mb-8">Benefits</h3>

                <div className="flex gap-y-4 md:gap-y-[unset] gap-x-8 flex-col">
                  <p
                    className="max-w-[480px] mb-8"
                    dangerouslySetInnerHTML={{
                      __html: eventData.benefits.text,
                    }}
                  ></p>
                  <div className="grid md:grid-cols-2 gap-y-4 max-w-[640px] benefits gap-x-4">
                    {eventData.benefits.list.map((item: any, index: number) => {
                      return (
                        <div key={index} className="benefits-box">
                          <h4>{item.title}</h4>
                          <p>{item.content}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col place-items-center place-content-center h-[80vh] m-0 w-full">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
}

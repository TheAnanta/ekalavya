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

export default function CoursePage() {
  const apiHost = "http://127.0.0.1:5001/ekalavya-theananta/asia-south1/api";
  const courseId = useParams()["course-id"];
  if (
    courseId !== "android-basics-compose" &&
    courseId !== "full-stack-basics" &&
    courseId !== "firebase-get-cloud-ready" &&
    courseId !== "machine-learning-genai" &&
    courseId !== "flutter-basics-dart"
  ) {
    return <div>Invalid course ID</div>;
  }

  const [getCourse, setGetCourse] = useState<any>(null);
  const eventData = getCourse?.data;
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [expandedStates, setExpandedStates] = useState<{
    [key: string]: boolean;
  }>({});
  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await fetch(`${apiHost}/fetch-course/${courseId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Course data fetched successfully:", data);
          setGetCourse(data);

          setExpandedStates(
            (data.data.courseOutline || []).reduce(
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
        } else {
          console.error("Failed to fetch course data");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
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
        <Link href="/">
          <img src="/theananta.png" className="h-8 mr-3" />
        </Link>
      </nav>
      <main className="mt-2 md:px-4 gap-8 relative flex flex-col md:flex-row grow items-start overflow-hidden">
        {!loadingCourse && getCourse ? (
          <>
            <div className="md:w-[60%] w-full md:aspect-[3.6] shrink-0">
              <img
                className="aspect-[2.4] md:aspect-auto object-cover rounded-2xl w-full h-full object-bottom"
                src={eventData.coverImage}
              />
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
              <p className="mt-4 font-medium text-xl">Course Outline</p>
              <div className="gap-x-8 gap-y-4 mt-4">
                {eventData.courseOutline.map((item: any, weekindex: number) => {
                  return (
                    <div key={weekindex}>
                      <div className="ml-8 my-8">
                        <a href={`/course/${courseId}/week-${weekindex + 1}`}>
                          <h4 className="text-xl font-semibold hover:text-[#3ddc84]">
                            Week {weekindex + 1}: {item.unitName}
                          </h4>
                        </a>
                        <p className="opacity-50">
                          {item.pathways.length} pathways | Duration: 10 hours
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
                                className={`flex gap-4 items-center cursor-pointer ${expandedStates[
                                  `week-${index + 1}-pathway-${index + 1}`
                                ]
                                  ? "border-b pb-6"
                                  : ""
                                  }  border-stone-200`}
                              >
                                <img className="size-24" src={pathway.badge} />
                                <div>
                                  <a
                                    href={`/course/${courseId}/week-${index + 1
                                      }/pathway-${index + 1}`}
                                  >
                                    <p
                                      key={index}
                                      className="text-xl font-medium hover:text-[#3ddc84]"
                                    >
                                      {pathway.pathwayName}
                                    </p>
                                  </a>
                                  <p>Pathway {index + 1} | Duration: 3 hours</p>
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
                                      (content: any, index: number) => {
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
                                                            : content.type === "Codelab"
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
                                                {content.type}
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
                      __html: eventData.benefitsText,
                    }}
                  ></p>
                  <div className="grid md:grid-cols-2 gap-y-4 max-w-[640px] benefits gap-x-4">
                    {eventData.benefitItems.map((item: any, index: number) => {
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
          <div className="flex flex-col place-items-center place-content-center h-[80vh] m-0">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
}

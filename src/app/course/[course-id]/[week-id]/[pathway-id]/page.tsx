/*eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable @typescript-eslint/no-unused-vars */
/*eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SignInButton from "@/components/sign_in_button";
import Link from "next/link";

export default function PathwaysLayoutPage() {
  const apiHost =
    "https://asia-south1-ekalavya-theananta.cloudfunctions.net/api";
  const courseId = useParams()["course-id"];
  const weekId = useParams()["week-id"];
  const pathwayId = useParams()["pathway-id"];
  const [progressData, setProgressData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   async function fetchProgress() {
  //     try {
  //       const response = await fetch(
  //         `${apiHost}/${courseId}/${weekId}/${pathwayId}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch progress data");
  //       }
  //       const data = await response.json();
  //       setProgressData(data);
  //     } catch (error) {
  //       console.error("Error fetching progress data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchProgress();
  // }, [apiHost, courseId, weekId, pathwayId]);

  const [courseData, setCourseData] = useState<any>(null);

  useEffect(() => {
    async function fetchUnit() {
      try {
        const response = await fetch(
          `${apiHost}/fetch-pathway/${courseId}/${weekId}/${pathwayId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch unit data");
        }
        const data = await response.json();
        setCourseData(data.data);
        console.log("Pathway data fetched successfully:", courseData);
      } catch (error) {
        console.error("Error fetching unit data:", error);
      }
    }
    if (courseId && weekId) {
      fetchUnit();
    }
  }, [courseId, weekId, apiHost]);
  const pathwayData = courseData?.pathway;
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  return (
    <div className="mx-auto">
      <nav className="py-6 px-12 bg-black text-white">
        <div className="max-w-[1260px] mx-auto flex justify-between">
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
        </div>
      </nav>
      {pathwayData && (
        <section className="pb-16 min-h-screen">
          <div className="bg-black w-full py-14 text-white">
            <div className="max-w-[1260px] mx-auto flex flex-row-reverse items-center justify-between">
              <img
                alt=""
                className="w-48"
                src="https://developer.android.com/static/courses/android-basics-compose/images/hero-assets/unit-logo.svg"
              />
              <div className="w-1/2 max-w-[468px]">
                <p className="flex items-center mb-4 uppercase font-semibold tracking-[0.8px]">
                  <a
                    href={`/course/${courseId}`}
                    className="shrink-0 hover:opacity-70 duration-300"
                  >
                    {courseData.courseName}
                  </a>{" "}
                  <span className="material-symbols-outlined mx-2 hover:opacity-70 duration-300 cursor-default">
                    chevron_right
                  </span>
                  <a
                    href={`/course/${courseId}/${weekId}`}
                    className="shrink-0 hover:opacity-70 duration-300"
                  >
                    {courseData.unitName}
                  </a>
                  <span className="material-symbols-outlined mx-2 hover:opacity-70 duration-300 cursor-default">
                    chevron_right
                  </span>
                  <a href="" className="shrink-0 hover:opacity-70 duration-300">
                    {(pathwayData as any).navigationTitle ||
                      (pathwayId as string).split("-").join(" ")}
                  </a>
                </p>
                <h3 className="text-4xl font-bold mt-3 mb-4">
                  {pathwayData.pathwayName}
                </h3>
                <p className="material-symbols-outlined p-2 pr-1 border border-white/50 hover:bg-[#DBDBE1]/24 hover:border-transparent cursor-pointer active:scale-95 duration-300 rounded-lg mb-4">
                  bookmark
                  <span className="material-symbols-outlined">
                    arrow_drop_down
                  </span>
                </p>
                <p>{(pathwayData as any).pathwayDescription || ""}</p>
                <p className="text-sm font-semibold mt-4">
                  {
                    pathwayData.resources.filter(
                      (resource: any) => resource.type !== "quiz"
                    ).length
                  }{" "}
                  activities •{" "}
                  {
                    pathwayData.resources.filter(
                      (resource: any) => resource.type === "quiz"
                    ).length
                  }{" "}
                  quiz
                </p>
              </div>
            </div>
          </div>
          <div className=" mx-auto">
            {pathwayData.resources.map((resource: any, index: number) => {
              return resource.type != "Quiz" ? (
                <div
                  className={`p-7 relative`}
                  style={
                    activeStep === index
                      ? {
                          background:
                            "#f1f3f4 url(https://www.gstatic.com/devrel-devsite/prod/v6dc4611c4232bd02b2b914c4948f523846f90835f230654af18f87f75fe9f73c/android/images/playlist_active.svg) repeat-x top",
                        }
                      : {}
                  }
                >
                  {/* #f1f3f4 url(../images/playlist_active.svg) repeat-x top */}
                  <div className={`max-w-[1260px] mx-auto`}>
                    <div
                      className={`pb-4 ${
                        activeStep === index ? "bg-[#F5F5F7]" : ""
                      }`}
                    >
                      <div
                        className="flex gap-4 items-center w-full cursor-pointer devsite-playlist--item-top"
                        onClick={() =>
                          index == activeStep
                            ? setActiveStep(-1)
                            : setActiveStep(index)
                        }
                      >
                        <div
                          className={`relative size-[30px] text-white rounded-full flex items-center justify-center z-10`}
                          style={{
                            background: completedSteps.includes(index)
                              ? "#0d652d"
                              : activeStep === index
                              ? "rgb(63, 81, 181)"
                              : "#000",
                          }}
                        >
                          {completedSteps.includes(index) ? (
                            <span className="material-symbols-outlined !font-semibold text-white">
                              check
                            </span>
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        <p className="text-3xl font-semibold">
                          {resource.title}
                        </p>
                        <div
                          className={`ml-auto size-[30px] duration-300 hover:bg-black hover:text-white border-black ${
                            activeStep === index ? "bg-black text-white" : ""
                          } border-2 rounded-full flex items-center justify-center`}
                          style={{
                            boxShadow:
                              "0 1px 2px 0 rgba(60,64,67,.3),0 2px 6px 2px rgba(60,64,67,.15)",
                          }}
                        >
                          <p className="material-symbols-outlined font-bold">
                            {activeStep === index
                              ? "keyboard_arrow_up"
                              : "keyboard_arrow_down"}
                          </p>
                        </div>
                      </div>
                      <p className="ml-12 my-1 text-[#5f6368] text-sm flex items-center">
                        <span className="material-symbols-outlined !text-sm mr-2">
                          {resource.type === "video"
                            ? "ondemand_video"
                            : resource.type === "article"
                            ? "subject"
                            : resource.type === "quiz"
                            ? "quiz"
                            : resource.type === "assignment"
                            ? "assignment"
                            : resource.type === "project"
                            ? "code"
                            : resource.type === "discussion"
                            ? "forum"
                            : resource.type === "assessment"
                            ? "assessment"
                            : resource.type === "codelab"
                            ? "emoji_objects"
                            : resource.type === "webinar"
                            ? "live_tv"
                            : resource.type === "event"
                            ? "event_note"
                            : ""}
                        </span>
                        {resource.type.split("")[0].toUpperCase() +
                          resource.type.slice(1).toLowerCase()}
                      </p>
                    </div>
                    {activeStep === index && (
                      <div className="ml-12 mb-8">
                        {resource.type == "video" && (
                          <iframe
                            width="740"
                            height="420"
                            className="mb-3"
                            src={resource.link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                        )}
                        <p>{(resource as any).description || ""}</p>
                        {resource.type != "video" ? (
                          <a
                            href={resource.link}
                            onClick={() => {
                              // setCompletedSteps((prev) =>
                              //   prev.includes(index) ? prev : [...prev, index]
                              // );
                              // setActiveStep(index + 1);
                            }}
                            className="w-max cursor-pointer ml-auto hover:bg-[#dadce0] hover:text-black duration-300 bg-black text-white py-3 px-6 rounded-full flex items-center justify-center font-medium"
                          >
                            Take {resource.type.toLowerCase()}
                          </a>
                        ) : (
                          <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 mt-4 w-full">
                            <button
                              onClick={() => {
                                setCompletedSteps((prev) =>
                                  prev.includes(index) ? prev : [...prev, index]
                                );
                                setActiveStep(index + 1);
                              }}
                              className="w-max cursor-pointer ml-auto hover:bg-black hover:text-white border-black duration-300 border-2 py-3 px-8 rounded-full font-medium"
                            >
                              Next
                            </button>
                            <button
                              onClick={() => {
                                setCompletedSteps((prev) =>
                                  prev.includes(index) ? prev : [...prev, index]
                                );
                                setActiveStep(index + 1);
                              }}
                              className="w-max cursor-pointer hover:bg-black hover:text-white border-black duration-300 border-2 py-3 px-8 rounded-full font-medium"
                            >
                              Skip
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-7 bg-white border border-gray-300 max-w-[1260px] mx-auto rounded-md z-10 relative">
                  <div className="max-w-[1260px] mx-auto">
                    <div className="flex flex-col gap-4 w-full">
                      <p className="text-3xl font-semibold">{resource.title}</p>
                      <p>{(resource as any).description || ""}</p>
                      <button
                        onClick={() => {
                          setCompletedSteps((prev) =>
                            prev.includes(index) ? prev : [...prev, index]
                          );
                          setActiveStep(index + 1);
                        }}
                        className="ml-auto bg-black cursor-pointer duration-300 hover:bg-[#dadce0] hover:text-black text-white py-3 px-6 rounded-full flex items-center justify-center font-medium"
                      >
                        Take the quiz
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

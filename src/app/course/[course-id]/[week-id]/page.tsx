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
import SignInButton from "@/components/sign_in_button";

export default function UnitLayoutPage() {
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
  const eventData =
    courseId === "android-basics-compose"
      ? composeCourse
      : courseId === "full-stack-basics"
      ? webCourse
      : courseId === "firebase-get-cloud-ready"
      ? firebaseCourse
      : courseId === "machine-learning-genai"
      ? genkitCourse
      : courseId === "flutter-basics-dart"
      ? flutterCourse
      : composeCourse;
  const weekId = useParams()["week-id"];
  const weekData =
    eventData.courseOutline[
      parseInt((weekId || "week-1").toString().split("-")[1]) - 1
    ];
  return (
    <div className="mx-auto pb-0">
      <nav className="py-6 px-12 bg-black text-white">
        <div className="max-w-[1260px] mx-auto flex justify-between">
          <div className="flex gap-4 items-center flex-row-reverse w-max">
            <span className="material-symbols-outlined !text-2xl">menu</span>

            <SignInButton />
          </div>
          <img
            src="/theananta.png"
            className="h-8 mr-3 invert object-contain"
          />
        </div>
      </nav>
      <section className="bg-stone-100 pb-16 min-h-screen">
        <div className="bg-black w-full py-14 text-white">
          <div className="max-w-[1260px] mx-auto flex flex-row-reverse items-center justify-between">
            <img
              alt=""
              className="size-40"
              src="https://developer.android.com/static/courses/android-basics-compose/images/hero-assets/unit-logo.svg"
            />
            <div>
              <a
                className="text-sm font-medium uppercase tracking-[0.8px]"
                href="https://developer.android.com/courses/android-basics-compose/course"
              >
                {eventData.courseName}
              </a>
              <h3 className="text-3xl font-bold mt-3 mb-4">
                Unit 1: {weekData.title}
              </h3>
              {(weekData as any).description && (
                <p>{(weekData as any).description}</p>
              )}
            </div>
          </div>
        </div>
        <div className="pt-16 max-w-[1260px] mx-auto items-center justify-between grid grid-cols-3 gap-6">
          {weekData.pathways.map((pathway, index) => {
            return (
              <div key={pathway.title} className="p-7 bg-white">
                <p className="text-[11px] bg-stone-100 py-1 px-2 w-max rounded-md font-medium tracking-[0.8px]">
                  PATHWAY {index + 1}
                </p>
                <img
                  src={
                    (pathway as any).badge ||
                    "https://developers.google.com/static/profile/badges/playlists/android/android-basics-compose-unit-1-pathway-1/badge.svg"
                  }
                  className="size-48 mb-8 mx-auto"
                />
                <div className="mb-6">
                  <p className="uppercase font-medium mb-4 text-sm tracking-[0.8px]">
                    {pathway.resources.length - 3}/{pathway.resources.length}{" "}
                    Activities remaining
                  </p>
                  <div className="bg-[#eee] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#3ddc84] h-full rounded-full"
                      style={{
                        width: `${
                          ((pathway.resources.length - 3) /
                            (pathway.resources.length - 1)) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <p className="font-semibold text-3xl mr-8">{pathway.title}</p>
                <p className="my-4">{(pathway as any).description || ""}</p>
                <p className="text-[#666666]">May 2025</p>
                <div className="pt-4 flex">
                  <a
                    href={`/course/${courseId}/${weekId}/pathway-${index + 1}`}
                    className="font-medium py-3 px-6 rounded-full border-2"
                  >
                    Explore
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

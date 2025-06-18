/*eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable @typescript-eslint/no-unused-vars */
/*eslint-disable react-hooks/rules-of-hooks */
"use client";
import composeCourse from "@/data/android-basics-with-compose.json";
import webCourse from "@/data/full-stack-basics.json";
import firebaseCourse from "@/data/firebase_get_cloud_ready.json";
import genkitCourse from "@/data/machine-learning-genai.json";
import flutterCourse from "@/data/flutter-basics-with-dart.json";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import SignInButton from "@/components/sign_in_button";
import { useAuthContext } from "@/context/AuthContext";

export default function UnitLayoutPage() {
  const apiHost = "http://127.0.0.1:5001/ekalavya-theananta/asia-south1/api";
  const courseId = useParams()["course-id"];
  const weekId = useParams()["week-id"];
  if (
    courseId !== "android-basics-compose" &&
    courseId !== "full-stack-basics" &&
    courseId !== "firebase-get-cloud-ready" &&
    courseId !== "machine-learning-genai" &&
    courseId !== "flutter-basics-dart"
  ) {
    return <div>Invalid course ID</div>;
  }
  const [progressData, setProgressData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const user = useAuthContext();
  useEffect(() => {
    user?.getIdToken().then((userIdToken) => {
      console.log(userIdToken);
      async function fetchProgress() {
        try {
          const response = await fetch(
            `${apiHost}/get-user-progress/${courseId}?unitId=${weekId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userIdToken}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch progress data");
          }
          const data = await response.json();
          setProgressData(data);
        } catch (error) {
          console.error("Error fetching progress data:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchProgress();
    });
  }, [courseId, weekId, apiHost, user]);

  const [getUnit, setGetUnit] = useState<any>(null);
  const eventData = getUnit;
  const weekData = eventData?.courseOutline[0] ?? [];
  useEffect(() => {
    async function fetchUnit() {
      try {
        const response = await fetch(
          `${apiHost}/fetch-unit/${courseId}/${weekId}`,
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
        setGetUnit({
          courseName: data.data.courseName,
          courseOutline: [
            {
              title: data.data.unit.unitName,
              description: data.data.unit.unitDescription,
              pathways: data.data.pathways,
            },
          ],
        });
        console.log("Unit data fetched successfully:", getUnit);
      } catch (error) {
        console.error("Error fetching unit data:", error);
      }
    }
    if (courseId && weekId) {
      fetchUnit();
    }
  }, [courseId, weekId, apiHost]);
  return (
    <div className="mx-auto pb-0">
      <nav className="py-6 px-12 bg-black text-white">
        <div className="max-w-[1260px] mx-auto flex justify-between">
          <div className="flex gap-4 items-center flex-row-reverse w-max">
            <span className="material-symbols-outlined !text-2xl">menu</span>

            <SignInButton />
          </div>
          <div className="flex items-center">
            <a href="/" className="absolute right-40">
              <img src="/badge.png" className="h-16" />
            </a>
            <img src="/theananta.png" className="h-8 mr-3" />
          </div>
        </div>
      </nav>
      {eventData != null && (
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
                  href={`/course/${courseId}`}
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
            {weekData.pathways.map((pathway: any, index: number) => {
              return (
                <div key={pathway.title} className="p-7 bg-white">
                  <p className="text-[11px] bg-stone-100 py-1 px-2 w-max rounded-md font-medium tracking-[0.8px]">
                    PATHWAY {index + 1}
                  </p>
                  <img
                    src={
                      (pathway as any).badge ||
                      "https://developers.google.com/static/profile/badges/community/gde/badge.svg"
                    }
                    className="size-48 mb-8 mx-auto"
                  />
                  <div className="mb-6">
                    {(() => {
                      const weekValue = `${weekId}`;
                      const pathwayValue = `pathway-${index + 1}`;
                      const progress =
                        progressData?.[weekValue]?.[pathwayValue]?.progress ??
                        0;

                      return (
                        <>
                          <p className="uppercase font-medium mb-4 text-sm tracking-[0.8px]">
                            {progress}/{pathway.resources.length} Activities
                            remaining
                          </p>
                          <div className="bg-[#eee] h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#3ddc84] h-full rounded-full transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                  <p className="font-semibold text-3xl mr-8">
                    {pathway.pathwayName}
                  </p>
                  <p className="my-4">
                    {(pathway as any).pathwayDescription || ""}
                  </p>
                  <p className="text-[#666666]">June 2025</p>
                  <div className="pt-4 flex">
                    <a
                      href={`/course/${courseId}/${weekId}/${pathway.pathwayId}`}
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
      )}
    </div>
  );
}

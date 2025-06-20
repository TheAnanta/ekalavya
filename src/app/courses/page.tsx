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
import MockApiProvider from "@/lib/api_hoster";

export default function CoursesPage() {
  const [allCourses, setCourses] = useState<any>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await MockApiProvider.fetchAllCourses();
        console.log("Course data fetched successfully:", data);
        setCourses(data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoadingCourse(false);
      }
    }
    fetchCourses();
  });
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
      <main className="mt-2 md:px-4 gap-8 relative flex flex-col items-start overflow-hidden">
        <p className="text-5xl font-bold ml-6 mt-12">Courses</p>
        {!loadingCourse && allCourses ? (
          <div className="grid grid-cols-3 p-6 py-12 pt-6 gap-8 w-full">
            {allCourses.map((course: any) => (
              <div
                key={course.id}
                className="shadow-md border border-gray-300 p-6 rounded-3xl"
              >
                <div className="w-full md:aspect-[3.6] shrink-0">
                  <img
                    className="aspect-[2] object-cover rounded-2xl w-full object-bottom"
                    src={course.coverImage}
                  />
                  <h1 className="mt-4 text-3xl font-bold whitespace-pre-wrap leading-[150%]">
                    {course.courseName}
                  </h1>
                  <div className="mb-4 mt-2 flex flex-wrap gap-2 text-xs font-medium">
                    <p className="py-2 px-6 border rounded-full w-max">
                      Mobile
                    </p>
                    <p className="py-2 px-6 border rounded-full w-max">
                      {course.difficulty}
                    </p>
                  </div>
                  {/* <h3 className="text-lg max-w-[36ch] font-medium">
                    {course.courseSubtitle}
                  </h3> */}
                  <p
                    className="max-w-[48ch]"
                    dangerouslySetInnerHTML={{
                      __html: course.courseDescription,
                    }}
                  ></p>
                  <Link
                    href={"/course/" + course.id}
                    className="flex mt-4 w-max text-[var(--android-primary-color)] font-bold px-4 py-2 items-center gap-2 hover:bg-[var(--android-primary-color)]/20 rounded-full"
                  >
                    Enroll Now{" "}
                    <span className="material-symbols-outlined !text-[20px] !font-bold">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col place-items-center place-content-center h-[80vh] m-0 w-full">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
}

/*eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import SignInButton from "@/components/sign_in_button";
import { useAuthContext } from "@/context/AuthContext";
import MockApiProvider from "@/lib/api_hoster";
import { auth } from "@/lib/firebase";
import moment from "moment";
import Link from "next/link";
import { join } from "path";
import { useEffect, useState } from "react";

function ProfileCard({ userDetails }: { userDetails: any }) {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="w-full md:w-1/3 max-w-[400px]">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>{" "}
      <p className="text-gray-700 mb-12">
        Our mission is to equip our community members with practical skills,
        enabling them to communicate their insights.
      </p>
      {
        /*user &&*/ userDetails && (
          <div className="mt-8 flex flex-col items-center">
            {" "}
            {/* mt-8, flex, flex-col, items-center */}
            <div className="relative ">
              {" "}
              {/* position: relative; */}
              {/* Profile Picture and Upload */}
              <img
                referrerPolicy="no-referrer"
                src={
                  userDetails.photoURL.replaceAll("=s96-c", "") ||
                  "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="Profile Picture"
                className="-translate-y-[16px] size-40 rounded-full object-cover relative z-10 cursor-pointer border border-gray-300" // rounded-full, mb-2, object-cover, relative, z-10, cursor-pointer
              />
            </div>
            <div className="w-full flex flex-col items-center outline-1 outline-[#202023] rounded-3xl p-6 transform -translate-y-20 relative bg-white">
              <div
                className="absolute top-[-106px] w-[180px] h-[180px] rounded-full border border-[#202023] bg-white z-10"
                style={{
                  clipPath: "inset(58% 0px 0px)",
                }}
              />{" "}
              <div className="h-20"></div>{" "}
              <div className="flex items-center gap-2 text-xl">
                <p className="text-gray-900 text-xl">
                  {userDetails.displayName}
                </p>{" "}
              </div>
              {<p className="text-gray-500">{userDetails.email}</p>}
              {userDetails.username && (
                <a
                  href={`https://ekalavya.theananta.in/p/${userDetails.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-3 border border-[#dadce0] text-[#1a73e8] px-3 py-1.5 rounded-full text-sm no-underline hover:bg-gray-50" // display: flex, align-items: center, column-gap: 4px, margin-top: 12px, border: 1px solid #dadce0, color: #1a73e8, padding: 6px 12px, border-radius: 48px, text-decoration:none;
                >
                  ekalavya.theananta.in/p/{userDetails.username}{" "}
                </a>
              )}
              <div className="w-full border-t border-gray-300 my-3 opacity-100"></div>{" "}
              {userDetails && !showEditor && (
                <div className="flex flex-col items-start w-full text-sm text-gray-800">
                  {userDetails.domainsInterested &&
                    userDetails.domainsInterested.length > 0 && (
                      <>
                        <p className="font-semibold mt-2 mb-1">
                          Domains Interested
                        </p>{" "}
                        <div className="flex flex-wrap gap-1">
                          {" "}
                          {userDetails.domainsInterested.map(
                            (domain: any, index: any) => (
                              <span
                                key={index}
                                className="inline-flex items-center rounded-full bg-[#000000]/9 px-3 min-h-8 text-sm m-1"
                              >
                                {" "}
                                {domain}
                              </span>
                            )
                          )}
                        </div>
                      </>
                    )}
                  {/* Stats */}
                  <p className="font-semibold mt-2 mb-1">Stats</p>{" "}
                  <p className="flex items-center gap-1">
                    <span className="material-symbols-outlined !text-[18px]">
                      stars
                    </span>
                    {[].length} • Badges earned
                  </p>{" "}
                </div>
              )}
              {userDetails && (
                <div className="w-full border-t border-gray-300 my-3 opacity-100"></div>
              )}{" "}
              <div className="flex gap-3 mt-3">
                {" "}
                <button
                  onClick={() => {
                    auth.signOut();
                    window.location.href = "/";
                  }}
                  className="cursor-pointer bg-[#1a73e8] text-white border border-[#1a73e8] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700" // background-color: #1a73e8, color: white, border: 1.5px solid #1a73e8, padding: 6px 16px, margin-top: 12px, border-radius: 40px, font-size: 14px
                >
                  Sign Out
                </button>
              </div>
            </div>{" "}
          </div>
        )
      }
    </div>
  );
}

const ProfilePage: React.FC = () => {
  const user = useAuthContext();
  const [userDetails, setUserDetails] = useState<any | null>();
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    user
      ?.getIdTokenResult()
      .then((token) => {
        return {
          courses: token.claims.courses as string[],
          joinedOn: user.metadata.creationTime,
        };
      })
      .then(({ courses, joinedOn }: { courses: string[]; joinedOn: any }) => {
        console.log(joinedOn);

        setUserDetails({
          uid: user?.uid,
          email: user?.email || "",
          displayName: user?.displayName,
          username: user.uid,
          domainsInterested: [
            courses.includes("android-basics-compose") ||
            courses.includes("flutter-basics-dart")
              ? "Mobile"
              : courses.includes("firebase-get-cloud-ready")
              ? "Cloud"
              : courses.includes("full-stack-basics")
              ? "Web"
              : "AI",
          ],
          photoURL: user?.photoURL,
          courses: courses || [],
          joinedOn: joinedOn,
        });
      });
    MockApiProvider.fetchAllCourses().then((courses) => {
      setCourses(courses);
    });
  }, [user]);

  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);

  // Render the main content
  return (
    <div className="mx-auto mt-5 px-12 py-6">
      {" "}
      <nav className="pb-12 flex justify-between px-4">
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
      <div className="flex flex-col md:flex-row gap-20 p-4">
        <ProfileCard userDetails={userDetails} />
        <div className="grow">
          {<h2 className="text-2xl font-bold mb-8">My Courses</h2>}
          <div className="grid grid-cols-3 w-max gap-8">
            {courses.map((course) => {
              return (
                userDetails?.courses.includes(course.id) && (
                  <div className="shrink-0 p-4 rounded-2xl shadow-md bg-white border border-gray-200">
                    <img
                      className="h-32 aspect-[2] rounded-lg mb-4 object-cover"
                      src={course.coverImage}
                    />
                    <p className="text-xl font-semibold max-w-[14ch]">
                      {course.courseName}
                    </p>

                    <p>
                      Started{" "}
                      {moment(
                        userDetails?.joinedOn || user?.metadata.creationTime
                      ).format("MMM YYYY")}
                    </p>

                    <a
                      href={`/course/${course.id}`}
                      className="flex items-center gap-2 w-max font-semibold mt-2"
                      style={{
                        color:
                          course.campLeaderCardColor ||
                          "var(--android-primary-color)",
                      }}
                    >
                      Continue{" "}
                      <span className="material-symbols-outlined !text-sm">
                        arrow_forward
                      </span>
                    </a>
                  </div>
                )
              );
            })}
          </div>
          {/* <div className="my-8 mx-24 h-[1px] bg-black/30" /> */}
          <div>{<h2 className="text-2xl font-bold mt-8 mb-8">Badges</h2>}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

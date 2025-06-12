/*eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import SignInButton from "@/components/sign_in_button";
import { useAuthContext } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import moment from "moment";
import { join } from "path";
import { useEffect, useState } from "react";

function ProfileCard({ userDetails }: { userDetails: any }) {
  const [showEditor, setShowEditor] = useState(false);
  // Function to get Tailwind color class for role chip
  const getRoleChipColor = (role?: string) => {
    switch (role) {
      case "Organizer":
        return "bg-[#ea4335] text-white border-[#ea4335]";
      case "Volunteer":
        return "bg-[#4285f4] text-white border-[#4285f4]";
      case "Speaker":
        return "bg-[#34a853] text-white border-[#34a853]";
      default:
        return "bg-[#f9ab00] text-[#202023] border-[#f9ab00]"; // Attendee or default
    }
  };
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
              {userDetails.company &&
                userDetails.company.designation &&
                userDetails.company.name && (
                  <p className="text-gray-500">{userDetails.email}</p>
                )}
              {userDetails.username && (
                <a
                  href={`https://devfest.vizag.dev/p/${userDetails.username}`}
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
        const data = JSON.parse(
          window.localStorage.getItem("userData") || "{}"
        );
        if (data && Object.keys(data).length > 0) {
          setUserDetails({
            uid: user?.uid || data.uid,
            email: user?.email || "",
            displayName: user?.displayName,
            username: window.localStorage.getItem("username") ?? "john.doe",
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
            courses: courses || data.courses || [],
            joinedOn: joinedOn || data.joinedOn,
          });
        } else {
          setUserDetails({
            uid: user?.uid,
            email: user?.email || "",
            displayName: user?.displayName,
            username: window.localStorage.getItem("username") || "john.doe",
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
            joinedOn: joinedOn || new Date().toISOString(),
          });
        }
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
        <img src="theananta.png" className="h-8 mr-3" />
      </nav>
      <div className="flex flex-col md:flex-row gap-12 p-4">
        <ProfileCard userDetails={userDetails} />
        <div className="grow">
          {<h2 className="text-2xl font-bold mb-8">My Courses</h2>}
          <div className="bg-white p-8 px-12 rounded-xl shadow flex gap-8 overflow-x-scroll no-scrollbar">
            <div className="shrink-0">
              <img
                className="size-32 rounded-full mb-4 bg-[var(--android-primary-color)]/20 object-cover object-top pt-4"
                src="/courses/images/charclaqueta-droid-promo_720.png"
              />
              <p className="text-xl font-semibold max-w-[12ch]">
                Android Basics with Compose
              </p>
              {userDetails?.courses.includes("android-basics-compose") ? (
                <p>
                  Started{" "}
                  {moment(
                    userDetails?.joinedOn || user?.metadata.creationTime
                  ).format("MMM YYYY")}
                </p>
              ) : (
                <p>
                  <br />
                </p>
              )}
              {userDetails?.courses.includes("android-basics-compose") ? (
                <a
                  href={`/course/android-basics-compose`}
                  className="flex items-center gap-2 w-max text-[var(--android-primary-color)] font-semibold mt-2"
                >
                  Continue{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              ) : (
                <a
                  href={`/course/android-basics-compose`}
                  className="flex items-center gap-2 w-max text-[#FBC005] font-semibold mt-2"
                >
                  Join Now{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              )}
            </div>
            <div className="shrink-0">
              <img
                className="size-32 rounded-full mb-4 bg-[#4285f4]/20 object-contain object-top pt-8"
                src="/courses/images/dash-search.png"
              />
              <p className="text-xl font-semibold max-w-[12ch]">
                Flutter Basics with Dart
              </p>
              {userDetails?.courses.includes("flutter-basics-dart") ? (
                <p>
                  Started{" "}
                  {moment(
                    userDetails?.joinedOn || user?.metadata.creationTime
                  ).format("MMM YYYY")}
                </p>
              ) : (
                <p>
                  <br />
                </p>
              )}
              {userDetails?.courses.includes("flutter-basics-dart") ? (
                <a
                  href={`/course/flutter-basics-dart`}
                  className="flex items-center gap-2 w-max text-[var(--android-primary-color)] font-semibold mt-2"
                >
                  Continue{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              ) : (
                <a
                  href={`/course/flutter-basics-dart`}
                  className="flex items-center gap-2 w-max text-[#FBC005] font-semibold mt-2"
                >
                  Join Now{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              )}
              {/* <a className="flex items-center gap-2 w-max text-[#4285F4] font-semibold mt-2">
                View Certificate{" "}
                <span className="material-symbols-outlined !text-sm">
                  arrow_forward
                </span>
              </a> */}
            </div>
            <div className="shrink-0">
              <img
                className="size-32 rounded-full mb-4 bg-[#FBC005]/20 object-cover object-top pt-4"
                src="/courses/images/sparky-shadow.png"
              />
              <p className="text-xl font-semibold max-w-[12ch]">
                Firebase: Get Cloud-Ready
              </p>
              {userDetails?.courses.includes("firebase-get-cloud-ready") ? (
                <p>
                  Started{" "}
                  {moment(
                    userDetails?.joinedOn || user?.metadata.creationTime
                  ).format("MMM YYYY")}
                </p>
              ) : (
                <p>
                  <br />
                </p>
              )}
              {userDetails?.courses.includes("firebase-get-cloud-ready") ? (
                <a
                  href={`/course/firebase-get-cloud-ready`}
                  className="flex items-center gap-2 w-max text-[var(--android-primary-color)] font-semibold mt-2"
                >
                  Continue{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              ) : (
                <a
                  href={`/course/firebase-get-cloud-ready`}
                  className="flex items-center gap-2 w-max text-[#FBC005] font-semibold mt-2"
                >
                  Join Now{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              )}
            </div>
            <div className="shrink-0">
              <img
                className="size-32 rounded-full mb-4 bg-[#ea4335]/20 object-cover object-right pt-4"
                src="https://developers.google.com/static/community/images/gdsc-solution-challenge/timeline-hero.webp"
              />
              <p className="text-xl font-semibold max-w-[10ch]">
                Namasthe Full-Stack
              </p>
              {userDetails?.courses.includes("full-stack-basics") ? (
                <p>
                  Started{" "}
                  {moment(
                    userDetails?.joinedOn || user?.metadata.creationTime
                  ).format("MMM YYYY")}
                </p>
              ) : (
                <p>
                  <br />
                </p>
              )}
              {userDetails?.courses.includes("full-stack-basics") ? (
                <a
                  href={`/course/full-stack-basics`}
                  className="flex items-center gap-2 w-max text-[var(--android-primary-color)] font-semibold mt-2"
                >
                  Continue{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              ) : (
                <a
                  href={`/course/full-stack-basics`}
                  className="flex items-center gap-2 w-max text-[#FBC005] font-semibold mt-2"
                >
                  Join Now{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              )}
            </div>
            <div className="shrink-0">
              <div className="size-32 rounded-full  bg-[#4285F4]/10 object-contain object-bottom flex pb-3 mb-4 overflow-hidden">
                <img
                  className="mt-auto scale-[130%]"
                  src="https://developers.google.com/static/search/images/check-help-community.png?hl=th"
                />
              </div>
              <p className="text-xl font-semibold max-w-[12ch]">
                Building for <br />
                the AI Era
              </p>
              {userDetails?.courses.includes("machine-learning-genai") ? (
                <p>
                  Started{" "}
                  {moment(
                    userDetails?.joinedOn || user?.metadata.creationTime
                  ).format("MMM YYYY")}
                </p>
              ) : (
                <p>
                  <br />
                </p>
              )}
              {userDetails?.courses.includes("machine-learning-genai") ? (
                <a
                  href={`/course/machine-learning-genai`}
                  className="flex items-center gap-2 w-max text-[var(--android-primary-color)] font-semibold mt-2"
                >
                  Continue{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              ) : (
                <a
                  href={`/course/machine-learning-genai`}
                  className="flex items-center gap-2 w-max text-[#FBC005] font-semibold mt-2 cursor-pointer"
                >
                  Join Now{" "}
                  <span className="material-symbols-outlined !text-sm">
                    arrow_forward
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

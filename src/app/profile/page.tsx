"use client";

import { useState } from "react";

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
                  userDetails.photoURL ||
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
                  Manas Malla
                  {/* {user.displayName} */}
                </p>{" "}
                <span
                  className={`text-xs px-3 py-1.5 rounded border ${getRoleChipColor(
                    userDetails.role
                  )}`}
                >
                  {" "}
                  {userDetails.role || "Attendee"}
                </span>
              </div>
              {userDetails.company &&
                userDetails.company.designation &&
                userDetails.company.name && (
                  <p className="mt-2 text-gray-700">
                    {userDetails.company.designation},{" "}
                    {userDetails.company.name}
                  </p>
                )}
              {userDetails.communityTitle && (
                <p className="text-gray-700">{userDetails.communityTitle}</p>
              )}
              {userDetails.username && (
                <a
                  href={`https://devfest.vizag.dev/p/${userDetails.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 mt-3 border border-[#dadce0] text-[#1a73e8] px-3 py-1.5 rounded-full text-sm no-underline hover:bg-gray-50" // display: flex, align-items: center, column-gap: 4px, margin-top: 12px, border: 1px solid #dadce0, color: #1a73e8, padding: 6px 12px, border-radius: 48px, text-decoration:none;
                >
                  devfest.vizag.dev/p/{userDetails.username}{" "}
                </a>
              )}
              <div className="w-full border-t border-gray-300 my-3 opacity-100"></div>{" "}
              {userDetails && !showEditor && (
                <div className="flex flex-col items-start w-full text-sm text-gray-800">
                  {userDetails.speaker && (
                    <>
                      <p className="font-semibold mt-2 mb-1">Talk Title</p>{" "}
                      <p>{userDetails.speaker.talk || "N/a"}</p>
                    </>
                  )}
                  {userDetails.city && userDetails.city !== "" && (
                    <>
                      <p className="font-semibold mt-2 mb-1">City/Town</p>{" "}
                      <p>{userDetails.city}</p>
                    </>
                  )}
                  {userDetails.bio && userDetails.bio !== "" && (
                    <>
                      <p className="font-semibold mt-2 mb-1">Bio</p>{" "}
                      <p>{userDetails.bio}</p>
                    </>
                  )}
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
                                className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 m-1"
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
                  {(userDetails.socials?.length ?? 0) > 0 && (
                    <>
                      <p className="font-semibold mt-2 mb-1">Links</p>{" "}
                      <ul className="list-none p-0 w-full">
                        {" "}
                        {userDetails.socials?.map((item: any, index: any) => (
                          <li
                            key={index}
                            className="flex items-center gap-3 my-2"
                          >
                            <a
                              href={
                                item.provider === "instagram"
                                  ? `https://instagram.com/${item.name}`
                                  : item.provider === "github"
                                  ? `https://github.com/${item.name}`
                                  : item.provider === "linkedin"
                                  ? `https://linkedin.com/in/${item.name}`
                                  : item.name.startsWith("http")
                                  ? item.name
                                  : `https://${item.name}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#202023] no-underline hover:underline"
                            >
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}
              {userDetails && (
                <div className="w-full border-t border-gray-300 my-3 opacity-100"></div>
              )}{" "}
              <div className="flex gap-3 mt-3">
                {" "}
                {userDetails && !showEditor && (
                  <button
                    onClick={() => {}}
                    className="border border-[#202023] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-gray-100" // border: 1.5px solid #202023, padding: 6px 16px, margin-top: 12px, border-radius: 40px, font-size: 14px
                  >
                    Update Profile
                  </button>
                )}
                <button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="bg-[#1a73e8] text-white border border-[#1a73e8] px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-blue-700" // background-color: #1a73e8, color: white, border: 1.5px solid #1a73e8, padding: 6px 16px, margin-top: 12px, border-radius: 40px, font-size: 14px
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
  const [userDetails, setUserDetails] = useState<any | null>({
    uid: "some_firebase_user_id_12345",
    email: "johndoe@example.com",
    displayName: "John Doe",
    username: "john.doe",
    bio: "Full-stack developer with a passion for community building and open source.",
    city: "Visakhapatnam",
    domainsInterested: ["Web", "Cloud", "AI"],
    company: {
      name: "Innovate Solutions",
      designation: "Senior Software Engineer",
    },
    communityTitle: "Lead Volunteer",
    role: "Volunteer",
    photoURL: "https://github.com/ManasMalla.png",
    socials: [
      { provider: "linkedin", name: "in/johndoe", icon: "mdi-linkedin" },
      { provider: "github", name: "johndoe-dev", icon: "mdi-github" },
      { provider: "website", name: "https://johndoe.dev", icon: "mdi-globe" },
    ],
  });

  const [badgeModalOpen, setBadgeModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<any | null>(null);

  // Render the main content
  return (
    <div className="mx-auto mt-5 px-12 py-6">
      {" "}
      <nav className="pb-12 flex justify-between px-4">
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
      {/* <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={mainData.seo.keywords} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={mainData.seo.hostUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="author" content="Manas Malla" />
        <meta name="creator" content="Manas Malla" />
      </Head> */}
      <div className="flex flex-col md:flex-row gap-12 p-4">
        <ProfileCard userDetails={userDetails} />
        <div className="grow">
          {<h2 className="text-2xl font-bold mb-8">My Courses</h2>}
          <div className="bg-white p-8 px-12 rounded-xl shadow flex gap-8 overflow-x-scroll no-scrollbar">
            <div className="shrink-0">
              <img
                className="size-32 rounded-full mb-4 bg-[var(--android-primary-color)]/20 object-cover object-top pt-4"
                src="https://developer.android.com/static/images/home/charclaqueta-droid-promo.png"
              />
              <p className="text-xl font-semibold max-w-[12ch]">
                Android Basics with Compose
              </p>
              <p>Started Oct 2022</p>
              <a className="flex items-center gap-2 w-max text-[var(--android-primary-color)] font-semibold mt-2">
                Continue{" "}
                <span className="material-symbols-outlined !text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="shrink-0">
              <img
                className="size-32 rounded-full mb-4 bg-[#4285f4]/20 object-cover object-top pt-4"
                src="https://public.rive.app/community/video-thumbnails/9201-17527-flutter-dash-watermark.png"
              />
              <p className="text-xl font-semibold max-w-[12ch]">
                Flutter Basics with Dart
              </p>
              <p>Started Dec 2020</p>
              <a className="flex items-center gap-2 w-max text-[#4285F4] font-semibold mt-2">
                View Certificate{" "}
                <span className="material-symbols-outlined !text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="shrink-0">
              <img
                className="size-32 rounded-full mb-4 bg-[#FBC005]/20 object-cover object-top pt-4"
                src="https://improve-your-app-demo.web.app/sparky-shadow.png"
              />
              <p className="text-xl font-semibold max-w-[12ch]">
                Firebase: Get Cloud-Ready
              </p>
              <p>Started Dec 2020</p>
              <a className="flex items-center gap-2 w-max text-[#FBC005] font-semibold mt-2">
                Join Now{" "}
                <span className="material-symbols-outlined !text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="shrink-0">
              <img
                className="size-32 rounded-full mb-4 bg-[#4285F4]/20 object-cover object-right pt-4"
                src="https://developers.google.com/static/community/images/gdsc-solution-challenge/timeline-hero.webp"
              />
              <p className="text-xl font-semibold max-w-[10ch]">
                Namasthe Full-Stack
              </p>
              <p>Started Dec 2020</p>
              <a className="flex items-center gap-2 w-max text-[#FBC005] font-semibold mt-2">
                Join Now{" "}
                <span className="material-symbols-outlined !text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
            <div className="shrink-0">
              <div className="size-32 rounded-full mb-4 bg-[#ea4335]/20 object-contain object-top p-6">
                <img
                  className="mix-blend-luminosity saturate-0"
                  src="https://google.github.io/adk-docs/assets/agent-development-kit.png"
                />
              </div>
              <p className="text-xl font-semibold max-w-[12ch]">
                Building for <br />
                the AI Era
              </p>
              <p>Started Dec 2020</p>
              <a className="flex items-center gap-2 w-max text-[#FBC005] font-semibold mt-2">
                Join Now{" "}
                <span className="material-symbols-outlined !text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

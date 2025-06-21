"use client";
import SignInButton from "@/components/sign_in_button";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WowCampaignPage() {
  const apiHost =
    // "https://asia-south1-ekalavya-theananta.cloudfunctions.net/api";
    "http://127.0.0.1:5001/ekalavya-theananta/asia-south1/api";
  const [leaderboard, setLeaderboard] = useState<
    | {
        username: string;
        displayName: string;
        score: number;
        photoUrl: string;
        position: number;
      }[]
    | null
  >(null);
  const user = useAuthContext();
  useEffect(() => {
    if (user) {
      fetch(`${apiHost}/fetch-leaderboard?uid=${user.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setLeaderboard(data.data);
        })
        .catch((err) => {
          console.error("Failed to fetch leaderboard", err);
        });
    }
  }, [user]);
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
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <section
          id="swags"
          className="bg-repeat  grow w-full"
          style={{
            backgroundImage: "url(/cc-background.svg)",
          }}
        >
          <div className="relative z-5 p-[32px] md:px-[64px] md:py-[56px]">
            <h3 className="text-5xl font-bold mb-4 bg-white w-max">
              The WOW Campaign
            </h3>
            <h4 className="text-3xl font-bold mb-4 bg-white w-max">Swags</h4>
            <div className="flex justify-between max-w-[840px]">
              <div className="max-w-[480px]">
                <p className="text-2xl font-medium mb-2 bg-white w-max">
                  Diamond League
                </p>
                <p>Get a </p>
                <ul className="bg-white list-disc pl-6">
                  <li>Stylish Sunglasses</li>
                  <li>Sticker Set</li>
                  <li>Enamel Pin</li>
                </ul>

                <img
                  src="https://i.imgur.com/XPSXkjl.png"
                  className="h-48 md:hidden"
                />
                <div className="md:h-16" />
                <p className="mt-8 mb-2 text-2xl font-medium bg-white w-max">
                  Gold League
                </p>
                <p>Get a </p>
                <ul className="bg-white list-disc pl-6">
                  <li>free ticket to the GDSC WoW 2025 Hackathon</li>
                  <li>Sticker Pack</li>
                  <li>Enamel Pin</li>
                </ul>
                <img
                  src="https://i.imgur.com/r9g2KmF.jpg"
                  className="h-48 md:hidden"
                />
                <div className="md:h-10" />
                <p className="mt-4 mb-2 text-2xl font-medium bg-white w-max">
                  But there&apos;s one more
                </p>
                <p className="bg-white">
                  To motivate you to learn and build app, join App Submission
                  Challenge!! Enhance your learning experience and gear up with
                  these exclusive prizes!
                  <br />
                  <br />
                  Participate in the GDSC WoW 2025 Hackathon!
                </p>
                <Link
                  href={"https://wow.vizag.dev"}
                  className="bg-[var(--android-primary-color)] text-white py-3 px-6 flex w-max  rounded-full mt-4 font-bold"
                >
                  Register now
                </Link>
                <img
                  src="https://images.tokopedia.net/img/cache/700/OJWluG/2022/6/15/1d389e79-5935-4435-b8bb-bcfd1a95e0f8.jpg"
                  className="h-48 md:hidden"
                />
              </div>
              <div className="hidden md:flex md:flex-col">
                <img
                  src="https://i.imgur.com/XPSXkjl.png"
                  className="h-48 -translate-y-8"
                />
                <img src="https://i.imgur.com/r9g2KmF.jpg" className="h-48" />
                <img
                  src="https://images.tokopedia.net/img/cache/700/OJWluG/2022/6/15/1d389e79-5935-4435-b8bb-bcfd1a95e0f8.jpg"
                  className="h-48"
                />
              </div>
            </div>
          </div>
        </section>
        <div>
          <div className="hidden md:block mt-12 ml-24 w-[460px] shrink-0 border-2 dark:border-gray-700 h-max p-8 rounded-3xl">
            <h3 className="text-center font-bold google-font text-2xl pb-8 border-b-2 dark:border-gray-700">
              Leaderboard
            </h3>
            {!leaderboard ? (
              <div>Loading leaderboard...</div>
            ) : (
              <div className="flex flex-col gap-4 mt-8 cursor-default">
                {leaderboard.map(
                  (item: {
                    username: string;
                    displayName: string;
                    score: number;
                    photoUrl: string;
                    position: number;
                  }) => {
                    return (
                      <>
                        <div
                          className={`flex justify-between items-center py-1.5`}
                        >
                          <div className="flex items-center gap-4">
                            <p className="text-2xl">{item.position}</p>
                            <img
                              src={item.photoUrl}
                              className="size-12 rounded-full ml-6 object-cover"
                            />
                            <div>
                              <p>
                                <b className="google-font text-xl leading-5">
                                  {item.displayName}
                                  <span className="ml-1">
                                    {item.position == 1
                                      ? "🥇"
                                      : item.position === 2
                                      ? "🥈"
                                      : item.position === 3
                                      ? "🥉"
                                      : ""}
                                  </span>
                                </b>
                              </p>
                              <p className="font-bold google-font opacity-60 leading-4">
                                @{item.username}
                              </p>
                            </div>
                          </div>
                          <p className="text-2xl font-mono">{item.score}</p>
                        </div>
                        {item.position === 5 && (
                          <div className="w-full rounded-sm bg-red-100 text-center google-font font-bold my-2 text-red-800 px-4 py-6 flex items-center gap-2 justify-center">
                            <span className="material-symbols-outlined !font-bold">
                              arrow_downward
                            </span>
                            Demotion to the next league{" "}
                            <span className="material-symbols-outlined !font-bold">
                              arrow_downward
                            </span>
                          </div>
                        )}
                      </>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

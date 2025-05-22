export default function UnitLayoutPage() {
  return (
    <div className="mx-auto pb-0">
      <nav className="py-6 px-12 bg-black text-white">
        <div className="max-w-[1260px] mx-auto flex justify-between">
          <div className="flex gap-4 items-center flex-row-reverse w-max">
            <span className="material-symbols-outlined !text-2xl">menu</span>
            <button className="border-2 border-white py-2 px-8 rounded-full font-medium text-sm">
              sign in
            </button>
            {/* {<span className="material-symbols-outlined !text-3xl">
                  account_circle
                </span>} */}
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
                Android Basics with Compose
              </a>
              <h3 className="text-3xl font-bold mt-3 mb-4">
                Unit 1: Your first Android app
              </h3>
              <p>Learn programming basics and create your first Android app.</p>
            </div>
          </div>
        </div>
        <div className="pt-16 max-w-[1260px] mx-auto items-center justify-between grid grid-cols-3 gap-6">
          {[0, 1, 2].map((pathway, index) => {
            return (
              <div className="p-7 bg-white">
                <p className="text-[11px] bg-stone-100 py-1 px-2 w-max rounded-md font-medium tracking-[0.8px]">
                  PATHWAY {index + 1}
                </p>
                <img
                  src="https://developers.google.com/static/profile/badges/playlists/android/android-basics-compose-unit-1-pathway-1/badge.svg"
                  className="size-48 mb-8 mx-auto"
                />
                <div className="mb-6">
                  <p className="uppercase font-medium mb-4 text-sm tracking-[0.8px]">
                    3/6 Activities remaining
                  </p>
                  <div className="bg-[#eee] h-2 rounded-full overflow-hidden">
                    <div className="bg-[#3ddc84] w-1/2 h-full rounded-full"></div>
                  </div>
                </div>
                <p className="font-semibold text-3xl mr-8">
                  Introduction to Kotlin
                </p>
                <p className="my-4">
                  Learn introductory programming concepts in Kotlin to prepare
                  for building Android apps in Kotlin.
                </p>
                <p className="text-[#666666]">April 2022</p>
                <div className="pt-4 flex">
                  <a className="font-medium py-3 px-6 rounded-full border-2">
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

import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="h-screen flex flex-col">
        <div className="bg-black text-white w-full py-2 flex items-center text-sm uppercase">
          <Marquee>
            {[0, 1, 2].map(() => {
              return (
                <>
                  <p className="mx-4">
                    Join the <b>WOW 2025 challenge</b> and bag a chance to win
                    cool swags
                  </p>
                  <button className="py-1 px-4 text-[0.7rem] rounded-full border border-white uppercase font-bold">
                    Participate Now
                  </button>
                </>
              );
            })}
          </Marquee>
        </div>
        <nav className="p-4 flex justify-between">
          <div className="flex gap-4 items-center flex-row-reverse w-max">
            <span className="material-symbols-outlined !text-2xl">menu</span>
            <span className="material-symbols-outlined !text-3xl">
              account_circle
            </span>
          </div>
          <img
            src="https://wow.vizag.dev/images/sponsors/theananta.png"
            className="h-8 mr-3"
          />
        </nav>
        <main className="relative flex flex-col justify-end grow items-center overflow-hidden">
          <img
            src="badge.png"
            className="max-w-[60px] md:max-w-[120px] absolute top-[4%] right-[8%]"
          />

          <img
            src="cloud-left.png"
            className="max-w-[80px] md:max-w-[120px] absolute top-[16%] left-0"
          />
          <img
            src="cloud-right-top.png"
            className="max-w-[90px] md:max-w-[140px] absolute top-[4%] left-[12%]"
          />
          <img
            src="cloud-right-bottom.png"
            className="max-w-[90px] md:max-w-[140px] absolute top-[24%] right-0"
          />
          <h1 className="text-2xl md:text-4xl font-bold !font-[Google_Sans_Display]">
            Lorem Ipsum Dolor Amet
          </h1>
          {/* <h3 className="font-medium text-xl">Lorem ipsum dolor</h3> */}
          <p className="text-sm md:text-base mt-2 mb-4 max-w-[32ch] text-center line-clamp-3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
            tenetur cumque quisquam, laborum magnam quas nisi?
          </p>
          <button className="border-2 border-black py-2 px-6 rounded-full font-medium">
            Register Now
          </button>
          <img
            src="compose-world.png"
            className="mt-12 w-full scale-120 -translate-x-2 -translate-y-2 md:scale-[unset] md:max-w-[800px] md:translate-y-1 object-bottom"
          />
        </main>
      </div>
    </div>
  );
}

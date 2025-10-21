function Hero() {
  const backgroundStyle = {
    backgroundImage: "url('/img/Hero.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      <section className="relative my-12 mx-6 md:mx-12 min-h-[400px]">
        <div className="mx-auto">
          {/* Background Image dengan fallback */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-200"
            style={backgroundStyle}
          />
          {/* Overlay untuk meningkatkan keterbacaan teks */}
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative mx-auto px-7 sm:px-6 lg:px-8 z-10 min-h-[262px] items-center grid pt-5">
            <div className="md:mb-0 flex pt-6 items-center justify-center">
              <div className="text-white text-center max-w-4xl hidden min-[316px]:block">
                <h1 className="text-3xl font-poppins font-bold md:text-5xl text-center mb-4 md:mb-6 tracking-wider">
                  Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform
                  Video Interaktif!
                </h1>
                <p className="text-sm font-DM-sans font-medium md:text-base mb-6 md:mb-8 leading-relaxed px-4 sm:px-0">
                  Temukan ilmu baru yang menarik dan mendalam melalui koleksi
                  video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda
                  juga dapat berpartisipasi dalam latihan interaktif yang akan
                  meningkatkan pemahaman Anda.
                </p>
              </div>
            </div>
            <button className="bg-main-primary cursor-pointer w-full mb-9 md:w-auto md:min-w-40 md:px-6 md:mx-auto font-DM-sans font-normal text-sm p-2 rounded-md md:text-2xl md:mb-6 hidden min-[316px]:block text-white px-4 py-2">
              Temukan Video Course untuk Dipelajari!
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;

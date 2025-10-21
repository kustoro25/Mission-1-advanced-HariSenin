import React from "react";

const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <div className="relative mx-6 md:mx-12 bg-gradient-to-br from-black/60 to-black/60 rounded-2xl min-h-[300px] flex flex-col justify-center items-center p-10 md:p-5 my-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 rounded-2xl bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: 'url("/img/news.jpg")',
        }}
      />

      <div className="w-full max-w-[525px] space-y-7 md:space-y-6 flex flex-col items-center">
        {/* Title Section */}
        <div className="w-full space-y-2.5 flex flex-col items-center">
          <h3 className="font-poppins font-semibold text-white text-2xl md:text-3xl lg:text-4xl text-center leading-tight">
            Mau Belajar Lebih Banyak?
          </h3>
          <p className="font-DM-sans font-normal text-gray-100 text-sm md:text-base text-center leading-relaxed max-w-2xl">
            Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran
            spesial dari program-program terbaik hariesok.id
          </p>
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full space-y-3.5 rounded-lg md:space-y-0 md:flex md:items-center md:bg-white md:rounded-xl md:p-0 md:gap-4"
        >
          <input
            type="email"
            required
            className="w-full px-4 rounded-lg py-3 border-0 focus:outline-none text-center md:text-left bg-white text-sm md:text-base font-dm-sans transition-all duration-300 border-none   flex-1 min-w-0"
            placeholder="Masukkan Emailmu"
          />
          <button
            type="submit"
            className="w-full md:w-auto bg-amber-400 hover:bg-amber-500 text-white font-semibold py-3 px-5 rounded-xl md:rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center text-sm md:text-base whitespace-nowrap min-w-[120px] shadow-md hover:shadow-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;

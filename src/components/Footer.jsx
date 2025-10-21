import { useState } from "react";

function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <>
      <footer className="bg-grey-f9">
        <div className="mx-6 md:mx-12">
          <div className="flex flex-col md:flex-row gap-4 md:gap-16 mb-10">
            <div className="md:w-1/3 space-y-2">
              <img className="w-[152px] h-[42px] " src="img/Logo.png" alt="" />
              <p className="text-sm leading-5 text-text-dark-primary md:font-bold md:text-lg font-bold font-DM-sans ">
                Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
              </p>

              <p className="font-DM-sans  text-text-dark-primary md:font-normal md:text-base font-normal text-sm">
                Jl. Usman Effendi No. 50 Lowokwaru, Malang
              </p>
              <p className="font-DM-sans text-text-dark-primary md:font-normal md:text-base text-sm font-normal">
                +62-877-7123-1234
              </p>
            </div>
            <div className="font-DM-sans flex flex-col md:flex-row w-full md:w-[60%] justify-around text-sm md:text-base">
              {/* Program Section */}
              <div>
                <div className="flex flex-col my-2 md:my-0 md:hidden">
                  <button
                    className="flex justify-between font-bold w-full text-left mb-2"
                    type="button"
                    onClick={() => toggleSection("program")}
                  >
                    Kategori
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      className={`md:hidden transition-transform ${
                        openSection === "program" ? "rotate-90" : ""
                      }`}
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                    </svg>
                  </button>
                </div>
                <div
                  className={`flex-col w-full  ${
                    openSection === "program" ? "flex" : "hidden"
                  } md:flex`}
                >
                  <h2 className="font-bold mb-2 hidden md:block">Kategori</h2>
                  <a
                    href="#"
                    className="my-1 text-text-dark-secondary font-medium "
                  >
                    Digital & Teknologi
                  </a>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Pemasaran
                  </a>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Manajemen Bisnis
                  </a>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Pengembangan Diri
                  </a>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Desain
                  </a>
                </div>
              </div>

              {/* Corporate Section */}
              <div>
                <div className="flex flex-col my-2 md:my-0 md:hidden">
                  <button
                    className="flex justify-between font-bold w-full text-left mb-2"
                    type="button"
                    onClick={() => toggleSection("corporate")}
                  >
                    Perusahaan
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      className={`md:hidden transition-transform ${
                        openSection === "corporate" ? "rotate-90" : ""
                      }`}
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                    </svg>
                  </button>
                </div>
                <div
                  className={`flex-col w-full ${
                    openSection === "corporate" ? "flex" : "hidden"
                  } md:flex`}
                >
                  <h2 className="font-bold mb-2 hidden md:block">Perusahaan</h2>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Tentang Kami
                  </a>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    FAQ
                  </a>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Kebijakan Privasi
                  </a>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Ketentuan Layanan
                  </a>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Bantuan
                  </a>
                </div>
              </div>

              {/* About Section */}
              <div>
                <div className="flex flex-col my-2 md:my-0 md:hidden">
                  <button
                    className="flex justify-between font-bold w-full text-left mb-2"
                    type="button"
                    onClick={() => toggleSection("about")}
                  >
                    Komunitas
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      className={`md:hidden transition-transform ${
                        openSection === "about" ? "rotate-90" : ""
                      }`}
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"></path>
                    </svg>
                  </button>
                </div>
                <div
                  className={`flex-col w-full ${
                    openSection === "about" ? "flex" : "hidden"
                  } md:flex`}
                >
                  <h2 className="font-bold mb-2 hidden md:block">Komunitas</h2>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Tips Sukses
                  </a>
                  <a
                    href="#"
                    className="my-1 font-medium text-text-dark-secondary"
                  >
                    Blog
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <p className="mt-4 text-sm md:text-base order-2 sm:order-1">
              @2023 Gerobak Sayur All Rights Reserved.
            </p>
            <div className="sm-only:hidden order-1 sm:order-2 ">
              <div className="flex gap-2 w-shrink">
                {/* Social media icons */}
                <a
                  href="#"
                  className="sm:wh-8 wh-7.5 border-1 rounded-full p-1 flex justify-center items-center sm-only:text-sm border-grey-ec"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-linkedin-icon lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="sm:wh-8 wh-7.5 border-1 rounded-full p-1 flex justify-center items-center sm-only:text-sm border-grey-ec"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-facebook-icon lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="sm:wh-8 wh-7.5 border-1 rounded-full p-1 flex justify-center items-center sm-only:text-sm border-grey-ec"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-instagram-icon lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                <a
                  href="#"
                  className="sm:wh-8 wh-7.5 border-1 rounded-full p-1 flex justify-center items-center sm-only:text-sm border-grey-ec"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-twitter-icon lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

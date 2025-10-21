import { useState, useEffect } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // PERBAIKAN: Fallback image URLs
  const logoUrl = "img/Logo.png";
  const avatarUrl = "img/Avatar.png";
  const menuIconUrl = "img/Material.png";

  return (
    <>
      <div className="w-full items-center">
        <nav className="flex gap-2 items-center justify-between px-6 py-4 md:px-12">
          <div className="flex justify-between items-center w-[90%] md:pt-0 max-h-[42px] pt-4">
            <div className="w-[152px] h-[42px] md:pt-2">
              {/* PERBAIKAN: Tambahkan fallback alt text */}
              <img
                src={logoUrl}
                alt="Company Logo"
                onError={(e) => {
                  e.target.style.display = "none";
                  console.log("Logo image not found");
                }}
              />
            </div>
            <ul className="lg:flex md:flex hidden font-DM-sans">
              <li>Kategori</li>
            </ul>
          </div>
          <div className="lg:flex md:flex hidden">
            <img
              src={avatarUrl}
              alt="User Avatar"
              onError={(e) => {
                e.target.style.display = "none";
                console.log("Avatar image not found");
              }}
            />
          </div>
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden md:hidden block w-[24px] h-[24px]"
          >
            <img
              src={menuIconUrl}
              alt="Menu"
              onError={(e) => {
                e.target.style.display = "none";
                console.log("Menu icon not found");
              }}
            />
          </button>
        </nav>
        <div
          className={`mobile-menu ${
            isMobileMenuOpen && isMobile ? "block" : "hidden"
          }`}
        >
          <ul className="text-xs font-black gap-1 flex flex-col items-end px-6 font-DM-sans">
            <li className="py-1 cursor-pointer">Kategori</li>
            <li className="py-1 cursor-pointer">
              <img
                src={avatarUrl}
                alt="User Avatar"
                onError={(e) => {
                  e.target.style.display = "none";
                  console.log("Avatar image not found");
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;

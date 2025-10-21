import { useEffect } from "react";
import CourseCard from "./CourseCard";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import Newsletter from "./Newsletter";
import { useCourses } from "../hooks/useCourses";

function MainApp() {
  const { loading, error, clearError } = useCourses();

  useEffect(() => {
    if (error) {
      console.error("Application error:", error);
      const timer = setTimeout(() => {
        clearError();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8 max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            Error Loading Application
          </h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-main-primary mx-auto mb-4"></div>
          <p className="mt-4 text-text-dark-primary text-lg">
            Memuat courses...
          </p>
          <p className="text-text-dark-secondary text-sm">
            Silakan tunggu sebentar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-other-secondary">
      <Navbar />
      <Hero />
      <CourseCard />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default MainApp;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  setActiveCategory,
  clearError,
  setCoursesDirectly,
} from "../store/slices/coursesSlice";

// Fallback data jika API gagal
const fallbackCourses = [
  {
    id: "1",
    title: "Big 4 Auditor Financial Analyst",
    description:
      "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan materi yang komprehensif untuk menjadi financial analyst handal.",
    instructor: {
      name: "Jenna Ortega",
      position: "Senior Accountant",
      avatar: "/images/default-avatar.png",
    },
    image: "/images/default-course.jpg",
    price: 300000,
    rating: 3.5,
    reviewCount: 86,
    category: "Bisnis",
    createdAt: "2024-01-15T10:30:00Z",
  },
];

export const useCourses = () => {
  const dispatch = useDispatch();
  const coursesState = useSelector((state) => state.courses);

  useEffect(() => {
    console.log("🚀 useCourses hook mounted");

    // Jika belum initialized, fetch courses
    if (!coursesState.initialized) {
      console.log("🔄 Fetching courses...");
      dispatch(fetchCourses())
        .unwrap()
        .catch((error) => {
          console.error("❌ Failed to fetch courses, using fallback:", error);
          // Gunakan fallback data jika fetch gagal
          dispatch(setCoursesDirectly(fallbackCourses));
        });
    }
  }, [dispatch, coursesState.initialized]);

  const handleAddCourse = async (courseData) => {
    try {
      const result = await dispatch(addCourse(courseData)).unwrap();
      return true;
    } catch (error) {
      console.error("Failed to add course:", error);
      return false;
    }
  };

  const handleUpdateCourse = async (id, courseData) => {
    try {
      const result = await dispatch(updateCourse({ id, courseData })).unwrap();
      return true;
    } catch (error) {
      console.error("Failed to update course:", error);
      return false;
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await dispatch(deleteCourse(id)).unwrap();
      return true;
    } catch (error) {
      console.error("Failed to delete course:", error);
      return false;
    }
  };

  const handleCategoryChange = (category) => {
    dispatch(setActiveCategory(category));
  };

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    courses: coursesState.items,
    filteredCourses: coursesState.filteredItems,
    categories: coursesState.categories,
    activeCategory: coursesState.activeCategory,
    loading: coursesState.loading && !coursesState.initialized, // Only show loading on initial load
    error: coursesState.error,
    addCourse: handleAddCourse,
    updateCourse: handleUpdateCourse,
    deleteCourse: handleDeleteCourse,
    setActiveCategory: handleCategoryChange,
    clearError: handleClearError,
    refetchCourses: () => dispatch(fetchCourses()),
  };
};

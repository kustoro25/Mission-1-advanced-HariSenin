import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { courseService } from "../../services/api/courseService";

// Async thunks untuk API calls
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, { rejectWithValue }) => {
    try {
      console.log("🔄 Starting fetchCourses thunk...");
      const courses = await courseService.getCourses();
      console.log("📥 Courses received in thunk:", courses);
      return courses;
    } catch (error) {
      console.error("❌ Error in fetchCourses thunk:", error);
      return rejectWithValue(error.message || "Failed to fetch courses");
    }
  }
);

export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (courseData, { rejectWithValue }) => {
    try {
      const newCourse = await courseService.createCourse(courseData);
      return newCourse;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to add course");
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, courseData }, { rejectWithValue }) => {
    try {
      const updatedCourse = await courseService.updateCourse(id, courseData);
      return updatedCourse;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update course");
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id, { rejectWithValue }) => {
    try {
      await courseService.deleteCourse(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete course");
    }
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: [],
    filteredItems: [],
    categories: [
      "Semua Kelas",
      "Bisnis",
      "Pemasaran",
      "Desain",
      "Pengembangan Diri",
    ],
    activeCategory: "Semua Kelas",
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      if (action.payload === "Semua Kelas") {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (course) => course.category === action.payload
        );
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    // Tambahkan reducer untuk set data langsung (fallback)
    setCoursesDirectly: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
      state.loading = false;
      state.initialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        console.log("⏳ Fetch courses pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        console.log("✅ Fetch courses fulfilled:", action.payload);
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
        state.initialized = true;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        console.log("❌ Fetch courses rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
        state.initialized = true;

        // Fallback: set empty array jika fetch gagal
        state.items = [];
        state.filteredItems = [];
      })
      // Add Course
      .addCase(addCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        if (
          state.activeCategory === "Semua Kelas" ||
          action.payload.category === state.activeCategory
        ) {
          state.filteredItems.push(action.payload);
        }
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (course) => course.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
          const filteredIndex = state.filteredItems.findIndex(
            (course) => course.id === action.payload.id
          );
          if (filteredIndex !== -1) {
            state.filteredItems[filteredIndex] = action.payload;
          }
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (course) => course.id !== action.payload
        );
        state.filteredItems = state.filteredItems.filter(
          (course) => course.id !== action.payload
        );
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveCategory, clearError, setCoursesDirectly } =
  coursesSlice.actions;
export default coursesSlice.reducer;

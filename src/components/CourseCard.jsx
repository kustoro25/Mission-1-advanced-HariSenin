import { useState, useEffect } from "react";
import { useCourses } from "../hooks/useCourses";
import { useImageUpload } from "../hooks/useImageUpload";

function CourseCard() {
  const {
    filteredCourses,
    categories,
    activeCategory,
    addCourse,
    updateCourse,
    deleteCourse,
    setActiveCategory,
  } = useCourses();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Custom hooks untuk image upload
  const courseImage = useImageUpload("/images/default-course.jpg");
  const avatarImage = useImageUpload("/images/default-avatar.png");
  const editCourseImage = useImageUpload();
  const editAvatarImage = useImageUpload();

  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: {
      name: "",
      position: "",
    },
    price: 0,
    rating: 0,
    reviewCount: 0,
    category: "Bisnis",
  });

  // Reset form ketika membuka form tambah
  const handleOpenAddForm = () => {
    setNewCourse({
      title: "",
      description: "",
      instructor: {
        name: "",
        position: "",
      },
      price: 0,
      rating: 0,
      reviewCount: 0,
      category: "Bisnis",
    });
    courseImage.resetImage();
    avatarImage.resetImage();
    setShowAddForm(true);
  };

  // Set data course yang akan diedit
  const handleEditCourse = (course) => {
    setEditingCourse({ ...course });
    editCourseImage.setImage(course.image);
    editAvatarImage.setImage(course.instructor.avatar);
  };

  // Handle submit untuk add course
  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const courseToAdd = {
      ...newCourse,
      image: courseImage.image,
      instructor: {
        ...newCourse.instructor,
        avatar: avatarImage.image,
      },
    };

    const success = await addCourse(courseToAdd);
    if (success) {
      setShowAddForm(false);
      courseImage.resetImage();
      avatarImage.resetImage();
    } else {
      alert("❌ Gagal menambahkan course. Silakan coba lagi.");
    }
  };

  // Handle submit untuk update course
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...editingCourse,
      image: editCourseImage.image,
      instructor: {
        ...editingCourse.instructor,
        avatar: editAvatarImage.image,
      },
    };

    const success = await updateCourse(editingCourse.id, updatedData);
    if (success) {
      setEditingCourse(null);
    } else {
      alert("❌ Gagal mengupdate course. Silakan coba lagi.");
    }
  };

  // Handle input change untuk form
  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;

    if (isEditing) {
      if (name.startsWith("instructor.")) {
        const instructorField = name.split(".")[1];
        setEditingCourse((prev) => ({
          ...prev,
          instructor: {
            ...prev.instructor,
            [instructorField]: value,
          },
        }));
      } else {
        setEditingCourse((prev) => ({
          ...prev,
          [name]:
            name === "price" || name === "rating" || name === "reviewCount"
              ? Number(value)
              : value,
        }));
      }
    } else {
      if (name.startsWith("instructor.")) {
        const instructorField = name.split(".")[1];
        setNewCourse((prev) => ({
          ...prev,
          instructor: {
            ...prev.instructor,
            [instructorField]: value,
          },
        }));
      } else {
        setNewCourse((prev) => ({
          ...prev,
          [name]:
            name === "price" || name === "rating" || name === "reviewCount"
              ? Number(value)
              : value,
        }));
      }
    }
  };

  // Render stars untuk rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Format harga ke Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Safe image component dengan error handling
  const SafeImage = ({
    src,
    alt,
    className,
    fallback = "/images/default-course.jpg",
  }) => {
    const [imgSrc, setImgSrc] = useState("");
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setHasError(false);
      setIsLoading(true);

      if (src) {
        setImgSrc(src);
      } else {
        setImgSrc(fallback);
      }
    }, [src, fallback]);

    const handleError = () => {
      if (!hasError) {
        setHasError(true);
        setImgSrc(fallback);
        setIsLoading(false);
      }
    };

    const handleLoad = () => {
      setIsLoading(false);
    };

    return (
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main-primary"></div>
          </div>
        )}
        <img
          src={imgSrc || fallback}
          alt={alt}
          className={`${className} ${
            isLoading ? "opacity-0" : "opacity-100"
          } transition-opacity duration-300`}
          onError={handleError}
          onLoad={handleLoad}
          loading="lazy"
        />
      </div>
    );
  };

  return (
    <>
      <div className="mx-6 md:mx-12">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-poppins font-semibold text-2xl text-text-dark-primary pb-3">
              Koleksi Video Pembelajaran Unggulan
            </h3>
            <p className="font-DM-sans font-medium text-sm text-text-dark-secondary">
              Jelajahi Dunia Pengetahuan Melalui Pilihan Kami! Total:{" "}
              {filteredCourses.length} course
            </p>
          </div>
          <button
            onClick={handleOpenAddForm}
            className="bg-main-primary cursor-pointer text-white px-4 py-2 rounded-lg font-DM-sans hover:bg-green-600 transition-colors"
          >
            + Tambah Course
          </button>
        </div>
      </div>

      {/* Navigation Categories */}
      <nav className="mt-4 mx-6 md:mx-12 pb-3">
        <ul className="flex flex-wrap text-sm md:text-base text-text-dark-secondary font-medium">
          {categories.map((category) => (
            <li
              key={category}
              className={`mr-6 pb-2 pt-2 cursor-pointer ${
                activeCategory === category
                  ? "border-b-2 border-orange-500 text-orange-500 font-semibold"
                  : "hover:text-orange-500"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </nav>

      {/* Add Course Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-poppins font-semibold text-xl mb-4">
              Tambah Course Baru
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* Course Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Course *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newCourse.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  placeholder="Masukkan judul course"
                />
              </div>

              {/* Course Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi *
                </label>
                <textarea
                  name="description"
                  value={newCourse.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  placeholder="Masukkan deskripsi course"
                />
              </div>

              {/* Course Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Gambar Course *
                </label>
                <input
                  type="url"
                  value={courseImage.image}
                  onChange={(e) => courseImage.setImage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  placeholder="/images/default-course.jpg"
                />
                <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border">
                  <SafeImage
                    src={courseImage.image}
                    alt="Course preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Masukkan URL gambar yang valid
                </p>
              </div>

              {/* Instructor Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Instruktur *
                  </label>
                  <input
                    type="text"
                    name="instructor.name"
                    value={newCourse.instructor.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                    placeholder="Nama instruktur"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Posisi Instruktur *
                  </label>
                  <input
                    type="text"
                    name="instructor.position"
                    value={newCourse.instructor.position}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                    placeholder="Posisi instruktur"
                  />
                </div>
              </div>

              {/* Instructor Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Foto Instruktur *
                </label>
                <input
                  type="url"
                  value={avatarImage.image}
                  onChange={(e) => avatarImage.setImage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  placeholder="/images/default-avatar.png"
                />
                <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border">
                  <SafeImage
                    src={avatarImage.image}
                    alt="Instructor avatar"
                    className="w-full h-full object-cover"
                    fallback="/images/default-avatar.png"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Masukkan URL avatar yang valid
                </p>
              </div>

              {/* Price, Rating, Review Count */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Harga (IDR) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newCourse.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (1-5) *
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={newCourse.rating}
                    onChange={handleInputChange}
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jumlah Review *
                  </label>
                  <input
                    type="number"
                    name="reviewCount"
                    value={newCourse.reviewCount}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori *
                </label>
                <select
                  name="category"
                  value={newCourse.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                >
                  {categories
                    .filter((cat) => cat !== "Semua Kelas")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="bg-main-primary cursor-pointer text-white px-6 py-3 rounded-lg flex-1 hover:bg-green-600 transition-colors"
                >
                  ✅ Simpan Course
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 cursor-pointer text-white px-6 py-3 rounded-lg flex-1 hover:bg-gray-600 transition-colors"
                >
                  ❌ Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Course Form */}
      {editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-poppins font-semibold text-xl mb-4">
              Edit Course: {editingCourse.title}
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {/* Course Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul Course *
                </label>
                <input
                  type="text"
                  name="title"
                  value={editingCourse.title}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                />
              </div>

              {/* Course Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi *
                </label>
                <textarea
                  name="description"
                  value={editingCourse.description}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                />
              </div>

              {/* Course Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Gambar Course *
                </label>
                <input
                  type="url"
                  value={editCourseImage.image}
                  onChange={(e) => editCourseImage.setImage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                />
                <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border">
                  <SafeImage
                    src={editCourseImage.image}
                    alt="Course preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Instructor Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Instruktur *
                  </label>
                  <input
                    type="text"
                    name="instructor.name"
                    value={editingCourse.instructor.name}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Posisi Instruktur *
                  </label>
                  <input
                    type="text"
                    name="instructor.position"
                    value={editingCourse.instructor.position}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  />
                </div>
              </div>

              {/* Instructor Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Foto Instruktur *
                </label>
                <input
                  type="url"
                  value={editAvatarImage.image}
                  onChange={(e) => editAvatarImage.setImage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                />
                <div className="mt-2 w-16 h-16 rounded-full overflow-hidden border">
                  <SafeImage
                    src={editAvatarImage.image}
                    alt="Instructor avatar"
                    className="w-full h-full object-cover"
                    fallback="/images/default-avatar.png"
                  />
                </div>
              </div>

              {/* Price, Rating, Review Count */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Harga (IDR) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editingCourse.price}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rating (1-5) *
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={editingCourse.rating}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jumlah Review *
                  </label>
                  <input
                    type="number"
                    name="reviewCount"
                    value={editingCourse.reviewCount}
                    onChange={(e) => handleInputChange(e, true)}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori *
                </label>
                <select
                  name="category"
                  value={editingCourse.category}
                  onChange={(e) => handleInputChange(e, true)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main-primary"
                >
                  {categories
                    .filter((cat) => cat !== "Semua Kelas")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="bg-main-primary cursor-pointer text-white px-6 py-3 rounded-lg flex-1 hover:bg-green-600 transition-colors"
                >
                  ✅ Update Course
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="bg-gray-500 cursor-pointer text-white px-6 py-3 rounded-lg flex-1 hover:bg-gray-600 transition-colors"
                >
                  ❌ Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <div className="grid grid-cols-1 mx-1 md:mx-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <p className="text-text-dark-secondary text-lg">
              Tidak ada course yang tersedia untuk kategori ini.
            </p>
            <button
              onClick={handleOpenAddForm}
              className="bg-main-primary cursor-pointer text-white px-6 py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors"
            >
              + Tambah Course Pertama
            </button>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <CourseItem
              key={course.id}
              course={course}
              onEdit={handleEditCourse}
              onDelete={deleteCourse}
              renderStars={renderStars}
              formatPrice={formatPrice}
              SafeImage={SafeImage}
            />
          ))
        )}
      </div>
    </>
  );
}

// Separate component untuk individual course item
const CourseItem = ({
  course,
  onEdit,
  onDelete,
  renderStars,
  formatPrice,
  SafeImage,
}) => {
  const handleDelete = async () => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus course "${course.title}"?`
      )
    ) {
      await onDelete(course.id);
    }
  };

  return (
    <section className="rounded-lg bg-other-primary w-full h-fit border p-4 border-[#3A35411F] relative hover:shadow-lg transition-shadow duration-300">
      <div className="grid grid-cols-[80px_1fr] gap-3 items-start w-full mb-3 md:grid-cols-1 md:mb-0">
        {/* Course Image */}
        <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 md:w-full md:h-40 md:bg-white md:rounded-xl md:shadow-sm">
          <SafeImage
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Course Content */}
        <div className="flex-1 h-fit">
          <div>
            <h6 className="font-semibold mb-2 text-base md:text-lg font-poppins text-text-dark-primary line-clamp-2">
              {course.title}
            </h6>
            <p className="hidden md:block font-DM-sans font-medium text-sm text-text-dark-secondary line-clamp-2">
              {course.description}
            </p>
          </div>

          {/* Instructor Info */}
          <div className="flex items-center mt-3">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 border flex-shrink-0">
              <SafeImage
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-full h-full object-cover"
                fallback="/images/default-avatar.png"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-DM-sans font-medium text-sm truncate">
                {course.instructor.name}
              </div>
              <div className="font-DM-sans font-normal text-xs text-text-dark-secondary truncate">
                {course.instructor.position}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rating and Price */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center text-sm font-normal gap-2">
          <div className="flex text-lg">{renderStars(course.rating)}</div>
          <span className="text-text-dark-secondary">
            {course.rating.toFixed(1)} ({course.reviewCount})
          </span>
        </div>
        <h5 className="font-poppins font-semibold text-lg md:text-xl text-main-primary">
          {formatPrice(course.price)}
        </h5>
      </div>

      {/* Category Badge */}
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium">
          {course.category}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(course)}
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-medium py-1 px-3 rounded-md transition duration-200 text-sm"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 cursor-pointer hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition duration-200 text-sm"
          >
            🗑️ Hapus
          </button>
        </div>
      </div>
    </section>
  );
};

export default CourseCard;

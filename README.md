Platform pembelajaran video interaktif yang memungkinkan pengguna untuk menjelajahi, menambah, mengedit, dan menghapus course pembelajaran dengan antarmuka yang user-friendly.

## 🛠️ Teknologi yang Digunakan

### Frontend Framework

- **React 19.1.1** - UI Framework
- **React DOM 19.1.1** - DOM rendering

### State Management

- **Redux Toolkit 2.9.1** - State management
- **React Redux 9.2.0** - React bindings untuk Redux

### HTTP Client

- **Axios 1.12.2** - HTTP requests

## 🎯 Komponen Utama

### CourseCard

- Menampilkan grid course dengan filter kategori
- Form tambah dan edit course
- Fitur hapus course dengan konfirmasi
- Rating system dengan bintang
- Format harga dalam Rupiah

### useCourses Hook

- Mengelola state courses dengan Redux
- Handle CRUD operations
- Filtering berdasarkan kategori
- Error handling dan loading states

🌐 API Integration
Project ini menggunakan mockapi.io sebagai backend dengan fallback service lokal:

Endpoints
GET /courses - Mendapatkan semua courses

POST /courses - Menambah course baru

PUT /courses/:id - Mengupdate course

DELETE /courses/:id - Menghapus course

Fallback System
Jika API external tidak tersedia, aplikasi akan menggunakan service lokal dengan data fallback.

Typography
Poppins - Untuk headings

DM Sans - Untuk body text

# MovieDex - Mini Catalog App

**Nama:** Naomi Sabila Imani  
**NIM:** 2410501061  
**Kelas:** D-3 Sistem Informasi A  
**Tema:** B (MovieDex - Katalog Film & Series)

---

## Tech Stack & Versi
- React Native (Expo SDK: [versi dari package.json])
- React Navigation (Stack + Bottom Tabs)
- State Management: Context API + useReducer
- HTTP Client: fetch()
- Testing: Expo Go

---

## Cara Install & Run
1. Clone repo ini
2. Buka folder project
3. Install dependencies
   ```bash
   npm install

## Screenshots
![Home](screenshots/1-home.png)  
![Detail](screenshots/2-detail.png)  
![Favorites](screenshots/3-favorites.png)  
![Search](screenshots/4-search.png)  
![About](screenshots/5-about.png)

## Video Demo
https://drive.google.com/file/d/14vkzd1mhrtHq9jJqip2kfitFno57ofLV/view?usp=drivesdk

## State Management
Saya menggunakan Context API + useReducer karena:
- Sudah tersedia di React tanpa library tambahan.
- Cukup untuk state favorit yang sederhana (array item).
- Mudah dipahami dan sesuai dengan materi kuliah Minggu 4.
- Kelebihan: implementasi ringan, sedikit boilerplate.
- Kekurangan: performa bisa menurun jika state bertambah kompleks, tapi untuk aplikasi skala kecil seperti ini masih optimal.

## Referensi
- [React Navigation Docs](https://reactnavigation.org/)
- [TVMaze API Docs](https://api.tvmaze.com/)
- [Stack Overflow: Handling fetch errors](https://stackoverflow.com/questions/xxxxx)
- [React Context API Tutorial](https://react.dev/reference/react/useContext)
- [Dokumentasi Expo](https://docs.expo.dev/)

## Refleksi Pengerjaan
Proyek UTS ini memberi banyak pelajaran berharga. Awalnya saya kesulitan karena template Expo bawaan menggunakan Expo Router yang bentrok dengan React Navigation yang diwajibkan. Saya harus menghapus folder `app/` dan mengatur ulang entry point. Selain itu, beberapa kali mengalami error "Element type is invalid" karena kesalahan export default pada komponen, dan error "Global was not installed" akibat cache Metro yang rusak. Semua teratasi dengan membersihkan cache dan melakukan instalasi ulang dependencies.

Bug kecil juga muncul saat menampilkan avatar di AboutScreen karena penamaan file gambar yang tidak tepat. Setelah diganti dengan nama `avatar.png` atau menggunakan URL, masalah selesai.

Dari segi teknis, saya belajar banyak tentang implementasi React Navigation (Stack + Bottom Tabs), fetch data dari API eksternal, pembuatan controlled component untuk validasi search, dan state management dengan Context API + useReducer. Saya juga mulai memahami pentingnya struktur folder yang rapi dan penggunaan .gitignore untuk menghindari commit `node_modules`.

Secara keseluruhan, proyek ini meningkatkan kemampuan saya dalam membangun aplikasi mobile dengan React Native dan Expo. Saya juga jadi lebih paham proses development yang terstruktur, termasuk penggunaan Git untuk commit bertahap.
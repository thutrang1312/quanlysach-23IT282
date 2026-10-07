require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');

// Import bookRoutes từ thư mục src/routes/
const bookRoutes = require('./src/routes/bookRoutes');

const app = express();

// 1. Cấu hình Template Engine Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 2. Middleware xử lý Form Data & Static Files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 3. Stateless Session lưu trữ tập trung trên Cloud MongoDB Atlas
app.use(
    session({
        secret: process.env.SESSION_SECRET || '23IT282',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_WRITE_URI,
            collectionName: 'sessions'
        }),
        cookie: { maxAge: 1000 * 60 * 60 * 24 } // Thời hạn session: 1 ngày
    })
);

// 4. Định tuyến ứng dụng
app.use('/', bookRoutes);

// Xử lý trang lỗi 404
app.use((req, res) => {
    res.status(404).send('404 - Không tìm thấy trang');
});

// 5. Khởi chạy Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
const { BookRead, BookWrite } = require('../models/bookModel');

const MSSV = process.env.MSSV || '23IT282';
const HO_TEN = 'Trần Thị Thu Trang';
const PRODUCT_PREFIX = process.env.PRODUCT_PREFIX || '282';
const VAT_RATE = parseFloat(process.env.VAT_RATE) || 7;

// 1. Hàm getBooks (Dùng cho luồng READ)
exports.getBooks = async (req, res) => {
    try {
        const books = await BookRead.find().lean();
        req.session.views = (req.session.views || 0) + 1;

        res.render('home', {
            books,
            sessionViews: req.session.views,
            studentInfo: {
                hoTen: HO_TEN,
                mssv: MSSV,
                vat: VAT_RATE,
                prefix: PRODUCT_PREFIX
            }
        });
    } catch (err) {
        res.status(500).send('Lỗi tải dữ liệu: ' + err.message);
    }
};

// 2. Hàm addBook (Dùng cho luồng WRITE)
exports.addBook = async (req, res) => {
    const { code, name, price } = req.body;

    if (!code || !code.startsWith(PRODUCT_PREFIX)) {
        return res.status(400).send(`Lỗi: Mã sản phẩm bắt buộc phải có tiền tố là ${PRODUCT_PREFIX}`);
    }

    const basePrice = parseFloat(price);
    const finalPrice = basePrice * (1 + VAT_RATE / 100);

    try {
        const newBook = new BookWrite({ code, name, basePrice, finalPrice });
        await newBook.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Lỗi lưu dữ liệu: ' + err.message);
    }
};
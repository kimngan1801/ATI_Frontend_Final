module.exports = {
    database: {
        host: 'localhost',
        user: 'root',
        password: '',  // XAMPP MySQL mặc định không có password
        database: 'anglerdata'
    },
    jwt: {
        secret: 'your-secret-key-123'  // Key để tạo JWT token
    }
};
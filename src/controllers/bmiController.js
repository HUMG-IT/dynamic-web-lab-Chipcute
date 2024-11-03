// Import các hàm calculateBMI và classifyBMI từ bmi.js

// Hàm getBMI xử lý yêu cầu từ client
// Trả về JSON chứa bmi và classification

// Xuất hàm getBMI

// Lưu ý: Tham khảo mã trong tệp nameController.js
// bmiController.js
const { calculateBMI, classifyBMI } = require('../models/bmi');  // Import các hàm

// Định nghĩa hàm getBMI để xử lý yêu cầu từ client
const getBMI = (req, res) => {
    try {
        const { weight, height } = req.body;  // Nhận dữ liệu từ body

        // Tính chỉ số BMI và phân loại
        const bmi = calculateBMI(weight, height);
        const classification = classifyBMI(bmi);

        // Trả về JSON với chỉ số BMI và phân loại
        res.status(200).json({ bmi, classification });
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi xảy ra trên server' });
    }
};

module.exports = { getBMI };

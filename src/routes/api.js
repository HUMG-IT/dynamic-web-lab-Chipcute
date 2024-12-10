/**
 * Module định nghĩa các route của ứng dụng
 * 
 * Module này định nghĩa các route liên quan đến:
 * - Lưu tên của người dùng.
 * Tính tuổi từ ngày sinh người dùng.
 * - Tính và phân loại chỉ số BMI từ dữ liệu người dùng.
 */

const express = require('express');
const router = express.Router();
const { submitName } = require('../controllers/nameController');
// TODO: Import hàm `getAge` từ `ageController` để xử lý yêu cầu tính tuổi
const { getAge } = require('../controllers/ageController');
// TODO: Import hàm `getBMI` từ `bmiController` để xử lý yêu cầu tính chỉ số BMI
const { getBMI } = require('../controllers/bmiController');
/**
 * Route cho endpoint `/submit`
 * 
 * Route này nhận yêu cầu POST từ client với tên người dùng và
 * gọi hàm `submitName` từ `nameController` để thêm tên vào danh sách.
 * 
 * @route POST /api/v1/submit
 * @access Public
 * @returns {Object} JSON - Trả về thông điệp chào và danh sách tên.
 */
router.post('/submit', submitName);
/**
 * Route cho endpoint `/age`
 * 
 * Route này nhận yêu cầu POST từ client với ngày sinh của người dùng và
 * gọi hàm `getAge` từ `ageController` để tính tuổi.
 * 
 * @route POST /api/v1/age
 * @access Public
 * @returns {Object} JSON - Trả về kết quả tuổi tính được.
 */
router.post('/age', getAge);

/**
 * Route cho endpoint `/bmi`
 * 
 * Route này nhận yêu cầu POST từ client với thông tin chiều cao và cân nặng,
 * gọi hàm `getBMI` từ `bmiController` để tính và phân loại chỉ số BMI.
 * 
 * @route POST /api/v1/bmi
 * @access Public
 * @returns {Object} JSON - Trả về chỉ số BMI và phân loại.
 */
// TODO: Định nghĩa route POST cho `/bmi`, sử dụng hàm `getBMI` từ `bmiController` để xử lý yêu cầu
router.post('/bmi', getBMI);

module.exports = router;

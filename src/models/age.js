/**
 * Module tính toán tuổi từ ngày sinh.
 * 
 * Các chức năng chính:
 * - Tính tuổi từ ngày sinh (định dạng YYYY-MM-DD).
 */

const calculateAge = (birthdate) => {
    const birthDateObj = new Date(birthdate);  // Chuyển ngày sinh thành đối tượng Date
    
    // Kiểm tra nếu birthdate không hợp lệ
    if (isNaN(birthDateObj.getTime())) {
        throw new Error('Ngày sinh không hợp lệ');
    }

    const today = new Date();  // Lấy ngày hiện tại

    let age = today.getFullYear() - birthDateObj.getFullYear();  // Tính tuổi dựa trên năm sinh
    const monthDifference = today.getMonth() - birthDateObj.getMonth();  // So sánh tháng sinh và tháng hiện tại

    // Nếu chưa đến sinh nhật trong năm nay, giảm tuổi đi 1
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }

    return age;
};

module.exports = { calculateAge };

// Form lưu tên
document.getElementById('nameForm').addEventListener('submit', async function (e) {
    // Ngăn hành vi mặc định của form (ngăn tải lại trang)
    e.preventDefault();

    // Lấy giá trị nhập từ trường input có id là 'name'
    const name = document.getElementById('name').value;

    try {
        // Hiển thị thông báo đang xử lý yêu cầu
        document.getElementById('nameResponse').textContent = 'Đang gửi tên...';

    // Gửi yêu cầu POST đến server tại route '/submit' với dữ liệu JSON
    const response = await fetch('/api/v1/submit', {
        method: 'POST',  // Sử dụng phương thức POST để gửi dữ liệu
        headers: {
            'Content-Type': 'application/json',  // Định nghĩa kiểu nội dung gửi là JSON
        },
        body: JSON.stringify({ name: name }),  // Chuyển đổi đối tượng { name: name } thành chuỗi JSON
    });

    // Kiểm tra nếu phản hồi không thành công
    if (!response.ok) {
        throw new Error('Lỗi khi gửi dữ liệu');
    }

    // Chờ phản hồi từ server và chuyển đổi phản hồi từ JSON thành đối tượng JavaScript
    const data = await response.json();

    // Hiển thị thông điệp trả về từ server trong phần tử có id là 'nameResponse'
    document.getElementById('nameResponse').textContent = `${data.message}. Danh sách tên: ${data.names.join(', ')}`;
}catch (error) {
    // Hiển thị thông báo lỗi nếu có
    document.getElementById('nameResponse').textContent = `Lỗi: ${error.message}`;
}
});

// Form tính tuổi
document.getElementById('ageForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Ngăn hành vi mặc định của form (ngăn tải lại trang)

    const birthdate = new Date(document.getElementById('birthdate').value);

    if (isNaN(birthdate)) {
        document.getElementById('ageResult').textContent = 'Vui lòng nhập ngày sinh hợp lệ!';
        return;
    }

    // Tính tuổi
    const age = calculateAge(birthdate);
    document.getElementById('ageResult').textContent = `Tuổi của bạn là: ${age} tuổi`;
});

// Hàm tính tuổi từ ngày sinh
function calculateAge(birthdate) {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // Điều chỉnh tuổi nếu chưa đến ngày sinh trong năm nay
    if (month < birthdate.getMonth() || (month === birthdate.getMonth() && day < birthdate.getDate())) {
        age--;
    }

    return age;
};

// Form tính BMI
document.getElementById('bmiForm').addEventListener('submit', async function (e) {
    // Ngăn hành vi mặc định của form (ngăn tải lại trang)
    e.preventDefault();

    // Lấy giá trị chiều cao, cân nặng nhập từ form
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    // Kiểm tra dữ liệu nhập vào
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById('bmiResult').textContent = 'Vui lòng nhập chiều cao và cân nặng hợp lệ!';
        return;
    }

    try {
        // Hiển thị thông báo đang xử lý yêu cầu
        document.getElementById('bmiResult').textContent = 'Đang tính BMI...';

    // Gửi yêu cầu POST đến server tại route '/bmi' với dữ liệu JSON
    const response = await fetch('/api/v1/bmi', {
        method: 'POST',  // Sử dụng phương thức POST để gửi dữ liệu
        headers: {
            'Content-Type': 'application/json',  // Định nghĩa kiểu nội dung gửi là JSON
        },
        body: JSON.stringify({ height, weight }),  // Chuyển đổi đối tượng thành chuỗi JSON
    });

    // Kiểm tra nếu phản hồi không thành công
    if (!response.ok) {
        throw new Error('Lỗi khi tính BMI');
    }

    // Chờ phản hồi từ server và chuyển đổi phản hồi từ JSON thành đối tượng JavaScript
    const data = await response.json();

    // Hiển thị thông điệp trả về từ server trong phần tử có id là 'bmiResult'
    document.getElementById('bmiResult').textContent = `BMI của bạn là: ${data.bmi}, Phân loại: ${data.classification}`;
} catch (error) {
    // Hiển thị thông báo lỗi nếu có
    document.getElementById('bmiResult').textContent = `Lỗi: ${error.message}`;
}
});

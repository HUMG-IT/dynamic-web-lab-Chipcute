describe('Kiểm thử giao diện lưu tên và tính chỉ số BMI và tính tuổi', () => {
    it('hiển thị lời chào sau khi gửi tên', () => {
        cy.visit('http://localhost:3000');
        cy.get('#name').type('John');
        cy.get('button').contains('Gửi tên').click();
        cy.get('#nameResponse').should('contain', 'Xin chào, John!');
    });

    // Kiểm thử tính tuổi
    it('tính và hiển thị tuổi của người dùng', () => {
        cy.visit('http://localhost:3000');

        // Nhập ngày sinh hợp lệ
        const birthdate = '05-15-1990'; // Ví dụ: nhập ngày sinh 15/05/1990
        cy.get('#birthdate').type(birthdate);

        // Gửi thông tin để tính tuổi
        cy.get('button').contains('Tính tuổi').click();

        // Kiểm tra kết quả tuổi (Giả sử tuổi của người dùng là 34 trong năm 2024)
        cy.get('#ageResult').should('contain', 'Tuổi của bạn là: 34');

        // Kiểm thử với ngày sinh không hợp lệ
        const invalidBirthdate = 'invalid-date';  // Dữ liệu không hợp lệ
        cy.get('#birthdate').clear().type(invalidBirthdate);
        cy.get('button').contains('Tính tuổi').click();
        
        // Kiểm tra lỗi khi nhập ngày sinh không hợp lệ
        cy.get('#ageResult').should('contain', 'Vui lòng nhập ngày sinh hợp lệ!');
    });

    // Kiểm thử tính chỉ số BMI
    it('tính và hiển thị chỉ số BMI', () => {
        cy.visit('http://localhost:3000');
        
        // Nhập dữ liệu hợp lệ
        cy.get('#weight').type('60');  // Cân nặng 60 kg
        cy.get('#height').type('165');  // Chiều cao 165 cm
        cy.get('button').contains('Tính BMI').click();

        // Kiểm tra kết quả BMI (Giả sử kết quả BMI là bình thường)
        cy.get('#bmiResult').should('contain', 'BMI của bạn là:');

        // Kiểm thử với dữ liệu không hợp lệ (cân nặng hoặc chiều cao không hợp lệ)
        cy.get('#weight').clear().type('0');  // Cân nặng không hợp lệ
        cy.get('#height').clear().type('0');  // Chiều cao không hợp lệ
        cy.get('button').contains('Tính BMI').click();

        // Kiểm tra lỗi khi nhập dữ liệu không hợp lệ
        cy.get('#bmiResult').should('contain', 'Vui lòng nhập chiều cao và cân nặng hợp lệ!');
    });
});

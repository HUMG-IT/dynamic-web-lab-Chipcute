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

        // Nhập ngày sinh
        const birthdate = '1990-05-15'; // Ví dụ: nhập ngày sinh 15/05/1990
        cy.get('#birthdate').type(birthdate);

        // Gửi thông tin để tính tuổi
        cy.get('button').contains('Tính tuổi').click();

        // Kiểm tra kết quả tuổi
        // Giả sử tuổi của người dùng là 34 (tính theo năm 2024)
        cy.get('#ageResult').should('contain', '34');
    });

    it('tính và hiển thị chỉ số BMI', () => {
        cy.visit('http://localhost:3000');
        cy.get('#weight').type('60');
        cy.get('#height').type('165');
        cy.get('button').contains('Tính BMI').click();
        cy.get('#bmiResult').should('contain', 'Bình thường');
    });
});

const { Builder, By } = require('selenium-webdriver');

(async function testUI() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Kiểm thử lưu tên
        await driver.get('http://localhost:3000');
        await driver.findElement(By.id('name')).sendKeys('John');
        await driver.findElement(By.css('button')).click();

        let nameResponse = await driver.findElement(By.id('nameResponse')).getText();
        if (nameResponse.includes('Xin chào, John!')) {
            console.log('Kiểm thử lưu tên: Passed');
        } else {
            console.error('Kiểm thử lưu tên: Failed - Lời chào không đúng');
        }

        // Kiểm thử tính tuổi
        await driver.findElement(By.id('birthdate')).sendKeys('1990-01-01'); // Nhập ngày sinh
        await driver.findElement(By.xpath("//button[contains(text(),'Tính tuổi')]")).click(); // Giả sử có button tính tuổi

        let ageResult = await driver.findElement(By.id('ageResult')).getText();
        if (ageResult.includes('Tuổi')) {
            console.log('Kiểm thử tính tuổi: Passed');
        } else {
            console.error('Kiểm thử tính tuổi: Failed - Tuổi không chính xác');
        }

        // Kiểm thử tính BMI
        await driver.findElement(By.id('weight')).sendKeys('60');
        await driver.findElement(By.id('height')).sendKeys('165');
        await driver.findElement(By.xpath("//button[contains(text(),'Tính BMI')]")).click();

        let bmiResult = await driver.findElement(By.id('bmiResult')).getText();
        if (bmiResult.includes('Bình thường')) {
            console.log('Kiểm thử tính BMI: Passed');
        } else {
            console.error('Kiểm thử tính BMI: Failed - Phân loại BMI không đúng');
        }
    } catch (error) {
        console.error('Kiểm thử thất bại:', error.message);
    } finally {
        await driver.quit();
    }
})();

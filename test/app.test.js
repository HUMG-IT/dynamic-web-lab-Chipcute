const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

// Định nghĩa route và logic kiểm thử cho ứng dụng
const names = [];
app.post('/api/v1/submit', (req, res) => {
  const name = req.body.name;
  names.push(name);
  res.json({ message: `Xin chào, ${name}!`, names });
});

describe('Kiểm thử POST /api/v1/submit', () => {
  it('trả về lời chào và cập nhật mảng tên', async () => {
    const res = await request(app)
      .post('/api/v1/submit')
      .send({ name: 'John' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Xin chào, John!');
    expect(res.body.names).toContain('John');
  });
});

// Route tính tuổi
const { calculateAge } = require('../src/models/age'); // Import model tính tuổi

app.post('/api/v1/age', (req, res) => {
  const { birthdate } = req.body; // Ngày sinh dưới dạng "YYYY-MM-DD"
  const age = calculateAge(birthdate); // Tính tuổi từ ngày sinh
  res.json({ age });
});

// Kiểm thử POST /api/v1/age
describe('Kiểm thử POST /api/v1/age', () => {
  it('tính tuổi chính xác từ ngày sinh', async () => {
    const res = await request(app)
      .post('/api/v1/age')
      .send({ birthdate: '1990-01-01' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('age');
    expect(res.body.age).toBeGreaterThanOrEqual(30); // Kiểm tra tuổi có đúng
  });

  it('tính tuổi chính xác từ ngày sinh cho người sinh năm 2000', async () => {
    const res = await request(app)
      .post('/api/v1/age')
      .send({ birthdate: '2000-05-15' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('age');
    expect(res.body.age).toBeGreaterThanOrEqual(24); // Kiểm tra tuổi
  });
});

// Import các model và controller cho BMI
const { calculateBMI, classifyBMI } = require('../src/models/bmi');
app.post('/api/v1/bmi', (req, res) => {
  const { weight, height } = req.body;
  const bmi = calculateBMI(weight, height);
  const classification = classifyBMI(bmi);
  res.json({ bmi, classification });
});

describe('Kiểm thử POST /api/v1/bmi', () => {
  it('tính chỉ số BMI và trả về phân loại "Bình thường" cho cân nặng 60kg và chiều cao 165cm', async () => {
    const res = await request(app)
      .post('/api/v1/bmi')
      .send({ weight: 60, height: 165 });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('bmi');
    expect(res.body).toHaveProperty('classification', 'Bình thường');
  });

  it('phân loại là "Gầy" cho BMI thấp', async () => {
    const res = await request(app)
      .post('/api/v1/bmi')
      .send({ weight: 45, height: 165 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.classification).toBe('Gầy');
  });

  it('phân loại là "Thừa cân" cho BMI cao hơn', async () => {
    const res = await request(app)
      .post('/api/v1/bmi')
      .send({ weight: 75, height: 165 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.classification).toBe('Thừa cân');
  });

  it('phân loại là "Béo phì" cho BMI rất cao', async () => {
    const res = await request(app)
      .post('/api/v1/bmi')
      .send({ weight: 90, height: 165 });
    expect(res.statusCode).toEqual(200);
    expect(res.body.classification).toBe('Béo phì');
  });
});

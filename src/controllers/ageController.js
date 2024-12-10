// Hàm tính tuổi từ ngày sinh
const calculateAge = (birthdate) => {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }
    return age;
};

// Hàm xử lý yêu cầu tính tuổi từ client
const getAge = (req, res) => {
    try {
        const { birthdate } = req.body;
        const age = calculateAge(new Date(birthdate));  // Tính tuổi
        res.status(200).json({ age });
    } catch (error) {
        res.status(500).json({ error: 'Có lỗi xảy ra khi tính tuổi' });
    }
};

module.exports = { getAge };

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let postureStatus = 'good';

app.post('/posture', (req, res) => {
    postureStatus = req.body.status;
    console.log(`Posture status updated to: ${postureStatus}`);
    res.json({ message: 'Posture updated' });
});

app.get('/posture', (req, res) => {
    res.json({ status: postureStatus });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

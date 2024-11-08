const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let postureStatusArray = Array.from({ length: 50 }, () => 'good');

// New route to reset array to "good" when ESP8266 connects
app.post('/posture/reset', (req, res) => {
    postureStatusArray = Array.from({ length: 50 }, () => 'good');
    console.log('Posture status array reset to "good"');
    res.json({ message: 'Posture array reset to good' });
});

app.post('/posture', (req, res) => {
    const status = req.body.status;

    // Maintain an array of maximum 50 statuses
    if (postureStatusArray.length >= 50) {
        postureStatusArray.shift(); // Remove the oldest entry
    }

    postureStatusArray.push(status);
    console.log(`Posture status updated to: ${status}`);
    res.json({ message: 'Posture updated' });
});

app.get('/posture', (req, res) => {
    const recentEntries = postureStatusArray.slice(-20); // Last 20 entries
    const goodCount = recentEntries.filter(status => status === 'good').length;

    if (goodCount < 10) {
        res.json({ status: 'bad' });
    } else {
        res.json({ status: 'good' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

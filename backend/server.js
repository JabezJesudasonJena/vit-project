const express = require('express');
const cors = require('cors');
const signRoute = require('./routes/sign');
const applyRoute = require('./routes/apply');
const queryRoute = require('./routes/query');
const loginRoute = require('./routes/login');
const symptomCheckerRoute = require('./routes/symptomChecker');
const doctorsRoute = require('./routes/doctors');
const emergencyRoute = require('./routes/emergency');
const healthTipsRoute = require('./routes/healthTips');
const ratingsRoute = require('./routes/ratings');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/signup', signRoute);
app.use('/api/login', loginRoute);
app.use('/api/apply', applyRoute);
app.use('/api/query', queryRoute);
app.use('/api/symptom-checker', symptomCheckerRoute);
app.use('/api/doctors', doctorsRoute);
app.use('/api/emergency', emergencyRoute);
app.use('/api/health-tips', healthTipsRoute);
app.use('/api/ratings', ratingsRoute);

// Health check
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok', message: 'Backend is running' });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`API available at http://localhost:${PORT}/api`);
});

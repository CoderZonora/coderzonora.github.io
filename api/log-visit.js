const fs = require('fs-extra');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '..', '..', 'logs');
fs.ensureDirSync(logsDir);

module.exports = async (req, res) => {
  try {
    const timestamp = new Date().toISOString();
    const visitorData = {
      timestamp,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.body.userAgent || req.headers['user-agent'],
      referer: req.headers.referer || 'unknown',
      ...req.body
    };

    // Write to a log file with the current date
    const date = timestamp.split('T')[0];
    const logFile = path.join(logsDir, `visits-${date}.json`);
    
    // Read existing logs or create new array
    let logs = [];
    if (fs.existsSync(logFile)) {
      const fileContent = await fs.readFile(logFile, 'utf8');
      logs = JSON.parse(fileContent);
    }
    
    // Add new log entry
    logs.push(visitorData);
    
    // Write back to file
    await fs.writeFile(logFile, JSON.stringify(logs, null, 2));
    
    // Return success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error logging visitor:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

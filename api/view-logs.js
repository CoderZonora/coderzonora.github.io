const fs = require('fs-extra');
const path = require('path');

module.exports = async (req, res) => {
  // Check for authorization (you might want to add a proper auth mechanism)
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer your-secret-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const logsDir = path.join(__dirname, '..', '..', 'logs');
    fs.ensureDirSync(logsDir);
    
    // Get all log files
    const files = await fs.readdir(logsDir);
    const logFiles = files.filter(file => file.startsWith('visits-') && file.endsWith('.json'));
    
    const allLogs = {};
    
    // Read logs from each file
    for (const file of logFiles) {
      const fileContent = await fs.readFile(path.join(logsDir, file), 'utf8');
      const logs = JSON.parse(fileContent);
      allLogs[file] = logs;
    }
    
    res.status(200).json(allLogs);
  } catch (error) {
    console.error('Error retrieving logs:', error);
    res.status(500).json({ error: error.message });
  }
};

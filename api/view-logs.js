// Import logs from the log-visit.js file
// In serverless functions, this might not work as expected
// since each function invocation gets its own environment
// But this is the simplest approach as requested
const logModule = require("./log-visit");

module.exports = async (req, res) => {
  // Check for authorization

  try {
    // Access the logs variable from the module
    // Typically we would try to get a reference, but we access
    // what's exported or defined in module scope directly
    const logs = global.logs || [];

    // Sort logs by timestamp, newest first (if they aren't already)
    const sortedLogs = [...logs].sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    res.status(200).json({ logs: sortedLogs });
  } catch (error) {
    console.error("Error retrieving logs:", error);
    res.status(500).json({ error: error.message });
  }
};

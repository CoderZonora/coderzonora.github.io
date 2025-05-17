// Global variable for storing logs
global.logs = global.logs || [];

module.exports = async (req, res) => {
  try {
    // Create visitor data object
    const timestamp = new Date().toISOString();
    const visitorData = {
      timestamp,
      ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      userAgent: req.body.userAgent || req.headers["user-agent"],
      referer: req.headers.referer || "unknown",
      ...req.body,
    };

    // Store the log in our global variable
    global.logs.push(visitorData);

    // Limit to last 100 logs to prevent memory issues
    if (global.logs.length > 100) {
      global.logs = global.logs.slice(-100);
    }

    // Return success
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error logging visitor:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

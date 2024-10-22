// middleware/auth.js

const { users } = require('../mockDatabase');
const bcrypt = require('bcrypt');


module.exports = async(req, res, next) => {
    const apiToken = req.headers['authorization'];

    if (!apiToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Authenticate by comparing the hash for more secure storage of tokens (compared to plain text)
    let authenticated = false;

    for (const user of Object.values(users)) {
        const match = await bcrypt.compare(apiToken, user.apiToken);
        if (match) {
          req.user = user;
          authenticated = true;
          break;
        }
      }
    
      if (!authenticated) {
        return res.status(401).json({ error: 'Invalid API token' });
      }
    next();
};

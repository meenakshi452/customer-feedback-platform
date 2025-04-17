// controllers/authController.js

const logoutUser = (req, res) => {
    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.redirect('http://localhost:3000');
    });
  };
  
  module.exports = {
    logoutUser
  };
  
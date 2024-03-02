const bcrypt = require('bcrypt')

class PasswordHasher {
    static async hashPassword(password) {
      try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
      } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
      }
    }
  
    static async comparePassword(inputPassword, hashedPassword) {
      try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match;
      } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
      }
    }
  }

  module.exports = PasswordHasher;
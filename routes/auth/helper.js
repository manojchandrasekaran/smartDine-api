import bcrypt from 'bcrypt-nodejs';

const comparePasswords = (passwordInHand, passwordInDB) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(passwordInHand, passwordInDB, (err, result) => {
      if (err) reject(err);
      if (result) {
        resolve(result);
      }
      reject(new Error('Passwords not matching!'));
    });
  });
};


export default {
  comparePasswords
};

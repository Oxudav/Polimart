const bcrypt = require('bcryptjs');

const password = 'test123';

(async () => {
  const hash = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hash);

  const isMatch = await bcrypt.compare(password, hash);
  console.log('Password matches hash?', isMatch);
})();

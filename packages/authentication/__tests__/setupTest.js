const { join } = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: join(__dirname, '../../..', 'test.env') });

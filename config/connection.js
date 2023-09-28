const {connect, connection} = require('mongoose');
const connectionString = process.env.MONGODB_URI || 'mysql://dnyfshk4c24ylaes:dcdhlyjxqp7jw4ma@co28d739i4m2sb7j.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/idyvf8g2ggb6nj6j';

connect(connectionString)
module.exports = connection;
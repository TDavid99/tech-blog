const Sequelize = require('sequelize');

require('dotenv').config();


let sequelize;
//when heroko deloy

if(process.env.JAWSDB_URL){
    sequelize =new Sequelize(process.env.JAWSDB_URL);
} else{
    
const Sequelize = process.env.JAWSDB_URL
 new Sequelize(process.env.JAWSDB_URL,process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});
}
module.exports = sequelize;
import { Sequelize } from 'sequelize';


const db = new Sequelize('node', 'root', '@Asdrumejia19', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});


export default db;

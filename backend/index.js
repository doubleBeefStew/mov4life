const dotenv = require('dotenv');
const sequelize = require('./config/database.js');
const app = require('./config/app.js');

dotenv.config()

const start = async ()=>{
    try{
        await sequelize;
        app.listen(process.env.PORT, ()=>{
            console.log(`server running on port ${process.env.PORT}`)
        })
    }catch(err){
        console.log(err);
    }
}

start()

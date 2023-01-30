import { DataSource, Entity } from "typeorm";

require('dotenv').config();

export const AppDataSource = new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PWD,
    database:process.env.POSTGRES_DB,

    synchronize:false,
    logging:true,
    entities:["src/entities/*.ts"],
    migrations:["src/migrations/*.ts"]
})

AppDataSource.initialize()
    .then(()=>{
        console.log("data source initialized")
    })
    .catch((err)=>{
        console.log("error during data source initialization", err)
    })
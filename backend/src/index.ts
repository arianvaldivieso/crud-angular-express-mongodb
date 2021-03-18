import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import mongoose from 'mongoose';

dotenv.config();
const urlMongo = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_SERVER}:27017/crud-express-mongo?authSource=admin`

mongoose.connect(urlMongo, {
  useNewUrlParser: true
}, (error) => {


	if (error) {
		console.log(error)
	}else{
		console.log('connected to database')
	}
  
})

import { router } from "./router";


if (!process.env.PORT) {
   process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/users", router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);

});
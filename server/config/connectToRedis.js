import { Client } from "redis-om";
import dotenv from "dotenv";

const url = process.env.REDIS_HOST;
let client;
try {
  client = await new Client().open(url);
  console.log("##########################################################");
  console.log("#####            REDIS STORE CONNECTED               #####");
  console.log("##########################################################\n");
} catch (err) {
  console.log(`Redis error: ${err}`.red.bold);
}

export default client;

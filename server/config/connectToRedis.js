import { Client } from "redis-om";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.redis_host;
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

import { Entity, Schema } from "redis-om";
import client from "../config/connectToRedis.js";

class User extends Entity {}

const userSchema = new Schema(
  User,
  {
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  {
    dataStructure: "JSON",
  }
);

export const userRepository = client.fetchRepository(userSchema);
await userRepository.createIndex();

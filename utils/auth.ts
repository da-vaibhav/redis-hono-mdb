import { Pool } from "pg";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: new Pool({

  })
});
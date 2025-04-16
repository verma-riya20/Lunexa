// MUST BE THE VERY FIRST LINE IN YOUR ENTRY FILE
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });  // Changed path to just '.env'
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Debug which env vars are missing
const missingVars = [];
if (!process.env.MONGODB_URI) missingVars.push('MONGODB_URI');
if (!process.env.SESSION_SECRET) missingVars.push('SESSION_SECRET');

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars);
  throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
}

export const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
    collectionName: 'sessions'
  }),
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
});
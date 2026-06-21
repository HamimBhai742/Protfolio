import mongoose from 'mongoose';
import dns from 'dns';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

interface MongooseCached {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCached;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log('[DB] Connecting to MongoDB...');
    console.log('[DB] Active DNS servers:', dns.getServers());
    console.log('[DB] URI:', MONGODB_URI);

    const connectWithRetry = async (retries = 3, delay = 1000): Promise<typeof mongoose> => {
      try {
        return await mongoose.connect(MONGODB_URI as string, opts);
      } catch (err) {
        const error = err as Error & { code?: string; syscall?: string };
        console.error(`[DB] Connection failed (attempts left: ${retries}):`, error.message);
        
        if (retries === 1) {
          throw err;
        }

        // If it looks like a DNS issue, try setting public DNS servers
        if (
          error.code === 'ECONNREFUSED' || 
          error.code === 'ENOTFOUND' || 
          error.syscall === 'querySrv'
        ) {
          console.log('[DB] DNS resolution issue detected. Switching resolver to public DNS...');
          try {
            dns.setServers(['8.8.8.8', '1.1.1.1']);
          } catch (e) {
            console.warn('[DB] Could not set public DNS servers:', e);
          }
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
        return connectWithRetry(retries - 1, delay * 2);
      }
    };

    cached.promise = connectWithRetry().then((mongooseInstance) => {
      console.log('MongoDB connected successfully');
      return mongooseInstance;
    }).catch((err) => {
      console.error('[DB] Connection error inside promise:', err);
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

import { config } from 'dotenv';
import { MongoClient, Db, ObjectId } from 'mongodb';
config();

const client = new MongoClient(process.env.DB_CONNECTION);

/**
 * @type {Db | null}
 */
let db = null;

/**
 * @returns {Promise<Db>}
 */
export async function connect() {
    try {
        if (!db) {
            await client.connect();
            db = client.db("start_mongo");
            console.log("Connected to MongoDB");
        }
        return db;
    } catch (err) {
        console.error(err);
    }
}

await connect();





export default db;



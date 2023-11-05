import * as mongoDB from "mongodb";
import { id } from "../domain/games";
//const { MongoClient, ServerApiVersion } = require("mongodb");
// Replace the placeholder with your Atlas connection string
const uri =
  "mongodb://root:example@localhost:27017/?authSource=admin&readPreference=primary&ssl=false&directConnection=true";

const dbName = "planetary";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
let client: mongoDB.MongoClient | null = null;

export async function Mongo() {
  if (client == null) {
    client = new mongoDB.MongoClient(uri);
    await client.connect();
  }
  return client.db(dbName);
}

export async function FindById<T>(
  collection: string,
  id: string,
  userId: string
): Promise<T> {
  const col = (await Mongo()).collection(collection);
  return (await col.findOne({
    _id: new mongoDB.ObjectId(id),
    userId: userId,
  })) as T;
}

export async function FindAll<T extends id>(
  collection: string,
  userId: string
): Promise<Array<T>> {
  const col = (await Mongo()).collection(collection);
  const data = await col.find({ userId: userId }).toArray();

  return data.map<any>((x) => {
    const mongoId = x._id.toString();
    const boop: any = {
      id: mongoId,
      ...x,
    };
    delete boop._id;
    return boop as T;
  });
}

export async function UpdateById<T, U>(
  collection: string,
  id: string,
  userId: string,
  update: T
) {
  const col = (await Mongo()).collection(collection);
  const updated = await col.updateOne(
    { id: new mongoDB.ObjectId(id), userId: userId },
    { $set: update }
  );
  return updated as U;
}

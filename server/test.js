import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://singhparichit1622:EventCanvas123@cluster0.cosrnrd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);

  try {
    console.log("Connecting...");
    await client.connect();
    console.log("✅ Connected successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();

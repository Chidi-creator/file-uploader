/**
 * Disease Seeder
 * Ensures the diseases collection has the required indexes.
 * Run standalone: ts-node -r tsconfig-paths/register src/seeders/disease.seeder.ts
 */

import { connectToMongoDB } from "database/mongo";
import mongoose from "mongoose";
import Disease from "@models/Disease";

async function seedDiseases() {
  await connectToMongoDB();

  console.log("Running disease seeder...");

  // Ensure indexes are created on the diseases collection
  await Disease.ensureIndexes();
  console.log("Indexes ensured on 'diseases' collection:");
  console.log("  - diseaseCode (unique)");
  console.log("  - catId");

  const count = await Disease.countDocuments();
  console.log(`Current document count in 'diseases': ${count}`);

  console.log("Disease seeder completed successfully.");
  await mongoose.connection.close();
}

seedDiseases().catch((err) => {
  console.error("Seeder failed:", err);
  process.exit(1);
});

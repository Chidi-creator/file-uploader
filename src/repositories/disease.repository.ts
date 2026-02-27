import Disease from "@models/Disease";
import { IDisease } from "@models/types/disease";
import { DatabaseError } from "@managers/error.manager";

class DiseaseRepository {
  async insertOne(data: Partial<IDisease>): Promise<IDisease> {
    try {
      const disease = await Disease.findOneAndUpdate(
        { diseaseCode: data.diseaseCode },
        { $set: data },
        { upsert: true, new: true }
      );
      return disease as IDisease;
    } catch (error: any) {
      throw error;
    }
  }

  async findByDiseaseCode(diseaseCode: string): Promise<IDisease | null> {
    try {
      return await Disease.findOne({ diseaseCode });
    } catch (error: any) {
      throw new DatabaseError("Error fetching disease by code");
    }
  }

  async ensureIndexes(): Promise<void> {
    try {
      await Disease.ensureIndexes();
    } catch (error: any) {
      throw new DatabaseError("Error ensuring disease indexes");
    }
  }
}

export default DiseaseRepository;

import { IDisease } from "@models/types/disease";
import DiseaseRepository from "@repositories/disease.repository";

class DiseaseUseCase {
  private diseaseRepository: DiseaseRepository;

  constructor() {
    this.diseaseRepository = new DiseaseRepository();
  }

  async insertOne(data: Partial<IDisease>): Promise<IDisease> {
    return await this.diseaseRepository.insertOne(data);
  }

  async ensureIndexes(): Promise<void> {
    return await this.diseaseRepository.ensureIndexes();
  }
}

export default DiseaseUseCase;

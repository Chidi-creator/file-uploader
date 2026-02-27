import QueueEngine, { JobProcessor } from "./queue.engine";
import {
  processDiseaseJob,
  DiseaseJobData,
  DiseaseJobResult,
} from "./processors/disease.processor";

class CsvUploadEngine extends QueueEngine<DiseaseJobData, DiseaseJobResult> {
  protected readonly queueName = "disease-csv-upload";

  protected getProcessor(): JobProcessor<DiseaseJobData, DiseaseJobResult> {
    return processDiseaseJob;
  }
}

export default CsvUploadEngine;

import { bullMQConfig } from "@config/index";
import { Queue } from "bullmq";
import { ProcessorFn } from "@config/bullMq.config";

class QueueManager {
  public async createQueue(name: string) {
    return await bullMQConfig.createQueue(name);
  }

  public async createWorker(name: string, processor: ProcessorFn) {
    return bullMQConfig.createWorker(name, processor);
  }

  public async scheduleJob(
    queue: Queue,
    jobName: string,
    data: any,
    schedule: string
  ) {
    return await bullMQConfig.scheduleJob(queue, jobName, data, schedule);
  }
}

export default QueueManager;

import { Queue, Worker, QueueEvents, Job } from "bullmq";
import { env } from "@config/env.config";
import { bullMQConfig } from "@config/index";

export type JobProcessor<TData, TResult> = (job: Job<TData>) => Promise<TResult>;


abstract class QueueEngine<TData, TResult> {
  protected abstract readonly queueName: string;
  protected abstract getProcessor(): JobProcessor<TData, TResult>;

  private get connectionOptions() {
    return {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      username: env.REDIS_USERNAME,
      password: env.REDIS_PASSWORD,
    };
  }


  async dispatch(data: TData, timeoutMs = 120_000): Promise<TResult> {
    const queue = await bullMQConfig.createQueue(this.queueName);
    const worker = await bullMQConfig.createWorker(
      this.queueName,
      this.getProcessor() as JobProcessor<any, any>
    );
    const queueEvents = new QueueEvents(this.queueName, {
      connection: this.connectionOptions,
    });

    try {
      const job = await queue.add("job", data, {
        attempts: 1,
        removeOnComplete: 10,
        removeOnFail: 5,
      });

      const result = await job.waitUntilFinished(queueEvents, timeoutMs);
      return result as TResult;
    } finally {
      await worker.close();
      await queueEvents.close();
      await queue.close();
    }
  }
}

export default QueueEngine;

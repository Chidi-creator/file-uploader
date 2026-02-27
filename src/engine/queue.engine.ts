import { Queue, Worker, Job } from "bullmq";
import { bullMQConfig } from "@config/index";

export type JobProcessor<TData, TResult> = (job: Job<TData>) => Promise<TResult>;

export interface JobStatus<TResult> {
  jobId: string;
  state: string;
  progress: number;
  result?: TResult;
  failedReason?: string;
}


abstract class QueueEngine<TData, TResult> {
  protected abstract readonly queueName: string;
  protected abstract getProcessor(): JobProcessor<TData, TResult>;

  private queue: Queue | null = null;
  private worker: Worker | null = null;

  private async getQueue(): Promise<Queue> {
    if (!this.queue) {
      this.queue = await bullMQConfig.createQueue(this.queueName);
    }
    return this.queue;
  }

 
  async startWorker(): Promise<void> {
    if (this.worker) return;

    this.worker = await bullMQConfig.createWorker(
      this.queueName,
      this.getProcessor() as JobProcessor<any, any>
    );

    this.worker.on("completed", (job) => {
      console.log(`[${this.queueName}] job ${job.id} completed`);
    });

    this.worker.on("failed", (job, err) => {
      console.error(`[${this.queueName}] job ${job?.id} failed: ${err.message}`);
    });

    console.log(`[${this.queueName}] worker started`);
  }

  
  async enqueue(data: TData): Promise<string> {
    const queue = await this.getQueue();
    const job = await queue.add("job", data, {
      attempts: 1,
      removeOnComplete: 10,
      removeOnFail: 5,
    });
    return job.id!;
  }


  async getJobStatus(jobId: string): Promise<JobStatus<TResult>> {
    const queue = await this.getQueue();
    const job = await queue.getJob(jobId);

    if (!job) {
      return { jobId, state: "not_found", progress: 0 };
    }

    const state = await job.getState();
    return {
      jobId,
      state,
      progress: typeof job.progress === "number" ? job.progress : 0,
      result: job.returnvalue as TResult | undefined,
      failedReason: job.failedReason,
    };
  }
}

export default QueueEngine;

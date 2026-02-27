import { Request, Response } from "express";
import { env } from "@config/env.config";
import { csvUploadEngine, DiseaseJobData } from "@engine/index";
import responseManager from "@managers/index";
import { ValidationError } from "@managers/error.manager";

class UploadHandler {
  public uploadCsv = async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        throw new ValidationError("No CSV file uploaded");
      }

      const collectionName = (req.body.collectionName as string) || "diseases";

      const jobData: DiseaseJobData = {
        filePath: req.file.path,
        fileName: req.file.originalname,
        collectionName,
        notifyEmail: env.NOTIFY_EMAIL,
      };

      const jobId = await csvUploadEngine.enqueue(jobData);

      return responseManager.success(
        res,
        { jobId },
        "File uploaded and queued for processing. You will receive an email notification once the job is complete.",
        202
      );
    } catch (error: any) {
      return responseManager.handleError(res, error);
    }
  };

  public getJobStatus = async (req: Request, res: Response) => {
    try {
      const jobId = req.params.jobId as string;
      const status = await csvUploadEngine.getJobStatus(jobId);
      return responseManager.success(res, status);
    } catch (error: any) {
      return responseManager.handleError(res, error);
    }
  };
}

export default UploadHandler;

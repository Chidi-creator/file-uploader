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

      const result = await csvUploadEngine.dispatch(jobData);

      return responseManager.success(
        res,
        { summary: result },
        `CSV processed: ${result.inserted}/${result.totalRows} records inserted into '${collectionName}'`
      );
    } catch (error: any) {
      return responseManager.handleError(res, error);
    }
  };
}

export default UploadHandler;

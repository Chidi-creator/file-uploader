import { Job } from "bullmq";
import { parseCsvFile, mapRowToDisease } from "@service/upload.service";
import DiseaseUseCase from "@usecases/disease.usecase";
import EmailService, { UploadSummary } from "@service/email.service";
import fs from "fs";

export interface DiseaseJobData {
  filePath: string;
  fileName: string;
  collectionName: string;
  notifyEmail: string;
}

export interface DiseaseJobResult {
  totalRows: number;
  inserted: number;
  failed: number;
  failedItems: Array<{ row: number; diseaseCode: string; reason: string }>;
  collectionName: string;
  fileName: string;
}

 const diseaseUseCase = new DiseaseUseCase();
  const emailService = new EmailService();

export async function processDiseaseJob(
  job: Job<DiseaseJobData>
): Promise<DiseaseJobResult> {
  const { filePath, fileName, collectionName, notifyEmail } = job.data;

 

  const rows = await parseCsvFile(filePath);

  const result: DiseaseJobResult = {
    totalRows: rows.length,
    inserted: 0,
    failed: 0,
    failedItems: [],
    collectionName,
    fileName,
  };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNumber = i + 2; // +2: 1-based index + 1 header row

    if (!row.diseaseCode || !row.name || !row.catId) {
      result.failed++;
      result.failedItems.push({
        row: rowNumber,
        diseaseCode: row.diseaseCode || "(empty)",
        reason: "Missing required fields: catId, diseaseCode, or name",
      });
      continue;
    }

    try {
      const diseaseData = mapRowToDisease(row);
      await diseaseUseCase.insertOne(diseaseData);
      result.inserted++;
    } catch (error: any) {
      result.failed++;
      const reason =
        error?.code === 11000
          ? `Duplicate diseaseCode '${row.diseaseCode}'`
          : error?.message || "Unknown error";

      result.failedItems.push({
        row: rowNumber,
        diseaseCode: row.diseaseCode,
        reason,
      });
    }

    await job.updateProgress(Math.round(((i + 1) / rows.length) * 100));
  }

  try {
    fs.unlinkSync(filePath);
  } catch (_) {
    // ignore cleanup errors
  }

  const summary: UploadSummary = {
    totalRows: result.totalRows,
    inserted: result.inserted,
    failed: result.failed,
    failedItems: result.failedItems,
    collectionName,
    fileName,
  };

  try {
    await emailService.sendUploadSummary(notifyEmail, summary);
  } catch (emailErr: any) {
    console.error("Failed to send summary email:", emailErr.message);
  }

  return result;
}

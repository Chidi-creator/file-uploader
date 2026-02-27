import nodemailer from "nodemailer";
import { env } from "@config/env.config";

export interface UploadSummary {
  totalRows: number;
  inserted: number;
  failed: number;
  failedItems: Array<{ row: number; diseaseCode: string; reason: string }>;
  collectionName: string;
  fileName: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.MAIL_HOST,
      port: env.MAIL_PORT,
      secure: env.MAIL_SECURE,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    });
  }

  async sendUploadSummary(to: string, summary: UploadSummary): Promise<void> {
    const failedRows =
      summary.failedItems.length > 0
        ? summary.failedItems
            .map(
              (f) =>
                `<tr>
                  <td style="border:1px solid #ddd;padding:6px">${f.row}</td>
                  <td style="border:1px solid #ddd;padding:6px">${f.diseaseCode}</td>
                  <td style="border:1px solid #ddd;padding:6px">${f.reason}</td>
                </tr>`
            )
            .join("")
        : `<tr><td colspan="3" style="text-align:center;padding:8px">No failures</td></tr>`;

    const html = `
      <h2>CSV Upload Summary</h2>
      <p><strong>File:</strong> ${summary.fileName}</p>
      <p><strong>Collection:</strong> ${summary.collectionName}</p>
      <table style="border-collapse:collapse;width:100%;margin-bottom:16px">
        <tr>
          <th style="background:#f2f2f2;border:1px solid #ddd;padding:8px">Total Rows</th>
          <th style="background:#f2f2f2;border:1px solid #ddd;padding:8px">Inserted</th>
          <th style="background:#f2f2f2;border:1px solid #ddd;padding:8px">Failed</th>
        </tr>
        <tr>
          <td style="border:1px solid #ddd;padding:8px;text-align:center">${summary.totalRows}</td>
          <td style="border:1px solid #ddd;padding:8px;text-align:center;color:green">${summary.inserted}</td>
          <td style="border:1px solid #ddd;padding:8px;text-align:center;color:${summary.failed > 0 ? "red" : "green"}">${summary.failed}</td>
        </tr>
      </table>

      ${
        summary.failedItems.length > 0
          ? `
        <h3>Failed Insertions</h3>
        <table style="border-collapse:collapse;width:100%">
          <tr>
            <th style="background:#f2f2f2;border:1px solid #ddd;padding:8px">Row #</th>
            <th style="background:#f2f2f2;border:1px solid #ddd;padding:8px">Disease Code</th>
            <th style="background:#f2f2f2;border:1px solid #ddd;padding:8px">Reason</th>
          </tr>
          ${failedRows}
        </table>
      `
          : ""
      }
    `;

    await this.transporter.sendMail({
      from: `"File Uploader" <${env.MAIL_FROM}>`,
      to,
      subject: `Upload Summary — ${summary.fileName} (${summary.inserted}/${summary.totalRows} inserted)`,
      html,
    });
  }
}

export default EmailService;

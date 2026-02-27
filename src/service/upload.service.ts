import fs from "fs";
import csvParser from "csv-parser";
import { IDisease } from "@models/types/disease";

export interface CsvRow {
  catId: string;
  gradeCode: string;
  diseaseCode: string;
  name: string;
  category: string;
  description: string;
}

export async function parseCsvFile(filePath: string): Promise<CsvRow[]> {
  return new Promise((resolve, reject) => {
    const rows: CsvRow[] = [];

    fs.createReadStream(filePath)
      .pipe(
        csvParser({
          mapHeaders: ({ header }) => header.trim(),
        })
      )
      .on("data", (row: Record<string, string>) => {
        rows.push({
          catId: (row["catId"] || row["A"] || "").trim(),
          gradeCode: (row["gradeCode"] || row["B"] || "").trim(),
          diseaseCode: (row["diseaseCode"] || row["C"] || "").trim(),
          name: (row["name"] || row["D"] || "").trim(),
          category: (row["category"] || row["E"] || "").trim(),
          description: (row["description"] || row["F"] || "").trim(),
        });
      })
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
}

export function mapRowToDisease(row: CsvRow): Partial<IDisease> {
  return {
    catId: row.catId,
    gradeCode: row.gradeCode !== "" ? Number(row.gradeCode) : null,
    diseaseCode: row.diseaseCode,
    name: row.name,
    category: row.category,
    description: row.description,
  };
}

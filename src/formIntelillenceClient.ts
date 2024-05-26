import DocumentIntelligence, {
  AnalyzeResultOutput,
} from "@azure-rest/ai-document-intelligence";
import {
  getLongRunningPoller,
  AnalyzeResultOperationOutput,
  isUnexpected,
} from "@azure-rest/ai-document-intelligence";

import { PDFDocument, StandardFonts } from "pdf-lib";

export const formIntelligenceAcceptedFileTypes = [
  "application/octet-stream",
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/bmp",
  "image/heif",
  "text/html",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export type FormIntelligenceAcceptedFiles =
  | "application/octet-stream"
  | "application/pdf"
  | "image/jpeg"
  | "image/png"
  | "image/tiff"
  | "image/bmp"
  | "image/heif"
  | "text/html"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation";

export function isFileOfAcceptedType(
  type: string
): type is FormIntelligenceAcceptedFiles {
  return formIntelligenceAcceptedFileTypes.includes(type);
}

export class FormIntelligenceClient {
  constructor() {}

  public async read(file: Blob) {
    if (!isFileOfAcceptedType(file.type)) {
      return undefined;
    }

    try {
      const endpoint = import.meta.env
        .VITE_AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT;
      const key = import.meta.env.VITE_AZURE_DOCUMENT_INTELLIGENCE_KEY;

      const client = DocumentIntelligence(endpoint, { key: key });

      const initialResponse = await client
        .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
        .post({
          contentType: file.type,
          body: file.stream(),
          // queryParameters: { outputContentFormat: "markdown" },
        });

      if (isUnexpected(initialResponse)) {
        return undefined;
      }
      const poller = await getLongRunningPoller(client, initialResponse);
      const result = (await poller.pollUntilDone())
        .body as AnalyzeResultOperationOutput;

      if (!result || !result.analyzeResult) {
        return undefined;
      }

      const filePdf = createPdf(result.analyzeResult);
      return await filePdf;

      //return result.analyzeResult.paragraphs?.map((p) => p.content) ?? [];
    } catch (error) {
      console.error("Error reading form", error);
      return undefined;
    }
  }
}

export const formIntelligenceClient = new FormIntelligenceClient();

async function createPdf(data: AnalyzeResultOutput) {
  const pdfDoc = await PDFDocument.create();
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  for (const page of data.pages) {
    const pdfPage = pdfDoc.addPage();

    for (const line of page.lines ?? []) {
      console.log(line);
      const { content, polygon } = line;
      const x = polygon![0];
      const y = polygon![1];

      const size = 12; //calculateFontSize(polygon);

      pdfPage.drawText(content, {
        x,
        y,
        size,
        maxWidth: Math.abs(polygon![0] - polygon![2]),
        font: timesRomanFont,
      });
    }
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { TranslateDocumentForm } from "./translate-document-form";
import { TranslateDocumentFormFields } from "./translate-document-types";
import { sourceBlobClient, targetBlobClient } from "@/blobClient";
import { translateClient } from "@/translateClient";

export function TranslateDocumentCard() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (tr: TranslateDocumentFormFields) => {
    setIsLoading(true);

    // translateClient
    //   .translateText("Hola Amigos", "es", "en")
    //   .then((t) => console.log(t));

    MakeTranslation(tr)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  };

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="">
      <CardHeader>
        <CardTitle>Document Translator</CardTitle>
        <CardDescription>
          Translate documents into any language with the click of a button
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TranslateDocumentForm onSubmit={onSubmit} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}

async function MakeTranslation(data: TranslateDocumentFormFields) {
  if (!data.file || !data.originalLanguage || !data.translationLanguage) {
    console.log(data);
    return;
  }
  const blobName = `${new Date().getTime()}_${data.file.name}`;

  //Upload the file to the source container
  await sourceBlobClient.uploadBlob(blobName, data.file);

  try {
    //Translate the file
    var jobUri = await translateClient.startTranslateDocumentsFromAzure(
      data.originalLanguage,
      data.translationLanguage
    );

    while (!(await translateClient.isTranslationJobFinished(jobUri))) {
      await new Promise((resolve) => setTimeout(resolve, 5_000));
    }

    //Download the translated file
    const translatedBlob = await targetBlobClient.getBlob(blobName);
    if (!translatedBlob) {
      console.error("Failed to download the translated file: ", blobName);
      return;
    }

    //Download the translated file
    await DownloadBlob(
      `${data.translationLanguage}_${data.file.name}`,
      translatedBlob
    );
  } finally {
    //Delete the uploaded file to source and target?
    await sourceBlobClient.deleteBlob(blobName);
    await targetBlobClient.deleteBlob(blobName);
  }
}

async function DownloadBlob(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

import axios from "axios";
import { sourceBlobClientUrl, targetBlobClientUrl } from "./blobClient";

export type LanguageList = {
  translation: {
    name: string;
    nativeName: string;
  }[];
};

export type TranslationList = {
  translations: {
    text: string;
    to: string;
  }[];
};

export class TranslateClient {
  constructor() {}

  async getLanguages() {
    const url = import.meta.env.VITE_AZURE_TRANSLATE_URL;
    var response = await axios.get<LanguageList>(url + "languages", {
      params: {
        "api-version": "3.0",
        scope: "translation",
      },
    });
    return response.data;
  }

  async translateText(text: string, from: string, to: string) {
    const url = `${import.meta.env.VITE_AZURE_TRANSLATE_URL}translate`;
    const key = import.meta.env.VITE_AZURE_TRANSLATE_KEY;
    const region = import.meta.env.VITE_AZURE_TRANSLATE_REGION;

    var request = [{ Text: text }];
    var response = await axios.post<TranslationList[]>(url, request, {
      params: {
        "api-version": "3.0",
        to: to,
        from: from,
      },
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Ocp-Apim-Subscription-Region": region,
        "Content-type": "application/json",
      },
    });
    return response.data[0].translations[0].text;
  }

  async startTranslateDocumentsFromAzure(from: string, to: string) {
    const url =
      import.meta.env.VITE_AZURE_TRANSLATE_DOCUMENTS_URL +
      "translator/text/batch/v1.1/batches";

    const key = import.meta.env.VITE_AZURE_TRANSLATE_KEY;
    const region = import.meta.env.VITE_AZURE_TRANSLATE_REGION;

    var request = {
      inputs: [
        {
          source: {
            sourceUrl: sourceBlobClientUrl,
            language: from,
          },
          targets: [
            {
              targetUrl: targetBlobClientUrl,
              language: to,
            },
          ],
        },
      ],
    };

    const response = await axios.post(url, request, {
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Ocp-Apim-Subscription-Region": region,
        "Content-type": "application/json",
      },
    });

    return response.headers["operation-location"] as string;
  }

  async isTranslationJobFinished(jobUri: string) {
    const key = import.meta.env.VITE_AZURE_TRANSLATE_KEY;
    const region = import.meta.env.VITE_AZURE_TRANSLATE_REGION;

    var response = await axios.get(jobUri, {
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Ocp-Apim-Subscription-Region": region,
      },
    });

    return response.data.status === "Succeeded";
  }
}

export const translateClient = new TranslateClient();

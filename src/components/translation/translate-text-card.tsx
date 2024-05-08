import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  TranslateTextForm,
  TranslateTextFormFields,
} from "./translate-text-form";
import { translateClient } from "@/translateClient";

export function TranslateTextCard() {
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (fields: TranslateTextFormFields) => {
    const { text, originalLanguage, translationLanguage } = fields;
    //Validate
    if (!text || !originalLanguage || !translationLanguage) {
      return;
    }

    //Translate
    setIsLoading(true);
    translateClient
      .translateText(text, originalLanguage, translationLanguage)
      .then((res) => {
        setTranslatedText(res);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="">
      <CardHeader>
        <CardTitle>Text Translator</CardTitle>
        <CardDescription>
          Insert Text to be translated into any language with the click of a
          button
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TranslateTextForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          translatedText={translatedText}
        />
      </CardContent>
    </Card>
  );
}

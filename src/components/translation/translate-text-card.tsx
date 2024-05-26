import { useState } from "react";
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
    <Card className="">
      <CardHeader>
        <CardTitle>Text Translator</CardTitle>
        <CardDescription>
          Translate text into any language with the click of a button
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TranslateTextForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          translatedText={translatedText}
          onClear={() => setTranslatedText("")}
        />
      </CardContent>
    </Card>
  );
}

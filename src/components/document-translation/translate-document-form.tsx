import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import {
  TranslateDocumentFormFields,
  TranslateDocumentFormProps,
} from "./translate-document-types";
import { LanguageFormField } from "./language-form-field";
import { FileFormField } from "./file-form-field";
import { UseOcrFormField } from "./use-ocr-form-field";
import { Loader2 } from "lucide-react";

export function TranslateDocumentForm(props: TranslateDocumentFormProps) {
  const form = useForm<TranslateDocumentFormFields>();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className="grid w-full items-start gap-6 overflow-auto p-4 pt-0"
      >
        <fieldset className="grid gap-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <LanguageFormField form={form} name="originalLanguage" />
            </div>
            <div className="grid gap-3">
              <LanguageFormField form={form} name="translationLanguage" />
            </div>
          </div>
          <FileFormField form={form} />
          <UseOcrFormField form={form} />
        </fieldset>
        {props.isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}

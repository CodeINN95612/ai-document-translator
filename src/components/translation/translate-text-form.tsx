import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { LanguageFormField } from "./language-form-field";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export type TranslateTextFormFields = {
  originalLanguage: string;
  translationLanguage: string;
  text: string;
  translatedText: string;
};

export type TranslateTextFormProps = {
  onSubmit: (fields: TranslateTextFormFields) => void;
  translatedText: string;
  isLoading: boolean;
};

export function TranslateTextForm(props: TranslateTextFormProps) {
  const form = useForm<TranslateTextFormFields>();

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
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Text to Translate"
                        className="resize-none  h-32"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-3">
              <FormField
                control={form.control}
                name="translatedText"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        defaultValue={props.translatedText}
                        placeholder="Text to Translate"
                        className="resize-none h-32"
                        onKeyDown={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </fieldset>
        {props.isLoading ? (
          <div className="flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <Button type="submit">Translate</Button>
        )}
      </form>
    </Form>
  );
}

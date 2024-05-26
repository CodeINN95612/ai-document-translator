import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { LanguageFormField } from "./language-form-field";
import { Loader2, X } from "lucide-react";
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
  onClear: () => void;
  translatedText: string;
  isLoading: boolean;
};

export function TranslateTextForm(props: TranslateTextFormProps) {
  const form = useForm<TranslateTextFormFields>();

  const handleClear = () => {
    form.setValue("text", "");
    props.onClear();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(props.onSubmit)}
        className="flex flex-col p-1"
      >
        <fieldset>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-48">
              <LanguageFormField form={form} name="originalLanguage" />
            </div>
            <div className="w-48">
              <LanguageFormField form={form} name="translationLanguage" />
            </div>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Text to Translate"
                      className="h-32"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="translatedText"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="h-32"
                      defaultValue={props.translatedText}
                      placeholder="Text to Translate"
                      onKeyDown={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <div className="flex mt-4 gap-2">
          <div className="w-64 grid">
            {props.isLoading ? (
              <div className="flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <Button type="submit">Translate</Button>
            )}
          </div>
          <Button
            type="reset"
            variant={"destructive"}
            className="p-2"
            onClick={handleClear}
          >
            <X />
          </Button>
        </div>
      </form>
    </Form>
  );
}

import { UseFormReturn } from "react-hook-form";
import { TranslateDocumentFormFields } from "./translate-document-types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";

export type UseOcrFormFieldProps = {
  form: UseFormReturn<TranslateDocumentFormFields, any, undefined>;
};

export function UseOcrFormField(props: UseOcrFormFieldProps) {
  return (
    <FormField
      control={props.form.control}
      name="useOCR"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              defaultChecked={false}
              disabled
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Use OCR</FormLabel>
            <FormDescription>
              Use OCR to extract text from images and scanned documents.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
}

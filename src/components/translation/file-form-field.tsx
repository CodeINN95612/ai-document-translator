import { UseFormReturn } from "react-hook-form";
import { TranslateDocumentFormFields } from "./translate-document-types";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

export type FileFormFieldProps = {
  form: UseFormReturn<TranslateDocumentFormFields, any, undefined>;
};

const acceptedFileTypes = [
  ".pdf",
  ".txt",
  ".doc",
  ".docx",
  ".ppt",
  ".pptx",
  ".xls",
  ".xlsx",
  ".csv",
  //"image/*",
];

export function FileFormField(props: FileFormFieldProps) {
  return (
    <FormField
      control={props.form.control}
      name="file"
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormControl>
            <Input
              type="file"
              accept={acceptedFileTypes.join(",")}
              onChange={(e) => {
                onChange(e.target.files && e.target.files[0]);
              }}
              {...fieldProps}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

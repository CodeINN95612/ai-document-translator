import { UseFormReturn } from "react-hook-form";
import { TranslateDocumentFormFields } from "./translate-document-types";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type Language = "es" | "en" | "de";

export type LanguageFormFieldProps = {
  form: UseFormReturn<TranslateDocumentFormFields, any, undefined>;
  name: "originalLanguage" | "translationLanguage";
};

export function LanguageFormField(props: LanguageFormFieldProps) {
  const { name, form } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {name === "originalLanguage"
              ? "Original Language"
              : "Translation Language"}
          </FormLabel>
          <Select
            onValueChange={(e) => {
              console.log("changed");
              field.onChange(e);
            }}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a language" {...field} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

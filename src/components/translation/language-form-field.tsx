import { FieldPath, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export type Language = "es" | "en" | "de";

export type LanguageFormFieldProps<
  T extends { translationLanguage: string; originalLanguage: string }
> = {
  form: UseFormReturn<T, any, undefined>;
  name: FieldPath<T>;
};

export function LanguageFormField<
  T extends { translationLanguage: string; originalLanguage: string }
>(props: LanguageFormFieldProps<T>) {
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

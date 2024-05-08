export type TranslateDocumentFormFields = {
  originalLanguage: string;
  translationLanguage: string;
  file?: File;
  useOCR: boolean;
};

export type TranslateDocumentFormProps = {
  onSubmit: (fields: TranslateDocumentFormFields) => void;
  isLoading: boolean;
};

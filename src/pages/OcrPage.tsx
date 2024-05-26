import { OcrPdf } from "@/components/ocr/ocr-pdf";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  FormIntelligenceClient,
  formIntelligenceAcceptedFileTypes,
} from "@/formIntelillenceClient";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";
import { useState } from "react";
import { useForm } from "react-hook-form";

function downloadPdf(data: Uint8Array, fileName: string) {
  // Crear un Blob a partir del Uint8Array
  const blob = new Blob([data], { type: "application/pdf" });

  // Crear una URL para el Blob
  const url = URL.createObjectURL(blob);

  // Crear un elemento 'a' invisible, establecer la URL y descargar el archivo
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = fileName; // Nombre del archivo a descargar
  document.body.appendChild(a);
  a.click();

  // Limpiar
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function OcrPage() {
  //const [paragraphs, setParagraphs] = useState<string[]>([]);

  const formFile = useForm<{ file: File }>({
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (data: { file: File }) => {
    //setParagraphs([]);
    const client = new FormIntelligenceClient();
    const fileBuffer = await client.read(data.file);
    const fileName = `${data.file.name}.ocr.pdf`;

    if (!fileBuffer) {
      return;
    }

    downloadPdf(fileBuffer, fileName);

    //setParagraphs(paragraphs);
  };

  return (
    <main className="flex flex-wrap gap-6 justify-center ">
      <Form {...formFile}>
        <form
          onSubmit={formFile.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={formFile.control}
            name="file"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept={formIntelligenceAcceptedFileTypes.join(",")}
                    onChange={(e) => {
                      onChange(e.target.files && e.target.files[0]);
                    }}
                    {...fieldProps}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      {/* {paragraphs.length !== 0 ? (
        <PDFDownloadLink
          document={<OcrPdf paragraphs={paragraphs} />}
        ></PDFDownloadLink>
      ) : null} */}
    </main>
  );
}

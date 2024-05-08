import { TranslateDocumentCard } from "@/components/document-translation/translate-document-card";
import { Header } from "@/components/navigation/header";

export function HomePage() {
  return (
    <>
      <Header />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 justify-around">
        <TranslateDocumentCard />
      </main>
    </>
  );
}

import { TranslateDocumentCard } from "@/components/translation/translate-document-card";
import { Header } from "@/components/navigation/header";
import { TranslateTextCard } from "@/components/translation/translate-text-card";

export function HomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-wrap gap-6 justify-center ">
        <TranslateDocumentCard />
        <TranslateTextCard />
      </main>
    </>
  );
}

import { TranslateDocumentCard } from "@/components/translation/translate-document-card";
import { Header } from "@/components/navigation/header";
import { TranslateTextCard } from "@/components/translation/translate-text-card";

export function HomePage() {
  return (
    <>
      <Header />
      <main className="px-6 grid gap-4">
        <TranslateTextCard />
        <div className="flex">
          <TranslateDocumentCard />
        </div>
      </main>
    </>
  );
}

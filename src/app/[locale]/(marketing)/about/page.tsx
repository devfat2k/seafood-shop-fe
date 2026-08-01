import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: AboutPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function About(props: AboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  // const t = await getTranslations({
  //   locale,
  //   namespace: "About",
  // });

  return (
    <div className="flex min-h-screen flex-col bg-[#FBF8F3]">
      <main className="max-w-8xl mx-auto w-full rounded-xl">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-primary">Về chúng tôi</h1>
        </div>
      </main>
    </div>
  );
}

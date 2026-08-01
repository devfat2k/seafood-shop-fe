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
    <div className="py-8">
      <h1 className="py-4 text-center text-3xl font-bold">Giới thiệu hải sản Phan Thiết</h1>
      <p className="mt-4 text-neutral-600">
        Chúng tôi cung cấp hải sản tươi sống được đánh bắt và giao trong ngày, trực tiếp từ vùng
        biển Phan Thiết đến bàn ăn của bạn.
      </p>
    </div>
  );
}

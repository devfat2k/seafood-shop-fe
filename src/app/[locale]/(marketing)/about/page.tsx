import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AboutContactContent } from '@/components/about/AboutContactContent';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: AboutPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  try {
    const t = await getTranslations({
      locale,
      namespace: 'About',
    });

    return {
      title: t('meta_title'),
      description: t('meta_description'),
    };
  } catch {
    return {
      title: 'Liên Hệ & Về Chúng Tôi | Hải Sản Phan Thiết',
      description:
        'Thông tin liên hệ, địa chỉ bến cảng, kho TP.HCM và dịch vụ giao hải sản tươi sống tận nơi.',
    };
  }
}

export default async function AboutPage(props: AboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AboutContactContent />;
}

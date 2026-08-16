import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { AboutContactContent } from '@/components/about/AboutContactContent';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: 'Liên Hệ & Hỗ Trợ Khách Hàng | Hải Sản Phan Thiết',
  description: 'Liên hệ hotline 1900 6868, địa chỉ kho TP.HCM và cảng cá Phan Thiết. Hỗ trợ 24/7.',
};

export default async function ContactPage(props: ContactPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AboutContactContent />;
}

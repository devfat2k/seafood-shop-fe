import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AccountContainer } from '@/components/account/AccountContainer';

type AccountPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: AccountPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: 'Tài Khoản & Đơn Hàng Của Tôi — Hải Sản Phan Thiết',
    description: t('meta_description'),
  };
}

export default async function AccountPage(props: AccountPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <AccountContainer />;
}

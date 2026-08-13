import { setRequestLocale } from 'next-intl/server';
import { HomePageContent } from '@/components/home/HomePageContent';
import { getHomePageData } from '@/lib/api/home';

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function IndexPage(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const homeData = await getHomePageData();

  return <HomePageContent data={homeData} />;
}

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[1280px] px-6 py-8">{children}</main>
      <Footer />
    </>
  );
}

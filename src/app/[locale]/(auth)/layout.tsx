import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6">{children}</main>
      <Footer />
    </>
  );
}

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-full">{children}</main>
      <Footer />
    </>
  );
}

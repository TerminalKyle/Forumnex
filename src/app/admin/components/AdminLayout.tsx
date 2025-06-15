import AdminNav from './AdminNav';
import { useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/admin/login'); 
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <AdminNav onLogout={handleLogout} />
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 
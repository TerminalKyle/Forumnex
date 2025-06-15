import AdminLayout from "./components/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        <p className="text-lg">Welcome to your admin panel. More features coming soon!</p>
      </div>
    </AdminLayout>
  );
} 
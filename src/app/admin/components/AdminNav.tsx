import Link from 'next/link';
import { LayoutDashboard, List, FolderOpen, Puzzle, FileText, BarChart2, LogOut } from 'lucide-react';

interface AdminNavProps {
  onLogout: () => void;
}

export default function AdminNav({ onLogout }: AdminNavProps) {
  return (
    <aside className="w-64 bg-gray-950 text-gray-300 flex flex-col p-4 shadow-lg">
      <div className="text-2xl font-bold text-white mb-8">Admin Panel</div>
      <nav className="flex-1">
        <ul>
          <li className="mb-3">
            <Link href="/admin" className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors duration-200">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/admin/nav-links" className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors duration-200">
              <List className="w-5 h-5 mr-3" />
              Manage Navigation
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/admin/categories" className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors duration-200">
              <FolderOpen className="w-5 h-5 mr-3" />
              Manage Categories
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/admin/addons" className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors duration-200">
              <Puzzle className="w-5 h-5 mr-3" />
              Manage Addons
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/admin/pages" className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors duration-200">
              <FileText className="w-5 h-5 mr-3" />
              Manage Pages
            </Link>
          </li>
          <li className="mb-3">
            <Link href="/admin/stats" className="flex items-center p-2 rounded-md hover:bg-gray-800 transition-colors duration-200">
              <BarChart2 className="w-5 h-5 mr-3" />
              Forum Stats
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <button className="flex items-center w-full p-2 rounded-md hover:bg-red-700 transition-colors duration-200 text-red-400" onClick={onLogout}>
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
} 
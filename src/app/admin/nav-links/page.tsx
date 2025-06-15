import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Home, BookOpen, Users, GraduationCap, MessageSquare, User, Settings, LayoutDashboard, List, FolderOpen, Puzzle, FileText, BarChart2, LogOut } from 'lucide-react';

// Map icon names from DB to Lucide React components
const iconMap: { [key: string]: React.ElementType } = {
  Home: Home,
  BookOpen: BookOpen,
  Users: Users,
  GraduationCap: GraduationCap,
  MessageSquare: MessageSquare,
  User: User,
  Settings: Settings,
  LayoutDashboard: LayoutDashboard,
  List: List,
  FolderOpen: FolderOpen,
  Puzzle: Puzzle,
  FileText: FileText,
  BarChart2: BarChart2,
  LogOut: LogOut,
};

interface NavLinkItem {
  id: string;
  name: string;
  path: string;
  icon: string;
  section: string;
  order: number;
}

interface NavSection {
  section: string;
  items: NavLinkItem[];
}

export default function ManageNavLinksPage() {
  const [navSections, setNavSections] = useState<NavSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavLinks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/nav-links');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: NavSection[] = await response.json();
        setNavSections(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNavLinks();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg">Loading navigation links...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Navigation Links</h1>
      <div className="mb-4">
        <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90">Add New Link</button>
      </div>
      <div className="bg-gray-800 rounded-lg shadow-md p-6">
        {navSections.length === 0 ? (
          <p className="text-gray-400">No navigation links found. Add some!</p>
        ) : (
          navSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8 last:mb-0">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">{section.section}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Path</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Icon</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Order</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {section.items.map((item) => {
                      const IconComponent = iconMap[item.icon];
                      return (
                        <tr key={item.id} className="hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{item.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.path}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {IconComponent ? <IconComponent className="w-5 h-5 inline-block mr-2" /> : null}
                            {item.icon}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{item.order}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-indigo-400 hover:text-indigo-600 mr-4">Edit</button>
                            <button className="text-red-400 hover:text-red-600">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
} 
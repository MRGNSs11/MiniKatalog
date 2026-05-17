import { useState, useEffect } from 'react';
import UserForm from '../Components/UserForm';
import UserList from '../Components/UserList';
import { initialUsers } from '../Interfaces/initialData';

export default function Home() {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    const newUser = { 
      ...user, 
      id: Date.now(),
      joinDate: new Date().toLocaleDateString('tr-TR')
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));
  
  const updateUser = (updatedUser) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditingUser(null);
  };

  // İstatistikler
  const totalUsers = users.length;
  const ankaraUsers = users.filter(u => u.city === 'Ankara').length;
  const canakkaleUsers = users.filter(u => u.city === 'Çanakkale').length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Temiz Başlık Barı */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">👥</span>
            <h1 className="text-3xl font-extrabold text-gray-950 tracking-tighter">Kullanıcı Yönetim Paneli</h1>
          </div>
          <button className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow">Ayarla</button>
        </div>
      </header>
      
      <main className="container mx-auto px-6 py-10 max-w-7xl">
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[
            { title: 'Toplam Kullanıcı', value: totalUsers, icon: '👥', color: 'indigo' },
            { title: 'Ankara Kullanıcıları', value: ankaraUsers, icon: '📍', color: 'sky' },
            { title: 'Çanakkale Kullanıcıları', value: canakkaleUsers, icon: '📍', color: 'emerald' }
          ].map(stat => (
            <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-5 transform hover:-translate-y-1 transition duration-300">
              <div className={`w-16 h-16 bg-${stat.color}-100 text-${stat.color}-700 rounded-full flex items-center justify-center text-3xl shadow-inner`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-500 font-medium">{stat.title}</p>
                <p className="text-4xl font-extrabold text-gray-950 mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Ana İçerik Grid Yapısı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form Alanı */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <UserForm onSubmit={editingUser ? updateUser : addUser} editingUser={editingUser} setEditingUser={setEditingUser} />
            </div>
          </div>
          
          {/* Liste Alanı */}
          <div className="lg:col-span-2">
            {/* Liste Başlığı ve Arama Barı */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-2xl font-extrabold text-gray-950 tracking-tight">Kullanıcı Listesi</h2>
              <div className="relative w-full sm:w-auto">
                <input type="text" placeholder="Kullanıcı ara..." className="w-full sm:w-80 border border-gray-200 rounded-xl p-3 pl-11 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 outline-none transition bg-gray-50" />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              </div>
            </div>
            
            {/* Kullanıcı Listesi Bileşeni */}
            <UserList users={users} onDelete={deleteUser} onEdit={setEditingUser} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16 bg-white">
        <div className="container mx-auto px-6 py-6 max-w-7xl text-center text-gray-500 text-sm">
          React & Tailwind CSS ile Tam CRUD Projesi | {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
}
export default function UserList({ users, onDelete, onEdit }) {
  if (users.length === 0) {
    return (
      <div className="bg-white p-16 rounded-2xl shadow-xl border border-gray-100 text-center text-gray-500 flex flex-col items-center gap-4 transition-all duration-300">
        <span className="text-5xl">🥺</span>
        <p className="text-xl font-bold text-gray-700">Henüz hiç kullanıcı eklenmedi.</p>
        <p className="text-sm mt-1 max-w-sm">Kullanıcı listeniz boş görünüyor. Sol taraftaki formu kullanarak ilk kullanıcınızı sisteme ekleyebilirsiniz.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {users.map(user => (
        <div key={user.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 hover:shadow-2xl transition-all duration-300 hover:border-indigo-100 group">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center text-3xl font-bold text-indigo-700 border border-indigo-100 shadow-inner">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-gray-950 group-hover:text-indigo-800 transition duration-200">{user.name}</h3>
              <div className="text-gray-600 text-sm mt-2 space-y-1">
                <p>📧 {user.email}</p>
                {user.company && <p>🏢 {user.company}</p>}
                {user.city && <p>📍 {user.city}</p>}
                <p className="text-gray-400 text-xs mt-3 pt-2 border-t border-gray-100">Kayıt: {user.joinDate || 'Yeni'}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto border-t sm:border-none pt-4 sm:pt-0">
            <button onClick={() => onEdit(user)} className="flex-1 sm:flex-none bg-white text-amber-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-amber-50 transition duration-300 shadow-sm border border-amber-200 transform hover:-translate-y-0.5">
              ✏️ Düzenle
            </button>
            <button onClick={() => onDelete(user.id)} className="flex-1 sm:flex-none bg-white text-red-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-red-50 transition duration-300 shadow-sm border border-red-200 transform hover:-translate-y-0.5">
              🗑️ Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
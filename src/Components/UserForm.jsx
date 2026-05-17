import { useState, useEffect } from 'react';

export default function UserForm({ onSubmit, editingUser, setEditingUser }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', city: '' });

  useEffect(() => {
    if (editingUser) setFormData(editingUser);
    else setFormData({ name: '', email: '', company: '', city: '' });
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Ad ve Email alanları zorunludur!');
      return;
    }
    onSubmit(formData);
    setFormData({ name: '', email: '', company: '', city: '' }); 
  };

  return (
    <div className="bg-white p-7 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-full ${editingUser ? 'bg-amber-100' : 'bg-indigo-100'}`}>
          {editingUser ? 
            <span className="text-xl">✏️</span> : 
            <span className="text-xl">➕</span>
          }
        </div>
        <h2 className={`text-2xl font-extrabold ${editingUser ? 'text-amber-700' : 'text-indigo-800'}`}>
          {editingUser ? 'Kullanıcıyı Güncelle' : 'Yeni Kullanıcı Ekle'}
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { id: 'name', label: 'Ad Soyad *', placeholder: 'Örn: Ahmet Yılmaz', icon: '👤' },
          { id: 'email', label: 'Email Adresi *', placeholder: 'Örn: ahmet@email.com', icon: '📧', type: 'email' },
          { id: 'company', label: 'Şirket Adı', placeholder: 'Örn: ABC Teknoloji', icon: '🏢' },
          { id: 'city', label: 'Şehir', placeholder: 'Örn: İstanbul', icon: '📍' }
        ].map(field => (
          <div key={field.id}>
            <label className="flex items-center gap-2 text-gray-800 font-semibold mb-1.5 text-sm">
              <span>{field.icon}</span>
              <span>{field.label}</span>
            </label>
            <input 
              type={field.type || 'text'} 
              className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition duration-200 text-gray-900 placeholder:text-gray-400 shadow-inner bg-gray-50/50"
              value={formData[field.id]} 
              onChange={e => setFormData({...formData, [field.id]: e.target.value})} 
              placeholder={field.placeholder} 
            />
          </div>
        ))}
        
        <div className="flex gap-3 pt-3">
          <button type="submit" className={`flex-1 ${editingUser ? 'bg-amber-600 hover:bg-amber-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-bold py-3.5 rounded-xl transition duration-300 shadow-md transform hover:-translate-y-0.5 active:translate-y-0`}>
            {editingUser ? 'Değişiklikleri Kaydet' : 'Kullanıcıyı Ekle'}
          </button>
          {editingUser && (
            <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-100 text-gray-700 font-semibold py-3.5 px-6 rounded-xl hover:bg-gray-200 transition duration-300 border border-gray-200">
              İptal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
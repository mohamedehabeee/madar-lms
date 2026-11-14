import React, { useState } from 'react';

export default function AuthPage({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student'); // student or instructor

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isRegister) {
      // جلب الحسابات القديمة أو إنشاء مصفوفة جديدة
      const users = JSON.parse(localStorage.getItem('madar_users') || '[]');
      
      // التأكد إن الإيميل مش مسجل قبل كده
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        alert('هذا البريد الإلكتروني مسجل مسبقاً!');
        return;
      }

      const newUser = { name, email, password, role };
      users.push(newUser);
      localStorage.setItem('madar_users', JSON.stringify(users));
      localStorage.setItem('madar_current_user', JSON.stringify(newUser));
      
      alert('تم إنشاء الحساب بنجاح!');
      onLoginSuccess(newUser);
    } else {
      // عملية تسجيل الدخول
      const users = JSON.parse(localStorage.getItem('madar_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('madar_current_user', JSON.stringify(user));
        alert(`أهلاً بك يا ${user.name}`);
        onLoginSuccess(user);
      } else {
        alert('البريد الإلكتروني أو كلمة المرور غير صحيحة!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? 'إنشاء حساب جديد - مَدار' : 'تسجيل الدخول - مَدار'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-sm mb-1">الاسم الكامل</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="اكتب اسمك هنا"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">البريد الإلكتروني</label>
            <input 
              type="email5" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">كلمة المرور</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-sm mb-1">نوع الحساب</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">طالب (Student)</option>
                <option value="instructor">مدرس (Instructor)</option>
              </select>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition duration-200"
          >
            {isRegister ? 'تسجيل الحساب' : 'دخول'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-blue-400 hover:underline"
          >
            {isRegister ? 'لديك حساب بالفعل؟ تسجيل الدخول' : 'ليس لديك حساب؟ إنشاء حساب جديد'}
          </button>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import Login from './pages/Login/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // إذا لم يسجل المستخدم دخوله، نعرض واجهة Login الاحترافية
  if (!currentUser) {
    return <Login onLoginSuccess={(userData) => setCurrentUser(userData)} />;
  }

  // شاشة مؤقتة تظهر عند نجاح الدخول (سنستبدلها بالواجهة الداخلية الكاملة في الخطوة القادمة)
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#0f172a', marginBottom: '12px' }}>
        مرحباً بك في VoxCloud، {currentUser.name} 👋
      </h1>
      <p style={{ color: '#64748b', marginBottom: '28px', fontSize: '16px' }}>
        تم تسجيل الدخول بنجاح ({currentUser.email}). هنا سنبني لوحة التحكم الداخلية في الخطوة التالية.
      </p>
      <button
        onClick={() => setCurrentUser(null)}
        style={{
          padding: '12px 24px',
          backgroundColor: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontWeight: '700',
          cursor: 'pointer'
        }}
      >
        تسجيل الخروج والعودة لواجهة الدخول
      </button>
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import {
  Mic,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  KeyRound,
  Cloud,
  CheckCircle2,
  FileAudio,
  ArrowLeft,
  ArrowRight,
  Globe
} from 'lucide-react';
import './Login.css';

// قاموس النصوص للغتين العربية والإنجليزية
const translations = {
  ar: {
    brandSub: 'منصة التفريغ الصوتي السحابي',
    langSwitch: 'English',
    loginTitle: 'تسجيل الدخول إلى حسابك',
    signupTitle: 'إنشاء حساب جديد',
    verifyTitle: 'تأكيد البريد الإلكتروني',
    loginSub: 'أدخل بياناتك للوصول إلى مساحة العمل وسجل التفريغ الصوتي.',
    signupSub: 'انضم إلى VoxCloud وابدأ بتحويل ملفاتك الصوتية إلى نصوص دقيقة.',
    verifySub: 'أدخل الرمز المكون من 6 أرقام المرسل إلى بريدك الإلكتروني',
    tabLogin: 'تسجيل الدخول',
    tabSignup: 'حساب جديد',
    firstNameLabel: 'الاسم الأول',
    firstNamePlaceholder: 'أحمد',
    lastNameLabel: 'الاسم الأخير',
    lastNamePlaceholder: 'العتيبي',
    emailLabel: 'البريد الإلكتروني الجامعي أو الشخصي',
    passwordLabel: 'كلمة المرور',
    otpLabel: 'رمز التحقق (OTP)',
    rememberMe: 'تذكر جلسة الدخول',
    forgotPass: 'نسيت كلمة المرور؟',
    forgotAlert: 'سيتم تفعيل استعادة كلمة المرور عبر AWS Cognito لاحقاً.',
    verifyAlert: 'تم تفعيل الحساب بنجاح! يمكنك الآن تسجيل الدخول.',
    btnLogin: 'دخول إلى المنصة',
    btnSignup: 'إنشاء الحساب والمتابعة',
    btnVerify: 'تأكيد وتفعيل الحساب',
    awsBadge: 'مدعوم ببنية AWS السحابية والذكاء الاصطناعي',
    heroTitle1: 'حوّل تسجيلاتك الصوتية إلى ',
    heroTitleHighlight: 'نصوص ذكية',
    heroTitle2: ' بدقة غير مسبوقة',
    heroDesc:
      'منصة متكاملة لمعالجة وتفريغ المحاضرات الجامعية والاجتماعات الصوتية باللغتين العربية والإنجليزية بالاعتماد على تقنيات التعرف الصوتي المتقدم.',
    accuracy: 'دقة 99.2%',
    sampleQuote1: '"تُعد الحوسبة السحابية عبر ',
    sampleQuoteHighlight: 'AWS',
    sampleQuote2: ' الركيزة الأساسية في بناء تطبيقات الذكاء الاصطناعي الحديثة وتحليل الصوتيات..."',
    feat1: 'تخزين آمن عبر AWS S3',
    feat2: 'معالجة AWS Transcribe',
    feat3: 'دعم كامل للغة العربية والإنجليزية'
  },
  en: {
    brandSub: 'Cloud Speech-to-Text Platform',
    langSwitch: 'العربية',
    loginTitle: 'Sign in to your account',
    signupTitle: 'Create a new account',
    verifyTitle: 'Verify your email',
    loginSub: 'Enter your credentials to access your workspace and transcription history.',
    signupSub: 'Join VoxCloud and start converting your audio files into accurate text.',
    verifySub: 'Enter the 6-digit verification code sent to your email',
    tabLogin: 'Sign In',
    tabSignup: 'Create Account',
    firstNameLabel: 'First Name',
    firstNamePlaceholder: 'John',
    lastNameLabel: 'Last Name',
    lastNamePlaceholder: 'Doe',
    emailLabel: 'University or Personal Email',
    passwordLabel: 'Password',
    otpLabel: 'Verification Code (OTP)',
    rememberMe: 'Remember session',
    forgotPass: 'Forgot password?',
    forgotAlert: 'Password recovery will be connected via AWS Cognito.',
    verifyAlert: 'Account verified successfully! You can now sign in.',
    btnLogin: 'Enter Platform',
    btnSignup: 'Create Account & Continue',
    btnVerify: 'Verify & Activate Account',
    awsBadge: 'Powered by AWS Cloud & Artificial Intelligence',
    heroTitle1: 'Transform your audio recordings into ',
    heroTitleHighlight: 'smart text',
    heroTitle2: ' with unmatched accuracy',
    heroDesc:
      'An integrated cloud platform for transcribing university lectures and meetings in Arabic and English using advanced speech recognition.',
    accuracy: '99.2% Accuracy',
    sampleQuote1: '"Cloud computing via ',
    sampleQuoteHighlight: 'AWS',
    sampleQuote2: ' is the core foundation for building modern AI and speech analytics applications..."',
    feat1: 'Secure Storage via AWS S3',
    feat2: 'AWS Transcribe Engine',
    feat3: 'Full Arabic & English Support'
  }
};

export default function Login({ onLoginSuccess }) {
  const [lang, setLang] = useState('ar');
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'verify'
  const [showPassword, setShowPassword] = useState(false);

  // حقول الإدخال
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const t = translations[lang];
  const isRTL = lang === 'ar';

  // تحديث اتجاه الصفحة الفعلي عند تغيير اللغة
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup') {
      setMode('verify');
    } else if (mode === 'verify') {
      alert(t.verifyAlert);
      setMode('login');
    } else {
      const fullName = `${firstName} ${lastName}`.trim();
      onLoginSuccess({
        name: fullName || (isRTL ? 'مستخدم VoxCloud' : 'VoxCloud User'),
        email: email || 'user@voxcloud.ai'
      });
    }
  };

  return (
    <div className="auth-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ==================== الشريط العلوي ==================== */}
      <header className="top-navbar">
        <div className="vox-logo">
          <div className="logo-icon-box">
            <Mic size={22} />
          </div>
          <div className="logo-text">
            <div className="logo-brand">
              Vox<span>Cloud</span>
            </div>
            <span className="logo-sub">{t.brandSub}</span>
          </div>
        </div>

        <button type="button" className="lang-toggle-btn" onClick={toggleLanguage}>
          <Globe size={17} color="#2563eb" />
          <span>{t.langSwitch}</span>
        </button>
      </header>

      {/* ==================== القسم العلوي: بطاقة التسجيل ==================== */}
      <main className="auth-form-container">
        <div className="auth-card">
          <div className="auth-title-box">
            <h1>
              {mode === 'login' && t.loginTitle}
              {mode === 'signup' && t.signupTitle}
              {mode === 'verify' && t.verifyTitle}
            </h1>
            <p>
              {mode === 'login' && t.loginSub}
              {mode === 'signup' && t.signupSub}
              {mode === 'verify' && `${t.verifySub} (${email || 'user@university.edu'})`}
            </p>
          </div>

          {mode !== 'verify' && (
            <div className="auth-tabs">
              <button
                type="button"
                className={`tab-btn ${mode === 'login' ? 'active' : ''}`}
                onClick={() => setMode('login')}
              >
                {t.tabLogin}
              </button>
              <button
                type="button"
                className={`tab-btn ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => setMode('signup')}
              >
                {t.tabSignup}
              </button>
            </div>
          )}

          <form onSubmit={handleFormSubmit}>
            {mode === 'signup' && (
              <div className="name-row">
                <div className="input-group">
                  <label>{t.firstNameLabel}</label>
                  <div className="field-box">
                    <User size={18} className="field-icon" />
                    <input
                      type="text"
                      placeholder={t.firstNamePlaceholder}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>{t.lastNameLabel}</label>
                  <div className="field-box">
                    <User size={18} className="field-icon" />
                    <input
                      type="text"
                      placeholder={t.lastNamePlaceholder}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {mode !== 'verify' && (
              <>
                <div className="input-group">
                  <label>{t.emailLabel}</label>
                  <div className="field-box">
                    <Mail size={18} className="field-icon" />
                    <input
                      type="email"
                      placeholder="name@university.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>{t.passwordLabel}</label>
                  <div className="field-box">
                    <Lock size={18} className="field-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {mode === 'verify' && (
              <div className="input-group">
                <label>{t.otpLabel}</label>
                <div className="field-box">
                  <KeyRound size={18} className="field-icon" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="form-utilities">
                <label className="remember-me">
                  <input type="checkbox" defaultChecked />
                  <span>{t.rememberMe}</span>
                </label>
                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => alert(t.forgotAlert)}
                >
                  {t.forgotPass}
                </button>
              </div>
            )}

            <button type="submit" className="primary-submit-btn">
              <span>
                {mode === 'login' && t.btnLogin}
                {mode === 'signup' && t.btnSignup}
                {mode === 'verify' && t.btnVerify}
              </span>
              {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </button>
          </form>
        </div>
      </main>

      {/* ==================== القسم السفلي: الهوية البصرية المدمجة ==================== */}
      <section className="auth-showcase-bottom">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>

        <div className="showcase-inner">
          <div className="aws-badge">
            <Cloud size={16} />
            <span>{t.awsBadge}</span>
          </div>

          <h2 className="showcase-heading">
            {t.heroTitle1}
            <span>{t.heroTitleHighlight}</span>
            {t.heroTitle2}
          </h2>

          <p className="showcase-desc">{t.heroDesc}</p>

          <div className="glass-preview-card">
            <div className="preview-header">
              <div className="file-pill">
                <FileAudio size={18} color="#60a5fa" />
                <span>Lecture_Cloud_Computing.mp3</span>
              </div>
              <span className="accuracy-tag">{t.accuracy}</span>
            </div>

            <div className="soundwave-box">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>

            <div className="preview-transcript">
              {t.sampleQuote1}
              <span>{t.sampleQuoteHighlight}</span>
              {t.sampleQuote2}
            </div>
          </div>

          <div className="feature-pills">
            <div className="feature-item">
              <CheckCircle2 size={16} color="#34d399" />
              <span>{t.feat1}</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={16} color="#34d399" />
              <span>{t.feat2}</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={16} color="#34d399" />
              <span>{t.feat3}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
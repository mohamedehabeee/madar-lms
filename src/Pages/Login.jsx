import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Wallet,
  KeyRound,
  Loader2,
  BookOpen,
  Award,
  Zap
} from "lucide-react";

export default function Login({ onDemoLogin, onCustomAuth }) {
  const navigate = useNavigate();

  // حالات التبديل: login | register | forgot
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("student"); // student | instructor
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  // حساب قوة كلمة المرور في وضع إنشاء الحساب
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "", color: "bg-neutral-200 dark:bg-neutral-800" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: "ضعيفة", color: "bg-red-500" };
    if (score === 2) return { score: 2, label: "متوسطة", color: "bg-amber-500" };
    if (score === 3) return { score: 3, label: "قوية", color: "bg-emerald-500" };
    return { score: 4, label: "قوية جداً 🔒", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(password);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (mode === "forgot") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setResetSent(true);
      }, 600);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (onCustomAuth) {
        onCustomAuth({
          mode,
          name: name.trim(),
          email: email.trim(),
          password,
          role
        });
      }
      setIsLoading(false);
      navigate("/dashboard");
    }, 550);
  };

  const handleQuickDemo = (targetRole) => {
    setIsLoading(true);
    setTimeout(() => {
      if (onDemoLogin) {
        onDemoLogin(targetRole);
      }
      setIsLoading(false);
      navigate("/dashboard");
    }, 400);
  };

  const showcaseSlides = [
    {
      badge: "نظام المحفظة الذكية",
      title: "اشحن رصيدك في ثواني واشترك بضغطة زرار.",
      desc: "دعم كامل لفودافون كاش، إنستا باي، فوري، والبطاقات البنكية مع رصيد هدية 200 ج.م لأي حساب طالب جديد.",
      icon: Wallet
    },
    {
      badge: "مذاكرة بدون تشتيت",
      title: "محاضرات مقسمة بوحدات + ملازم PDF جاهزة.",
      desc: "كل محاضرة معاها الملخص الخاص بيها، مع حفظ تلقائي لآخر درس وقفت عنده عشان تكمل في أي وقت.",
      icon: BookOpen
    },
    {
      badge: "امتحانات وشهادات فورية",
      title: "امتحن أونلاين واعرف درجتك وأخطاءك لحظياً.",
      desc: "نظام تقييم تفاعلي بعد كل كورس يصدر لك شهادة إتمام رسمية باسمك فور اجتياز الاختبار.",
      icon: Award
    }
  ];

  const currentSlide = showcaseSlides[activeSlide];
  const SlideIcon = currentSlide.icon;

  return (
    <div className="max-w-6xl mx-auto py-2 sm:py-6 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
        
        {/* ==========================================
            العمود الأيمن: فورم تسجيل الدخول / التسجيل
        ========================================== */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
          
          {/* الهيدر والتبديل بين الدخول والتسجيل */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-black text-xs">
                  م
                </div>
                <span>منصة مَدار التعليمية</span>
              </Link>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                بوابة دخول مؤمنة
              </span>
            </div>

            {mode !== "forgot" ? (
              <>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white tracking-tight">
                    {mode === "login"
                      ? "مرحباً بعودتك في مَدار 👋"
                      : "إنشاء حساب جديد على المنصة ✨"}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
                    {mode === "login"
                      ? "سجل دخولك لمتابعة محاضراتك، امتحاناتك، ورصيد محفظتك."
                      : "افتح حسابك في ثواني واحصل على 200 ج.م رصيد ترحيبي في محفظتك فوراً."}
                  </p>
                </div>

                {/* شريط التبديل الفخم (Tabs) */}
                <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      mode === "login"
                        ? "bg-white dark:bg-[#181818] text-neutral-950 dark:text-white shadow-xs"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    className={`py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      mode === "register"
                        ? "bg-white dark:bg-[#181818] text-neutral-950 dark:text-white shadow-xs"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    <span>إنشاء حساب جديد</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px]">
                      +200 ج.م
                    </span>
                  </button>
                </div>
              </>
            ) : (
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
                  استعادة كلمة المرور 🔑
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
                  أدخل بريدك الإلكتروني المسجل وسنرسل لك رابط تعيين كلمة مرور جديدة فوراً.
                </p>
              </div>
            )}
          </div>

          {/* الفورم الرئيسي */}
          <form onSubmit={handleFormSubmit} className="space-y-5">
            
            {/* اختيار نوع الحساب (يظهر في التسجيل أو الدخول) */}
            {mode === "register" && (
              <div className="space-y-2">
                <label className="block text-xs font-black text-neutral-700 dark:text-neutral-300">
                  اختر نوع الحساب:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      role === "student"
                        ? "border-2 border-neutral-950 dark:border-white bg-neutral-950/5 dark:bg-white/5"
                        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-neutral-950 dark:text-white">
                          حساب طالب
                        </p>
                        <span className="text-[10px] text-neutral-500">
                          للدراسة والامتحانات
                        </span>
                      </div>
                    </div>
                    {role === "student" && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("instructor")}
                    className={`p-3.5 rounded-2xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      role === "instructor"
                        ? "border-2 border-neutral-950 dark:border-white bg-neutral-950/5 dark:bg-white/5"
                        : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-neutral-950 dark:text-white">
                          حساب محاضر
                        </p>
                        <span className="text-[10px] text-neutral-500">
                          لإدارة ونشر الكورسات
                        </span>
                      </div>
                    </div>
                    {role === "instructor" && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* حقل الاسم الكامل في حالة التسجيل */}
            {mode === "register" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-neutral-700 dark:text-neutral-300">
                  الاسم الثلاثي (يظهر في الشهادات الرسمية)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: محمد إيهاب حسين"
                    className="w-full pr-11 pl-4 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm font-bold text-neutral-950 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition"
                  />
                </div>
              </div>
            )}

            {/* حقل البريد الإلكتروني */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-neutral-700 dark:text-neutral-300">
                البريد الإلكتروني الجامعي أو الشخصي
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pr-11 pl-4 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm font-mono text-left text-neutral-950 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition"
                />
              </div>
            </div>

            {/* حقل كلمة المرور */}
            {mode !== "forgot" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-neutral-700 dark:text-neutral-300">
                    كلمة المرور
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot");
                        setResetSent(false);
                      }}
                      className="text-[11px] font-bold text-neutral-500 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={4}
                    dir="ltr"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-11 pl-11 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm font-mono text-left text-neutral-950 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* مؤشر قوة كلمة المرور يظهر عند الكتابة في إنشاء حساب */}
                {mode === "register" && password.length > 0 && (
                  <div className="pt-1 space-y-1">
                    <div className="grid grid-cols-4 gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`rounded-full transition-all duration-300 ${
                            strength.score >= step
                              ? strength.color
                              : "bg-neutral-200 dark:bg-neutral-800"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-neutral-500">
                      قوة كلمة المرور:{" "}
                      <span className="text-neutral-900 dark:text-white">
                        {strength.label}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* خيار تذكرني في تسجيل الدخول */}
            {mode === "login" && (
              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-600 dark:text-neutral-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-neutral-300 accent-neutral-950 dark:accent-white w-4 h-4"
                  />
                  <span>الاحتفاظ بتسجيل دخولي على هذا الجهاز</span>
                </label>
              </div>
            )}

            {/* رسالة تأكيد إرسال رابط استعادة الباسورد */}
            {mode === "forgot" && resetSent && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح!
                </span>
              </div>
            )}

            {/* زر الإرسال الرئيسي */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري تجهيز حسابك...</span>
                </>
              ) : mode === "login" ? (
                <>
                  <span>تسجيل الدخول للمنصة</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              ) : mode === "register" ? (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
                  <span>إنشاء الحساب واستلام 200 ج.م هدية</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>إرسال رابط الاستعادة</span>
                </>
              )}
            </button>

            {mode === "forgot" && (
              <button
                type="button"
                onClick={() => setMode("login")}
                className="w-full py-2.5 text-xs font-bold text-neutral-500 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
              >
                ← العودة لتسجيل الدخول
              </button>
            )}
          </form>

          {/* قسم الدخول التجريبي السريع بضغطة واحدة (One-Click Demo) */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-neutral-500 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-500" />
                دخول فوري للتجربة والمعاينة (بدون كتابة بيانات):
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickDemo("student")}
                className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-right transition cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xs">
                    ط
                  </div>
                  <div>
                    <p className="text-xs font-black text-neutral-900 dark:text-white">
                      دخول كطالب تجريبي
                    </p>
                    <span className="text-[10px] text-neutral-500">
                      مشترك في كورسات + رصيد 1200 ج.م
                    </span>
                  </div>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo("instructor")}
                className="p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-right transition cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xs">
                    م
                  </div>
                  <div>
                    <p className="text-xs font-black text-neutral-900 dark:text-white">
                      دخول كمحاضر / إدارة
                    </p>
                    <span className="text-[10px] text-neutral-500">
                      إضافة كورسات، محاضرات وامتحانات
                    </span>
                  </div>
                </div>
                <ArrowLeft className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white transition-transform group-hover:-translate-x-1" />
              </button>
            </div>
          </div>

        </div>

        {/* ==========================================
            العمود الأيسر: لوحة العرض الفخمة (Showcase)
        ========================================== */}
        <div className="lg:col-span-5 bg-neutral-950 text-white p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          {/* خلفية جمالية هادئة */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          {/* كارت معاينة المحفظة الترحيبية */}
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[11px] font-bold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تجربة تعليمية متكاملة</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-neutral-950 flex items-center justify-center font-black text-xs">
                    م
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-400 font-mono">
                      MADAR WALLET BONUS
                    </span>
                    <strong className="text-xs font-black text-white">
                      هدية الحساب الجديد
                    </strong>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-xs font-black">
                  +200 EGP
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                أول ما تسجل حساب طالب جديد، بيتضاف في محفظتك <strong className="text-white">200 ج.م</strong> فوراً تقدر تستخدمهم في الاشتراك في الكورسات.
              </p>
            </div>
          </div>

          {/* سلايدر مميزات المنصة التفاعلي */}
          <div className="relative z-10 my-8 space-y-5">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <SlideIcon className="w-5 h-5" />
              </div>
              <span className="inline-block text-[11px] font-bold text-emerald-400">
                {currentSlide.badge}
              </span>
              <h3 className="text-lg font-black leading-snug">
                {currentSlide.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {currentSlide.desc}
              </p>
            </div>

            {/* أزرار التقليب بين الشرائح */}
            <div className="flex items-center gap-2">
              {showcaseSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx
                      ? "w-8 bg-emerald-400"
                      : "w-2 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* إحصائيات المنصة السفلية */}
          <div className="relative z-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
            <div>
              <strong className="block text-lg font-black text-white">+10,800</strong>
              <span className="text-[10px] text-neutral-400">طالب مسجل</span>
            </div>
            <div>
              <strong className="block text-lg font-black text-emerald-400">4.9 ★</strong>
              <span className="text-[10px] text-neutral-400">تقييم المحاضرات</span>
            </div>
            <div>
              <strong className="block text-lg font-black text-white">100%</strong>
              <span className="text-[10px] text-neutral-400">شهادات معتمدة</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  KeyRound,
  Loader2,
  BookOpen,
  Award,
  LockKeyhole
} from "lucide-react";

export default function Login({ onCustomAuth }) {
  const navigate = useNavigate();

  // حالات التبديل: login | register | forgot
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  // حساب قوة كلمة المرور في وضع إنشاء الحساب
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "", color: "bg-neutral-200 dark:bg-neutral-800" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: "ضعيفة", color: "bg-red-500" };
    if (score === 2) return { score: 2, label: "متوسطة", color: "bg-amber-500" };
    if (score === 3) return { score: 3, label: "قوية", color: "bg-emerald-500" };
    return { score: 4, label: "قوية جداً 🔒", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(password);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (mode === "forgot") {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setResetSent(true);
      }, 600);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (onCustomAuth) {
        const result = onCustomAuth({
          mode,
          name: name.trim(),
          email: email.trim(),
          password
        });

        setIsLoading(false);

        if (result && result.success === false) {
          setErrorMsg(result.message || "بيانات الدخول غير صحيحة");
          return;
        }
      } else {
        setIsLoading(false);
      }
      navigate("/dashboard");
    }, 500);
  };

  const showcaseSlides = [
    {
      badge: "مذاكرة منظمة بدون تشتيت",
      title: "محاضرات مقسمة بوحدات + ملازم PDF جاهزة.",
      desc: "كل محاضرة مرفق معها الملخص الخاص بها، مع حفظ تلقائي لآخر درس وقفت عنده لاستكمال مذاكرتك في أي وقت.",
      icon: BookOpen
    },
    {
      badge: "امتحانات وشهادات معتمدة",
      title: "امتحن أونلاين واعرف درجتك وأخطاءك لحظياً.",
      desc: "نظام تقييم تفاعلي بعد كل كورس يصدر لك شهادة إتمام رسمية باسمك فور اجتياز الاختبار بنجاح.",
      icon: Award
    },
    {
      badge: "وسائل دفع محلية مؤمنة",
      title: "اشحن محفظتك واشترك في الكورسات بسهولة.",
      desc: "دعم كامل لفودافون كاش، إنستا باي، فوري، والبطاقات البنكية مع سجل فواتير واضح لكل معاملة.",
      icon: Wallet
    }
  ];

  const currentSlide = showcaseSlides[activeSlide];
  const SlideIcon = currentSlide.icon;

  return (
    <div className="max-w-6xl mx-auto py-2 sm:py-6 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
        
        {/* ==========================================
            العمود الأيمن: فورم تسجيل الدخول / التسجيل
        ========================================== */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-8">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-950 dark:hover:text-white transition"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-black text-xs">
                  م
                </div>
                <span>منصة مَدار التعليمية</span>
              </Link>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                بوابة دخول مؤمنة
              </span>
            </div>

            {mode !== "forgot" ? (
              <>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white tracking-tight">
                    {mode === "login"
                      ? "تسجيل الدخول في مَدار"
                      : "إنشاء حساب طالب جديد"}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
                    {mode === "login"
                      ? "أدخل بريدك الإلكتروني وكلمة المرور لمتابعة محاضراتك وامتحاناتك."
                      : "سجل بياناتك الأساسية لإنشاء حساب طالب والبدء في دراسة الكورسات."}
                  </p>
                </div>

                {/* شريط التبديل بين الدخول وإنشاء حساب */}
                <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("login");
                      setErrorMsg("");
                    }}
                    className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      mode === "login"
                        ? "bg-white dark:bg-[#181818] text-neutral-950 dark:text-white shadow-xs"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("register");
                      setErrorMsg("");
                    }}
                    className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      mode === "register"
                        ? "bg-white dark:bg-[#181818] text-neutral-950 dark:text-white shadow-xs"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                    }`}
                  >
                    إنشاء حساب طالب
                  </button>
                </div>
              </>
            ) : (
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
                  استعادة كلمة المرور 🔑
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
                  أدخل بريدك الإلكتروني المسجل وسنرسل لك رابط تعيين كلمة مرور جديدة.
                </p>
              </div>
            )}
          </div>

          {/* رسالة الخطأ إن وجدت */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-600 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          {/* الفورم الرئيسي */}
          <form onSubmit={handleFormSubmit} className="space-y-5">
            
            {/* حقل الاسم الكامل في حالة التسجيل */}
            {mode === "register" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-neutral-700 dark:text-neutral-300">
                  الاسم الثلاثي (كما سيظهر في الشهادات)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="اكتب اسمك الثلاثي..."
                    className="w-full pr-11 pl-4 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm font-bold text-neutral-950 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition"
                  />
                </div>
              </div>
            )}

            {/* حقل البريد الإلكتروني */}
            <div className="space-y-1.5">
              <label className="block text-xs font-black text-neutral-700 dark:text-neutral-300">
                البريد الإلكتروني الجامعي أو الشخصي
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pr-11 pl-4 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm font-mono text-left text-neutral-950 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition"
                />
              </div>
            </div>

            {/* حقل كلمة المرور */}
            {mode !== "forgot" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black text-neutral-700 dark:text-neutral-300">
                    كلمة المرور
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode("forgot");
                        setResetSent(false);
                        setErrorMsg("");
                      }}
                      className="text-[11px] font-bold text-neutral-500 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  )}
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    dir="ltr"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pr-11 pl-11 py-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm font-mono text-left text-neutral-950 dark:text-white focus:outline-none focus:border-neutral-950 dark:focus:border-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* مؤشر قوة كلمة المرور يظهر عند الكتابة في إنشاء حساب */}
                {mode === "register" && password.length > 0 && (
                  <div className="pt-1 space-y-1">
                    <div className="grid grid-cols-4 gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div
                          key={step}
                          className={`rounded-full transition-all duration-300 ${
                            strength.score >= step
                              ? strength.color
                              : "bg-neutral-200 dark:bg-neutral-800"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] font-bold text-neutral-500">
                      قوة كلمة المرور:{" "}
                      <span className="text-neutral-900 dark:text-white">
                        {strength.label}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* خيار تذكرني في تسجيل الدخول */}
            {mode === "login" && (
              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-600 dark:text-neutral-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-neutral-300 accent-neutral-950 dark:accent-white w-4 h-4"
                  />
                  <span>الاحتفاظ بتسجيل دخولي على هذا الجهاز</span>
                </label>
              </div>
            )}

            {/* رسالة تأكيد إرسال رابط استعادة الباسورد */}
            {mode === "forgot" && resetSent && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح!
                </span>
              </div>
            )}

            {/* زر الإرسال الرئيسي */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري التحقق من البيانات...</span>
                </>
              ) : mode === "login" ? (
                <>
                  <span>تسجيل الدخول للمنصة</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              ) : mode === "register" ? (
                <>
                  <span>إنشاء حساب طالب جديد</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4" />
                  <span>إرسال رابط الاستعادة</span>
                </>
              )}
            </button>

            {mode === "forgot" && (
              <button
                type="button"
                onClick={() => setMode("login")}
                className="w-full py-2.5 text-xs font-bold text-neutral-500 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
              >
                ← العودة لتسجيل الدخول
              </button>
            )}
          </form>

          {/* تنبيه أمني لحسابات المحاضرين والإدارة */}
          <div className="pt-5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 text-[11px] text-neutral-500">
            <div className="flex items-center gap-2">
              <LockKeyhole className="w-4 h-4 text-neutral-400 shrink-0" />
              <span>
                حسابات المحاضرين والإدارة يتم إصدارها واعتمادها من إدارة المنصة فقط لضمان الأمان.
              </span>
            </div>
          </div>

        </div>

        {/* ==========================================
            العمود الأيسر: لوحة العرض الفخمة (Showcase)
        ========================================== */}
        <div className="lg:col-span-5 bg-neutral-950 text-white p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          {/* كارت الحماية والتوثيق الأكاديمي */}
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[11px] font-bold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>بيئة تعليمية محمية وموثقة</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-neutral-950 flex items-center justify-center font-black text-xs">
                    م
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-400 font-mono">
                      ACADEMIC VERIFICATION
                    </span>
                    <strong className="text-xs font-black text-white">
                      حماية بيانات وسجلات الطلاب
                    </strong>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-black">
                  SECURED
                </span>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed">
                يتم ربط حسابك الشخصي بسجل درجاتك في الامتحانات، المحاضرات المكتملة، والشهادات الرسمية الصادرة باسمك.
              </p>
            </div>
          </div>

          {/* سلايدر مميزات المنصة التفاعلي */}
          <div className="relative z-10 my-8 space-y-5">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <SlideIcon className="w-5 h-5" />
              </div>
              <span className="inline-block text-[11px] font-bold text-emerald-400">
                {currentSlide.badge}
              </span>
              <h3 className="text-lg font-black leading-snug">
                {currentSlide.title}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {currentSlide.desc}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {showcaseSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeSlide === idx
                      ? "w-8 bg-emerald-400"
                      : "w-2 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* إحصائيات المنصة السفلية */}
          <div className="relative z-10 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
            <div>
              <strong className="block text-lg font-black text-white">+10,800</strong>
              <span className="text-[10px] text-neutral-400">طالب مسجل</span>
            </div>
            <div>
              <strong className="block text-lg font-black text-emerald-400">4.9 ★</strong>
              <span className="text-[10px] text-neutral-400">تقييم المحاضرات</span>
            </div>
            <div>
              <strong className="block text-lg font-black text-white">100%</strong>
              <span className="text-[10px] text-neutral-400">شهادات معتمدة</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
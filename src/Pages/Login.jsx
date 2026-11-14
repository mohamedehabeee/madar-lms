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
  CheckCircle2,
  KeyRound,
  Loader2,
  BookOpen,
  Award,
  FileText,
  LockKeyhole
} from "lucide-react";

export default function Login({ onCustomAuth }) {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login"); // login | register | forgot
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

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
    return { score: 4, label: "قوية جداً", color: "bg-emerald-500" };
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
      badge: "محتوى أكاديمي منظم",
      title: "محاضرات فيديو مقسمة بوحدات دراسية واضحة.",
      desc: "تابع تقدمك في كل مادة خطوة بخطوة مع حفظ تلقائي لآخر محاضرة وقفت عندها.",
      icon: BookOpen
    },
    {
      badge: "ملازم وملخصات شاملة",
      title: "ملفات PDF جاهزة للتحميل مع كل محاضرة.",
      desc: "ذاكر وراجع أهم النقاط والقوانين من الملخصات المرفقة مباشرة تحت كل درس.",
      icon: FileText
    },
    {
      badge: "امتحانات وتقييم دوري",
      title: "اختبر استيعابك واعرف نتيجتك فور الانتهاء.",
      desc: "امتحانات تفاعلية بنظام التصحيح التلقائي مع إصدار شهادة إتمام رسمية لكل كورس.",
      icon: Award
    }
  ];

  const currentSlide = showcaseSlides[activeSlide];
  const SlideIcon = currentSlide.icon;

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-8 animate-fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xl">
        
        {/* العمود الأيمن: فورم الدخول والتسجيل */}
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

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                بوابة دخول الطلاب
              </span>
            </div>

            {mode !== "forgot" ? (
              <>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white tracking-tight">
                    {mode === "login"
                      ? "تسجيل الدخول إلى حسابك"
                      : "إنشاء حساب طالب جديد"}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
                    {mode === "login"
                      ? "أدخل بريدك الإلكتروني وكلمة المرور لمتابعة محاضراتك وامتحاناتك."
                      : "املأ البيانات التالية لإنشاء حساب طالب والبدء في دراسة المواد."}
                  </p>
                </div>

                {/* التبديل بين تسجيل الدخول وإنشاء حساب بدون أي شارات مكافآت */}
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
                    إنشاء حساب جديد
                  </button>
                </div>
              </>
            ) : (
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
                  استعادة كلمة المرور
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 mt-1.5">
                  أدخل بريدك الإلكتروني المسجل وسنرسل لك رابط تعيين كلمة مرور جديدة.
                </p>
              </div>
            )}
          </div>

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-600 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {mode === "register" && (
              <div className="space-y-1.5">
                <label className="block text-xs font-black text-neutral-700 dark:text-neutral-300">
                  الاسم الثلاثي (كما يظهر في الشهادات)
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

            <div className="space-y-1.5">
              <label className="block text-xs font-black text-neutral-700 dark:text-neutral-300">
                البريد الإلكتروني
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

            {mode === "forgot" && resetSent && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني بنجاح!
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-lg cursor-pointer disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري التحقق...</span>
                </>
              ) : mode === "login" ? (
                <>
                  <span>تسجيل الدخول</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              ) : mode === "register" ? (
                <>
                  <span>إنشاء حساب طالب</span>
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
                العودة لتسجيل الدخول
              </button>
            )}
          </form>

          <div className="pt-5 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-[11px] text-neutral-500">
            <LockKeyhole className="w-4 h-4 text-neutral-400 shrink-0" />
            <span>
              التسجيل متاح للطلاب فقط. حسابات المحاضرين والإدارة تُدار داخلياً بواسطة إدارة المنصة.
            </span>
          </div>

        </div>

        {/* العمود الأيسر: عرض مميزات المنصة الأكاديمية فقط بدون أي مكافآت */}
        <div className="lg:col-span-5 bg-neutral-950 text-white p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[11px] font-bold text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>منصة مَدار الأكاديمية</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black leading-snug text-white">
              بيئة دراسية منظمة لطلاب علوم الحاسب والمواد الأكاديمية.
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              كل ما تحتاجه من محاضرات مسجلة، ملازم مراجعة، واختبارات تقييم دورية في مكان واحد.
            </p>
          </div>

          <div className="relative z-10 my-8 space-y-5">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-3 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <SlideIcon className="w-5 h-5" />
              </div>
              <span className="inline-block text-[11px] font-bold text-emerald-400">
                {currentSlide.badge}
              </span>
              <h3 className="text-base sm:text-lg font-black leading-snug">
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
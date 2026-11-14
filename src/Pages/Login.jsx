import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  ArrowLeft,
  AlertCircle
} from "lucide-react";

export default function Login({ onDemoLogin, onCustomAuth }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (password.length < 6) {
      setErrorMsg("كلمة المرور يجب ألا تقل عن 6 أحرف.");
      return;
    }

    if (mode === "register" && name.trim().length < 3) {
      setErrorMsg("يرجى كتابة الاسم بشكل صحيح.");
      return;
    }

    if (onCustomAuth) {
      onCustomAuth({
        mode,
        name: mode === "register" ? name.trim() : email.split("@")[0],
        email: email.trim(),
        phone: phone.trim()
      });
    } else {
      onDemoLogin("student");
    }

    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xs">
        
        {/* الهيدر والتبديل */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-lg flex items-center justify-center font-black text-base">
              م
            </div>
            <span className="text-lg font-black text-neutral-950 dark:text-white">
              مَدار.
            </span>
          </Link>

          <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMsg("");
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                mode === "login"
                  ? "bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white"
                  : "text-neutral-500"
              }`}
            >
              دخول
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setErrorMsg("");
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer ${
                mode === "register"
                  ? "bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white"
                  : "text-neutral-500"
              }`}
            >
              حساب جديد
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
            {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب طالب"}
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {mode === "login"
              ? "ادخل بريدك الإلكتروني وكلمة المرور للمتابعة"
              : "سجل بياناتك للوصول للمحاضرات والامتحانات"}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <>
              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  الاسم بالكامل
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="الاسم الثلاثي"
                    className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                  رقم الموبايل
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010XXXXXXXX"
                    className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-10 pl-10 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {mode === "login" ? "دخول" : "إنشاء الحساب"}
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-center text-xs text-neutral-500">
          {mode === "login" ? (
            <>
              ليس لديك حساب؟{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="font-bold text-neutral-950 dark:text-white underline cursor-pointer"
              >
                إنشاء حساب جديد
              </button>
            </>
          ) : (
            <>
              لديك حساب بالفعل؟{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="font-bold text-neutral-950 dark:text-white underline cursor-pointer"
              >
                تسجيل الدخول
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
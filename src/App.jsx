import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useSearchParams, useLocation, Link } from "react-router-dom";
import {
  Wallet,
  CreditCard,
  Smartphone,
  Zap,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowRight,
  Lock,
  Loader2,
  Receipt,
  Search,
  X,
  ArrowUp,
  BellRing,
  BookOpen,
  LayoutDashboard
} from "lucide-react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import CourseDetails from "./Pages/CourseDetails";
import CoursePlayer from "./Pages/CoursePlayer";
import ExamPage from "./Pages/ExamPage";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { INITIAL_COURSES, INITIAL_ACCESS_CODES, DEMO_USERS } from "./Services/mockData";

// الصعود التلقائي لأعلى الصفحة عند الانتقال بين الصفحات
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

// شريط تقدم التصفح العلوي + زر الصعود السريع
function InteractiveScrollWidgets() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(scroll);
      setShowTopBtn(totalScroll > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent pointer-events-none">
        <div
          className="h-full bg-emerald-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          title="الصعود لأعلى"
          className="fixed bottom-6 left-6 z-40 p-3 rounded-2xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xl border border-neutral-800 dark:border-neutral-200 hover:scale-110 transition cursor-pointer animate-toast"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}

// نافذة البحث والتنقل السريع (Ctrl + K)
function QuickCommandPalette({ isOpen, onClose, courses }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose("open");
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredCourses = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(query.toLowerCase()) ||
      c.instructor?.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (path) => {
    onClose();
    setQuery("");
    navigate(path);
  };

  return (
    <div
      onClick={() => onClose()}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-toast"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-5 h-5 text-emerald-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن كورس، محاضر، أو انتقل لصفحة..."
            className="w-full bg-transparent text-sm font-bold text-neutral-950 dark:text-white focus:outline-none"
          />
          <button
            onClick={() => onClose()}
            className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-950 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-3 space-y-4">
          <div>
            <span className="block px-3 pb-1.5 text-[11px] font-bold text-neutral-400">
              الكورسات المتاحة ({filteredCourses.length})
            </span>
            <div className="space-y-1">
              {filteredCourses.slice(0, 4).map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleSelect(`/courses/${course.id}`)}
                  className="w-full p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800/80 flex items-center justify-between text-right transition cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs font-black text-neutral-900 dark:text-white">
                        {course.title}
                      </p>
                      <span className="text-[10px] text-neutral-400">
                        {course.instructor || "منصة مَدار"}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {course.price} ج.م
                  </span>
                </button>
              ))}
              {filteredCourses.length === 0 && (
                <p className="text-center text-xs text-neutral-400 py-4">
                  لا توجد كورسات مطابقة لبحثك
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-neutral-200 dark:border-neutral-800 pt-3">
            <span className="block px-3 pb-1.5 text-[11px] font-bold text-neutral-400">
              وصول سريع
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSelect("/courses")}
                className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                كل الكورسات
              </button>
              <button
                onClick={() => handleSelect("/wallet")}
                className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                شحن المحفظة
              </button>
              <button
                onClick={() => handleSelect("/dashboard")}
                className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                لوحة التحكم
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 py-2.5 bg-neutral-50 dark:bg-neutral-900/70 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
          <span>اختصار لوحة المفاتيح: Ctrl + K</span>
          <span>اضغط Esc للإغلاق</span>
        </div>
      </div>
    </div>
  );
}

// صفحة بوابة الدفع وشحن المحفظة المتكاملة
function WalletPaymentPage({ currentUser, transactions, onAddBalance, onDemoLogin }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialAmount = Number(searchParams.get("amount")) || 500;

  const [amount, setAmount] = useState(initialAmount);
  const [method, setMethod] = useState("visa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [copiedIpa, setCopiedIpa] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const [walletProvider, setWalletProvider] = useState("فودافون كاش");
  const [walletPhone, setWalletPhone] = useState("");

  const [instaAddress, setInstaAddress] = useState("");
  const [fawryCode] = useState(() => `942-${Math.floor(100000 + Math.random() * 900000)}`);

  const presetAmounts = [100, 250, 500, 850, 1500, 2000];

  const paymentMethods = [
    { id: "visa", name: "بطاقة بنكية", sub: "Visa / MasterCard / ميزة", icon: CreditCard },
    { id: "vodafone", name: "فودافون كاش", sub: "جميع محافظ الهاتف", icon: Smartphone },
    { id: "instapay", name: "إنستا باي", sub: "InstaPay تحويل لحظي", icon: Zap },
    { id: "fawry", name: "فوري باي", sub: "Fawry كود مرجعي", icon: QrCode }
  ];

  const handleCardNumberChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) {
      setCardExpiry(`${digits.slice(0, 2)}/${digits.slice(2)}`);
    } else {
      setCardExpiry(digits);
    }
  };

  const handleCopyInsta = () => {
    navigator.clipboard.writeText("madar.academy@instapay");
    setCopiedIpa(true);
    setTimeout(() => setCopiedIpa(false), 2000);
  };

  const getMethodTitle = () => {
    if (method === "visa") return "بطاقة بنكية (Visa / MasterCard)";
    if (method === "vodafone") return `محفظة إلكترونية (${walletProvider})`;
    if (method === "instapay") return "تحويل لحظي (InstaPay)";
    return "خدمة فوري (Fawry Pay)";
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount < 10) return;

    if (!currentUser) {
      onDemoLogin("student");
    }

    setIsProcessing(true);
    setReceipt(null);

    setTimeout(() => {
      const methodLabel = getMethodTitle();
      onAddBalance(numericAmount, `شحن رصيد عبر ${methodLabel}`);
      setIsProcessing(false);
      setReceipt({
        refId: `PAY-${Date.now().toString().slice(-6)}`,
        amount: numericAmount,
        method: methodLabel,
        time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
        date: new Date().toLocaleDateString("ar-EG")
      });
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-white transition cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <div>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              بوابة الدفع الإلكتروني المؤمنة 🔒
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
              شحن المحفظة ووسائل الدفع
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>معاملات مشفرة وفورية بدون رسوم إضافية</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-7 shadow-2xs">
          {receipt && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3 animate-fade-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>تمت عملية الدفع وشحن الرصيد بنجاح!</span>
                </div>
                <span className="font-mono text-xs bg-white dark:bg-neutral-900 px-2.5 py-1 rounded-lg border border-emerald-500/20 font-bold">
                  #{receipt.refId}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-500/20 text-xs">
                <div>
                  <span className="block text-[10px] text-neutral-500">المبلغ المضاف</span>
                  <strong className="text-emerald-600 dark:text-emerald-400 text-sm">
                    +{receipt.amount} ج.م
                  </strong>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-500">وسيلة الدفع</span>
                  <strong className="text-neutral-900 dark:text-white">{receipt.method}</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-500">التوقيت</span>
                  <strong className="text-neutral-900 dark:text-white">{receipt.time}</strong>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <Link
                  to="/courses"
                  className="px-4 py-2 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold"
                >
                  تصفح الكورسات والاشتراك الآن ←
                </Link>
              </div>
            </div>
          )}

          <form onSubmit={handlePaymentSubmit} className="space-y-7">
            <div className="space-y-3">
              <label className="block text-sm font-black text-neutral-950 dark:text-white">
                1. حدد المبلغ المراد دفعه أو شحنه (بالجنيه المصري):
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="10"
                  max="50000"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="أدخل المبلغ..."
                  className="w-full px-5 py-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border-2 border-neutral-300 dark:border-neutral-800 focus:border-neutral-950 dark:focus:border-white text-2xl font-black text-neutral-950 dark:text-white focus:outline-none transition"
                />
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-sm font-black text-neutral-400">
                  ج.م (EGP)
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      Number(amount) === preset
                        ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950 dark:border-white"
                        : "bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
                    }`}
                  >
                    {preset} ج.م
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-black text-neutral-950 dark:text-white">
                2. اختر طريقة الدفع المناسبة لك:
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {paymentMethods.map((pm) => {
                  const Icon = pm.icon;
                  const isSelected = method === pm.id;
                  return (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setMethod(pm.id)}
                      className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? "border-2 border-neutral-950 dark:border-white bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md"
                          : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 hover:border-neutral-400 text-neutral-900 dark:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Icon className={`w-5 h-5 ${isSelected ? "text-emerald-400 dark:text-emerald-600" : "text-neutral-500"}`} />
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-xs font-black">{pm.name}</p>
                        <span className={`block text-[10px] ${isSelected ? "opacity-80" : "text-neutral-400"}`}>
                          {pm.sub}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 space-y-4">
              {method === "visa" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <span className="text-xs font-black text-neutral-950 dark:text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-500" />
                      بيانات البطاقة البنكية (Visa / MasterCard / Meeza)
                    </span>
                    <span className="text-[10px] font-mono bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded font-bold">
                      3D Secure
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1.5">
                      اسم حامل البطاقة (كما هو مطبوع عليها)
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="MOHAMED EHAB"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs uppercase focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1.5">
                      رقم البطاقة المكون من 16 رقماً
                    </label>
                    <input
                      type="text"
                      required
                      dir="ltr"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4532 •••• •••• ••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-sm font-mono tracking-widest text-left focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1.5">
                        تاريخ الانتهاء (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        dir="ltr"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="08/29"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs font-mono text-center focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1.5">
                        الرمز السري (CVV)
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        dir="ltr"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ""))}
                        placeholder="•••"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs font-mono text-center focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {method === "vodafone" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <span className="text-xs font-black text-neutral-950 dark:text-white flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-red-500" />
                      الدفع عبر المحافظ الإلكترونية (فودافون كاش / اتصالات / أورنج / WE)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["فودافون كاش", "اتصالات كاش", "أورنج كاش", "WE Pay"].map((prov) => (
                      <button
                        key={prov}
                        type="button"
                        onClick={() => setWalletProvider(prov)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          walletProvider === prov
                            ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 border-neutral-950 dark:border-white"
                            : "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                        }`}
                      >
                        {prov}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1.5">
                      رقم الموبايل المسجل عليه المحفظة
                    </label>
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      maxLength={11}
                      value={walletPhone}
                      onChange={(e) => setWalletPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="010XXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-sm font-mono tracking-wider text-left focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                    />
                  </div>
                </div>
              )}

              {method === "instapay" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <span className="text-xs font-black text-neutral-950 dark:text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500" />
                      التحويل اللحظي عبر تطبيق إنستا باي (InstaPay)
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[10px] text-neutral-400">
                        عنوان الدفع اللحظي الخاص بالمنصة (IPA)
                      </span>
                      <strong className="font-mono text-xs sm:text-sm text-neutral-950 dark:text-white">
                        madar.academy@instapay
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyInsta}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedIpa ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          تم النسخ
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          نسخ العنوان
                        </>
                      )}
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 mb-1.5">
                      أدخل عنوان InstaPay الخاص بك أو رقم هاتفك لتأكيد التحويل
                    </label>
                    <input
                      type="text"
                      required
                      dir="ltr"
                      value={instaAddress}
                      onChange={(e) => setInstaAddress(e.target.value)}
                      placeholder="username@instapay  أو  010XXXXXXXX"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs font-mono text-left focus:outline-none focus:border-neutral-950 dark:focus:border-white"
                    />
                  </div>
                </div>
              )}

              {method === "fawry" && (
                <div className="space-y-4 text-center py-2">
                  <p className="text-xs text-neutral-500">
                    استخدم الكود المرجعي التالي للسداد عبر أي ماكينة فوري أو تطبيق MyFawry (كود الخدمة: <strong className="text-neutral-950 dark:text-white">788</strong>):
                  </p>
                  <div className="py-3 px-6 rounded-2xl bg-white dark:bg-neutral-950 border-2 border-dashed border-neutral-300 dark:border-neutral-700 inline-block">
                    <span className="block text-[10px] text-neutral-400 mb-0.5">رقم فوري المرجعي</span>
                    <strong className="font-mono text-xl font-black tracking-widest text-neutral-950 dark:text-white">
                      {fawryCode}
                    </strong>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-black text-sm flex items-center justify-center gap-2.5 transition shadow-lg cursor-pointer disabled:opacity-60"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  جاري تأكيد عملية الدفع وإضافة الرصيد...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  إتمام الدفع وشحن {amount || 0} ج.م الآن ({getMethodTitle()})
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-3xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/15 dark:bg-neutral-950/10 flex items-center justify-center font-black">
                  م
                </div>
                <span className="font-black text-sm tracking-wide">MADAR PAY WALLET</span>
              </div>
              <Wallet className="w-6 h-6 text-emerald-400 dark:text-emerald-600" />
            </div>

            <div className="mb-8">
              <span className="block text-xs opacity-70 mb-1">الرصيد الحالي المتاح للشراء</span>
              <div className="text-4xl font-black tracking-tight flex items-baseline gap-2">
                <span>{currentUser?.walletBalance ?? 0}</span>
                <span className="text-sm font-bold text-emerald-400 dark:text-emerald-600">
                  ج.م (EGP)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/15 dark:border-neutral-950/15 text-xs">
              <div>
                <span className="block text-[10px] opacity-60">صاحب المحفظة</span>
                <strong className="font-bold">{currentUser?.name || "حساب طالب (يتفعل فور الشحن)"}</strong>
              </div>
              <div className="text-left font-mono">
                <span className="block text-[10px] opacity-60">رقم المحفظة</span>
                <strong>•••• 2026</strong>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-black text-neutral-950 dark:text-white flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              سجل المعاملات والفواتير ({transactions.length})
            </h3>

            <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          tx.type === "credit"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {tx.type === "credit" ? (
                          <ArrowDownLeft className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-neutral-900 dark:text-neutral-100">
                          {tx.label}
                        </p>
                        <span className="text-[10px] text-neutral-400">{tx.date}</span>
                      </div>
                    </div>

                    <span
                      className={`font-mono font-black shrink-0 ${
                        tx.type === "credit"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-500"
                      }`}
                    >
                      {tx.type === "credit" ? `+${tx.amount}` : `-${tx.amount}`} ج.م
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-xs text-neutral-400 py-6">
                  لا توجد معاملات مالية مسجلة حتى الآن
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("lms_courses_v2");
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [accessCodes, setAccessCodes] = useState(() => {
    const saved = localStorage.getItem("lms_codes");
    return saved ? JSON.parse(saved) : INITIAL_ACCESS_CODES;
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem("lms_registered_users");
    return saved ? JSON.parse(saved) : [DEMO_USERS.student, DEMO_USERS.instructor];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("lms_user");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.walletBalance === undefined) parsed.walletBalance = 1200;
      return parsed;
    }
    return null;
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("lms_wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("lms_transactions");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            type: "credit",
            amount: 1200,
            label: "رصيد افتراضي لحساب المعاينة",
            date: "اليوم"
          }
        ];
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("lms_notifs");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "مرحباً بك في منصة مَدار! اضغط Ctrl + K للبحث السريع في أي وقت.",
            time: "الآن",
            read: false
          }
        ];
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("lms_theme") === "dark";
  });

  // حالات المميزات التفاعلية الجديدة
  const [liveToast, setLiveToast] = useState(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("lms_courses_v2", JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem("lms_codes", JSON.stringify(accessCodes));
  }, [accessCodes]);

  useEffect(() => {
    localStorage.setItem("lms_registered_users", JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem("lms_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("lms_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("lms_notifs", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("lms_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("lms_user");
    }
  }, [currentUser]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("lms_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("lms_theme", "light");
    }
  }, [darkMode]);

  const pushNotification = (title) => {
    const newNotif = { id: Date.now(), title, time: "الآن", read: false };
    setNotifications((prev) => [newNotif, ...prev]);
    setLiveToast(newNotif);
    setTimeout(() => {
      setLiveToast((current) => (current?.id === newNotif.id ? null : current));
    }, 4000);
  };

  const logTransaction = (type, amount, label) => {
    setTransactions((prev) => [
      {
        id: Date.now(),
        type,
        amount,
        label,
        date: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
      },
      ...prev
    ]);
  };

  const handleDemoLogin = (role) => {
    const targetRole = role === "instructor" || role === "admin" ? role : "student";
    setCurrentUser(DEMO_USERS[targetRole]);
    pushNotification(`تم تسجيل الدخول بحساب (${DEMO_USERS[targetRole].name})`);
  };

  const handleCustomAuth = ({ mode, name, email, password, role }) => {
    const cleanEmail = (email || "").toLowerCase().trim();

    if (mode === "register") {
      const existing = registeredUsers.find((u) => u.email === cleanEmail);
      if (existing) {
        pushNotification("البريد الإلكتروني مسجل مسبقاً! يمكنك تسجيل الدخول مباشرة.");
        return;
      }
      const newUser = {
        id: `u-${Date.now()}`,
        name: name || "طالب مَدار",
        email: cleanEmail,
        password: password || "123456",
        role: role === "instructor" ? "instructor" : "student",
        walletBalance: 200,
        enrolledCourses: ["course-1"],
        completedLessons: [],
        examScores: {}
      };
      const updatedList = [...registeredUsers, newUser];
      setRegisteredUsers(updatedList);
      setCurrentUser(newUser);
      logTransaction("credit", 200, "هدية ترحيبية لإنشاء حساب جديد");
      pushNotification(`مرحباً بك يا ${newUser.name}! تم إنشاء حسابك وإضافة 200 ج.م هدية 🎉`);
    } else {
      const found = registeredUsers.find((u) => u.email === cleanEmail);
      if (found) {
        setCurrentUser(found);
        pushNotification(`مرحباً بعودتك يا ${found.name}!`);
      } else {
        const fallbackUser = {
          id: `u-${Date.now()}`,
          name: name || cleanEmail.split("@")[0] || "طالب مَدار",
          email: cleanEmail,
          role: cleanEmail.includes("instructor") || cleanEmail.includes("admin") ? "instructor" : "student",
          walletBalance: 500,
          enrolledCourses: ["course-1"],
          completedLessons: [],
          examScores: {}
        };
        setCurrentUser(fallbackUser);
        pushNotification(`مرحباً بعودتك يا ${fallbackUser.name}!`);
      }
    }
  };

  const handleUpdateProfileName = (newName) => {
    if (!currentUser) return;
    const updated = { ...currentUser, name: newName };
    setCurrentUser(updated);
    setRegisteredUsers(registeredUsers.map((u) => (u.id === currentUser.id ? updated : u)));
    pushNotification(`تم تحديث اسمك على المنصة والشهادات إلى: ${newName}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    pushNotification("تم تسجيل الخروج بنجاح");
  };

  const handleAddBalance = (amount, customLabel) => {
    const targetUser = currentUser || DEMO_USERS.student;
    const numericAmount = Number(amount) || 0;
    const updated = {
      ...targetUser,
      walletBalance: (targetUser.walletBalance || 0) + numericAmount
    };
    setCurrentUser(updated);
    setRegisteredUsers(registeredUsers.map((u) => (u.id === targetUser.id ? updated : u)));
    const labelText = customLabel || "شحن مباشر لرصيد المحفظة";
    logTransaction("credit", numericAmount, labelText);
    pushNotification(`تم ${labelText} بمبلغ +${numericAmount} ج.م بنجاح`);
  };

  const handleToggleWishlist = (courseId) => {
    const exists = wishlist.includes(courseId);
    const updated = exists
      ? wishlist.filter((id) => id !== courseId)
      : [...wishlist, courseId];
    setWishlist(updated);
    pushNotification(exists ? "تمت إزالة الكورس من المفضلة" : "تمت إضافة الكورس إلى المفضلة ❤️");
  };

  const handleEnrollWithWallet = (course) => {
    if ((currentUser.walletBalance || 0) < course.price) {
      return {
        success: false,
        message: "رصيد المحفظة غير كافٍ! اضغط على زر (شحن الرصيد) بالأسفل لشحن محفظتك."
      };
    }

    const updated = {
      ...currentUser,
      walletBalance: currentUser.walletBalance - course.price,
      enrolledCourses: [...new Set([...(currentUser.enrolledCourses || []), course.id])]
    };

    setCurrentUser(updated);
    setRegisteredUsers(registeredUsers.map((u) => (u.id === currentUser.id ? updated : u)));

    logTransaction("debit", course.price, `شراء كورس: ${course.title}`);
    pushNotification(`تم الاشتراك في (${course.title}) عبر المحفظة`);
    return {
      success: true,
      message: `تم خصم ${course.price} ج.م من محفظتك وفتح الكورس بنجاح!`
    };
  };

  const handleToggleLessonComplete = (lessonId) => {
    if (!currentUser) return;
    const completed = currentUser.completedLessons || [];
    const exists = completed.includes(lessonId);

    const updated = {
      ...currentUser,
      completedLessons: exists
        ? completed.filter((id) => id !== lessonId)
        : [...completed, lessonId]
    };
    setCurrentUser(updated);
    setRegisteredUsers(registeredUsers.map((u) => (u.id === currentUser.id ? updated : u)));
    if (!exists) pushNotification("عاش! أتممت محاضرة جديدة بنجاح ✅");
  };

  const handleSaveExamScore = (courseId, resultData) => {
    if (!currentUser) return;
    const updated = {
      ...currentUser,
      examScores: {
        ...(currentUser.examScores || {}),
        [courseId]: resultData
      }
    };
    setCurrentUser(updated);
    setRegisteredUsers(registeredUsers.map((u) => (u.id === currentUser.id ? updated : u)));
    pushNotification(`أنهيت الاختبار بنتيجة ${resultData.scorePercent}% وتم تحديث لوحة الشرف`);
  };

  const handleAddCourse = (courseData) => {
    const newId = `course-${Date.now()}`;
    const createdCourse = {
      id: newId,
      ...courseData,
      rating: 5.0,
      studentsCount: 1,
      level: "جميع المستويات",
      chapters: [
        {
          id: `ch-${Date.now()}`,
          title: "الوحدة الأولى: مقدمة وأساسيات الكورس",
          lessons: [
            {
              id: `les-${Date.now()}`,
              title: "1. المحاضرة التمهيدية وخريطة الكورس",
              duration: "15:00",
              isFree: true,
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              pdfName: "ملخص_المحاضرة_الأولى.pdf"
            }
          ]
        }
      ],
      exam: {
        id: `exam-${Date.now()}`,
        title: `امتحان تقييم: ${courseData.title}`,
        durationMinutes: 10,
        passingScore: 50,
        questions: [
          {
            id: `q-${Date.now()}`,
            text: "سؤال تجريبي للتأكد من استيعاب مفاهيم الوحدة الأولى:",
            options: ["الإجابة الأولى (الصحيحة)", "الإجابة الثانية", "الإجابة الثالثة"],
            correctIndex: 0
          }
        ]
      }
    };

    setCourses([createdCourse, ...courses]);
    pushNotification(`تم نشر كورس جديد: ${courseData.title}`);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((c) => c.id !== courseId));
    pushNotification("تم حذف الكورس من المنصة");
  };

  const handleAddLessonToCourse = (courseId, lessonData) => {
    setCourses(
      courses.map((c) => {
        if (c.id !== courseId) return c;
        const updatedChapters = [...c.chapters];
        updatedChapters[0] = {
          ...updatedChapters[0],
          lessons: [
            ...updatedChapters[0].lessons,
            {
              id: `les-${Date.now()}`,
              title: lessonData.title,
              duration: lessonData.duration,
              isFree: false,
              videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
              pdfName: "ملزمة_المحاضرة_الإضافية.pdf"
            }
          ]
        };
        return { ...c, chapters: updatedChapters };
      })
    );
    pushNotification(`تمت إضافة محاضرة (${lessonData.title}) بنجاح`);
  };

  const handleAddQuestionToCourse = (courseId, questionData) => {
    setCourses(
      courses.map((c) => {
        if (c.id !== courseId || !c.exam) return c;
        return {
          ...c,
          exam: {
            ...c.exam,
            questions: [
              ...c.exam.questions,
              {
                id: `q-${Date.now()}`,
                ...questionData
              }
            ]
          }
        };
      })
    );
    pushNotification("تمت إضافة سؤال جديد إلى امتحان الكورس بنجاح");
  };

  return (
    <Router>
      <ScrollToTopOnNavigate />
      <InteractiveScrollWidgets />
      <QuickCommandPalette
        isOpen={isCommandOpen}
        onClose={(action) => setIsCommandOpen(action === "open")}
        courses={courses}
      />

      {/* إشعار حي منبثق (Live Toast) */}
      {liveToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 px-4 py-3.5 rounded-2xl shadow-2xl border border-neutral-800 dark:border-neutral-200 flex items-center gap-3 animate-toast">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 dark:text-emerald-600 flex items-center justify-center shrink-0">
            <BellRing className="w-4 h-4" />
          </div>
          <p className="text-xs font-bold leading-relaxed">{liveToast.title}</p>
          <button
            onClick={() => setLiveToast(null)}
            className="text-neutral-400 hover:text-white dark:hover:text-neutral-900 mr-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="min-h-screen flex flex-col bg-[#FAFAFA] dark:bg-[#0A0A0A] text-neutral-900 dark:text-neutral-100 transition-colors">
        <Navbar
          courses={courses}
          currentUser={currentUser}
          onDemoLogin={handleDemoLogin}
          onLogout={handleLogout}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onAddBalance={handleAddBalance}
          wishlist={wishlist}
          notifications={notifications}
          onClearNotifications={() => setNotifications([])}
          transactions={transactions}
        />

        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  courses={courses}
                  currentUser={currentUser}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                />
              }
            />
            <Route
              path="/courses"
              element={
                <Courses
                  courses={courses}
                  currentUser={currentUser}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                />
              }
            />
            <Route
              path="/courses/:id"
              element={
                <CourseDetails
                  courses={courses}
                  currentUser={currentUser}
                  onEnrollWithWallet={handleEnrollWithWallet}
                />
              }
            />
            <Route
              path="/learn/:id"
              element={
                <CoursePlayer
                  courses={courses}
                  currentUser={currentUser}
                  onToggleLessonComplete={handleToggleLessonComplete}
                />
              }
            />
            <Route
              path="/exam/:id"
              element={
                <ExamPage
                  courses={courses}
                  currentUser={currentUser}
                  onSaveExamScore={handleSaveExamScore}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  courses={courses}
                  currentUser={currentUser}
                  accessCodes={accessCodes}
                  onAddCourse={handleAddCourse}
                  onDeleteCourse={handleDeleteCourse}
                  onAddLessonToCourse={handleAddLessonToCourse}
                  onAddQuestionToCourse={handleAddQuestionToCourse}
                  onUpdateProfileName={handleUpdateProfileName}
                />
              }
            />
            <Route
              path="/wallet"
              element={
                <WalletPaymentPage
                  currentUser={currentUser}
                  transactions={transactions}
                  onAddBalance={handleAddBalance}
                  onDemoLogin={handleDemoLogin}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  onDemoLogin={handleDemoLogin}
                  onCustomAuth={handleCustomAuth}
                />
              }
            />
            <Route
              path="*"
              element={
                <div className="text-center py-24 max-w-md mx-auto space-y-4">
                  <div className="text-6xl font-black text-neutral-300 dark:text-neutral-800">
                    404
                  </div>
                  <h2 className="text-xl font-black text-neutral-950 dark:text-white">
                    الصفحة المطلوبة غير موجودة
                  </h2>
                  <p className="text-xs text-neutral-500">
                    تأكد من صحة الرابط أو ارجع للصفحة الرئيسية لاستعراض الكورسات.
                  </p>
                  <Link
                    to="/"
                    className="inline-block px-6 py-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold"
                  >
                    العودة للصفحة الرئيسية
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
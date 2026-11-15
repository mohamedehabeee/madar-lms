import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  Sun,
  Moon,
  Wallet,
  Plus,
  Bell,
  Bookmark,
  CheckCheck,
  Search,
  ArrowLeft,
  Menu,
  X,
  Sparkles
} from "lucide-react";

export default function Navbar({
  courses = [],
  currentUser,
  onLogout,
  darkMode,
  onToggleDarkMode,
  wishlist = [],
  notifications = [],
  onClearNotifications
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifSeen, setNotifSeen] = useState(false);

  const unreadCount = notifSeen ? 0 : notifications.filter((n) => !n.read).length;

  useEffect(() => {
    setNotifSeen(false);
  }, [notifications.length]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setShowNotifDropdown(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowSearchModal(false);
        setShowNotifDropdown(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCourses = courses
    .filter(
      (c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);

  const isActive = (path) =>
    location.pathname === path
      ? "text-neutral-950 dark:text-white font-black bg-neutral-100 dark:bg-neutral-900 px-3 py-1.5 rounded-xl"
      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white px-3 py-1.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition";

  const handleGoToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    navigate(`/#${sectionId}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-[#0B0B0B]/90 backdrop-blur-xl border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
          
          {/* لوجو مَدار التفاعلي الكبير + الروابط */}
          <div className="flex items-center gap-6 lg:gap-9 shrink-0">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="madar-logo-link group flex items-center gap-3 select-none"
              title="منصة مَدار التعليمية"
            >
              {/* أيقونة شعار مَدار */}
              <div className="relative w-11 h-11 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-2xl flex items-center justify-center font-black text-xl shadow-md group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 shrink-0 overflow-hidden">
                <span>م</span>
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>

              {/* كلمة مَدار بحروف تتفكك وتتركب وتلمع عند مرور الماوس */}
              <div className="flex flex-col">
                <div
                  className="madar-word text-2xl sm:text-3xl font-black tracking-tight text-neutral-950 dark:text-white leading-none"
                  aria-label="مَدار"
                >
                  <span
                    className="madar-char"
                    style={{ "--tx": "14px", "--ty": "-9px", "--rot": "14deg", "--delay": "0s" }}
                  >
                    مَـ
                  </span>
                  <span
                    className="madar-char"
                    style={{ "--tx": "5px", "--ty": "10px", "--rot": "-12deg", "--delay": "0.04s" }}
                  >
                    د
                  </span>
                  <span
                    className="madar-char"
                    style={{ "--tx": "-6px", "--ty": "-11px", "--rot": "10deg", "--delay": "0.08s" }}
                  >
                    ا
                  </span>
                  <span
                    className="madar-char"
                    style={{ "--tx": "-15px", "--ty": "8px", "--rot": "-15deg", "--delay": "0.12s" }}
                  >
                    ر
                  </span>
                  <span
                    className="madar-char text-emerald-500 mr-0.5"
                    style={{ "--tx": "-22px", "--ty": "-10px", "--rot": "30deg", "--delay": "0.16s" }}
                  >
                    .
                  </span>
                </div>
                <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 tracking-wider mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  أكاديمية علوم الحاسب
                </span>
              </div>
            </Link>

            {/* روابط الديسكتوب */}
            <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm font-bold">
              <Link to="/" className={isActive("/")}>
                الرئيسية
              </Link>
              <Link to="/courses" className={isActive("/courses")}>
                الكورسات
              </Link>
              <button
                type="button"
                onClick={() => handleGoToSection("instructors-section")}
                className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white px-3 py-1.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition cursor-pointer"
              >
                المحاضرين
              </button>
              <Link to="/wallet" className={isActive("/wallet")}>
                شحن المحفظة
              </Link>
              {currentUser && (
                <Link to="/dashboard" className={isActive("/dashboard")}>
                  {currentUser.role === "student" ? "لوحة الطالب" : "إدارة المنصة"}
                </Link>
              )}
            </nav>
          </div>

          {/* الأدوات والأيقونات */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* زر البحث */}
            <button
              onClick={() => setShowSearchModal(true)}
              title="بحث في الكورسات (Ctrl + K)"
              className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 text-neutral-700 dark:text-neutral-300 flex items-center gap-2 text-xs font-bold transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">بحث سريع</span>
              <span className="hidden lg:inline-block px-1.5 py-0.5 rounded bg-white dark:bg-neutral-800 text-[10px] font-mono opacity-75 border border-neutral-200 dark:border-neutral-700">
                Ctrl+K
              </span>
            </button>

            {/* الوضع الليلي / النهاري */}
            <button
              onClick={onToggleDarkMode}
              title={darkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
              className="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 transition cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* المحفوظات */}
            <Link
              to="/courses?filter=saved"
              title="الكورسات المحفوظة"
              className="hidden sm:flex relative p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 transition"
            >
              <Bookmark className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-emerald-500 text-neutral-950 text-[10px] font-black flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* جرس الإشعارات */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  setNotifSeen(true);
                }}
                title="الإشعارات"
                className="relative p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 transition cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                )}
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </button>

              {showNotifDropdown && (
                <div className="fixed inset-x-3 top-20 sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-2 sm:w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-up">
                  <div className="p-3.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-black text-neutral-950 dark:text-white">
                      الإشعارات ({notifications.length})
                    </span>
                    {notifications.length > 0 && (
                      <button
                        onClick={() => {
                          onClearNotifications();
                          setShowNotifDropdown(false);
                        }}
                        className="text-[11px] text-neutral-500 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        مسح الكل
                      </button>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
                    {notifications.length > 0 ? (
                      notifications.map((n) => (
                        <div key={n.id} className="p-3.5 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition">
                          <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-neutral-400">{n.time}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-xs text-neutral-400">
                        لا توجد إشعارات حالياً
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* زر المحفظة والدفع */}
            <Link
              to="/wallet"
              title="بوابة الدفع وشحن المحفظة"
              className="flex items-center gap-1.5 sm:gap-2 bg-neutral-100/80 dark:bg-neutral-900 hover:border-emerald-500/50 border border-neutral-200 dark:border-neutral-800 px-2.5 sm:px-3.5 py-2 rounded-xl transition shrink-0"
            >
              <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-black text-neutral-950 dark:text-white whitespace-nowrap">
                {currentUser ? `${currentUser.walletBalance ?? 0} ج.م` : "شحن"}
              </span>
              <span className="hidden xs:flex w-4 h-4 rounded-md bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 items-center justify-center">
                <Plus className="w-3 h-3" />
              </span>
            </Link>

            {/* حساب المستخدم للديسكتوب */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2 bg-neutral-100/80 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-xl">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="hidden lg:block text-right leading-none">
                    <p className="text-xs font-black text-neutral-900 dark:text-white">
                      {currentUser.name}
                    </p>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      {currentUser.role === "student" ? "طالب" : "إدارة"}
                    </span>
                  </div>
                </Link>
                <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700" />
                <button
                  onClick={onLogout}
                  title="تسجيل الخروج"
                  className="text-neutral-500 hover:text-red-600 transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-1.5 bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow-xs"
              >
                <span>دخول</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* زر القائمة على الهاتف */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="القائمة"
              className="md:hidden p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* قائمة الهاتف المنسدلة */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#121212] border-t border-neutral-200 dark:border-neutral-800 px-4 py-4 space-y-3 shadow-xl animate-fade-up">
            {currentUser ? (
              <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-neutral-950 dark:text-white">
                      {currentUser.name}
                    </p>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      الرصيد: {currentUser.walletBalance ?? 0} ج.م
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  خروج
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block w-full py-2.5 text-center rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-black"
              >
                تسجيل الدخول / إنشاء حساب
              </Link>
            )}

            <div className="grid grid-cols-1 gap-1 text-xs font-bold">
              <Link
                to="/"
                className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white flex items-center justify-between"
              >
                <span>الرئيسية</span>
                <ArrowLeft className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
              <Link
                to="/courses"
                className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white flex items-center justify-between"
              >
                <span>جميع الكورسات</span>
                <ArrowLeft className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
              <button
                type="button"
                onClick={() => handleGoToSection("instructors-section")}
                className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white flex items-center justify-between text-right cursor-pointer"
              >
                <span>نخبة المحاضرين</span>
                <ArrowLeft className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <Link
                to="/courses?filter=saved"
                className="p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white flex items-center justify-between"
              >
                <span>الكورسات المحفوظة ({wishlist.length})</span>
                <Bookmark className="w-3.5 h-3.5 text-neutral-400" />
              </Link>
              <Link
                to="/wallet"
                className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 flex items-center justify-between"
              >
                <span>شحن المحفظة والدفع</span>
                <Wallet className="w-3.5 h-3.5" />
              </Link>
              {currentUser && (
                <Link
                  to="/dashboard"
                  className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white flex items-center justify-between"
                >
                  <span>
                    {currentUser.role === "student" ? "لوحة الطالب والشهادات" : "لوحة إدارة المنصة"}
                  </span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* نافذة البحث في الكورسات */}
      {showSearchModal && (
        <div
          onClick={() => setShowSearchModal(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-14 sm:pt-20 p-3 sm:p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-toast"
          >
            <div className="p-3.5 sm:p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
              <Search className="w-4 h-4 text-emerald-500 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="اكتب اسم الكورس أو اسم المحاضر..."
                className="flex-grow bg-transparent text-xs sm:text-sm font-bold text-neutral-950 dark:text-white focus:outline-none"
              />
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-xs font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-2.5 py-1 rounded-lg cursor-pointer"
              >
                إغلاق
              </button>
            </div>

            <div className="p-3.5 sm:p-4 max-h-80 overflow-y-auto space-y-2">
              <p className="text-[11px] font-bold text-neutral-400 mb-2">
                نتائج البحث ({filteredCourses.length})
              </p>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigate(`/courses/${c.id}`);
                      setShowSearchModal(false);
                      setSearchQuery("");
                    }}
                    className="w-full p-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between gap-2 text-right transition cursor-pointer"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-neutral-950 dark:text-white truncate">
                        {c.title}
                      </p>
                      <span className="text-[10px] text-neutral-500">
                        {c.instructor} • {c.category}
                      </span>
                    </div>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                      {c.price} ج.م
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-xs text-neutral-500 py-3 text-center">
                  لا توجد نتائج مطابقة لـ "{searchQuery}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
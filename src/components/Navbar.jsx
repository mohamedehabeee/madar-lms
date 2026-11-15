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
  X
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
      ? "text-neutral-950 dark:text-white font-bold border-b-2 border-neutral-950 dark:border-white py-1"
      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white py-1 transition";

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0F0F0F]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          
          {/* اللوجو والروابط */}
          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-lg flex items-center justify-center font-black text-base sm:text-lg shrink-0">
                م
              </div>
              <span className="text-lg sm:text-xl font-black tracking-tight text-neutral-950 dark:text-white">
                مَدار.
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-5 lg:gap-6 text-sm">
              <Link to="/" className={isActive("/")}>
                الرئيسية
              </Link>
              <Link to="/courses" className={isActive("/courses")}>
                الكورسات
              </Link>
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
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 text-xs font-bold transition cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>بحث</span>
              <span className="hidden lg:inline-block text-[10px] font-mono opacity-60">
                Ctrl+K
              </span>
            </button>

            {/* الوضع الليلي / النهاري */}
            <button
              onClick={onToggleDarkMode}
              title={darkMode ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
              className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* المحفوظات */}
            <Link
              to="/courses?filter=saved"
              title="الكورسات المحفوظة"
              className="hidden sm:flex relative p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 transition"
            >
              <Bookmark className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[10px] font-black flex items-center justify-center">
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
                className="relative p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 transition cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
                )}
              </button>

              {showNotifDropdown && (
                <div className="fixed inset-x-3 top-18 sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-2 sm:w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-50">
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
              className="flex items-center gap-1.5 sm:gap-2 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 px-2 sm:px-3 py-1.5 rounded-lg transition shrink-0"
            >
              <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-[11px] sm:text-xs font-extrabold text-neutral-950 dark:text-white whitespace-nowrap">
                {currentUser ? `${currentUser.walletBalance ?? 0} ج.م` : "شحن"}
              </span>
              <span className="hidden xs:flex w-4 h-4 rounded bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 items-center justify-center">
                <Plus className="w-3 h-3" />
              </span>
            </Link>

            {/* حساب المستخدم للديسكتوب */}
            {currentUser ? (
              <div className="hidden sm:flex items-center gap-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1.5 rounded-lg">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="hidden lg:block text-right leading-none">
                    <p className="text-xs font-bold text-neutral-900 dark:text-white">
                      {currentUser.name}
                    </p>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                      {currentUser.role === "student" ? "طالب" : "إدارة"}
                    </span>
                  </div>
                </Link>
                <div className="h-4 w-[1px] bg-neutral-300 dark:bg-neutral-700"></div>
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
                className="hidden sm:inline-block bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 text-xs sm:text-sm font-bold px-3.5 py-2 rounded-lg transition"
              >
                دخول
              </Link>
            )}

            {/* زر القائمة على الهاتف */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="القائمة"
              className="md:hidden p-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* قائمة الهاتف المنسدلة */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#121212] border-t border-neutral-200 dark:border-neutral-800 px-4 py-4 space-y-3 shadow-xl">
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
            className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden"
          >
            <div className="p-3.5 sm:p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="اكتب اسم الكورس أو اسم المحاضر..."
                className="flex-grow bg-transparent text-xs sm:text-sm text-neutral-950 dark:text-white focus:outline-none"
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
                    <span className="text-xs font-black text-neutral-900 dark:text-white shrink-0">
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
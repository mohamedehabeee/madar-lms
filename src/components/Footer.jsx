import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="bg-white dark:bg-[#0D0D0D] border-t border-neutral-200 dark:border-neutral-800 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* عن المنصة */}
          <div className="lg:col-span-5 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-lg flex items-center justify-center font-black text-base">
                م
              </div>
              <span className="text-xl font-black tracking-tight text-neutral-950 dark:text-white">
                مَدار.
              </span>
            </Link>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              منصة تعليمية للمحاضرات المسجلة والمراجعات النهائية في علوم الحاسب، تطوير الويب، والمواد الأكاديمية.
            </p>
          </div>

          {/* الأقسام */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-black text-neutral-950 dark:text-white">
              التخصصات
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
              <li>
                <Link to="/courses" className="hover:text-neutral-950 dark:hover:text-white transition">
                  برمجة وتطوير الويب
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-neutral-950 dark:hover:text-white transition">
                  علوم الحاسب وهياكل البيانات
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-neutral-950 dark:hover:text-white transition">
                  مواد أكاديمية وثانوية
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-neutral-950 dark:hover:text-white transition">
                  نظم المعلومات الجغرافية (GIS)
                </Link>
              </li>
            </ul>
          </div>

          {/* صفحات الموقع */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-black text-neutral-950 dark:text-white">
              حساب الطالب
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
              <li>
                <Link to="/courses" className="hover:text-neutral-950 dark:hover:text-white transition">
                  كل الكورسات
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-neutral-950 dark:hover:text-white transition">
                  لوحة الطالب والشهادات
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="hover:text-neutral-950 dark:hover:text-white transition">
                  شحن المحفظة والدفع
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-neutral-950 dark:hover:text-white transition">
                  تسجيل الدخول
                </Link>
              </li>
            </ul>
          </div>

          {/* وسائل الدفع */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs font-black text-neutral-950 dark:text-white">
              طرق الدفع المتاحة
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
              <li>البطاقات البنكية (Visa / ميزة)</li>
              <li>فودافون كاش ومحافظ الهاتف</li>
              <li>تحويل إنستا باي (InstaPay)</li>
              <li>خدمة فوري (Fawry)</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-neutral-200 dark:border-neutral-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
            <p>جميع الحقوق محفوظة © {new Date().getFullYear()} منصة مَدار التعليمية.</p>
            <div className="flex items-center gap-5">
              <Link to="/courses" className="hover:text-neutral-900 dark:hover:text-white">
                الكورسات
              </Link>
              <Link to="/wallet" className="hover:text-neutral-900 dark:hover:text-white">
                بوابة الدفع
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* زر بسيط للصعود لأعلى الصفحة عند النزول */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="أعلى الصفحة"
          className="fixed bottom-5 left-5 z-40 w-10 h-10 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-md flex items-center justify-center cursor-pointer hover:opacity-90 transition"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowUpLeft,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Zap,
  QrCode,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Users,
  Layers
} from "lucide-react";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  // دالة الانتقال الذكي إلى السكشن المقصود بالظبط مع تمرير التخصص إن وجد
  const goToExactSection = (sectionId, categoryFilter = null) => {
    const targetUrl = categoryFilter
      ? `/?cat=${encodeURIComponent(categoryFilter)}#${sectionId}`
      : `/#${sectionId}`;

    if (location.pathname === "/" && !categoryFilter) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    navigate(targetUrl);
  };

  return (
    <footer className="bg-white dark:bg-[#0B0B0B] border-t border-neutral-200 dark:border-neutral-800/90 mt-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-200 dark:border-neutral-800/80">
          
          {/* 1. هوية منصة مَدار */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="madar-logo-link group inline-flex items-center gap-3 select-none"
            >
              <div className="w-10 h-10 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 rounded-xl flex items-center justify-center font-black text-lg shadow-xs">
                م
              </div>
              <div className="madar-word text-2xl font-black tracking-tight text-neutral-950 dark:text-white">
                <span className="madar-char" style={{ "--tx": "10px", "--ty": "-6px", "--rot": "10deg" }}>مَـ</span>
                <span className="madar-char" style={{ "--tx": "4px", "--ty": "8px", "--rot": "-10deg" }}>د</span>
                <span className="madar-char" style={{ "--tx": "-5px", "--ty": "-8px", "--rot": "8deg" }}>ا</span>
                <span className="madar-char" style={{ "--tx": "-12px", "--ty": "6px", "--rot": "-12deg" }}>ر</span>
                <span className="madar-char text-emerald-500" style={{ "--tx": "-16px", "--ty": "-8px", "--rot": "20deg" }}>.</span>
              </div>
            </Link>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              منصة تعليمية متكاملة للمحاضرات المسجلة، ملازم الـ PDF، والامتحانات التفاعلية في علوم الحاسب، البرمجة، والمواد الأكاديمية.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>شهادات إتمام معتمدة وامتحانات مصححة تلقائياً</span>
            </div>
          </div>

          {/* 2. أقسام الصفحة الرئيسية (توديك للسكشن بالظبط) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-neutral-950 dark:text-white tracking-wide">
              أقسام المنصة السريعة
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-neutral-500 dark:text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => goToExactSection("courses-section", "الكل")}
                  className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-2 transition cursor-pointer group"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                  <span>سكشن الكورسات المتاحة</span>
                  <ArrowUpLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToExactSection("study-system")}
                  className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-2 transition cursor-pointer group"
                >
                  <Layers className="w-3.5 h-3.5 text-emerald-500" />
                  <span>نظام الدراسة على المنصة</span>
                  <ArrowUpLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToExactSection("instructors-section")}
                  className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-2 transition cursor-pointer group"
                >
                  <Users className="w-3.5 h-3.5 text-emerald-500" />
                  <span>نخبة المحاضرين بالمنصة</span>
                  <ArrowUpLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToExactSection("faq-section")}
                  className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-2 transition cursor-pointer group"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الأسئلة المتكررة للطلاب</span>
                  <ArrowUpLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            </ul>
          </div>

          {/* 3. التخصصات الدراسية (توديك لسكشن الكورسات وتفلتر التخصص المختار فوراً) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-neutral-950 dark:text-white tracking-wide">
              التخصصات الدراسية
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-neutral-500 dark:text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => goToExactSection("courses-section", "برمجة وتطوير")}
                  className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-1.5 transition cursor-pointer group"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                  <span>برمجة وتطوير الويب</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToExactSection("courses-section", "علوم الحاسب")}
                  className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-1.5 transition cursor-pointer group"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                  <span>علوم الحاسب وهياكل البيانات</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToExactSection("courses-section", "مواد أكاديمية")}
                  className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-1.5 transition cursor-pointer group"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                  <span>المواد الأكاديمية والإنسانية</span>
                </button>
              </li>
              <li>
                <Link
                  to="/courses?q=GIS"
                  className="hover:text-neutral-950 dark:hover:text-white flex items-center gap-1.5 transition group"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-500 transition-colors" />
                  <span>نظم المعلومات الجغرافية (GIS)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. بوابة الطالب ووسائل الدفع المباشرة */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-neutral-950 dark:text-white tracking-wide">
              حساب الطالب والدفع
            </h4>
            <ul className="space-y-2.5 text-xs font-bold text-neutral-500 dark:text-neutral-400">
              <li>
                <Link to="/dashboard" className="hover:text-neutral-950 dark:hover:text-white transition block">
                  لوحة الطالب والشهادات
                </Link>
              </li>
              <li>
                <Link to="/courses?filter=saved" className="hover:text-neutral-950 dark:hover:text-white transition block">
                  الكورسات المحفوظة
                </Link>
              </li>
              <li>
                <Link to="/wallet" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition block">
                  شحن المحفظة الإلكترونية
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-neutral-950 dark:hover:text-white transition block">
                  تسجيل الدخول / حساب جديد
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* شريط وسائل الدفع التفاعلي (الضغط على أي وسيلة يفتح بوابة الدفع مباشرة) */}
        <div className="py-6 border-b border-neutral-200 dark:border-neutral-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="text-xs font-black text-neutral-700 dark:text-neutral-300">
            وسائل الدفع والشحن الفوري المتاحة (اضغط للشحن):
          </span>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/wallet?method=visa"
              className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:border-neutral-950 dark:hover:border-white border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
              <span>بطاقة بنكية (Visa / ميزة)</span>
            </Link>

            <Link
              to="/wallet?method=vodafone"
              className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:border-neutral-950 dark:hover:border-white border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition"
            >
              <Smartphone className="w-3.5 h-3.5 text-red-500" />
              <span>فودافون كاش ومحافظ الهاتف</span>
            </Link>

            <Link
              to="/wallet?method=instapay"
              className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:border-neutral-950 dark:hover:border-white border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>تحويل إنستا باي (InstaPay)</span>
            </Link>

            <Link
              to="/wallet?method=fawry"
              className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:border-neutral-950 dark:hover:border-white border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 transition"
            >
              <QrCode className="w-3.5 h-3.5 text-emerald-500" />
              <span>كود فوري (Fawry Pay)</span>
            </Link>
          </div>
        </div>

        {/* حقوق الملكية والروابط السفلية */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p className="font-bold">
            جميع الحقوق محفوظة © {new Date().getFullYear()} منصة مَدار التعليمية.
          </p>
          <div className="flex items-center gap-5 font-bold">
            <button
              type="button"
              onClick={() => goToExactSection("courses-section")}
              className="hover:text-neutral-950 dark:hover:text-white cursor-pointer"
            >
              الكورسات
            </button>
            <button
              type="button"
              onClick={() => goToExactSection("instructors-section")}
              className="hover:text-neutral-950 dark:hover:text-white cursor-pointer"
            >
              المحاضرين
            </button>
            <button
              type="button"
              onClick={() => goToExactSection("faq-section")}
              className="hover:text-neutral-950 dark:hover:text-white cursor-pointer"
            >
              الأسئلة الشائعة
            </button>
            <Link to="/wallet" className="hover:text-neutral-950 dark:hover:text-white">
              بوابة الدفع
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
import { Link } from "react-router-dom";
import { Clock, Star, CheckCircle2, ArrowLeft, Bookmark, Layers } from "lucide-react";

export default function CourseCard({
  course,
  isEnrolled,
  isSaved = false,
  onToggleWishlist
}) {
  const lessonsCount = course.chapters
    ? course.chapters.flatMap((ch) => ch.lessons).length
    : 2;

  return (
    <div className="group w-full h-full bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-neutral-400 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 sm:hover:-translate-y-1.5 hover:shadow-xl hover:shadow-neutral-950/5 dark:hover:shadow-black/40">
      
      {/* صورة الكورس والقسم وزرار الحفظ */}
      <div className="relative h-40 sm:h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-900 shrink-0">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-2.5 right-2.5 bg-white/95 dark:bg-neutral-950/90 backdrop-blur-xs text-neutral-900 dark:text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 shadow-xs">
          {course.category}
        </div>

        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {isEnrolled && (
            <div className="bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              مشترك
            </div>
          )}
          {onToggleWishlist && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleWishlist(course.id);
              }}
              title={isSaved ? "إزالة من المحفوظات" : "حفظ الكورس لوقت لاحق"}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border transition-transform active:scale-90 cursor-pointer shadow-xs ${
                isSaved
                  ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950"
                  : "bg-white/90 dark:bg-neutral-950/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:scale-105"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
          )}
        </div>

        <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
          <Layers className="w-3 h-3 text-emerald-400" />
          {lessonsCount} محاضرات + امتحان
        </div>
      </div>

      {/* تفاصيل الكورس */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mb-2">
            <span className="flex items-center gap-1 font-bold text-neutral-800 dark:text-neutral-200">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400 text-amber-400" />
              {course.rating}
              <span className="text-neutral-400 font-normal hidden xs:inline">({course.studentsCount} طالب)</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {course.duration}
            </span>
          </div>

          <Link to={`/courses/${course.id}`}>
            <h3 className="text-sm sm:text-base font-extrabold text-neutral-950 dark:text-white mb-1.5 leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {course.title}
            </h3>
          </Link>

          <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mb-4">
            المحاضر: <strong className="text-neutral-800 dark:text-neutral-200">{course.instructor}</strong>
          </p>
        </div>

        {/* السعر وزرار الدخول */}
        <div className="pt-3 sm:pt-4 border-t border-neutral-100 dark:border-neutral-800/80 mt-auto">
          {isEnrolled ? (
            <Link
              to={`/learn/${course.id}`}
              className="w-full py-2 sm:py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-950 text-neutral-950 dark:text-white font-bold text-[11px] sm:text-xs flex items-center justify-center gap-1.5 sm:gap-2 transition-all shadow-sm"
            >
              متابعة المحاضرات
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            </Link>
          ) : (
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-wide">الاشتراك</span>
                <span className="text-sm sm:text-lg font-black text-neutral-950 dark:text-white leading-none mt-0.5">
                  {course.price} <span className="text-[10px] sm:text-xs font-bold">ج.م</span>
                </span>
              </div>
              <Link
                to={`/courses/${course.id}`}
                className="py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-[11px] sm:text-xs flex items-center gap-1 sm:gap-1.5 transition-all shadow-md shrink-0"
              >
                دخول الكورس
                <ArrowLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:-translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
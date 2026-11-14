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
    <div className="group bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-neutral-400 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-neutral-950/5 dark:hover:shadow-black/40">
      
      {/* صورة الكورس والقسم وزرار الحفظ */}
      <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 right-3 bg-white/95 dark:bg-neutral-950/90 backdrop-blur-xs text-neutral-900 dark:text-white text-[11px] font-bold px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800">
          {course.category}
        </div>

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {isEnrolled && (
            <div className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              مشترك
            </div>
          )}
          {onToggleWishlist && (
            <button
              onClick={() => onToggleWishlist(course.id)}
              title={isSaved ? "إزالة من المحفوظات" : "حفظ الكورس لوقت لاحق"}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-transform active:scale-90 cursor-pointer ${
                isSaved
                  ? "bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950"
                  : "bg-white/90 dark:bg-neutral-950/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:scale-105"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
            </button>
          )}
        </div>

        {/* شارة عدد المحاضرات تظهر أسفل الصورة */}
        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
          <Layers className="w-3 h-3 text-emerald-400" />
          {lessonsCount} محاضرات + امتحان
        </div>
      </div>

      {/* تفاصيل الكورس */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-2.5">
            <span className="flex items-center gap-1 font-bold text-neutral-800 dark:text-neutral-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {course.rating}
              <span className="text-neutral-400 font-normal">({course.studentsCount} طالب)</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
          </div>

          <Link to={`/courses/${course.id}`}>
            <h3 className="text-base font-extrabold text-neutral-950 dark:text-white mb-2 line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {course.title}
            </h3>
          </Link>

          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
            تقديم: <strong className="text-neutral-800 dark:text-neutral-200">{course.instructor}</strong>
          </p>
        </div>

        {/* السعر وزرار الدخول */}
        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
          {isEnrolled ? (
            <Link
              to={`/learn/${course.id}`}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-950 text-neutral-950 dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              استكمال المذاكرة
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          ) : (
            <>
              <div>
                <span className="block text-[10px] text-neutral-400">سعر الاشتراك</span>
                <span className="text-lg font-black text-neutral-950 dark:text-white">
                  {course.price} <span className="text-xs font-bold">ج.م</span>
                </span>
              </div>
              <Link
                to={`/courses/${course.id}`}
                className="py-2.5 px-4 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all"
              >
                تفاصيل الكورس
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              </Link>
            </>
          )}
        </div>
      </div>

    </div>
  );
}
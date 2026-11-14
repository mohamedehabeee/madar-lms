import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Clock,
  Star,
  Lock,
  PlayCircle,
  CheckCircle2,
  Wallet,
  FileQuestion,
  AlertCircle,
  MessageSquarePlus,
  Award,
  FileText,
  Infinity,
  CreditCard,
  Share2,
  Check
} from "lucide-react";

export default function CourseDetails({
  courses,
  currentUser,
  onEnrollWithWallet
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [linkCopied, setLinkCopied] = useState(false);

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`lms_reviews_${id}`);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "محمود عبد العزيز",
            rating: 5,
            date: "منذ 3 أيام",
            comment: "من أفضل الكورسات اللي حضرتها، التقسيمة واضحة جداً والامتحان اللي بعد الشرح بيثبت المعلومة."
          },
          {
            id: 2,
            name: "مريم سامي",
            rating: 5,
            date: "منذ أسبوع",
            comment: "ملازم الـ PDF ملخصة كل حاجة، والشرح عملي ومنظم."
          }
        ];
  });

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    localStorage.setItem(`lms_reviews_${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  const course = courses.find((c) => c.id === id);

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-4">الكورس غير موجود</h2>
        <Link to="/courses" className="underline text-sm font-bold">
          العودة لجميع الكورسات
        </Link>
      </div>
    );
  }

  const isEnrolled = currentUser?.enrolledCourses?.includes(course.id);
  const userBalance = currentUser?.walletBalance ?? 0;
  const hasEnoughBalance = userBalance >= course.price;

  // نسخ رابط الكورس للمشاركة
  const handleCopyCourseLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleWalletPay = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    const result = onEnrollWithWallet(course);
    setFeedback({
      type: result.success ? "success" : "error",
      message: result.message
    });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added = {
      id: Date.now(),
      name: currentUser?.name || "طالب بالمنصة",
      rating: newRating,
      date: "الآن",
      comment: newComment.trim()
    };

    setReviews([added, ...reviews]);
    setNewComment("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fade-up">
      
      {/* العمود الأيمن: تفاصيل الكورس + المنهج + تقييمات الطلاب */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* 1. هيدر الكورس مع زر نسخ الرابط */}
        <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="inline-block bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 text-xs font-bold px-3 py-1 rounded-md border border-neutral-200 dark:border-neutral-800">
              {course.category}
            </span>

            {/* زر مشاركة الكورس ونسخ الرابط */}
            <button
              type="button"
              onClick={handleCopyCourseLink}
              className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 transition cursor-pointer"
            >
              {linkCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">تم نسخ الرابط</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>نسخ رابط الكورس</span>
                </>
              )}
            </button>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white mb-4 leading-snug">
            {course.title}
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-6">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <span>
              المحاضر: <strong className="text-neutral-900 dark:text-white">{course.instructor}</strong>
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <strong className="text-neutral-900 dark:text-white">{course.rating}</strong> ({course.studentsCount} طالب)
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
          </div>
        </div>

        {/* 2. محتوى المنهج والمحاضرات */}
        <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-black text-neutral-950 dark:text-white mb-5">
            محتوى الكورس والمحاضرات
          </h2>

          <div className="space-y-4">
            {course.chapters.map((chapter) => (
              <div
                key={chapter.id}
                className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
              >
                <div className="bg-neutral-50 dark:bg-neutral-900/60 px-4 py-3 font-bold text-sm text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">
                  {chapter.title}
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-neutral-800/70">
                  {chapter.lessons.map((lesson) => {
                    const canWatch = isEnrolled || lesson.isFree;
                    return (
                      <div
                        key={lesson.id}
                        className="p-4 flex items-center justify-between gap-4 hover:bg-neutral-50/60 dark:hover:bg-neutral-900/30 transition"
                      >
                        <div className="flex items-center gap-3">
                          {canWatch ? (
                            <PlayCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          ) : (
                            <Lock className="w-4 h-4 text-neutral-400 shrink-0" />
                          )}
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100">
                              {lesson.title}
                            </p>
                            <span className="text-[11px] text-neutral-400">
                              المدة: {lesson.duration} دقيقة
                            </span>
                          </div>
                        </div>

                        {canWatch ? (
                          <Link
                            to={`/learn/${course.id}?lesson=${lesson.id}`}
                            className="px-3 py-1.5 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold shrink-0"
                          >
                            {isEnrolled ? "مشاهدة" : "معاينة مجانية"}
                          </Link>
                        ) : (
                          <span className="text-[11px] text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-md">
                            مغلق للمشتركين
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {course.exam && (
              <div className="border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileQuestion className="w-5 h-5 text-neutral-900 dark:text-white" />
                  <div>
                    <p className="text-sm font-black text-neutral-950 dark:text-white">
                      {course.exam.title}
                    </p>
                    <p className="text-xs text-neutral-500">
                      المدة: {course.exam.durationMinutes} دقائق • درجة النجاح: {course.exam.passingScore}%
                    </p>
                  </div>
                </div>

                {isEnrolled ? (
                  <Link
                    to={`/exam/${course.id}`}
                    className="px-4 py-2 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold"
                  >
                    ابدأ الامتحان
                  </Link>
                ) : (
                  <Lock className="w-4 h-4 text-neutral-400" />
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3. قسم تقييمات ومراجعات الطلاب */}
        <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-neutral-950 dark:text-white flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5" />
              تقييمات وآراء الطلاب ({reviews.length})
            </h2>
            <span className="flex items-center gap-1 text-sm font-black text-neutral-950 dark:text-white">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {course.rating} من 5
            </span>
          </div>

          <form
            onSubmit={handleAddReview}
            className="bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                أضف تقييمك للكورس:
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        star <= newRating
                          ? "fill-amber-400 text-amber-400"
                          : "text-neutral-300 dark:text-neutral-700"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="اكتب رأيك وتجربتك في الكورس..."
                className="flex-grow px-3.5 py-2 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs focus:outline-none focus:border-neutral-950 dark:focus:border-white"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs shrink-0 cursor-pointer"
              >
                نشر التقييم
              </button>
            </div>
          </form>

          <div className="space-y-3">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-neutral-950 dark:text-white">
                    {rev.name}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3 h-3 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="text-[10px] text-neutral-400 mr-1">
                      {rev.date}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* العمود الأيسر: كارت الاشتراك والدفع المباشر */}
      <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden sticky top-24">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-44 object-cover"
        />

        <div className="p-6 space-y-5">
          {feedback.message && (
            <div
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                feedback.type === "success"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
              }`}
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {feedback.message}
            </div>
          )}

          {isEnrolled ? (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                أنت مشترك بالفعل في هذا الكورس
              </div>

              <Link
                to={`/learn/${course.id}`}
                className="w-full py-3.5 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 transition"
              >
                <PlayCircle className="w-4 h-4" />
                الدخول لمشغل المحاضرات
              </Link>

              {course.exam && (
                <Link
                  to={`/exam/${course.id}`}
                  className="w-full py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <FileQuestion className="w-4 h-4" />
                  دخول الامتحان الشامل
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-neutral-500">سعر الاشتراك الكامل</span>
                <span className="text-2xl font-black text-neutral-950 dark:text-white">
                  {course.price} <span className="text-xs font-bold">ج.م</span>
                </span>
              </div>

              {currentUser && (
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">رصيد محفظتك الحالي:</span>
                  <strong className={hasEnoughBalance ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"}>
                    {userBalance} ج.م
                  </strong>
                </div>
              )}

              <button
                onClick={handleWalletPay}
                className="w-full py-3.5 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Wallet className="w-4 h-4" />
                اشترك الآن عبر رصيد المحفظة
              </button>

              <Link
                to={`/wallet?amount=${course.price}`}
                className="w-full py-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <CreditCard className="w-4 h-4 text-emerald-500" />
                شحن الرصيد (فيزا • فودافون كاش • InstaPay)
              </Link>
            </div>
          )}

          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2.5 text-xs text-neutral-600 dark:text-neutral-400">
            <p className="font-bold text-neutral-900 dark:text-white mb-2">
              يشمل هذا الكورس:
            </p>
            <div className="flex items-center gap-2">
              <Infinity className="w-4 h-4 text-neutral-400" />
              <span>وصول كامل مدى الحياة لجميع المحاضرات</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-neutral-400" />
              <span>ملازم وملخصات PDF قابلة للتحميل</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-neutral-400" />
              <span>شهادة إتمام معتمدة بعد اجتياز الاختبار</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
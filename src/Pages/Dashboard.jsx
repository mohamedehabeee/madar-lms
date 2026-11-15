import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  BookOpen,
  CheckCircle2,
  Award,
  Wallet,
  PlayCircle,
  Plus,
  Users,
  TrendingUp,
  ArrowLeft,
  Printer,
  X,
  Trash2,
  Video,
  HelpCircle,
  UserCog,
  CreditCard,
  BellRing,
  Lock,
  Ticket,
  Copy,
  Check
} from "lucide-react";

export default function Dashboard({
  courses,
  currentUser,
  accessCodes = [],
  onAddCourse,
  onDeleteCourse,
  onAddLessonToCourse,
  onAddQuestionToCourse,
  onUpdateProfileName
}) {
  const [certificateCourse, setCertificateCourse] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(currentUser?.name || "");

  const [codesList, setCodesList] = useState(() => {
    const saved = localStorage.getItem("lms_codes");
    return saved ? JSON.parse(saved) : accessCodes;
  });
  const [copiedCode, setCopiedCode] = useState("");

  useEffect(() => {
    localStorage.setItem("lms_codes", JSON.stringify(codesList));
  }, [codesList]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "برمجة وتطوير",
    instructor: currentUser?.name || "م. أحمد طارق",
    price: 500,
    duration: "12 ساعة",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
    description: ""
  });

  const [targetCourseId, setTargetCourseId] = useState(courses[0]?.id || "course-1");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("20:00");
  const [questionText, setQuestionText] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const isStudent = currentUser.role === "student";

  const enrolledCoursesList = courses.filter((c) =>
    currentUser.enrolledCourses?.includes(c.id)
  );
  const completedLessons = currentUser.completedLessons || [];
  const examScores = currentUser.examScores || {};
  const passedExamsCount = Object.values(examScores).filter((s) => s.passed).length;

  const instructorAnnouncements = [
    {
      id: 1,
      instructor: "م. أحمد طارق",
      courseTitle: "تطوير الويب المتكامل (React & Next.js)",
      date: "اليوم",
      text: "يرجى مراجعة ملزمة الـ PDF الخاصة بالـ Hooks وحل التدريب العملي قبل البدء في امتحان الوحدة."
    },
    {
      id: 2,
      instructor: "د. كريم محمود",
      courseTitle: "البرمجة كائنية التوجه وهياكل البيانات (C# OOP)",
      date: "منذ يومين",
      text: "تم تحديث بنك أسئلة الامتحان الشامل وإضافة أسئلة جديدة على الـ Inheritance والـ Stacks."
    },
    {
      id: 3,
      instructor: "أ. مريم مجدي",
      courseTitle: "المراجعة النهائية في الفلسفة والمنطق وعلم النفس",
      date: "منذ 3 أيام",
      text: "ملف الخرائط الذهنية متاح الآن للتحميل المباشر داخل صفحة المحاضرة الأولى."
    }
  ];

  const handleSaveName = (e) => {
    e.preventDefault();
    if (!nameInput.trim() || !onUpdateProfileName) return;
    onUpdateProfileName(nameInput.trim());
    setEditingName(false);
  };

  const handleGenerateNewCode = () => {
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
    const generated = {
      code: `MDR-${randomPart}`,
      courseId: targetCourseId,
      used: false
    };
    setCodesList([generated, ...codesList]);
  };

  const handleCopyCode = (codeStr) => {
    navigator.clipboard.writeText(codeStr);
    setCopiedCode(codeStr);
    setTimeout(() => setCopiedCode(""), 2000);
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;
    onAddCourse(newCourse);
    setShowAddModal(false);
    setNewCourse({
      title: "",
      category: "برمجة وتطوير",
      instructor: currentUser?.name || "م. أحمد طارق",
      price: 500,
      duration: "12 ساعة",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      description: ""
    });
  };

  const handleQuickAddLesson = (e) => {
    e.preventDefault();
    if (!lessonTitle.trim() || !onAddLessonToCourse) return;
    onAddLessonToCourse(targetCourseId, {
      title: lessonTitle.trim(),
      duration: lessonDuration.trim() || "15:00"
    });
    setLessonTitle("");
  };

  const handleQuickAddQuestion = (e) => {
    e.preventDefault();
    if (!questionText.trim() || !opt1.trim() || !opt2.trim() || !onAddQuestionToCourse) return;
    onAddQuestionToCourse(targetCourseId, {
      text: questionText.trim(),
      options: [opt1.trim(), opt2.trim(), opt3.trim() || "جميع ما سبق"],
      correctIndex: 0
    });
    setQuestionText("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
  };

  return (
    <div className="space-y-8 animate-fade-up">
      
      {/* هيدر لوحة التحكم */}
      <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="inline-block bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 text-[11px] font-bold px-2.5 py-1 rounded-md border border-neutral-200 dark:border-neutral-800 mb-2">
            {isStudent ? "بوابة الطالب والشهادات المعتمدة" : "لوحة إدارة المنصة"}
          </span>

          {editingName ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-2 mt-1">
              <input
                type="text"
                required
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 text-sm font-bold"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold cursor-pointer"
              >
                حفظ الاسم
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-neutral-950 dark:text-white">
                أهلاً بك، {currentUser.name}
              </h1>
              {isStudent && (
                <button
                  onClick={() => {
                    setNameInput(currentUser.name);
                    setEditingName(true);
                  }}
                  title="تعديل الاسم المطبوع على الشهادات"
                  className="text-xs text-neutral-500 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800 cursor-pointer"
                >
                  <UserCog className="w-3.5 h-3.5" />
                  تعديل الاسم
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/wallet"
            className="px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 text-xs font-bold flex items-center gap-2 transition"
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-500" />
            شحن المحفظة
          </Link>
          <Link
            to="/courses"
            className="px-4 py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold flex items-center gap-2 transition"
          >
            تصفح الكورسات
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {isStudent ? (
        <>
          {/* كروت إحصائيات الطالب */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl">
              <BookOpen className="w-5 h-5 text-neutral-400 mb-3" />
              <span className="block text-2xl font-black text-neutral-950 dark:text-white">
                {enrolledCoursesList.length}
              </span>
              <span className="text-xs text-neutral-500">كورسات مشترك بها</span>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-3" />
              <span className="block text-2xl font-black text-neutral-950 dark:text-white">
                {completedLessons.length}
              </span>
              <span className="text-xs text-neutral-500">محاضرات مكتملة</span>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl">
              <Award className="w-5 h-5 text-amber-500 mb-3" />
              <span className="block text-2xl font-black text-neutral-950 dark:text-white">
                {passedExamsCount}
              </span>
              <span className="text-xs text-neutral-500">امتحانات تم اجتيازها</span>
            </div>

            <Link
              to="/wallet"
              className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500/50 p-5 rounded-2xl transition block"
            >
              <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-3" />
              <span className="block text-2xl font-black text-neutral-950 dark:text-white">
                {currentUser.walletBalance ?? 0} <span className="text-xs">ج.م</span>
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                رصيد المحفظة (اضغط للشحن)
              </span>
            </Link>
          </div>

          {/* قسم كورسات الطالب */}
          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-neutral-950 dark:text-white">
                كورساتي وشهادات الإتمام
              </h2>
            </div>

            {enrolledCoursesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {enrolledCoursesList.map((course) => {
                  const lessons = course.chapters.flatMap((ch) => ch.lessons);
                  const doneCount = lessons.filter((l) =>
                    completedLessons.includes(l.id)
                  ).length;
                  const percent =
                    lessons.length > 0
                      ? Math.round((doneCount / lessons.length) * 100)
                      : 0;
                  const examResult = examScores[course.id];
                  const canClaimCertificate = percent === 100 || examResult?.passed;

                  return (
                    <div
                      key={course.id}
                      className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 flex flex-col justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-extrabold text-sm sm:text-base text-neutral-950 dark:text-white">
                            {course.title}
                          </h3>
                          <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 shrink-0">
                            {percent}%
                          </span>
                        </div>

                        <p className="text-xs text-neutral-500 mb-3">
                          المحاضر: {course.instructor} • أتممت {doneCount} من {lessons.length} محاضرات
                        </p>

                        <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden mb-4">
                          <div
                            className="h-full bg-neutral-950 dark:bg-white transition-all duration-300"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        {examResult && (
                          <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-2 rounded-lg text-xs flex items-center justify-between mb-2">
                            <span>درجة الامتحان الشامل:</span>
                            <strong
                              className={
                                examResult.passed
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-red-500"
                              }
                            >
                              {examResult.scorePercent}% ({examResult.passed ? "ناجح" : "راسب"})
                            </strong>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                        <Link
                          to={`/learn/${course.id}`}
                          className="flex-grow py-2.5 px-3 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5"
                        >
                          <PlayCircle className="w-4 h-4" />
                          المحاضرات
                        </Link>

                        {course.exam && (
                          <Link
                            to={`/exam/${course.id}`}
                            className="py-2.5 px-3 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-xs font-bold"
                          >
                            الامتحان
                          </Link>
                        )}

                        {canClaimCertificate ? (
                          <button
                            onClick={() => setCertificateCourse(course)}
                            className="py-2.5 px-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Award className="w-4 h-4" />
                            الشهادة
                          </button>
                        ) : (
                          <span
                            title="اجتز الامتحان أو أكمل جميع المحاضرات لفتح الشهادة"
                            className="py-2.5 px-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-400 border border-neutral-200 dark:border-neutral-800 text-xs font-bold flex items-center gap-1 cursor-not-allowed"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            الشهادة
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-sm text-neutral-500 mb-4">
                  لم تشترك في أي كورس حتى الآن.
                </p>
                <Link
                  to="/courses"
                  className="px-5 py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold"
                >
                  تصفح الكورسات المتاحة
                </Link>
              </div>
            )}
          </div>

          {/* صندوق تنبيهات المحاضرين وآخر تحديثات الكورسات */}
          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base sm:text-lg font-black text-neutral-950 dark:text-white flex items-center gap-2">
                  <BellRing className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
                  تنبيهات المحاضرين
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  آخر الملاحظات والملفات المرفوعة في الكورسات
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {instructorAnnouncements.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <strong className="font-black text-neutral-950 dark:text-white">
                        {item.instructor}
                      </strong>
                      <span className="text-[11px] text-neutral-400">{item.date}</span>
                    </div>
                    <span className="block text-[11px] font-bold text-neutral-500">
                      {item.courseTitle}
                    </span>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* لوحة الإدارة */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl">
              <BookOpen className="w-5 h-5 text-neutral-400 mb-3" />
              <span className="block text-2xl font-black text-neutral-950 dark:text-white">
                {courses.length}
              </span>
              <span className="text-xs text-neutral-500">إجمالي الكورسات المنشورة</span>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl">
              <Users className="w-5 h-5 text-emerald-500 mb-3" />
              <span className="block text-2xl font-black text-neutral-950 dark:text-white">
                {courses.reduce((acc, c) => acc + (c.studentsCount || 0), 0)}
              </span>
              <span className="text-xs text-neutral-500">إجمالي الطلاب المسجلين</span>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl">
              <Award className="w-5 h-5 text-amber-500 mb-3" />
              <span className="block text-2xl font-black text-neutral-950 dark:text-white">
                94%
              </span>
              <span className="text-xs text-neutral-500">متوسط نسبة اجتياز الامتحانات</span>
            </div>

            <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl">
              <TrendingUp className="w-5 h-5 text-emerald-600 mb-3" />
              <span className="block text-2xl font-black text-neutral-950 dark:text-white">
                48,500 <span className="text-xs">ج.م</span>
              </span>
              <span className="text-xs text-neutral-500">مبيعات المنصة الشهرية</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-5">
            <div>
              <h2 className="text-lg font-black text-neutral-950 dark:text-white">
                تحديث محتوى الكورسات والامتحانات
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                اختر أي كورس لإضافة محاضرة جديدة أو سؤال جديد في امتحانه
              </p>
            </div>

            <select
              value={targetCourseId}
              onChange={(e) => setTargetCourseId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs font-bold focus:outline-none"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <form
                onSubmit={handleQuickAddLesson}
                className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-3"
              >
                <p className="text-xs font-bold flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-emerald-500" />
                  إضافة محاضرة جديدة للكورس المحدد:
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="عنوان المحاضرة الجديدة..."
                    className="flex-grow px-3 py-2 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs"
                  />
                  <input
                    type="text"
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(e.target.value)}
                    placeholder="20:00"
                    className="w-20 px-2.5 py-2 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs text-center"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold shrink-0 cursor-pointer"
                  >
                    + إضافة
                  </button>
                </div>
              </form>

              <form
                onSubmit={handleQuickAddQuestion}
                className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2.5"
              >
                <p className="text-xs font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  إضافة سؤال جديد لبنك أسئلة الكورس:
                </p>
                <input
                  type="text"
                  required
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="نص السؤال..."
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    value={opt1}
                    onChange={(e) => setOpt1(e.target.value)}
                    placeholder="الإجابة الصحيحة ✓"
                    className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-950 border border-emerald-500/40 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={opt2}
                    onChange={(e) => setOpt2(e.target.value)}
                    placeholder="اختيار ثانٍ"
                    className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={opt3}
                    onChange={(e) => setOpt3(e.target.value)}
                    placeholder="اختيار ثالث"
                    className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold cursor-pointer"
                >
                  + إدراج السؤال في امتحان الكورس
                </button>
              </form>
            </div>
          </div>

          {/* قسم توليد وإدارة أكواد التفعيل الفورية للطلاب */}
          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-black text-neutral-950 dark:text-white flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-emerald-500" />
                  أكواد التفعيل المباشر للطلاب ({codesList.length})
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  أنشئ أكواد تفعيل فورية ليتمكن الطالب من فتح الكورس مباشرة من صفحة تفاصيل الكورس
                </p>
              </div>

              <button
                type="button"
                onClick={handleGenerateNewCode}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-black flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                توليد كود تفعيل جديد
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {codesList.slice(0, 8).map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2"
                >
                  <div>
                    <strong className="font-mono text-xs font-black text-neutral-950 dark:text-white block">
                      {item.code}
                    </strong>
                    <span
                      className={`text-[10px] font-bold ${
                        item.used ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {item.used ? "مُستخدم" : "متاح للتفعيل"}
                    </span>
                  </div>

                  {!item.used && (
                    <button
                      type="button"
                      onClick={() => handleCopyCode(item.code)}
                      className="p-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-bold cursor-pointer"
                    >
                      {copiedCode === item.code ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-neutral-950 dark:text-white">
                  جميع الكورسات المنشورة ({courses.length})
                </h2>
              </div>

              <button
                onClick={() => setShowAddModal(!showAddModal)}
                className="px-4 py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                نشر كورس جديد
              </button>
            </div>

            {showAddModal && (
              <form
                onSubmit={handleCreateCourse}
                className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 space-y-3"
              >
                <input
                  type="text"
                  required
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  placeholder="عنوان الكورس الجديد"
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs"
                />

                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    value={newCourse.category}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, category: e.target.value })
                    }
                    placeholder="القسم"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs"
                  />
                  <input
                    type="number"
                    required
                    value={newCourse.price}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        price: Number(e.target.value)
                      })
                    }
                    placeholder="السعر (ج.م)"
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs"
                  />
                </div>

                <textarea
                  rows={2}
                  required
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  placeholder="وصف الكورس..."
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-neutral-500 cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                  >
                    نشر الكورس الآن
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={c.thumbnail}
                      alt={c.title}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <p className="text-xs font-extrabold text-neutral-950 dark:text-white line-clamp-1">
                        {c.title}
                      </p>
                      <span className="text-[11px] text-neutral-500">
                        {c.price} ج.م • {c.chapters.flatMap((ch) => ch.lessons).length} محاضرات •{" "}
                        {c.exam?.questions?.length || 0} أسئلة
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <Link
                      to={`/courses/${c.id}`}
                      className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-bold"
                    >
                      معاينة
                    </Link>
                    {onDeleteCourse && courses.length > 1 && (
                      <button
                        onClick={() => onDeleteCourse(c.id)}
                        title="حذف الكورس"
                        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* نافذة الشهادة */}
      {certificateCourse && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-neutral-950 rounded-2xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl relative border-8 border-double border-neutral-900">
            <button
              onClick={() => setCertificateCourse(null)}
              className="absolute top-4 left-4 p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 bg-neutral-950 text-white rounded-xl flex items-center justify-center font-black text-2xl mx-auto">
                م
              </div>
              <p className="text-xs font-bold tracking-widest uppercase text-neutral-500">
                منصة مَدار التعليمية • شهادة إتمام معتمدة
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-950">
                شهادة اجتياز وإتمام كورس
              </h2>
              <p className="text-xs text-neutral-500">تشهد إدارة منصة مَدار بأن الطالب:</p>
              <p className="text-2xl font-black text-neutral-950 underline decoration-2 underline-offset-8">
                {currentUser.name}
              </p>
              <p className="text-xs text-neutral-600 max-w-md mx-auto leading-relaxed pt-2">
                قد أتم بنجاح دراسة ومراجعة محتوى الكورس التدريبي واجتياز التقييمات المقررة في:
              </p>
              <p className="text-lg font-extrabold text-neutral-900 bg-neutral-100 py-2 px-4 rounded-xl inline-block border border-neutral-300">
                {certificateCourse.title}
              </p>

              <div className="pt-8 mt-6 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-600">
                <div className="text-right">
                  <span className="block text-[10px] text-neutral-400">المحاضر المشرف</span>
                  <strong className="text-neutral-950">{certificateCourse.instructor}</strong>
                </div>
                <div>
                  <span className="block text-[10px] text-neutral-400">الرقم المرجعي للشهادة</span>
                  <strong className="font-mono text-neutral-950">MDR-2026-{certificateCourse.id.toUpperCase()}</strong>
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-neutral-400">تاريخ الإصدار</span>
                  <strong className="text-neutral-950">{new Date().toLocaleDateString("ar-EG")}</strong>
                </div>
              </div>

              <div className="pt-6 flex justify-center">
                <button
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  طباعة الشهادة أو حفظها PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
import { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import {
  PlayCircle,
  CheckCircle2,
  Lock,
  FileText,
  Download,
  MessageSquare,
  FileQuestion,
  ArrowRight,
  ArrowLeft,
  Send,
  NotebookPen,
  Trash2,
  Clock,
  Maximize2,
  Minimize2,
  Timer,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

export default function CoursePlayer({ courses, currentUser, onToggleLessonComplete }) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const videoRef = useRef(null);

  const course = courses.find((c) => c.id === id);
  const allLessons = course ? course.chapters.flatMap((ch) => ch.lessons) : [];

  const lessonParam = searchParams.get("lesson");
  const initialLesson =
    allLessons.find((l) => l.id === lessonParam) || allLessons[0];

  const [activeLesson, setActiveLesson] = useState(initialLesson);
  const [activeTab, setActiveTab] = useState("notes");
  const [isFocusMode, setIsFocusMode] = useState(false);

  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [pomoRunning, setPomoRunning] = useState(false);

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(`lms_notes_${id}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [noteInput, setNoteInput] = useState("");

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "عمر خالد",
      time: "منذ ساعتين",
      text: "شرح النقطة التانية في الفيديو واضح جداً، شكراً يا هندسة!"
    }
  ]);

  useEffect(() => {
    if (lessonParam) {
      const found = allLessons.find((l) => l.id === lessonParam);
      if (found) setActiveLesson(found);
    }
  }, [lessonParam]);

  useEffect(() => {
    localStorage.setItem(`lms_notes_${id}`, JSON.stringify(notes));
  }, [notes, id]);

  useEffect(() => {
    if (!pomoRunning) return;
    const interval = setInterval(() => {
      setPomoSeconds((prev) => {
        if (prev <= 1) {
          setPomoRunning(false);
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [pomoRunning]);

  if (!course || !activeLesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-3">الكورس أو المحاضرة غير متاحة</h2>
        <Link to="/courses" className="underline text-sm font-bold">
          العودة للكورسات
        </Link>
      </div>
    );
  }

  const isEnrolled = currentUser?.enrolledCourses?.includes(course.id);
  const completedLessons = currentUser?.completedLessons || [];
  const isCurrentCompleted = completedLessons.includes(activeLesson.id);

  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  const completedInThisCourse = allLessons.filter((l) =>
    completedLessons.includes(l.id)
  ).length;
  const progressPercent =
    allLessons.length > 0
      ? Math.round((completedInThisCourse / allLessons.length) * 100)
      : 0;

  const handleSelectLesson = (lesson) => {
    if (!isEnrolled && !lesson.isFree) return;
    setActiveLesson(lesson);
    setSearchParams({ lesson: lesson.id });
  };

  const formatVideoTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!noteInput.trim()) return;

    const currentSec = videoRef.current ? videoRef.current.currentTime : 0;
    const newNote = {
      id: Date.now(),
      lessonId: activeLesson.id,
      lessonTitle: activeLesson.title,
      timestamp: currentSec,
      formattedTime: formatVideoTime(currentSec),
      text: noteInput.trim(),
      date: new Date().toLocaleDateString("ar-EG")
    };

    setNotes([newNote, ...notes]);
    setNoteInput("");
  };

  const handleJumpToTime = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter((n) => n.id !== noteId));
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([
      {
        id: Date.now(),
        user: currentUser?.name || "طالب بالمنصة",
        time: "الآن",
        text: commentText.trim()
      },
      ...comments
    ]);
    setCommentText("");
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      
      {/* الشريط العلوي المتجاوب */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to={`/courses/${course.id}`}
            className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0"
          >
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="min-w-0">
            <span className="block text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400">
              مشغل المحاضرات التفاعلي
            </span>
            <h1 className="text-sm sm:text-lg font-black text-neutral-950 dark:text-white truncate">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          {/* تايمر المذاكرة */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 px-3 py-2 rounded-xl">
            <Timer className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="text-xs font-mono font-black text-neutral-950 dark:text-white">
              {formatVideoTime(pomoSeconds)}
            </span>
            <button
              onClick={() => setPomoRunning(!pomoRunning)}
              className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 cursor-pointer"
            >
              {pomoRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <button
              onClick={() => {
                setPomoRunning(false);
                setPomoSeconds(25 * 60);
              }}
              className="p-1 rounded text-neutral-400 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          {/* وضع التركيز */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isFocusMode
                ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 border-neutral-950 dark:border-white"
                : "bg-white dark:bg-[#121212] border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200"
            }`}
          >
            {isFocusMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>عادي</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>وضع التركيز</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* الشبكة الرئيسية */}
      <div
        className={`grid grid-cols-1 ${
          isFocusMode ? "lg:grid-cols-1 max-w-5xl mx-auto" : "lg:grid-cols-3"
        } gap-5 sm:gap-6 items-start`}
      >
        
        <div className={isFocusMode ? "space-y-5" : "lg:col-span-2 space-y-5"}>
          
          <div className="bg-black rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <video
              ref={videoRef}
              key={activeLesson.id}
              controls
              playsInline
              className="w-full aspect-video bg-black"
              poster={course.thumbnail}
            >
              <source src={activeLesson.videoUrl} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-lg font-black text-neutral-950 dark:text-white">
                  {activeLesson.title}
                </h2>
                <p className="text-xs text-neutral-500 mt-1">
                  مدة المحاضرة: {activeLesson.duration} دقيقة • المحاضر: {course.instructor}
                </p>
              </div>

              {currentUser && isEnrolled && (
                <button
                  onClick={() => onToggleLessonComplete(activeLesson.id)}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shrink-0 ${
                    isCurrentCompleted
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isCurrentCompleted ? "تم إكمال المحاضرة ✓" : "علّم كمحاضرة مكتملة"}
                </button>
              )}
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
              <button
                onClick={() => prevLesson && handleSelectLesson(prevLesson)}
                disabled={!prevLesson}
                className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                السابقة
              </button>

              {isEnrolled && (
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  إنجازك: {progressPercent}%
                </span>
              )}

              <button
                onClick={() =>
                  nextLesson &&
                  (isEnrolled || nextLesson.isFree) &&
                  handleSelectLesson(nextLesson)
                }
                disabled={!nextLesson || (!isEnrolled && !nextLesson?.isFree)}
                className="px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                التالية
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* التبويبات المتجاوبة */}
          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
            <div className="flex overflow-x-auto no-scrollbar border-b border-neutral-200 dark:border-neutral-800">
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-4 sm:px-5 py-3.5 text-xs font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === "notes"
                    ? "border-neutral-950 dark:border-white text-neutral-950 dark:text-white"
                    : "border-transparent text-neutral-500"
                }`}
              >
                <NotebookPen className="w-4 h-4" />
                كشكول ملاحظاتي ({notes.length})
              </button>

              <button
                onClick={() => setActiveTab("files")}
                className={`px-4 sm:px-5 py-3.5 text-xs font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === "files"
                    ? "border-neutral-950 dark:border-white text-neutral-950 dark:text-white"
                    : "border-transparent text-neutral-500"
                }`}
              >
                <FileText className="w-4 h-4" />
                ملزمة الـ PDF
              </button>

              <button
                onClick={() => setActiveTab("qa")}
                className={`px-4 sm:px-5 py-3.5 text-xs font-bold flex items-center gap-2 border-b-2 transition cursor-pointer shrink-0 ${
                  activeTab === "qa"
                    ? "border-neutral-950 dark:border-white text-neutral-950 dark:text-white"
                    : "border-transparent text-neutral-500"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                أسئلة الطلاب ({comments.length})
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {activeTab === "notes" && (
                <div className="space-y-4">
                  <form onSubmit={handleAddNote} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      placeholder="اكتب ملاحظة مهمة لحفظها بتوقيت الفيديو..."
                      className="flex-grow px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="py-2.5 px-4 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs shrink-0 cursor-pointer"
                    >
                      + حفظ بالوقت
                    </button>
                  </form>

                  {notes.length > 0 ? (
                    <div className="space-y-2.5">
                      {notes.map((n) => (
                        <div
                          key={n.id}
                          className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-start justify-between gap-3"
                        >
                          <div className="space-y-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => handleJumpToTime(n.timestamp)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-mono text-[11px] font-bold cursor-pointer"
                              >
                                <Clock className="w-3 h-3" />
                                {n.formattedTime}
                              </button>
                              <span className="text-[11px] text-neutral-400 truncate">
                                {n.lessonTitle}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-neutral-900 dark:text-neutral-100 pt-1 break-words">
                              {n.text}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteNote(n.id)}
                            className="text-neutral-400 hover:text-red-500 p-1 cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-xs text-neutral-400 py-4">
                      لم تسجل أي ملاحظات بعد. شغل الفيديو واكتب أهم النقاط لترجع إليها بضغطة زر!
                    </p>
                  )}
                </div>
              )}

              {activeTab === "files" && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-center font-black text-xs shrink-0">
                      PDF
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white truncate">
                        {activeLesson.pdfName || "ملزمة_المحاضرة.pdf"}
                      </p>
                      <span className="text-[11px] text-neutral-500">
                        ملف المراجعة والملخص الشامل للمحاضرة
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`جاري تحميل الملف: ${activeLesson.pdfName}`)}
                    className="w-full sm:w-auto justify-center px-4 py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    تحميل الملزمة
                  </button>
                </div>
              )}

              {activeTab === "qa" && (
                <div className="space-y-4">
                  <form onSubmit={handleAddComment} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="عندك سؤال في الجزئية دي؟ اكتبه هنا للمحاضر..."
                      className="flex-grow px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="py-2.5 px-5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Send className="w-3.5 h-3.5" />
                      إرسال
                    </button>
                  </form>

                  <div className="space-y-3">
                    {comments.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-neutral-950 dark:text-white">
                            {c.user}
                          </span>
                          <span className="text-[10px] text-neutral-400">{c.time}</span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-300">
                          {c.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* قائمة محتويات الكورس */}
        {!isFocusMode && (
          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden lg:sticky lg:top-24">
            <div className="p-4 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="font-black text-sm text-neutral-950 dark:text-white">
                محتويات الكورس
              </h3>
            </div>

            <div className="divide-y divide-neutral-200 dark:divide-neutral-800 max-h-[380px] sm:max-h-[450px] overflow-y-auto">
              {course.chapters.map((chapter) => (
                <div key={chapter.id}>
                  <div className="bg-neutral-50 dark:bg-neutral-900/60 px-4 py-2.5 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    {chapter.title}
                  </div>
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
                    {chapter.lessons.map((lesson) => {
                      const isUnlocked = isEnrolled || lesson.isFree;
                      const isDone = completedLessons.includes(lesson.id);
                      const isActive = activeLesson.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => handleSelectLesson(lesson)}
                          disabled={!isUnlocked}
                          className={`w-full text-right p-3.5 flex items-center justify-between gap-3 transition ${
                            isActive
                              ? "bg-neutral-100 dark:bg-neutral-800/80 font-bold"
                              : "hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
                          } ${!isUnlocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                            ) : isUnlocked ? (
                              <PlayCircle className="w-4 h-4 text-neutral-700 dark:text-neutral-300 shrink-0" />
                            ) : (
                              <Lock className="w-4 h-4 text-neutral-400 shrink-0" />
                            )}
                            <span className="text-xs text-neutral-900 dark:text-neutral-100 truncate">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-400 shrink-0">
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {course.exam && (
              <div className="p-4 bg-neutral-50 dark:bg-neutral-900/80 border-t border-neutral-200 dark:border-neutral-800">
                {isEnrolled ? (
                  <Link
                    to={`/exam/${course.id}`}
                    className="w-full py-3 px-4 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition"
                  >
                    <FileQuestion className="w-4 h-4" />
                    بدء امتحان الكورس ({course.exam.durationMinutes} د)
                  </Link>
                ) : (
                  <Link
                    to={`/courses/${course.id}`}
                    className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 text-center block text-xs font-bold"
                  >
                    اشترك في الكورس لفتح المحاضرات والامتحان
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
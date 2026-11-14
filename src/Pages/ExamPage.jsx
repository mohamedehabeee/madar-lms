import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award
} from "lucide-react";

export default function ExamPage({ courses, currentUser, onSaveExamScore }) {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const exam = course?.exam;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState((exam?.durationMinutes || 10) * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreData, setScoreData] = useState(null);

  // تشغيل التايمر التنازلي
  useEffect(() => {
    if (!exam || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [exam, isSubmitted, selectedAnswers]);

  if (!course || !exam) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-3">الامتحان غير متاح</h2>
        <Link to="/courses" className="underline text-sm font-bold">
          العودة للكورسات
        </Link>
      </div>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSelectOption = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  const handleSubmitExam = () => {
    if (isSubmitted) return;

    let correctCount = 0;
    exam.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / exam.questions.length) * 100);
    const passed = percent >= exam.passingScore;

    const result = {
      scorePercent: percent,
      correctCount,
      totalQuestions: exam.questions.length,
      passed,
      date: new Date().toLocaleDateString("ar-EG")
    };

    setScoreData(result);
    setIsSubmitted(true);
    onSaveExamScore(course.id, result);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setTimeLeft(exam.durationMinutes * 60);
    setIsSubmitted(false);
    setScoreData(null);
  };

  const currentQuestion = exam.questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* هيدر الامتحان والتايمر */}
      <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <span className="text-xs text-neutral-500">{course.title}</span>
          <h1 className="text-lg font-black text-neutral-950 dark:text-white">
            {exam.title}
          </h1>
        </div>

        {!isSubmitted && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-black text-sm border ${
              timeLeft < 120
                ? "bg-red-500/10 text-red-600 border-red-500/30 animate-pulse"
                : "bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white border-neutral-200 dark:border-neutral-800"
            }`}
          >
            <Clock className="w-4 h-4" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* حالة 1: شاشة عرض النتيجة ومراجعة الإجابات بعد التسليم */}
      {isSubmitted && scoreData ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 text-center">
            <div
              className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${
                scoreData.passed
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              <Award className="w-8 h-8" />
            </div>

            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${
                scoreData.passed
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              {scoreData.passed ? "اجتزت الامتحان بنجاح 🎉" : "لم تصل لدرجة النجاح المطلوبة"}
            </span>

            <h2 className="text-4xl font-black text-neutral-950 dark:text-white my-2">
              {scoreData.scorePercent}%
            </h2>

            <p className="text-xs text-neutral-500 mb-6">
              أجبت بشكل صحيح على{" "}
              <strong className="text-neutral-900 dark:text-white">
                {scoreData.correctCount}
              </strong>{" "}
              من أصل{" "}
              <strong className="text-neutral-900 dark:text-white">
                {scoreData.totalQuestions}
              </strong>{" "}
              أسئلة (درجة النجاح: {exam.passingScore}%)
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleRetry}
                className="px-5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                إعادة الامتحان
              </button>
              <Link
                to={`/learn/${course.id}`}
                className="px-5 py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold"
              >
                العودة للمحاضرات
              </Link>
            </div>
          </div>

          {/* مراجعة الإجابات بالتفصيل */}
          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-black text-base text-neutral-950 dark:text-white">
              مراجعة الأسئلة والإجابات النموذجية:
            </h3>

            {exam.questions.map((q, idx) => {
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold text-neutral-950 dark:text-white">
                      {idx + 1}. {q.text}
                    </p>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-neutral-500">
                    إجابتك:{" "}
                    <span
                      className={
                        isCorrect
                          ? "text-emerald-600 dark:text-emerald-400 font-bold"
                          : "text-red-500 font-bold"
                      }
                    >
                      {userChoice !== undefined
                        ? q.options[userChoice]
                        : "لم تقم بالإجابة"}
                    </span>
                  </p>

                  {!isCorrect && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      الإجابة الصحيحة: {q.options[q.correctIndex]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* حالة 2: شاشة حل الأسئلة */
        <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* أرقام الأسئلة للتنقل السريع */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <span className="text-xs font-bold text-neutral-500">
              السؤال {currentIndex + 1} من {exam.questions.length}
            </span>
            <div className="flex items-center gap-1.5">
              {exam.questions.map((q, idx) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition cursor-pointer ${
                    currentIndex === idx
                      ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950"
                      : selectedAnswers[q.id] !== undefined
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-neutral-100 dark:bg-neutral-900 text-neutral-500"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* نص السؤال */}
          <h2 className="text-base sm:text-lg font-extrabold text-neutral-950 dark:text-white leading-relaxed">
            {currentQuestion.text}
          </h2>

          {/* الاختيارات */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                  className={`w-full text-right p-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-between transition cursor-pointer ${
                    isSelected
                      ? "border-neutral-950 dark:border-white bg-neutral-950 dark:bg-white text-white dark:text-neutral-950"
                      : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-800 dark:text-neutral-200"
                  }`}
                >
                  <span>{option}</span>
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "border-white dark:border-neutral-950 bg-emerald-500"
                        : "border-neutral-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* أزرار السابق / التالي / تسليم الامتحان */}
          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              السؤال السابق
            </button>

            {currentIndex < exam.questions.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(exam.questions.length - 1, prev + 1)
                  )
                }
                className="px-5 py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                السؤال التالي
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
              >
                إنهاء وتسليم الامتحان
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
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
      <div className="text-center py-20 px-4">
        <h2 className="text-lg sm:text-xl font-bold mb-3">الامتحان غير متاح</h2>
        <Link to="/courses" className="underline text-xs sm:text-sm font-bold">
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
    <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-0 animate-fade-up">
      
      {/* هيدر الامتحان والتايمر */}
      <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div>
          <span className="text-[10px] sm:text-xs text-neutral-500 font-bold block mb-0.5">{course.title}</span>
          <h1 className="text-base sm:text-lg font-black text-neutral-950 dark:text-white leading-tight">
            {exam.title}
          </h1>
        </div>

        {!isSubmitted && (
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-mono font-black text-xs sm:text-sm border shrink-0 ${
              timeLeft < 120
                ? "bg-red-500/10 text-red-600 border-red-500/30 animate-pulse"
                : "bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white border-neutral-200 dark:border-neutral-800"
            }`}
          >
            <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {isSubmitted && scoreData ? (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 text-center shadow-sm">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl mx-auto flex items-center justify-center mb-4 ${
                scoreData.passed
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              <Award className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <span
              className={`inline-block px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-bold mb-3 ${
                scoreData.passed
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }`}
            >
              {scoreData.passed ? "اجتزت الامتحان بنجاح 🎉" : "لم تصل لدرجة النجاح المطلوبة"}
            </span>

            <h2 className="text-4xl sm:text-5xl font-black text-neutral-950 dark:text-white my-3">
              {scoreData.scorePercent}%
            </h2>

            <p className="text-[11px] sm:text-xs text-neutral-500 mb-6 leading-relaxed px-4">
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <RotateCcw className="w-4 h-4" />
                إعادة الامتحان
              </button>
              <Link
                to={`/learn/${course.id}`}
                className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold flex items-center justify-center transition"
              >
                العودة للمحاضرات
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
            <h3 className="font-black text-sm sm:text-base text-neutral-950 dark:text-white mb-2">
              مراجعة الأسئلة والإجابات:
            </h3>

            {exam.questions.map((q, idx) => {
              const userChoice = selectedAnswers[q.id];
              const isCorrect = userChoice === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="p-3.5 sm:p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm font-bold text-neutral-950 dark:text-white leading-relaxed">
                      {idx + 1}. {q.text}
                    </p>
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                  </div>

                  <div className="space-y-1.5 bg-neutral-50 dark:bg-neutral-900/50 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-800/80">
                    <p className="text-[11px] sm:text-xs text-neutral-500">
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
                      <p className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                        الإجابة الصحيحة: {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-sm flex flex-col min-h-[60vh] sm:min-h-0 justify-between">
          
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800/80">
              <span className="text-[11px] sm:text-xs font-bold text-neutral-500">
                السؤال {currentIndex + 1} من {exam.questions.length}
              </span>
              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                {exam.questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md sm:rounded-lg text-[10px] sm:text-xs font-bold transition cursor-pointer shrink-0 ${
                      currentIndex === idx
                        ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 scale-110"
                        : selectedAnswers[q.id] !== undefined
                        ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30"
                        : "bg-neutral-100 dark:bg-neutral-900 text-neutral-500 border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="text-sm sm:text-base lg:text-lg font-black text-neutral-950 dark:text-white leading-relaxed">
              {currentQuestion.text}
            </h2>

            <div className="space-y-2.5 sm:space-y-3">
              {currentQuestion.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                    className={`w-full text-right p-3.5 sm:p-4 rounded-xl border text-[11px] sm:text-xs font-bold flex items-center justify-between gap-3 transition cursor-pointer ${
                      isSelected
                        ? "border-neutral-950 dark:border-white bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-md"
                        : "border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-800 dark:text-neutral-200"
                    }`}
                  >
                    <span className="leading-relaxed">{option}</span>
                    <span
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-white dark:border-neutral-950 bg-emerald-500"
                          : "border-neutral-400 dark:border-neutral-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-5 mt-auto border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 disabled:opacity-40 cursor-pointer transition"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              السؤال السابق
            </button>

            {currentIndex < exam.questions.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(exam.questions.length - 1, prev + 1)
                  )
                }
                className="w-full sm:w-auto px-5 py-3 sm:py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition"
              >
                السؤال التالي
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                إنهاء وتسليم
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
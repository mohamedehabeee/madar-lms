import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  PlayCircle,
  ChevronDown,
  Star,
  BookOpen,
  FileText,
  CheckCircle2,
  CreditCard,
  Briefcase,
  Users,
  X,
  SlidersHorizontal
} from "lucide-react";
import CourseCard from "../components/CourseCard";

export default function Home({
  courses,
  currentUser,
  wishlist,
  onToggleWishlist
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [sortBy, setSortBy] = useState("default");
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const sliderRef = useRef(null);

  // الاستجابة للضغط على روابط الـ Footer والانتقال للسكشن أو التخصص المقصود بالظبط
  useEffect(() => {
    const catParam = searchParams.get("cat");
    if (catParam) {
      const matchedCat = courses.find((c) =>
        c.category?.includes(catParam) || catParam.includes(c.category)
      )?.category;
      setActiveCategory(matchedCat || (catParam === "الكل" ? "الكل" : activeCategory));
    }

    if (location.hash) {
      const targetId = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    }
  }, [location.hash, searchParams, courses]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/courses");
    }
  };

  const liveSearchResults = searchQuery.trim()
    ? courses
        .filter(
          (c) =>
            c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.instructor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.category?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 4)
    : [];

  const categories = ["الكل", ...new Set(courses.map((c) => c.category))];

  const filteredByCategory =
    activeCategory === "الكل"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const displayedCourses = [...filteredByCategory].sort((a, b) => {
    if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  const handleSlide = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = 380;
    sliderRef.current.scrollBy({
      left: direction === "next" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const lastEnrolledCourse = currentUser?.enrolledCourses?.length
    ? courses.find(
        (c) =>
          c.id ===
          currentUser.enrolledCourses[currentUser.enrolledCourses.length - 1]
      )
    : null;

  const getLastCourseProgress = () => {
    if (!lastEnrolledCourse || !currentUser) return 0;
    const allLessons =
      lastEnrolledCourse.chapters?.flatMap((ch) => ch.lessons) || [];
    if (!allLessons.length) return 0;
    const completed = allLessons.filter((l) =>
      (currentUser.completedLessons || []).includes(l.id)
    ).length;
    return Math.round((completed / allLessons.length) * 100);
  };

  const lastCourseProgress = getLastCourseProgress();

  const instructors = [
    {
      name: "م. أحمد طارق",
      role: "مهندس برمجيات أول (Full-Stack)",
      experience: "8 سنوات خبرة",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      bio: "متخصص في بناء تطبيقات الويب الحديثة وتدريب الطلاب على المشاريع العملية المطلوبة في سوق العمل.",
      subjects: ["React & Next.js", "Node.js & Express", "أساسيات لغة C", "نظم المعلومات GIS"],
      coursesCount: 4,
      students: "3,450",
      rating: "4.9"
    },
    {
      name: "د. كريم محمود",
      role: "محاضر علوم الحاسب وهندسة البرمجيات",
      experience: "11 سنة خبرة",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
      bio: "يركز على تأسيس التفكير المنطقي السليم وشرح مواد الكلية الأكاديمية بأسلوب مبسط وتدريبات عملية.",
      subjects: ["C# OOP", "هياكل البيانات", "معمارية الحاسب", "الرياضيات المتقطعة"],
      coursesCount: 3,
      students: "3,440",
      rating: "4.9"
    },
    {
      name: "أ. مريم مجدي",
      role: "محاضرة المواد الأدبية والإنسانية",
      experience: "9 سنوات خبرة",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      bio: "خبرة طويلة في تبسيط المواد الفلسفية والإنسانية باستخدام الخرائط الذهنية والتدريب على نظام الامتحانات الحديث.",
      subjects: ["الفلسفة والمنطق", "علم النفس", "علم الاجتماع", "التربية الوطنية"],
      coursesCount: 2,
      students: "3,990",
      rating: "5.0"
    }
  ];

  const faqs = [
    {
      q: "إزاي أقدر أشترك في أي كورس على المنصة؟",
      a: "تقدر تشحن رصيد محفظتك على الموقع عن طريق البطاقة البنكية (فيزا أو ميزة)، فودافون كاش، إنستا باي، أو فوري، وبعدها تضغط اشترك في الكورس وهيتفتح فورا على حسابك."
    },
    {
      q: "هل الكورسات ليها وقت معين وتقفل؟",
      a: "لا، بمجرد اشتراكك في الكورس بتفضل المحاضرات، ملازم الـ PDF، والامتحانات مفتوحة على حسابك تقدر ترجعلها في أي وقت."
    },
    {
      q: "نظام الامتحانات والشهادات بيشتغل إزاي؟",
      a: "كل كورس فيه امتحان تقييمي بوقت محدد. بعد ما تخلص الامتحان بتظهر درجتك والإجابات الصح، وتقدر تطبع شهادة إتمام الكورس باسمك من لوحة الطالب."
    }
  ];

  return (
    <div className="space-y-16 animate-fade-up">
      
      {/* شريط استكمال المذاكرة */}
      {currentUser && lastEnrolledCourse && (
        <section className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-neutral-400 dark:hover:border-neutral-700">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center shrink-0">
              <PlayCircle className="w-5 h-5 text-neutral-900 dark:text-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="block text-xs text-neutral-500">
                  أهلاً {currentUser.name} — كمل آخر كورس بدأته
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300">
                  {lastCourseProgress}% مكتمل
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-950 dark:text-white truncate mt-0.5">
                {lastEnrolledCourse.title}
              </h2>
            </div>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-4 shrink-0">
            <div className="hidden md:block w-28 h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-neutral-950 dark:bg-white transition-all duration-500"
                style={{ width: `${Math.max(lastCourseProgress, 8)}%` }}
              />
            </div>

            <Link
              to={`/learn/${lastEnrolledCourse.id}`}
              className="w-full sm:w-auto text-center px-4 py-2.5 rounded-lg bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shrink-0 hover:opacity-90 transition"
            >
              متابعة المحاضرات
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* الجزء الافتتاحي (Hero) */}
      <section id="hero-section" className="scroll-mt-24 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-12">
        <div className="max-w-3xl space-y-5">
          <span className="inline-block text-xs font-bold text-neutral-500 dark:text-neutral-400 border-b border-neutral-300 dark:border-neutral-700 pb-1">
            منصة مَدار التعليمية
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-neutral-950 dark:text-white leading-tight">
            اتعلم البرمجة والمواد الأكاديمية بشكل منظم وعملي.
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            محاضرات مسجلة بجودة واضحة، ملازم PDF ملخصة لكل درس، وامتحانات دورية تساعدك تراجع وتطبق اللي اتعلمته أول بأول.
          </p>

          <div className="max-w-xl pt-2 space-y-2.5">
            <form onSubmit={handleSearch} className="relative flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث باسم المادة، الكورس، أو المحاضر..."
                  className="w-full pr-10 pl-9 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm focus:outline-none focus:border-neutral-950 dark:focus:border-white transition"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {liveSearchResults.length > 0 && (
                  <div className="absolute top-full right-0 left-0 mt-2 bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl z-30 overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800/70 animate-fade-up">
                    {liveSearchResults.map((course) => (
                      <Link
                        key={course.id}
                        to={`/courses/${course.id}`}
                        className="p-3 flex items-center justify-between gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-neutral-950 dark:text-white truncate">
                            {course.title}
                          </p>
                          <span className="text-[11px] text-neutral-500">
                            {course.instructor} • {course.category}
                          </span>
                        </div>
                        <span className="text-xs font-black text-neutral-900 dark:text-white shrink-0">
                          {course.price} ج.م
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-xl bg-neutral-950 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-xs sm:text-sm transition cursor-pointer shrink-0"
              >
                بحث
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-500">
              <span>مواد شائعة:</span>
              {["C# OOP", "React", "هياكل البيانات", "الفلسفة والمنطق"].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSearchQuery(tag)}
                  className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold transition cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-wrap items-center gap-6 sm:gap-10 text-xs text-neutral-500">
            <div>
              <strong className="text-neutral-950 dark:text-white text-sm font-black ml-1">
                {courses.length}
              </strong>
              كورسات متاحة حالياً
            </div>
            <div>
              <strong className="text-neutral-950 dark:text-white text-sm font-black ml-1">
                4
              </strong>
              تخصصات دراسية
            </div>
            <div>
              <strong className="text-neutral-950 dark:text-white text-sm font-black ml-1">
                PDF
              </strong>
              ملازم وملخصات لكل محاضرة
            </div>
          </div>
        </div>
      </section>

      {/* قسم الكورسات بالاسكرول الأفقي */}
      <section id="courses-section" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
              الكورسات المتاحة
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              اختار القسم أو قلب بالأسهم عشان تستعرض المواد المتاحة
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleSlide("prev")}
                aria-label="السابق"
                className="w-9 h-9 rounded-lg bg-white dark:bg-[#121212] border border-neutral-300 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-white flex items-center justify-center transition cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleSlide("next")}
                aria-label="التالي"
                className="w-9 h-9 rounded-lg bg-white dark:bg-[#121212] border border-neutral-300 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-white flex items-center justify-center transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/courses"
              className="px-3.5 py-2 rounded-lg bg-white dark:bg-[#121212] border border-neutral-300 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-white text-xs font-bold text-neutral-900 dark:text-white transition"
            >
              عرض كل الكورسات
            </Link>
          </div>
        </div>

        {/* فلتر الأقسام + ترتيب سريع */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                    isSelected
                      ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950"
                      : "bg-white dark:bg-[#121212] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-lg px-3 py-1.5 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-neutral-700 dark:text-neutral-300 focus:outline-none cursor-pointer"
            >
              <option value="default" className="dark:bg-neutral-900">الترتيب الافتراضي</option>
              <option value="rating" className="dark:bg-neutral-900">الأعلى تقييماً</option>
              <option value="price-asc" className="dark:bg-neutral-900">الأقل سعراً</option>
            </select>
          </div>
        </div>

        {/* الشريط الأفقي للكورسات */}
        <div
          ref={sliderRef}
          className="flex items-stretch gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-2"
        >
          {displayedCourses.map((course) => (
            <div
              key={course.id}
              className="w-[84vw] sm:w-[330px] lg:w-[360px] shrink-0 snap-start flex flex-col transition-transform duration-200 hover:-translate-y-1"
            >
              <CourseCard
                course={course}
                isEnrolled={currentUser?.enrolledCourses?.includes(course.id)}
                isSaved={wishlist?.includes(course.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </section>

      {/* نظام الدراسة على المنصة */}
      <section id="study-system" className="scroll-mt-24 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
            نظام الدراسة على المنصة
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            كل كورس متقسم لخطوات واضحة عشان تلم المادة من غير تشتيت
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <PlayCircle className="w-4 h-4 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-bold text-sm text-neutral-950 dark:text-white">
              1. محاضرات متقسمة لوحدات
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              تقدر تشوف المحاضرة التجريبية الأول، وتسجل ملاحظاتك جوه الفيديو في أي دقيقة.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <FileText className="w-4 h-4 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-bold text-sm text-neutral-950 dark:text-white">
              2. ملازم وملخصات PDF
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              تحت كل فيديو هتلاقي ملف الـ PDF الخاص بالمحاضرة جاهز للتحميل والمراجعة.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-bold text-sm text-neutral-950 dark:text-white">
              3. امتحانات تقييم وتصحيح
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              بعد ما تخلص مذاكرة بتمتحن أونلاين وبتعرف درجتك والإجابات الصح في ساعتها.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-neutral-900 dark:text-white" />
            </div>
            <h3 className="font-bold text-sm text-neutral-950 dark:text-white">
              4. طرق دفع مصرية سهلة
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
              تقدر تشحن وتدفع عن طريق فودافون كاش، إنستا باي، فوري، أو أي كارت بنكي.
            </p>
          </div>
        </div>
      </section>

      {/* قسم المحاضرين */}
      <section id="instructors-section" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
              المحاضرين على المنصة
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              نخبة من المتخصصين في المواد الأكاديمية وعلوم الحاسب
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {instructors.map((inst) => (
            <div
              key={inst.name}
              onClick={() => navigate(`/courses?q=${encodeURIComponent(inst.name)}`)}
              className="group bg-white dark:bg-[#121212] p-6 sm:p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-neutral-400 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-6 shadow-2xs"
            >
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <img
                    src={inst.image}
                    alt={inst.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-neutral-200 dark:border-neutral-800 shrink-0"
                  />

                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[11px] font-bold text-neutral-700 dark:text-neutral-300">
                        <Briefcase className="w-3 h-3" />
                        {inst.experience}
                      </span>

                      <span className="flex items-center gap-1 text-xs font-black text-neutral-900 dark:text-white">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {inst.rating}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-neutral-950 dark:text-white truncate">
                      {inst.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                      {inst.role}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {inst.bio}
                </p>

                <div className="space-y-2">
                  <span className="block text-[11px] font-bold text-neutral-400">
                    المواد والكورسات:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.subjects.map((subj) => (
                      <button
                        key={subj}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/courses?q=${encodeURIComponent(subj)}`);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-950 dark:hover:border-white text-[11px] font-bold text-neutral-800 dark:text-neutral-200 transition cursor-pointer"
                      >
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-neutral-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <strong className="text-neutral-900 dark:text-white">{inst.coursesCount}</strong> كورسات
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <strong className="text-neutral-900 dark:text-white">{inst.students}</strong> طالب
                  </span>
                </div>

                <span className="font-bold text-neutral-950 dark:text-white flex items-center gap-1 group-hover:underline">
                  عرض الكورسات
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* الأسئلة الشائعة */}
      <section id="faq-section" className="scroll-mt-24 max-w-3xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-neutral-950 dark:text-white">
            أسئلة متكررة
          </h2>
        </div>

        <div className="space-y-2.5">
          {faqs.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-neutral-950 dark:text-white cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-800/70 pt-3 animate-fade-up">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
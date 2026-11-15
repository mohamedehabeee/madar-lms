import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, RotateCcw, Bookmark } from "lucide-react";
import CourseCard from "../components/CourseCard";

export default function Courses({
  courses,
  currentUser,
  wishlist = [],
  onToggleWishlist
}) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const filterParam = searchParams.get("filter");

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(
    filterParam === "saved" ? "المحفوظات" : "الكل"
  );
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (filterParam === "saved") {
      setSelectedCategory("المحفوظات");
    }
  }, [filterParam]);

  const categories = ["الكل", "المحفوظات", ...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      if (selectedCategory === "المحفوظات") {
        return matchesSearch && wishlist.includes(course.id);
      }

      const matchesCategory =
        selectedCategory === "الكل" || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.studentsCount - a.studentsCount;
    });

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-up px-1 sm:px-0">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 dark:text-white">
          تصفح جميع الكورسات
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5">
          ابحث باسم المادة أو المدرس، أو استعرض قائمة الكورسات المحفوظة لديك
        </p>
      </div>

      <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-emerald-500 absolute right-3.5 top-1/2 -translate-y-1/2 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث باسم الكورس أو المحاضر..."
              className="w-full pr-10 pl-4 py-2.5 sm:py-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm font-bold focus:outline-none focus:border-neutral-950 dark:focus:border-white transition"
            />
          </div>

          <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2.5 sm:py-3 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-emerald-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border-none text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="popular">الأكثر اشتراكاً</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800/80 w-full overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-neutral-950 text-white dark:bg-white dark:text-neutral-950"
                    : "bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                }`}
              >
                {cat === "المحفوظات" && <Bookmark className="w-3.5 h-3.5" />}
                {cat}
                {cat === "المحفوظات" && ` (${wishlist.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="w-full flex flex-col h-full">
              <CourseCard
                course={course}
                isEnrolled={currentUser?.enrolledCourses?.includes(course.id)}
                isSaved={wishlist.includes(course.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-10 sm:p-14 text-center">
          <p className="text-sm sm:text-base font-bold text-neutral-800 dark:text-neutral-200 mb-3">
            لا توجد كورسات مطابقة لعملية البحث الحالية.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("الكل");
            }}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-xs font-bold cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            إعادة ضبط الفلتر
          </button>
        </div>
      )}
    </div>
  );
}
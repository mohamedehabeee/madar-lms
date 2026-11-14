// البيانات الأساسية للمنصة (9 كورسات كاملة بالمحاضرات والامتحانات)
export const INITIAL_COURSES = [
  // ================= 1. قسم برمجة وتطوير =================
  {
    id: "course-1",
    title: "احتراف تطوير الويب المتكامل (React & Next.js)",
    category: "برمجة وتطوير",
    instructor: "م. أحمد طارق",
    instructorRole: "Senior Full-Stack Architect",
    price: 850,
    rating: 4.9,
    studentsCount: 1420,
    duration: "24 ساعة",
    level: "من الصفر للاحتراف",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    description: "كورس عملي شامل يأخذك من أساسيات بناء واجهات المستخدم التفاعلية باستخدام React و Tailwind CSS حتى بناء تطبيقات كاملة جاهزة لسوق العمل.",
    chapters: [
      {
        id: "ch-1",
        title: "الوحدة الأولى: الأساسيات وتجهيز بيئة العمل",
        lessons: [
          {
            id: "les-101",
            title: "1. مقدمة الكورس وخريطة التعلم",
            duration: "12:30",
            isFree: true,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "خريطة_التعلم_الشاملة.pdf"
          },
          {
            id: "les-102",
            title: "2. شرح Components والـ Props بالتفصيل",
            duration: "28:15",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "ملخص_الـ_Components.pdf"
          }
        ]
      },
      {
        id: "ch-2",
        title: "الوحدة الثانية: إدارة الحالة (State & Hooks)",
        lessons: [
          {
            id: "les-103",
            title: "3. التعامل مع useState و useEffect عملياً",
            duration: "35:00",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "تطبيقات_الـ_Hooks.pdf"
          }
        ]
      }
    ],
    exam: {
      id: "exam-1",
      title: "الامتحان الشامل على أساسيات React.js",
      durationMinutes: 10,
      passingScore: 60,
      questions: [
        {
          id: "q1",
          text: "ما هو الـ Hook المسؤول عن حفظ الحالة (State) داخل الـ Functional Component؟",
          options: ["useEffect", "useState", "useContext", "useReducer"],
          correctIndex: 1
        },
        {
          id: "q2",
          text: "كيف يتم تمرير البيانات من مكون أب (Parent) إلى مكون ابن (Child) في React؟",
          options: ["عن طريق الـ State", "عن طريق الـ Props", "عن طريق الـ LocalStorage", "عن طريق الـ SQL"],
          correctIndex: 1
        },
        {
          id: "q3",
          text: "أي أمر يُستخدم لإنشاء مشروع React سريع باستخدام أداة Vite؟",
          options: ["npm start react", "npm create vite@latest", "npx build-react", "vite init"],
          correctIndex: 1
        }
      ]
    }
  },
  {
    id: "course-4",
    title: "بناء السيرفرات والـ APIs باستخدام Node.js & Express",
    category: "برمجة وتطوير",
    instructor: "م. أحمد طارق",
    instructorRole: "Senior Full-Stack Architect",
    price: 750,
    rating: 4.8,
    studentsCount: 890,
    duration: "20 ساعة",
    level: "متوسط",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    description: "تعلم بناء الباك إند من الصفر، تصميم RESTful APIs، ربط قواعد البيانات MongoDB، وتأمين الحسابات باستخدام JWT و Bcrypt.",
    chapters: [
      {
        id: "ch-401",
        title: "الوحدة الأولى: مدخل إلى Node.js وبناء أول سيرفر",
        lessons: [
          {
            id: "les-401",
            title: "1. كيف يعمل الـ Event Loop في Node.js؟",
            duration: "18:20",
            isFree: true,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "معمارية_NodeJS.pdf"
          },
          {
            id: "les-402",
            title: "2. بناء الـ Routes والـ Middlewares في Express",
            duration: "31:00",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "دليل_Express_الشامل.pdf"
          }
        ]
      }
    ],
    exam: {
      id: "exam-4",
      title: "اختبار تطوير الباك إند و REST APIs",
      durationMinutes: 10,
      passingScore: 60,
      questions: [
        {
          id: "q401",
          text: "أي كود حالة (Status Code) يُعبّر عن نجاح إنشاء مورد جديد في الـ API؟",
          options: ["200 OK", "201 Created", "404 Not Found", "500 Server Error"],
          correctIndex: 1
        },
        {
          id: "q402",
          text: "ما التقنية المستخدمة لتشفير كلمات المرور قبل حفظها في قاعدة البيانات؟",
          options: ["JWT", "Bcrypt", "CORS", "Axios"],
          correctIndex: 1
        }
      ]
    }
  },
  {
    id: "course-5",
    title: "بناء تطبيقات سطح المكتب وقواعد البيانات بـ C# & SQL",
    category: "برمجة وتطوير",
    instructor: "د. كريم محمود",
    instructorRole: "أستاذ هندسة البرمجيات",
    price: 600,
    rating: 4.9,
    studentsCount: 1120,
    duration: "16 ساعة",
    level: "مبتدئ إلى متوسط",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    description: "تطبيق عملي لبناء أنظمة إدارة كاملة (إدارة طلاب، مبيعات، ومخازن) باستخدام C# Windows Forms وربطها بقاعدة بيانات SQL Server.",
    chapters: [
      {
        id: "ch-501",
        title: "الوحدة الأولى: تصميم الواجهات وربط الجداول",
        lessons: [
          {
            id: "les-501",
            title: "1. تصميم واجهة نظام إدارة الطلاب بـ Windows Forms",
            duration: "25:10",
            isFree: true,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "خطوات_تصميم_الواجهات.pdf"
          },
          {
            id: "les-502",
            title: "2. تنفيذ عمليات الإضافة والحذف والبحث (CRUD) بـ SQL",
            duration: "34:40",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "أوامر_SQL_الأساسية.pdf"
          }
        ]
      }
    ],
    exam: {
      id: "exam-5",
      title: "امتحان تطبيقات C# و SQL Server",
      durationMinutes: 10,
      passingScore: 50,
      questions: [
        {
          id: "q501",
          text: "أي أمر في SQL يُستخدم لاسترجاع البيانات من الجدول؟",
          options: ["INSERT INTO", "SELECT", "UPDATE", "DELETE"],
          correctIndex: 1
        },
        {
          id: "q502",
          text: "ما هي الأداة المستخدمة لعرض جدول بيانات داخل نافذة Windows Forms؟",
          options: ["TextBox", "DataGridView", "Button", "Label"],
          correctIndex: 1
        }
      ]
    }
  },

  // ================= 2. قسم علوم الحاسب =================
  {
    id: "course-2",
    title: "البرمجة كائنية التوجه وهياكل البيانات (C# OOP & Data Structures)",
    category: "علوم الحاسب",
    instructor: "د. كريم محمود",
    instructorRole: "أستاذ هندسة البرمجيات",
    price: 650,
    rating: 4.8,
    studentsCount: 980,
    duration: "18 ساعة",
    level: "متوسط",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
    description: "إتقان مفاهيم الـ Encapsulation, Inheritance, Polymorphism وتطبيقات الـ Stacks, Queues, Trees, والـ Linked Lists بلغة C#.",
    chapters: [
      {
        id: "ch-201",
        title: "الوحدة الأولى: مبادئ الـ OOP الأربعة",
        lessons: [
          {
            id: "les-201",
            title: "1. الفرق بين الـ Class والـ Object في الذاكرة",
            duration: "19:45",
            isFree: true,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "مذكرة_OOP_الجزء_الأول.pdf"
          },
          {
            id: "les-202",
            title: "2. شرح الوراثة وتعدد الأشكال (Inheritance & Polymorphism)",
            duration: "32:10",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "تطبيقات_الوراثة_CSharp.pdf"
          }
        ]
      }
    ],
    exam: {
      id: "exam-2",
      title: "اختبار OOP وهياكل البيانات",
      durationMinutes: 10,
      passingScore: 50,
      questions: [
        {
          id: "q201",
          text: "أي هيكل بيانات يعمل بمبدأ First-In, First-Out (FIFO)؟",
          options: ["Stack", "Queue", "Binary Tree", "Array"],
          correctIndex: 1
        },
        {
          id: "q202",
          text: "ما هي الكلمة المفتاحية في C# لمنع وراثة الكلاس؟",
          options: ["static", "private", "sealed", "abstract"],
          correctIndex: 2
        }
      ]
    }
  },
  {
    id: "course-6",
    title: "تنظيم ومعمارية الحاسب والرياضيات المتقطعة (Discrete Math)",
    category: "علوم الحاسب",
    instructor: "د. كريم محمود",
    instructorRole: "أستاذ هندسة البرمجيات",
    price: 550,
    rating: 4.9,
    studentsCount: 1340,
    duration: "22 ساعة",
    level: "أكاديمي شامل",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    description: "شرح مبسط للبوابات المنطقية (Logic Gates)، أنظمة العد الثنائية، معمارية المعالج والذاكرة، مع أساسيات المنطق الرياضي والفئات والرسوم البيانية (Graphs).",
    chapters: [
      {
        id: "ch-601",
        title: "الوحدة الأولى: البوابات المنطقية وأنظمة العد",
        lessons: [
          {
            id: "les-601",
            title: "1. التحويل بين الأنظمة (Binary, Octal, Hexadecimal)",
            duration: "21:00",
            isFree: true,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "ملخص_أنظمة_العد_والبوابات.pdf"
          },
          {
            id: "les-602",
            title: "2. الجبر البولياني واختصار الدوائر بـ Karnaugh Map",
            duration: "36:15",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "تدريبات_K_Map_محلولة.pdf"
          }
        ]
      }
    ],
    exam: {
      id: "exam-6",
      title: "امتحان معمارية الحاسب والرياضيات المتقطعة",
      durationMinutes: 12,
      passingScore: 60,
      questions: [
        {
          id: "q601",
          text: "ما هو المكافئ الثنائي (Binary) للرقم العشري 10؟",
          options: ["1001", "1010", "1100", "1110"],
          correctIndex: 1
        },
        {
          id: "q602",
          text: "أي بوابة منطقية تُخرج (1) فقط إذا كانت جميع المدخلات (1)؟",
          options: ["OR Gate", "AND Gate", "XOR Gate", "NOT Gate"],
          correctIndex: 1
        }
      ]
    }
  },
  {
    id: "course-7",
    title: "تأسيس البرمجة وحل المشكلات بلغة C من الصفر",
    category: "علوم الحاسب",
    instructor: "م. أحمد طارق",
    instructorRole: "Senior Full-Stack Architect",
    price: 450,
    rating: 4.7,
    studentsCount: 1650,
    duration: "14 ساعة",
    level: "مبتدئ",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    description: "البداية الصحيحة لكل طالب علوم حاسب: فهم كيف تتعامل لغة C مع الذاكرة، المؤشرات (Pointers)، المصفوفات، والدوال وبناء التفكير المنطقي.",
    chapters: [
      {
        id: "ch-701",
        title: "الوحدة الأولى: المتغيرات، الشروط، والحلقات التكرارية",
        lessons: [
          {
            id: "les-701",
            title: "1. كتابة أول برنامج بلغة C وفهم الـ Compiler",
            duration: "16:40",
            isFree: true,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "أساسيات_لغة_C.pdf"
          },
          {
            id: "les-702",
            title: "2. شرح الـ Pointers وإدارة عناوين الذاكرة ببساطة",
            duration: "29:50",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "ملخص_الـ_Pointers.pdf"
          }
        ]
      }
    ],
    exam: {
      id: "exam-7",
      title: "اختبار أساسيات لغة C والمؤشرات",
      durationMinutes: 10,
      passingScore: 50,
      questions: [
        {
          id: "q701",
          text: "ما هو الرمز المستخدم للحصول على عنوان متغير في الذاكرة (Address-of) في لغة C؟",
          options: ["*", "&", "#", "$"],
          correctIndex: 1
        }
      ]
    }
  },

  // ================= 3. قسم مواد أكاديمية وثانوية =================
  {
    id: "course-3",
    title: "المراجعة النهائية في الفلسفة والمنطق وعلم النفس",
    category: "مواد أكاديمية وثانوية",
    instructor: "أ. مريم مجدي",
    instructorRole: "خبيرة المواد الفلسفية والإنسانية",
    price: 400,
    rating: 5.0,
    studentsCount: 2150,
    duration: "15 ساعة",
    level: "جميع المستويات",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
    description: "شرح مبسط وخرائط ذهنية شاملة مع تدريبات عملية وبنك أسئلة بنظام الامتحانات الحديث لضمان الدرجة النهائية.",
    chapters: [
      {
        id: "ch-301",
        title: "الوحدة الأولى: أسس المنطق الاستدلالي وعلم النفس",
        lessons: [
          {
            id: "les-301",
            title: "1. مدخل إلى التفكير المنطقي والاستدلال",
            duration: "22:00",
            isFree: true,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "ملزمة_الخرائط_الذهنية.pdf"
          },
          {
            id: "les-302",
            title: "2. نظريات التعلم وتطبيقاتها العملية",
            duration: "40:00",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "بنك_أسئلة_علم_النفس.pdf"
          }
        ]
      }
    ],
    exam: {
      id: "exam-3",
      title: "امتحان تجريبي شامل (منطق وعلم نفس)",
      durationMinutes: 15,
      passingScore: 60,
      questions: [
        {
          id: "q301",
          text: "الانتقال من حكم عام إلى حكم خاص يُسمى في المنطق:",
          options: ["الاستقراء", "الاستنباط", "المماثلة", "الاحتمال"],
          correctIndex: 1
        },
        {
          id: "q302",
          text: "من مؤسسي نظرية التعلم الشرطي الكلاسيكي:",
          options: ["بافلوف", "ثورنديك", "كوهلر", "فرويد"],
          correctIndex: 0
        }
      ]
    }
  },
  {
    id: "course-8",
    title: "الشرح الشامل في علم الاجتماع والتربية الوطنية",
    category: "مواد أكاديمية وثانوية",
    instructor: "أ. مريم مجدي",
    instructorRole: "خبيرة المواد الفلسفية والإنسانية",
    price: 350,
    rating: 4.9,
    studentsCount: 1840,
    duration: "12 ساعة",
    level: "جميع المستويات",
    thumbnail: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80",
    description: "تفصيل كامل لنظريات علم الاجتماع، التفاعل والعلاقات الاجتماعية، مع ملخصات مركزة للتربية الوطنية وحل نماذج الامتحانات السابقة.",
    chapters: [
      {
        id: "ch-801",
        title: "الوحدة الأولى: النظرية الاجتماعية والتفاعل",
        lessons: [
          {
            id: "les-801",
            title: "1. بناء النظرية في علم الاجتماع ووظائفها",
            duration: "24:15",
            isFree: true,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "ملزمة_علم_الاجتماع_المكثفة.pdf"
          },
          {
            id: "les-802",
            title: "2. الظاهرة الاجتماعية وخصائصها عند إميل دوركايم",
            duration: "30:00",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "مراجعة_ليلة_الامتحان_اجتماع.pdf"
          }
        ]
      }
    ],
    exam: {
      id: "exam-8",
      title: "اختبار شامل في علم الاجتماع",
      durationMinutes: 10,
      passingScore: 60,
      questions: [
        {
          id: "q801",
          text: "تتميز الظاهرة الاجتماعية بأنها مستقلة عن الأفراد، وهذا يعني أنها:",
          options: ["ذاتية", "شيئية (موضوعية)", "مؤقتة", "اختيارية"],
          correctIndex: 1
        }
      ]
    }
  },

  // ================= 4. قسم نظم المعلومات والذكاء الاصطناعي =================
  {
    id: "course-9",
    title: "تحليل البيانات المكانية ونظم المعلومات الجغرافية (GIS)",
    category: "نظم المعلومات والـ AI",
    instructor: "م. أحمد طارق",
    instructorRole: "Senior Full-Stack & Spatial Analyst",
    price: 700,
    rating: 4.9,
    studentsCount: 640,
    duration: "16 ساعة",
    level: "عملي تطبيقي",
    thumbnail: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80",
    description: "تعلم إعداد الخرائط الرقمية، رسم شبكات المرافق والمشاريع الهندسية، وتحليل البيانات المكانية وربطها بقواعد البيانات الجغرافية.",
    chapters: [
      {
        id: "ch-901",
        title: "الوحدة الأولى: أساسيات الـ GIS والبيانات المكانية",
        lessons: [
          {
            id: "les-901",
            title: "1. الفرق بين بيانات Vector و Raster ونظم الإحداثيات",
            duration: "20:00",
            isFree: true,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "دليل_البيانات_المكانية_GIS.pdf"
          },
          {
            id: "les-902",
            title: "2. تطبيق عملي لرسم شبكات البنية التحتية والمياه",
            duration: "38:00",
            isFree: false,
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            pdfName: "مشروع_تطبيقي_GIS.pdf"
          }
        ]
      }
    ],
    exam: {
      id: "exam-9",
      title: "امتحان أساسيات نظم المعلومات الجغرافية GIS",
      durationMinutes: 10,
      passingScore: 50,
      questions: [
        {
          id: "q901",
          text: "أي نوع من البيانات المكانية يعتمد على النقاط والخطوط والمضلعات (Points, Lines, Polygons)؟",
          options: ["Raster Data", "Vector Data", "Audio Data", "Text Data"],
          correctIndex: 1
        }
      ]
    }
  }
];

// أكواد الشحن الجاهزة للتجربة في البورتفوليو
export const INITIAL_ACCESS_CODES = [
  { code: "FREE2026", courseId: "ALL", isUsed: false, label: "كود ذهبي يفتح أي كورس للتجربة" },
  { code: "REACT100", courseId: "course-1", isUsed: false, label: "كود خاص بكورس React" },
  { code: "CSHARP99", courseId: "course-2", isUsed: false, label: "كود خاص بكورس C#" },
  { code: "MARYAM50", courseId: "course-3", isUsed: false, label: "كود خاص بمراجعة الفلسفة وعلم النفس" }
];

// الحسابات الجاهزة للـ Demo Login بضغطة واحدة (مع رصيد المحفظة)
export const DEMO_USERS = {
  student: {
    id: "u-student",
    name: "محمد إيهاب",
    email: "student@madar-lms.com",
    role: "student",
    walletBalance: 1200,
    enrolledCourses: ["course-1"],
    completedLessons: ["les-101"],
    examScores: {}
  },
  instructor: {
    id: "u-instructor",
    name: "م. أحمد طارق",
    email: "instructor@madar-lms.com",
    role: "instructor",
    walletBalance: 4500,
    enrolledCourses: ["course-1", "course-2", "course-3"],
    completedLessons: [],
    examScores: {}
  },
  admin: {
    id: "u-admin",
    name: "مدير المنصة",
    email: "admin@madar-lms.com",
    role: "admin",
    walletBalance: 10000,
    enrolledCourses: ["course-1", "course-2", "course-3"],
    completedLessons: [],
    examScores: {}
  }
};
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Star,
  Timer,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  XCircle,
  Eye,
  EyeOff,
  Lightbulb,
  Sliders,
  FolderOpen
} from "lucide-react";
import { questions as rawQuestions } from "../../data/interview-questions";

interface Question {
  id: string;
  category: string;
  title: string;
  intro?: string;
  bullets?: string[];
  sampleAnswer?: string;
}

export default function InterviewPrepPage() {
  const [questions] = useState<Question[]>(rawQuestions as Question[]);
  const [currentFilter, setCurrentFilter] = useState<"all" | "learned" | "review">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(new Set());

  // User progress stored in localStorage
  const [learnedSet, setLearnedSet] = useState<Set<string>>(new Set());
  const [reviewSet, setReviewSet] = useState<Set<string>>(new Set());

  // Mock mode state
  const [mockActive, setMockActive] = useState<boolean>(false);
  const [mockQuestions, setMockQuestions] = useState<Question[]>([]);
  const [mockCurrentIndex, setMockCurrentIndex] = useState<number>(0);
  const [mockTimeRemaining, setMockTimeRemaining] = useState<number>(15 * 60);
  const [mockTimerActive, setMockTimerActive] = useState<boolean>(false);
  const [mockCardFlipped, setMockCardFlipped] = useState<boolean>(false);
  const [mockSetupCount, setMockSetupCount] = useState<number>(10);
  const [mockSetupCategories, setMockSetupCategories] = useState<Set<string>>(new Set());

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const learned = JSON.parse(localStorage.getItem("hyundai_interview_learned") || "[]");
      const review = JSON.parse(localStorage.getItem("hyundai_interview_review") || "[]");
      setLearnedSet(new Set(learned));
      setReviewSet(new Set(review));
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }
  }, []);

  // Save progress
  const saveProgress = (newLearned: Set<string>, newReview: Set<string>) => {
    try {
      localStorage.setItem("hyundai_interview_learned", JSON.stringify(Array.from(newLearned)));
      localStorage.setItem("hyundai_interview_review", JSON.stringify(Array.from(newReview)));
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  };

  const toggleLearned = (qid: string) => {
    const newLearned = new Set(learnedSet);
    const newReview = new Set(reviewSet);

    if (newLearned.has(qid)) {
      newLearned.delete(qid);
    } else {
      newLearned.add(qid);
      newReview.delete(qid);
    }

    setLearnedSet(newLearned);
    setReviewSet(newReview);
    saveProgress(newLearned, newReview);
  };

  const toggleReview = (qid: string) => {
    const newLearned = new Set(learnedSet);
    const newReview = new Set(reviewSet);

    if (newReview.has(qid)) {
      newReview.delete(qid);
    } else {
      newReview.add(qid);
      newLearned.delete(qid);
    }

    setLearnedSet(newLearned);
    setReviewSet(newReview);
    saveProgress(newLearned, newReview);
  };

  const resetProgress = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ tiến độ học tập (Đã thuộc & Cần ôn) không?")) {
      const emptyLearned = new Set<string>();
      const emptyReview = new Set<string>();
      setLearnedSet(emptyLearned);
      setReviewSet(emptyReview);
      saveProgress(emptyLearned, emptyReview);
    }
  };

  const toggleAnswer = (qid: string) => {
    const newExpanded = new Set(expandedAnswers);
    if (newExpanded.has(qid)) {
      newExpanded.delete(qid);
    } else {
      newExpanded.add(qid);
    }
    setExpandedAnswers(newExpanded);
  };

  // Filter logic
  const getFilteredQuestions = () => {
    return questions.filter(q => {
      if (selectedCategory !== "all" && q.category !== selectedCategory) {
        return false;
      }
      if (currentFilter === "learned" && !learnedSet.has(q.id)) return false;
      if (currentFilter === "review" && !reviewSet.has(q.id)) return false;
      if (searchQuery) {
        const qStr = `${q.title} ${q.intro || ""} ${(q.bullets || []).join(" ")} ${q.sampleAnswer || ""}`.toLowerCase();
        if (!qStr.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  };

  const toggleAllAnswers = () => {
    const filtered = getFilteredQuestions();
    const allExpanded = filtered.every(q => expandedAnswers.has(q.id));
    
    if (allExpanded) {
      setExpandedAnswers(new Set());
    } else {
      setExpandedAnswers(new Set(filtered.map(q => q.id)));
    }
  };

  const categories = ["all", ...Array.from(new Set(questions.map(q => q.category)))];

  // Setup mock category selection
  useEffect(() => {
    if (questions.length > 0) {
      const cats = Array.from(new Set(questions.map(q => q.category)));
      setMockSetupCategories(new Set(cats));
    }
  }, [questions]);

  const toggleMockSetupCategory = (cat: string) => {
    const next = new Set(mockSetupCategories);
    if (next.has(cat)) {
      next.delete(cat);
    } else {
      next.add(cat);
    }
    setMockSetupCategories(next);
  };

  // Mock Timer Logic
  useEffect(() => {
    if (mockActive && mockTimerActive) {
      timerRef.current = setInterval(() => {
        setMockTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setMockTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mockActive, mockTimerActive]);

  const startMockSession = () => {
    if (mockSetupCategories.size === 0) {
      alert("Vui lòng chọn ít nhất một danh mục câu hỏi!");
      return;
    }

    let candidates = questions.filter(q => mockSetupCategories.has(q.category));
    if (candidates.length === 0) {
      alert("Không có câu hỏi nào trong danh mục đã chọn!");
      return;
    }

    candidates = [...candidates].sort(() => 0.5 - Math.random());
    setMockQuestions(candidates.slice(0, mockSetupCount));
    setMockCurrentIndex(0);
    setMockTimeRemaining(15 * 60);
    setMockCardFlipped(false);
    setMockActive(true);
    setMockTimerActive(true);
  };

  const endMockSession = () => {
    setMockTimerActive(false);
    setMockQuestions([]);
    setMockActive(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const filteredQuestions = getFilteredQuestions();
  const allAnswersExpanded = filteredQuestions.length > 0 && filteredQuestions.every(q => expandedAnswers.has(q.id));

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BookOpen className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Hyundai E-commerce <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Bootcamp 2026</span>
              </h1>
              <p className="text-xs text-zinc-400">Trình học &amp; Ôn luyện câu hỏi phỏng vấn tối ưu</p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="flex-1 md:flex-none">
              <div className="flex justify-between text-xs text-zinc-400 mb-1">
                <span>Tiến độ tổng thể</span>
                <span>
                  {learnedSet.size}/{questions.length} (
                  {questions.length > 0
                    ? Math.round((learnedSet.size / questions.length) * 100)
                    : 0}
                  %)
                </span>
              </div>
              <div className="h-2 w-full md:w-64 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{
                    width: `${
                      questions.length > 0
                        ? (learnedSet.size / questions.length) * 100
                        : 0
                    }%`
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={resetProgress}
              className="text-zinc-400 hover:text-red-400 text-sm flex items-center gap-1.5 transition"
              title="Xóa tiến độ học tập"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Controls */}
        <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
          
          {/* Search & Filters */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4">
            <h2 className="font-semibold text-xs uppercase tracking-wider text-zinc-400">Bộ lọc &amp; Tìm kiếm</h2>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm câu hỏi, từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition"
              />
              <Search className="absolute left-3.5 top-3.5 text-zinc-500" size={16} />
            </div>

            <div className="flex flex-col gap-1.5">
              {categories.map(cat => {
                const count = cat === "all"
                  ? questions.length
                  : questions.filter(q => q.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left py-2 px-3 rounded-xl text-sm flex justify-between items-center transition ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white font-medium shadow-md shadow-blue-500/10"
                        : "hover:bg-zinc-800 text-zinc-300"
                    }`}
                  >
                    <span>{cat === "all" ? "Tất cả danh mục" : cat}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      selectedCategory === cat ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-400"
                    }`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress / Stats Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <h2 className="font-semibold text-xs uppercase tracking-wider text-zinc-400 mb-4">Trạng thái học tập</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-3 text-center">
                <span className="text-[10px] text-zinc-400">Cần ôn lại</span>
                <div className="text-2xl font-bold text-amber-500 mt-1">{reviewSet.size}</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-3 text-center">
                <span className="text-[10px] text-zinc-400">Đã thuộc</span>
                <div className="text-2xl font-bold text-emerald-500 mt-1">{learnedSet.size}</div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCurrentFilter("learned")}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs flex justify-between items-center transition ${
                  currentFilter === "learned" ? "bg-zinc-800 text-emerald-400 font-medium" : "hover:bg-zinc-800 text-zinc-300"
                }`}
              >
                <span>Chỉ hiện câu Đã thuộc</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">{learnedSet.size}</span>
              </button>
              <button
                onClick={() => setCurrentFilter("review")}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs flex justify-between items-center transition ${
                  currentFilter === "review" ? "bg-zinc-800 text-amber-400 font-medium" : "hover:bg-zinc-800 text-zinc-300"
                }`}
              >
                <span>Chỉ hiện câu Cần ôn lại</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400">{reviewSet.size}</span>
              </button>
              <button
                onClick={() => setCurrentFilter("all")}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs flex justify-between items-center transition ${
                  currentFilter === "all" ? "bg-zinc-800 text-blue-400 font-medium" : "hover:bg-zinc-800 text-zinc-300"
                }`}
              >
                <span>Hiện tất cả câu hỏi</span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">{questions.length}</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3">
            <h2 className="font-semibold text-xs uppercase tracking-wider text-zinc-400 mb-1">Chế độ luyện tập</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMockActive(false)}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                  !mockActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10"
                    : "bg-zinc-950 text-zinc-400 border border-zinc-850 hover:bg-zinc-855"
                }`}
              >
                Danh sách
              </button>
              <button
                onClick={() => {
                  setMockActive(true);
                  if (questions.length > 0) {
                    const cats = Array.from(new Set(questions.map(q => q.category)));
                    setMockSetupCategories(new Set(cats));
                  }
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition ${
                  mockActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10"
                    : "bg-zinc-950 text-zinc-400 border border-zinc-850 hover:bg-zinc-855"
                }`}
              >
                Thi thử (Mock)
              </button>
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <section className="flex-1 flex flex-col gap-6 min-w-0">
          
          {/* List Mode Workspace */}
          {!mockActive && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-zinc-400">
                  Hiển thị <span className="font-semibold text-white">{filteredQuestions.length}</span> / <span className="font-semibold text-white">{questions.length}</span> câu hỏi
                </div>
                <button
                  onClick={toggleAllAnswers}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5 transition"
                >
                  {allAnswersExpanded ? <EyeOff size={14} /> : <Eye size={14} />}
                  {allAnswersExpanded ? "Ẩn toàn bộ gợi ý" : "Hiện toàn bộ gợi ý"}
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {filteredQuestions.length === 0 ? (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center text-zinc-500">
                    <FolderOpen className="mx-auto text-3xl mb-3" />
                    <p className="text-sm">Không tìm thấy câu hỏi nào phù hợp với bộ lọc</p>
                  </div>
                ) : (
                  filteredQuestions.map((q) => {
                    const isExpanded = expandedAnswers.has(q.id);
                    const isLearned = learnedSet.has(q.id);
                    const isReview = reviewSet.has(q.id);
                    return (
                      <div
                        key={q.id}
                        className={`bg-zinc-900 border ${
                          isLearned
                            ? "border-emerald-500/30 bg-emerald-950/5"
                            : isReview
                            ? "border-amber-500/30 bg-amber-950/5"
                            : "border-zinc-800"
                        } rounded-2xl p-5 flex flex-col gap-4 transition hover:border-zinc-700`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex flex-col gap-1.5">
                            <span className="self-start px-2 py-0.5 rounded text-[9px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {q.category}
                            </span>
                            <h3
                              onClick={() => toggleAnswer(q.id)}
                              className="text-sm font-semibold text-white leading-snug cursor-pointer hover:text-blue-400 transition"
                            >
                              {q.title}
                            </h3>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <button
                              onClick={() => toggleLearned(q.id)}
                              className={`h-8 px-2.5 rounded-lg border ${
                                isLearned
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                  : "border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                              } text-xs transition flex items-center gap-1`}
                            >
                              <CheckCircle2 size={12} />
                              <span className="hidden sm:inline">Thuộc</span>
                            </button>
                            <button
                              onClick={() => toggleReview(q.id)}
                              className={`h-8 px-2.5 rounded-lg border ${
                                isReview
                                  ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                                  : "border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                              } text-xs transition flex items-center gap-1`}
                            >
                              <Star size={12} />
                              <span className="hidden sm:inline">Ôn</span>
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="border-t border-zinc-800/60 pt-4 flex flex-col gap-4 text-xs">
                            {q.intro && <p className="text-zinc-400 italic">{q.intro}</p>}
                            {q.bullets && q.bullets.length > 0 && (
                              <ul className="list-disc list-inside flex flex-col gap-1.5 text-zinc-300">
                                {q.bullets.map((b, i) => (
                                  <li key={i}>{b}</li>
                                ))}
                              </ul>
                            )}
                            {q.sampleAnswer && (
                              <div className="bg-zinc-950 border border-zinc-850 rounded-xl p-3.5 mt-2">
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-amber-500 mb-1.5">Gợi ý trả lời tham khảo:</h4>
                                <p className="text-zinc-300 leading-relaxed whitespace-pre-line">{q.sampleAnswer}</p>
                              </div>
                            )}
                          </div>
                        )}
                        {!isExpanded && (
                          <div
                            onClick={() => toggleAnswer(q.id)}
                            className="text-center text-[10px] text-zinc-600 border-t border-zinc-800/40 pt-3 cursor-pointer hover:text-zinc-400 transition"
                          >
                            Bấm để hiển thị gợi ý &amp; hướng dẫn
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Mock Interview Mode */}
          {mockActive && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-6">
              
              {/* Setup Screen */}
              {mockQuestions.length === 0 ? (
                <div className="py-8 flex flex-col items-center justify-center max-w-md mx-auto text-center gap-5">
                  <div className="h-16 w-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-2xl border border-blue-500/20">
                    <Sliders />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Cấu hình buổi phỏng vấn</h3>
                    <p className="text-xs text-zinc-400 mt-1">Chọn số câu hỏi và nhóm danh mục bạn muốn luyện tập</p>
                  </div>
                  
                  <div className="w-full flex flex-col gap-4 text-left">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Số lượng câu hỏi</label>
                      <select
                        value={mockSetupCount}
                        onChange={(e) => setMockSetupCount(parseInt(e.target.value))}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-blue-500 transition"
                      >
                        <option value={5}>5 Câu hỏi (Phỏng vấn nhanh)</option>
                        <option value={10}>10 Câu hỏi (Tiêu chuẩn)</option>
                        <option value={15}>15 Câu hỏi (Chuyên sâu)</option>
                        <option value={20}>20 Câu hỏi (Thử thách tối đa)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1.5 font-medium">Chọn danh mục</label>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from(new Set(questions.map(q => q.category))).map(cat => (
                          <div key={cat} className="flex items-center gap-2 bg-zinc-950 border border-zinc-850 p-2.5 rounded-xl">
                            <input
                              type="checkbox"
                              id={`mock-cat-${cat}`}
                              checked={mockSetupCategories.has(cat)}
                              onChange={() => toggleMockSetupCategory(cat)}
                              className="accent-blue-500 h-4 w-4"
                            />
                            <label htmlFor={`mock-cat-${cat}`} className="text-xs text-zinc-300 font-medium cursor-pointer">
                              {cat}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={startMockSession}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-500/15 transition flex items-center justify-center gap-2"
                  >
                    Bắt đầu phỏng vấn
                  </button>
                </div>
              ) : (
                /* Testing Screen */
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-5">
                    <div>
                      <h2 className="text-lg font-bold text-white flex items-center gap-2">
                        Giả Lập Phỏng Vấn Thử
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">Luyện tập trả lời trực tiếp dưới áp lực thời gian</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-xl font-bold bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-amber-400 flex items-center gap-2">
                        <Timer size={18} />
                        {formatTime(mockTimeRemaining)}
                      </div>
                      <button
                        onClick={() => setMockTimerActive(!mockTimerActive)}
                        className="h-9 w-9 bg-zinc-800 rounded-lg flex items-center justify-center text-sm text-zinc-200 hover:bg-zinc-700 transition"
                      >
                        {mockTimerActive ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-zinc-950 border border-zinc-850 p-3 rounded-xl text-xs">
                    <span className="text-zinc-400">
                      Câu hỏi <span className="font-semibold text-white">{mockCurrentIndex + 1}</span> trên <span className="font-semibold text-white">{mockQuestions.length}</span>
                    </span>
                    <div className="flex gap-1">
                      {mockQuestions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            idx === mockCurrentIndex
                              ? "bg-blue-500 w-4"
                              : idx < mockCurrentIndex
                              ? "bg-emerald-500"
                              : "bg-zinc-800"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Card Flip */}
                  <div
                    onClick={(e) => {
                      if ((e.target as HTMLElement).closest("button")) return;
                      setMockCardFlipped(!mockCardFlipped);
                    }}
                    className={`card-flip min-h-[300px] cursor-pointer ${mockCardFlipped ? "flipped" : ""}`}
                  >
                    <div className="card-flip-inner relative w-full h-full min-h-[300px] transition-transform duration-500">
                      
                      {/* Front Side */}
                      <div className="card-front absolute inset-0 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
                        <div className="flex justify-between items-start">
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {mockQuestions[mockCurrentIndex]?.category}
                          </span>
                          <Lightbulb className="text-amber-500" size={18} />
                        </div>
                        
                        <div className="my-auto py-8">
                          <h3 className="text-lg md:text-xl font-bold text-center text-white leading-relaxed">
                            {mockQuestions[mockCurrentIndex]?.title}
                          </h3>
                        </div>
                        
                        <div className="text-center text-[10px] text-zinc-500 flex items-center justify-center gap-2">
                          Bấm vào thẻ để lật xem gợi ý trả lời
                        </div>
                      </div>
                      
                      {/* Back Side */}
                      <div className="card-back absolute inset-0 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xl overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start mb-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {mockQuestions[mockCurrentIndex]?.category}
                          </span>
                          <span className="text-[10px] text-zinc-500">Lật lại</span>
                        </div>
                        
                        <div className="flex-1 mb-4">
                          <h4 className="text-sm font-bold text-white border-b border-zinc-850 pb-2 mb-3">
                            {mockQuestions[mockCurrentIndex]?.title}
                          </h4>
                          
                          {mockQuestions[mockCurrentIndex]?.intro && (
                            <p className="text-[11px] text-zinc-400 mb-3 italic">{mockQuestions[mockCurrentIndex]?.intro}</p>
                          )}
                          
                          {mockQuestions[mockCurrentIndex]?.bullets && (
                            <ul className="list-disc list-inside flex flex-col gap-1.5 text-[11px] text-zinc-300 mb-4">
                              {mockQuestions[mockCurrentIndex]?.bullets?.map((b, i) => (
                                <li key={i}>{b}</li>
                              ))}
                            </ul>
                          )}
                          
                          {mockQuestions[mockCurrentIndex]?.sampleAnswer && (
                            <div className="bg-zinc-900 border border-zinc-850 rounded-xl p-3">
                              <h5 className="text-[9px] font-bold uppercase tracking-wider text-amber-500 mb-1">Gợi ý trả lời:</h5>
                              <p className="text-[11px] text-zinc-300 leading-relaxed whitespace-pre-line">
                                {mockQuestions[mockCurrentIndex]?.sampleAnswer}
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex justify-between items-center gap-4 mt-auto pt-4 border-t border-zinc-850/60">
                          <button
                            onClick={() => {
                              if (mockQuestions[mockCurrentIndex]) {
                                toggleLearned(mockQuestions[mockCurrentIndex].id);
                              }
                            }}
                            className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                              mockQuestions[mockCurrentIndex] && learnedSet.has(mockQuestions[mockCurrentIndex].id)
                                ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                                : "border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                            }`}
                          >
                            <CheckCircle2 size={12} />
                            Đã thuộc
                          </button>
                          <button
                            onClick={() => {
                              if (mockQuestions[mockCurrentIndex]) {
                                toggleReview(mockQuestions[mockCurrentIndex].id);
                              }
                            }}
                            className={`flex-1 py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                              mockQuestions[mockCurrentIndex] && reviewSet.has(mockQuestions[mockCurrentIndex].id)
                                ? "border-amber-500 bg-amber-500/10 text-amber-400"
                                : "border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                            }`}
                          >
                            <Star size={12} />
                            Cần ôn
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-between items-center gap-4">
                    <button
                      onClick={() => setMockCurrentIndex(prev => Math.max(0, prev - 1))}
                      disabled={mockCurrentIndex === 0}
                      className="py-2.5 px-4 bg-zinc-850 hover:bg-zinc-800 disabled:opacity-50 text-zinc-200 text-xs font-semibold rounded-xl transition flex items-center gap-2"
                    >
                      <ChevronLeft size={14} />
                      Câu trước
                    </button>
                    
                    <button
                      onClick={endMockSession}
                      className="py-2.5 px-4 bg-red-950/20 hover:bg-red-900/30 text-red-400 text-xs font-semibold rounded-xl transition flex items-center gap-2 border border-red-900/20"
                    >
                      <XCircle size={14} />
                      Kết thúc sớm
                    </button>
                    
                    <button
                      onClick={() => {
                        if (mockCurrentIndex < mockQuestions.length - 1) {
                          setMockCurrentIndex(prev => prev + 1);
                          setMockCardFlipped(false);
                        } else {
                          endMockSession();
                        }
                      }}
                      className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2"
                    >
                      {mockCurrentIndex < mockQuestions.length - 1 ? "Câu tiếp theo" : "Hoàn thành"}
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-8 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-7xl px-4">
          <p>© 2026 Hyundai E-commerce Bootcamp. Giáo trình ôn phỏng vấn Frontend, Backend &amp; Fullstack.</p>
        </div>
      </footer>
    </div>
  );
}
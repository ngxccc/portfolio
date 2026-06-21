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
  FolderOpen,
} from "lucide-react";
import { questions as rawQuestions } from "@/data/interview-questions";

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
  const [currentFilter, setCurrentFilter] = useState<
    "all" | "learned" | "review"
  >("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedAnswers, setExpandedAnswers] = useState<Set<string>>(
    new Set(),
  );

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
  const [mockSetupCategories, setMockSetupCategories] = useState<Set<string>>(
    new Set(),
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const learned = JSON.parse(
        localStorage.getItem("hyundai_interview_learned") || "[]",
      );
      const review = JSON.parse(
        localStorage.getItem("hyundai_interview_review") || "[]",
      );
      setLearnedSet(new Set(learned));
      setReviewSet(new Set(review));
    } catch (e) {
      console.error("Failed to load progress from localStorage", e);
    }
  }, []);

  // Save progress
  const saveProgress = (newLearned: Set<string>, newReview: Set<string>) => {
    try {
      localStorage.setItem(
        "hyundai_interview_learned",
        JSON.stringify(Array.from(newLearned)),
      );
      localStorage.setItem(
        "hyundai_interview_review",
        JSON.stringify(Array.from(newReview)),
      );
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
    if (
      confirm(
        "Bạn có chắc chắn muốn xóa toàn bộ tiến độ học tập (Đã thuộc & Cần ôn) không?",
      )
    ) {
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
    return questions.filter((q) => {
      if (selectedCategory !== "all" && q.category !== selectedCategory) {
        return false;
      }
      if (currentFilter === "learned" && !learnedSet.has(q.id)) return false;
      if (currentFilter === "review" && !reviewSet.has(q.id)) return false;
      if (searchQuery) {
        const qStr =
          `${q.title} ${q.intro || ""} ${(q.bullets || []).join(" ")} ${q.sampleAnswer || ""}`.toLowerCase();
        if (!qStr.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });
  };

  const toggleAllAnswers = () => {
    const filtered = getFilteredQuestions();
    const allExpanded = filtered.every((q) => expandedAnswers.has(q.id));

    if (allExpanded) {
      setExpandedAnswers(new Set());
    } else {
      setExpandedAnswers(new Set(filtered.map((q) => q.id)));
    }
  };

  const categories = [
    "all",
    ...Array.from(new Set(questions.map((q) => q.category))),
  ];

  // Setup mock category selection
  useEffect(() => {
    if (questions.length > 0) {
      const cats = Array.from(new Set(questions.map((q) => q.category)));
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
        setMockTimeRemaining((prev) => {
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

    let candidates = questions.filter((q) =>
      mockSetupCategories.has(q.category),
    );
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
  const allAnswersExpanded =
    filteredQuestions.length > 0 &&
    filteredQuestions.every((q) => expandedAnswers.has(q.id));

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100 selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:px-6 md:flex-row lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20">
              <BookOpen className="text-xl text-white" />
            </div>
            <div>
              <h1 className="flex items-center gap-2 text-lg font-bold tracking-tight text-white">
                Hyundai E-commerce{" "}
                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400">
                  Bootcamp 2026
                </span>
              </h1>
              <p className="text-xs text-zinc-400">
                Trình học &amp; Ôn luyện câu hỏi phỏng vấn tối ưu
              </p>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex w-full items-center gap-6 md:w-auto">
            <div className="flex-1 md:flex-none">
              <div className="mb-1 flex justify-between text-xs text-zinc-400">
                <span>Tiến độ tổng thể</span>
                <span>
                  {learnedSet.size}/{questions.length} (
                  {questions.length > 0
                    ? Math.round((learnedSet.size / questions.length) * 100)
                    : 0}
                  %)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800 md:w-64">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{
                    width: `${
                      questions.length > 0
                        ? (learnedSet.size / questions.length) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={resetProgress}
              className="flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-red-400"
              title="Xóa tiến độ học tập"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        {/* Sidebar Controls */}
        <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-80">
          {/* Search & Filters */}
          <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Bộ lọc &amp; Tìm kiếm
            </h2>

            <div className="relative">
              <input
                type="text"
                placeholder="Tìm câu hỏi, từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2.5 pr-4 pl-10 text-sm text-zinc-200 placeholder-zinc-500 transition focus:border-blue-500 focus:outline-none"
              />
              <Search
                className="absolute top-3.5 left-3.5 text-zinc-500"
                size={16}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => {
                const count =
                  cat === "all"
                    ? questions.length
                    : questions.filter((q) => q.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                      selectedCategory === cat
                        ? "bg-blue-600 font-medium text-white shadow-md shadow-blue-500/10"
                        : "text-zinc-300 hover:bg-zinc-800"
                    }`}
                  >
                    <span>{cat === "all" ? "Tất cả danh mục" : cat}</span>
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        selectedCategory === cat
                          ? "bg-white/20 text-white"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress / Stats Card */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-4 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Trạng thái học tập
            </h2>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="border-zinc-850 rounded-xl border bg-zinc-950 p-3 text-center">
                <span className="text-[10px] text-zinc-400">Cần ôn lại</span>
                <div className="mt-1 text-2xl font-bold text-amber-500">
                  {reviewSet.size}
                </div>
              </div>
              <div className="border-zinc-850 rounded-xl border bg-zinc-950 p-3 text-center">
                <span className="text-[10px] text-zinc-400">Đã thuộc</span>
                <div className="mt-1 text-2xl font-bold text-emerald-500">
                  {learnedSet.size}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setCurrentFilter("learned")}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                  currentFilter === "learned"
                    ? "bg-zinc-800 font-medium text-emerald-400"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <span>Chỉ hiện câu Đã thuộc</span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-400">
                  {learnedSet.size}
                </span>
              </button>
              <button
                onClick={() => setCurrentFilter("review")}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                  currentFilter === "review"
                    ? "bg-zinc-800 font-medium text-amber-400"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <span>Chỉ hiện câu Cần ôn lại</span>
                <span className="rounded bg-amber-500/10 px-2 py-0.5 text-amber-400">
                  {reviewSet.size}
                </span>
              </button>
              <button
                onClick={() => setCurrentFilter("all")}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                  currentFilter === "all"
                    ? "bg-zinc-800 font-medium text-blue-400"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                <span>Hiện tất cả câu hỏi</span>
                <span className="rounded bg-blue-500/10 px-2 py-0.5 text-blue-400">
                  {questions.length}
                </span>
              </button>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <h2 className="mb-1 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
              Chế độ luyện tập
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMockActive(false)}
                className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                  !mockActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10"
                    : "border-zinc-850 hover:bg-zinc-855 border bg-zinc-950 text-zinc-400"
                }`}
              >
                Danh sách
              </button>
              <button
                onClick={() => {
                  setMockActive(true);
                  if (questions.length > 0) {
                    const cats = Array.from(
                      new Set(questions.map((q) => q.category)),
                    );
                    setMockSetupCategories(new Set(cats));
                  }
                }}
                className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium transition ${
                  mockActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/10"
                    : "border-zinc-850 hover:bg-zinc-855 border bg-zinc-950 text-zinc-400"
                }`}
              >
                Thi thử (Mock)
              </button>
            </div>
          </div>
        </aside>

        {/* Content Panel */}
        <section className="flex min-w-0 flex-1 flex-col gap-6">
          {/* List Mode Workspace */}
          {!mockActive && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-zinc-400">
                  Hiển thị{" "}
                  <span className="font-semibold text-white">
                    {filteredQuestions.length}
                  </span>{" "}
                  /{" "}
                  <span className="font-semibold text-white">
                    {questions.length}
                  </span>{" "}
                  câu hỏi
                </div>
                <button
                  onClick={toggleAllAnswers}
                  className="flex items-center gap-1.5 text-xs font-medium text-blue-400 transition hover:text-blue-300"
                >
                  {allAnswersExpanded ? (
                    <EyeOff size={14} />
                  ) : (
                    <Eye size={14} />
                  )}
                  {allAnswersExpanded
                    ? "Ẩn toàn bộ gợi ý"
                    : "Hiện toàn bộ gợi ý"}
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {filteredQuestions.length === 0 ? (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center text-zinc-500">
                    <FolderOpen className="mx-auto mb-3 text-3xl" />
                    <p className="text-sm">
                      Không tìm thấy câu hỏi nào phù hợp với bộ lọc
                    </p>
                  </div>
                ) : (
                  filteredQuestions.map((q) => {
                    const isExpanded = expandedAnswers.has(q.id);
                    const isLearned = learnedSet.has(q.id);
                    const isReview = reviewSet.has(q.id);
                    return (
                      <div
                        key={q.id}
                        className={`border bg-zinc-900 ${
                          isLearned
                            ? "border-emerald-500/30 bg-emerald-950/5"
                            : isReview
                              ? "border-amber-500/30 bg-amber-950/5"
                              : "border-zinc-800"
                        } flex flex-col gap-4 rounded-2xl p-5 transition hover:border-zinc-700`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex flex-col gap-1.5">
                            <span className="self-start rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[9px] font-semibold text-blue-400">
                              {q.category}
                            </span>
                            <h3
                              onClick={() => toggleAnswer(q.id)}
                              className="cursor-pointer text-sm leading-snug font-semibold text-white transition hover:text-blue-400"
                            >
                              {q.title}
                            </h3>
                          </div>
                          <div className="flex shrink-0 gap-1.5">
                            <button
                              onClick={() => toggleLearned(q.id)}
                              className={`h-8 rounded-lg border px-2.5 ${
                                isLearned
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                  : "border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                              } flex items-center gap-1 text-xs transition`}
                            >
                              <CheckCircle2 size={12} />
                              <span className="hidden sm:inline">Thuộc</span>
                            </button>
                            <button
                              onClick={() => toggleReview(q.id)}
                              className={`h-8 rounded-lg border px-2.5 ${
                                isReview
                                  ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                                  : "border-zinc-800 text-zinc-400 hover:bg-zinc-800"
                              } flex items-center gap-1 text-xs transition`}
                            >
                              <Star size={12} />
                              <span className="hidden sm:inline">Ôn</span>
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="flex flex-col gap-4 border-t border-zinc-800/60 pt-4 text-xs">
                            {q.intro && (
                              <p className="text-zinc-400 italic">{q.intro}</p>
                            )}
                            {q.bullets && q.bullets.length > 0 && (
                              <ul className="flex list-inside list-disc flex-col gap-1.5 text-zinc-300">
                                {q.bullets.map((b, i) => (
                                  <li key={i}>{b}</li>
                                ))}
                              </ul>
                            )}
                            {q.sampleAnswer && (
                              <div className="border-zinc-850 mt-2 rounded-xl border bg-zinc-950 p-3.5">
                                <h4 className="mb-1.5 text-[10px] font-bold tracking-wider text-amber-500 uppercase">
                                  Gợi ý trả lời tham khảo:
                                </h4>
                                <p className="leading-relaxed whitespace-pre-line text-zinc-300">
                                  {q.sampleAnswer}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                        {!isExpanded && (
                          <div
                            onClick={() => toggleAnswer(q.id)}
                            className="cursor-pointer border-t border-zinc-800/40 pt-3 text-center text-[10px] text-zinc-600 transition hover:text-zinc-400"
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
            <div className="flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
              {/* Setup Screen */}
              {mockQuestions.length === 0 ? (
                <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-5 py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-2xl text-blue-500">
                    <Sliders />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Cấu hình buổi phỏng vấn
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      Chọn số câu hỏi và nhóm danh mục bạn muốn luyện tập
                    </p>
                  </div>

                  <div className="flex w-full flex-col gap-4 text-left">
                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                        Số lượng câu hỏi
                      </label>
                      <select
                        value={mockSetupCount}
                        onChange={(e) =>
                          setMockSetupCount(parseInt(e.target.value))
                        }
                        className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200 transition focus:border-blue-500 focus:outline-none"
                      >
                        <option value={5}>5 Câu hỏi (Phỏng vấn nhanh)</option>
                        <option value={10}>10 Câu hỏi (Tiêu chuẩn)</option>
                        <option value={15}>15 Câu hỏi (Chuyên sâu)</option>
                        <option value={20}>
                          20 Câu hỏi (Thử thách tối đa)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                        Chọn danh mục
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {Array.from(
                          new Set(questions.map((q) => q.category)),
                        ).map((cat) => (
                          <div
                            key={cat}
                            className="border-zinc-850 flex items-center gap-2 rounded-xl border bg-zinc-950 p-2.5"
                          >
                            <input
                              type="checkbox"
                              id={`mock-cat-${cat}`}
                              checked={mockSetupCategories.has(cat)}
                              onChange={() => toggleMockSetupCategory(cat)}
                              className="h-4 w-4 accent-blue-500"
                            />
                            <label
                              htmlFor={`mock-cat-${cat}`}
                              className="cursor-pointer text-xs font-medium text-zinc-300"
                            >
                              {cat}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={startMockSession}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/15 transition hover:bg-blue-700"
                  >
                    Bắt đầu phỏng vấn
                  </button>
                </div>
              ) : (
                /* Testing Screen */
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-start justify-between gap-4 border-b border-zinc-800 pb-5 sm:flex-row sm:items-center">
                    <div>
                      <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                        Giả Lập Phỏng Vấn Thử
                      </h2>
                      <p className="mt-1 text-xs text-zinc-400">
                        Luyện tập trả lời trực tiếp dưới áp lực thời gian
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-1.5 font-mono text-xl font-bold text-amber-400">
                        <Timer size={18} />
                        {formatTime(mockTimeRemaining)}
                      </div>
                      <button
                        onClick={() => setMockTimerActive(!mockTimerActive)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-sm text-zinc-200 transition hover:bg-zinc-700"
                      >
                        {mockTimerActive ? (
                          <Pause size={16} />
                        ) : (
                          <Play size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="border-zinc-850 flex items-center justify-between rounded-xl border bg-zinc-950 p-3 text-xs">
                    <span className="text-zinc-400">
                      Câu hỏi{" "}
                      <span className="font-semibold text-white">
                        {mockCurrentIndex + 1}
                      </span>{" "}
                      trên{" "}
                      <span className="font-semibold text-white">
                        {mockQuestions.length}
                      </span>
                    </span>
                    <div className="flex gap-1">
                      {mockQuestions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            idx === mockCurrentIndex
                              ? "w-4 bg-blue-500"
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
                    <div className="card-flip-inner relative h-full min-h-[300px] w-full transition-transform duration-500">
                      {/* Front Side */}
                      <div className="card-front absolute inset-0 flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                        <div className="flex items-start justify-between">
                          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[9px] font-semibold text-blue-400">
                            {mockQuestions[mockCurrentIndex]?.category}
                          </span>
                          <Lightbulb className="text-amber-500" size={18} />
                        </div>

                        <div className="my-auto py-8">
                          <h3 className="text-center text-lg leading-relaxed font-bold text-white md:text-xl">
                            {mockQuestions[mockCurrentIndex]?.title}
                          </h3>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-center text-[10px] text-zinc-500">
                          Bấm vào thẻ để lật xem gợi ý trả lời
                        </div>
                      </div>

                      {/* Back Side */}
                      <div className="card-back custom-scrollbar absolute inset-0 flex flex-col justify-between overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                        <div className="mb-4 flex items-start justify-between">
                          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-[9px] font-semibold text-blue-400">
                            {mockQuestions[mockCurrentIndex]?.category}
                          </span>
                          <span className="text-[10px] text-zinc-500">
                            Lật lại
                          </span>
                        </div>

                        <div className="mb-4 flex-1">
                          <h4 className="border-zinc-850 mb-3 border-b pb-2 text-sm font-bold text-white">
                            {mockQuestions[mockCurrentIndex]?.title}
                          </h4>

                          {mockQuestions[mockCurrentIndex]?.intro && (
                            <p className="mb-3 text-[11px] text-zinc-400 italic">
                              {mockQuestions[mockCurrentIndex]?.intro}
                            </p>
                          )}

                          {mockQuestions[mockCurrentIndex]?.bullets && (
                            <ul className="mb-4 flex list-inside list-disc flex-col gap-1.5 text-[11px] text-zinc-300">
                              {mockQuestions[mockCurrentIndex]?.bullets?.map(
                                (b, i) => (
                                  <li key={i}>{b}</li>
                                ),
                              )}
                            </ul>
                          )}

                          {mockQuestions[mockCurrentIndex]?.sampleAnswer && (
                            <div className="border-zinc-850 rounded-xl border bg-zinc-900 p-3">
                              <h5 className="mb-1 text-[9px] font-bold tracking-wider text-amber-500 uppercase">
                                Gợi ý trả lời:
                              </h5>
                              <p className="text-[11px] leading-relaxed whitespace-pre-line text-zinc-300">
                                {mockQuestions[mockCurrentIndex]?.sampleAnswer}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="border-zinc-850/60 mt-auto flex items-center justify-between gap-4 border-t pt-4">
                          <button
                            onClick={() => {
                              if (mockQuestions[mockCurrentIndex]) {
                                toggleLearned(
                                  mockQuestions[mockCurrentIndex].id,
                                );
                              }
                            }}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                              mockQuestions[mockCurrentIndex] &&
                              learnedSet.has(mockQuestions[mockCurrentIndex].id)
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
                                toggleReview(
                                  mockQuestions[mockCurrentIndex].id,
                                );
                              }
                            }}
                            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                              mockQuestions[mockCurrentIndex] &&
                              reviewSet.has(mockQuestions[mockCurrentIndex].id)
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
                  <div className="flex items-center justify-between gap-4">
                    <button
                      onClick={() =>
                        setMockCurrentIndex((prev) => Math.max(0, prev - 1))
                      }
                      disabled={mockCurrentIndex === 0}
                      className="bg-zinc-850 flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-zinc-200 transition hover:bg-zinc-800 disabled:opacity-50"
                    >
                      <ChevronLeft size={14} />
                      Câu trước
                    </button>

                    <button
                      onClick={endMockSession}
                      className="flex items-center gap-2 rounded-xl border border-red-900/20 bg-red-950/20 px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-900/30"
                    >
                      <XCircle size={14} />
                      Kết thúc sớm
                    </button>

                    <button
                      onClick={() => {
                        if (mockCurrentIndex < mockQuestions.length - 1) {
                          setMockCurrentIndex((prev) => prev + 1);
                          setMockCardFlipped(false);
                        } else {
                          endMockSession();
                        }
                      }}
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                    >
                      {mockCurrentIndex < mockQuestions.length - 1
                        ? "Câu tiếp theo"
                        : "Hoàn thành"}
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
          <p>
            © 2026 Hyundai E-commerce Bootcamp. Giáo trình ôn phỏng vấn
            Frontend, Backend &amp; Fullstack.
          </p>
        </div>
      </footer>
    </div>
  );
}

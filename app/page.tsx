"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import { lessons } from "./lesson-data";

type QuizQuestion = {
  lessonId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: QuizQuestion[] = [
  {
    lessonId: 1,
    question: "Who has final responsibility for determining whether the small UAS can safely complete a flight?",
    options: ["The aircraft manufacturer", "The remote pilot in command", "The visual observer", "The property owner"],
    answer: 1,
    explanation: "The remote PIC is directly responsible for and is the final authority over the operation.",
  },
  {
    lessonId: 1,
    question: "What is the standard maximum groundspeed under Part 107?",
    options: ["70 knots", "87 knots", "100 knots", "120 knots"],
    answer: 1,
    explanation: "The limit is 87 knots, which is 100 mph.",
  },
  {
    lessonId: 2,
    question: "A dashed blue line around an airport depicts which airspace at the surface?",
    options: ["Class B", "Class C", "Class D", "Class G"],
    answer: 2,
    explanation: "Dashed blue lines normally mark Class D airspace beginning at the surface.",
  },
  {
    lessonId: 2,
    question: "Which operation generally requires prior FAA airspace authorization?",
    options: ["At 200 ft AGL in Class G", "At 50 ft AGL in Class D", "Indoors inside a warehouse", "On a simulator"],
    answer: 1,
    explanation: "Part 107 operations in Class B, C, D, or surface-area Class E require prior authorization, even at low altitude.",
  },
  {
    lessonId: 3,
    question: "Which combination produces the highest density altitude?",
    options: ["Low, cold, high pressure", "High, hot, low pressure", "Low, dry, high pressure", "Sea level, cold, calm"],
    answer: 1,
    explanation: "High elevation, high temperature, and low pressure all increase density altitude and reduce performance.",
  },
  {
    lessonId: 3,
    question: "A METAR primarily reports what?",
    options: ["Observed surface weather", "A 30-day climate outlook", "Pilot certification status", "Temporary flight restrictions"],
    answer: 0,
    explanation: "A METAR is an aviation routine weather report describing observed surface conditions.",
  },
  {
    lessonId: 4,
    question: "A manned helicopter unexpectedly approaches your operating area. What should the remote PIC do?",
    options: ["Climb above it", "Continue if the mission is paid", "Yield and avoid interference", "Ask the visual observer to take control"],
    answer: 2,
    explanation: "Small unmanned aircraft must yield right of way to other aircraft and avoid creating a collision hazard.",
  },
  {
    lessonId: 5,
    question: "What is a typical effect of adding payload?",
    options: ["Longer endurance", "Lower power demand", "Reduced performance margin", "No effect below 55 lb"],
    answer: 2,
    explanation: "Added weight usually increases power required and reduces endurance and maneuvering margin.",
  },
  {
    lessonId: 6,
    question: "What anti-collision light visibility is required for routine Part 107 night operations?",
    options: ["1 statute mile", "2 statute miles", "3 statute miles", "5 statute miles"],
    answer: 2,
    explanation: "The anti-collision light must be visible for at least 3 statute miles, subject to the rule’s safety provision.",
  },
  {
    lessonId: 6,
    question: "What is the best first principle during a lost-link or flyaway event?",
    options: ["Protect the camera", "Maintain safety of people and other aircraft", "Finish the mapping route", "Call the client"],
    answer: 1,
    explanation: "Protect people and avoid other aircraft first, then execute the briefed abnormal procedure and notify as appropriate.",
  },
];

const lessonNames = Object.fromEntries(lessons.map((lesson) => [lesson.id, lesson.title]));
const STORAGE_KEY = "part107-flight-school-progress-v1";
const DEFAULT_PROGRESS = JSON.stringify({ completed: [], bestScore: 0, attempts: 0, activeLesson: 1 });
const progressListeners = new Set<() => void>();

function subscribeToProgress(listener: () => void) {
  progressListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    progressListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getProgressSnapshot() {
  try {
    const localValue = window.localStorage.getItem(STORAGE_KEY);
    if (localValue) return localValue;
  } catch {
    // Fall through to the same-device cookie backup.
  }
  try {
    const prefix = `${STORAGE_KEY}=`;
    const cookie = document.cookie.split("; ").find((item) => item.startsWith(prefix));
    return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function writeProgress(value: { completed: number[]; bestScore: number; attempts: number; activeLesson: number }) {
  const serialized = JSON.stringify(value);
  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // The cookie backup below also preserves progress on the same device.
  }
  try {
    document.cookie = `${STORAGE_KEY}=${encodeURIComponent(serialized)}; max-age=31536000; path=/; SameSite=Lax`;
  } catch {
    // The study experience still works in-session when storage is unavailable.
  }
  progressListeners.forEach((listener) => listener());
}

function ProgressRing({ value, size = 92 }: { value: number; size?: number }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div className="progress-ring" style={{ width: size, height: size }} aria-label={`${value}% complete`}>
      <svg viewBox="0 0 100 100" role="img" aria-hidden="true">
        <circle className="ring-track" cx="50" cy="50" r={radius} />
        <circle className="ring-value" cx="50" cy="50" r={radius} strokeDasharray={circumference} strokeDashoffset={offset} />
      </svg>
      <strong>{value}%</strong>
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<"learn" | "quiz" | "progress">("learn");
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [expandedScenario, setExpandedScenario] = useState<number | null>(null);
  const progressJson = useSyncExternalStore(subscribeToProgress, getProgressSnapshot, () => DEFAULT_PROGRESS);
  const progress = useMemo(() => {
    try {
      const value = JSON.parse(progressJson);
      return {
        completed: Array.isArray(value.completed) ? value.completed.filter((id: unknown) => typeof id === "number") : [],
        bestScore: Number(value.bestScore) || 0,
        attempts: Number(value.attempts) || 0,
        activeLesson: Number(value.activeLesson) || 1,
      };
    } catch {
      return { completed: [] as number[], bestScore: 0, attempts: 0, activeLesson: 1 };
    }
  }, [progressJson]);
  const { completed, bestScore, attempts, activeLesson } = progress;

  const lesson = lessons.find((item) => item.id === activeLesson) ?? lessons[0];
  const lessonProgress = Math.round((completed.length / lessons.length) * 100);
  const overallProgress = Math.round(lessonProgress * 0.7 + bestScore * 0.3);
  const answeredCount = answers.filter((answer) => answer !== null).length;
  const correctCount = answers.reduce<number>(
    (count, answer, index) => count + (answer === questions[index].answer ? 1 : 0),
    0,
  );
  const quizComplete = answeredCount === questions.length;
  const quizPercent = Math.round((correctCount / questions.length) * 100);
  const currentQuestion = questions[quizIndex];
  const currentAnswer = answers[quizIndex];

  const weakAreas = useMemo(() => {
    const misses = new Map<number, number>();
    answers.forEach((answer, index) => {
      if (answer !== null && answer !== questions[index].answer) {
        const lessonId = questions[index].lessonId;
        misses.set(lessonId, (misses.get(lessonId) ?? 0) + 1);
      }
    });
    return [...misses.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => lessonNames[id]);
  }, [answers]);

  function openLesson(id: number) {
    writeProgress({ ...progress, activeLesson: id });
    setExpandedScenario(null);
    setView("learn");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function markComplete() {
    const nextCompleted = completed.includes(activeLesson) ? completed : [...completed, activeLesson].sort();
    const next = lessons.find((item) => item.id > activeLesson && !completed.includes(item.id));
    writeProgress({ ...progress, completed: nextCompleted, activeLesson: next?.id ?? activeLesson });
    setExpandedScenario(null);
  }

  function chooseAnswer(optionIndex: number) {
    if (currentAnswer !== null) return;
    setAnswers((current) => current.map((answer, index) => (index === quizIndex ? optionIndex : answer)));
  }

  function goToQuestion(index: number) {
    setQuizIndex(Math.max(0, Math.min(questions.length - 1, index)));
  }

  function finishQuiz() {
    const nextBest = Math.max(bestScore, quizPercent);
    writeProgress({ ...progress, bestScore: nextBest, attempts: attempts + 1 });
    setView("progress");
  }

  function restartQuiz() {
    setAnswers(Array(questions.length).fill(null));
    setQuizIndex(0);
    setView("quiz");
  }

  function resetProgress() {
    if (!window.confirm("Reset all lesson and quiz progress on this device?")) return;
    writeProgress(JSON.parse(DEFAULT_PROGRESS));
    setAnswers(Array(questions.length).fill(null));
    setQuizIndex(0);
    setView("learn");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView("learn")} aria-label="Open study lessons">
          <span className="brand-mark">107</span>
          <span>
            <strong>Flight School</strong>
            <small>FAA Part 107 prep</small>
          </span>
        </button>
        <nav className="top-nav" aria-label="Primary navigation">
          <button className={view === "learn" ? "active" : ""} onClick={() => setView("learn")}>Learn</button>
          <button className={view === "quiz" ? "active" : ""} onClick={() => setView("quiz")}>Practice</button>
          <button className={view === "progress" ? "active" : ""} onClick={() => setView("progress")}>Progress</button>
        </nav>
        <div className="header-progress" title="Overall readiness">
          <span>{overallProgress}% ready</span>
          <div className="mini-track"><i style={{ width: `${overallProgress}%` }} /></div>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-intro">
            <span className="overline">Study plan</span>
            <h2>Six deep ground-school modules.</h2>
            <p>About 4.5 hours of rigorous study, worked scenarios, and active recall.</p>
          </div>
          <div className="lesson-list">
            {lessons.map((item) => {
              const isDone = completed.includes(item.id);
              return (
                <button
                  key={item.id}
                  className={`lesson-link ${activeLesson === item.id && view === "learn" ? "active" : ""}`}
                  onClick={() => openLesson(item.id)}
                >
                  <span className={`lesson-number ${isDone ? "done" : ""}`}>{isDone ? "✓" : item.id}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.minutes} min</small>
                  </span>
                </button>
              );
            })}
          </div>
          <button className="quiz-launch" onClick={() => setView("quiz")}>
            <span className="quiz-icon">?</span>
            <span><strong>Practice exam</strong><small>10 questions · instant review</small></span>
            <b>→</b>
          </button>
        </aside>

        <section className="content-area">
          {view === "learn" && (
            <div className="lesson-view">
              <section className="lesson-hero">
                <div>
                  <span className="overline">Lesson {lesson.id} of {lessons.length} · {lesson.minutes} min</span>
                  <p className="hero-kicker">{lesson.eyebrow}</p>
                  <h1>{lesson.title}</h1>
                  <p className="hero-summary">{lesson.summary}</p>
                </div>
                <div className="lesson-stamp" aria-hidden="true">
                  <span>UA</span>
                  <strong>{String(lesson.id).padStart(2, "0")}</strong>
                  <small>GROUND</small>
                </div>
              </section>

              <section className="objective-strip">
                <span className="target-icon">◎</span>
                <div>
                  <span className="overline">By the end, you can</span>
                  <ul>{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul>
                </div>
              </section>

              <section className="deep-study">
                <div className="section-heading">
                  <div><span className="overline">Ground school</span><h2>Build the mental model</h2></div>
                  <span className="section-count">{lesson.sections.length} chapters</span>
                </div>
                <div className="chapter-list">
                  {lesson.sections.map((section, index) => (
                    <article className="study-chapter" key={section.title}>
                      <div className="chapter-number">{String(index + 1).padStart(2, "0")}</div>
                      <div className="chapter-content">
                        <h3>{section.title}</h3>
                        <p className="chapter-lead">{section.lead}</p>
                        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        {section.points && (
                          <ul className="study-points">
                            {section.points.map((point) => <li key={point}>{point}</li>)}
                          </ul>
                        )}
                        {section.example && (
                          <aside className="worked-example">
                            <strong>{section.example.label}</strong>
                            <p>{section.example.text}</p>
                          </aside>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="module-section">
                <div className="section-heading">
                  <div><span className="overline">Memory anchors</span><h2>The numbers and ideas that matter</h2></div>
                  <span className="section-count">0{lesson.id}</span>
                </div>
                <div className="concept-grid">
                  {lesson.concepts.map((concept) => (
                    <article className="concept-card" key={concept.label}>
                      <span>{concept.label}</span>
                      <strong>{concept.value}</strong>
                      <p>{concept.note}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="scenario-workshop">
                <div className="section-heading">
                  <div><span className="overline">Scenario workshop</span><h2>Reason through the facts</h2></div>
                  <span className="section-count">{lesson.scenarios.length} cases</span>
                </div>
                <div className="scenario-stack">
                  {lesson.scenarios.map((scenario, index) => {
                    const isOpen = expandedScenario === index;
                    return (
                      <article className="scenario-card" key={scenario.question}>
                        <div className="scenario-top">
                          <span className="scenario-badge">Case {index + 1}</span>
                          <span>Commit to an answer before revealing</span>
                        </div>
                        <h2>{scenario.question}</h2>
                        {!isOpen ? (
                          <button className="secondary-button" onClick={() => setExpandedScenario(index)}>Reveal the worked decision</button>
                        ) : (
                          <div className="scenario-answer" role="status">
                            <strong>Decision</strong>
                            <p>{scenario.answer}</p>
                            <ol>
                              {scenario.reasoning.map((step) => <li key={step}>{step}</li>)}
                            </ol>
                            <div className="exam-trap"><b>Exam trap:</b> {scenario.trap}</div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="mastery-grid">
                <article className="trap-panel">
                  <span className="overline">Common traps</span>
                  <h2>Where plausible answers go wrong</h2>
                  <ul>{lesson.traps.map((trap) => <li key={trap}>{trap}</li>)}</ul>
                </article>
                <article className="recall-panel">
                  <span className="overline">Closed-book check</span>
                  <h2>Can you produce the answer?</h2>
                  <ol>{lesson.recall.map((prompt) => <li key={prompt}>{prompt}</li>)}</ol>
                </article>
              </section>

              <section className="takeaways">
                <div><span className="overline">Preflight recap</span><h2>Three takeaways</h2></div>
                <ol>
                  {lesson.takeaways.map((takeaway, index) => (
                    <li key={takeaway}><span>{index + 1}</span><p>{takeaway}</p></li>
                  ))}
                </ol>
              </section>

              <footer className="lesson-footer">
                <div className="source-links">
                  <span>Primary references for this module</span>
                  {lesson.sources.map((source) => (
                    <a key={source.href} href={source.href} target="_blank" rel="noreferrer">{source.label} ↗</a>
                  ))}
                </div>
                <button className={`primary-button ${completed.includes(lesson.id) ? "completed" : ""}`} onClick={markComplete}>
                  {completed.includes(lesson.id) ? "Completed ✓" : lesson.id === lessons.length ? "Finish lessons" : "Complete & continue"}
                </button>
              </footer>
            </div>
          )}

          {view === "quiz" && (
            <div className="quiz-view">
              <section className="quiz-header">
                <div>
                  <span className="overline">Practice exam</span>
                  <h1>Prove the decision, not just the fact.</h1>
                  <p>Choose once, then use the explanation to tighten your mental model.</p>
                </div>
                <div className="quiz-score-live"><strong>{correctCount}</strong><span>correct so far</span></div>
              </section>

              <div className="question-dots" aria-label="Quiz question navigation">
                {questions.map((question, index) => {
                  const answer = answers[index];
                  const state = answer === null ? "" : answer === question.answer ? "correct" : "wrong";
                  return <button key={index} className={`${quizIndex === index ? "active" : ""} ${state}`} onClick={() => goToQuestion(index)} aria-label={`Question ${index + 1}`}>{index + 1}</button>;
                })}
              </div>

              <section className="question-card">
                <div className="question-meta">
                  <span>Question {quizIndex + 1} / {questions.length}</span>
                  <span>{lessonNames[currentQuestion.lessonId]}</span>
                </div>
                <h2>{currentQuestion.question}</h2>
                <div className="answer-list">
                  {currentQuestion.options.map((option, index) => {
                    let state = "";
                    if (currentAnswer !== null && index === currentQuestion.answer) state = "correct";
                    else if (currentAnswer === index) state = "wrong";
                    return (
                      <button key={option} className={state} onClick={() => chooseAnswer(index)} disabled={currentAnswer !== null}>
                        <span>{String.fromCharCode(65 + index)}</span><strong>{option}</strong>
                        {state === "correct" && <b>✓</b>}{state === "wrong" && <b>×</b>}
                      </button>
                    );
                  })}
                </div>
                {currentAnswer !== null && (
                  <div className={`explanation ${currentAnswer === currentQuestion.answer ? "correct" : "wrong"}`} role="status">
                    <strong>{currentAnswer === currentQuestion.answer ? "Correct reasoning" : "Review this one"}</strong>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                )}
              </section>

              <div className="quiz-controls">
                <button className="secondary-button" onClick={() => goToQuestion(quizIndex - 1)} disabled={quizIndex === 0}>← Previous</button>
                {quizIndex < questions.length - 1 ? (
                  <button className="primary-button" onClick={() => goToQuestion(quizIndex + 1)}>Next question →</button>
                ) : (
                  <button className="primary-button" onClick={finishQuiz} disabled={!quizComplete}>See results</button>
                )}
              </div>
              {!quizComplete && quizIndex === questions.length - 1 && <p className="quiz-hint">Answer every question to finish. Use the numbered row to find any blanks.</p>}
            </div>
          )}

          {view === "progress" && (
            <div className="progress-view">
              <section className="progress-hero">
                <div>
                  <span className="overline">Readiness briefing</span>
                  <h1>{overallProgress >= 80 ? "You’re approaching checkride calm." : "Build confidence one decision at a time."}</h1>
                  <p>Your progress is saved automatically on this device.</p>
                </div>
                <ProgressRing value={overallProgress} size={132} />
              </section>

              <section className="stat-grid">
                <article><span>Lessons complete</span><strong>{completed.length}<small> / {lessons.length}</small></strong><div className="stat-track"><i style={{ width: `${lessonProgress}%` }} /></div></article>
                <article><span>Best practice score</span><strong>{bestScore}<small>%</small></strong><div className="stat-track"><i style={{ width: `${bestScore}%` }} /></div></article>
                <article><span>Practice attempts</span><strong>{attempts}</strong><p>{attempts === 0 ? "Take the first 10-question check" : "Retake until decisions feel automatic"}</p></article>
              </section>

              <section className="readiness-panel">
                <div className="readiness-main">
                  <div className="section-heading"><div><span className="overline">Your route</span><h2>Lesson readiness</h2></div></div>
                  <div className="readiness-list">
                    {lessons.map((item) => (
                      <button key={item.id} onClick={() => openLesson(item.id)}>
                        <span className={`lesson-number ${completed.includes(item.id) ? "done" : ""}`}>{completed.includes(item.id) ? "✓" : item.id}</span>
                        <span><strong>{item.title}</strong><small>{completed.includes(item.id) ? "Completed" : `${item.minutes} min lesson`}</small></span>
                        <b>→</b>
                      </button>
                    ))}
                  </div>
                </div>
                <aside className="next-action">
                  <span className="overline">Best next action</span>
                  <h2>{completed.length < lessons.length ? "Finish the next lesson" : bestScore < 80 ? "Retake the practice exam" : "Verify with FAA sample questions"}</h2>
                  <p>{completed.length < lessons.length ? `${lessons.find((item) => !completed.includes(item.id))?.title} is ready when you are.` : bestScore < 80 ? "Aim for 80%+ twice, then review every miss." : "Use the official sample set to transfer your knowledge to FAA wording and chart figures."}</p>
                  {completed.length < lessons.length ? (
                    <button className="primary-button" onClick={() => openLesson(lessons.find((item) => !completed.includes(item.id))?.id ?? 1)}>Continue studying →</button>
                  ) : bestScore < 80 ? (
                    <button className="primary-button" onClick={restartQuiz}>Start a fresh attempt →</button>
                  ) : (
                    <a className="primary-button link-button" href="https://www.faa.gov/sites/faa.gov/files/training_testing/testing/test_questions/uag_questions.pdf" target="_blank" rel="noreferrer">Open FAA sample questions ↗</a>
                  )}
                  {weakAreas.length > 0 && <div className="weak-areas"><strong>Review next</strong>{weakAreas.slice(0, 3).map((area) => <span key={area}>{area}</span>)}</div>}
                </aside>
              </section>

              {quizComplete && (
                <section className="last-attempt">
                  <div><span className="overline">Current attempt</span><h2>{quizPercent}% · {correctCount} of {questions.length} correct</h2></div>
                  <button className="secondary-button" onClick={restartQuiz}>Retake practice exam</button>
                </section>
              )}

              <button className="reset-button" onClick={resetProgress}>Reset progress on this device</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

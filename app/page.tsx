"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

type Lesson = {
  id: number;
  eyebrow: string;
  title: string;
  minutes: number;
  summary: string;
  objectives: string[];
  concepts: { label: string; value: string; note: string }[];
  scenario: { question: string; answer: string };
  takeaways: string[];
};

type QuizQuestion = {
  lessonId: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const lessons: Lesson[] = [
  {
    id: 1,
    eyebrow: "Know the operating envelope",
    title: "Rules & pilot responsibilities",
    minutes: 18,
    summary:
      "Build the regulatory foundation: who is responsible, when Part 107 applies, and the limits that define a routine operation.",
    objectives: [
      "Identify the remote PIC’s authority and duties",
      "Recall the core operating limits",
      "Separate routine operations from waiver scenarios",
    ],
    concepts: [
      { label: "Maximum altitude", value: "400 ft AGL", note: "Or within 400 ft of a structure, subject to the rule’s conditions." },
      { label: "Maximum groundspeed", value: "87 kt", note: "Equivalent to 100 mph." },
      { label: "Flight visibility", value: "3 SM", note: "Measured from the control station." },
      { label: "Aircraft weight", value: "Under 55 lb", note: "Includes everything onboard or attached." },
    ],
    scenario: {
      question:
        "A client asks you to fly 600 ft AGL over open ground for a better survey image. The airspace is Class G. Can you accept the request as a routine Part 107 flight?",
      answer:
        "No. Class G removes the need for controlled-airspace authorization, but it does not remove the Part 107 altitude limit. The operation would need another lawful basis, such as an applicable waiver.",
    },
    takeaways: [
      "The remote PIC is the final authority and is responsible for a safe operation.",
      "VLOS, altitude, speed, visibility, and aircraft condition are separate constraints.",
      "A waiver changes only the specific provision it authorizes.",
    ],
  },
  {
    id: 2,
    eyebrow: "Read the airspace before you launch",
    title: "Airspace & sectional charts",
    minutes: 24,
    summary:
      "Turn chart symbols into go/no-go decisions, with special attention to controlled airspace, airports, obstacles, and hazards.",
    objectives: [
      "Distinguish Classes B, C, D, E, and G",
      "Recognize common sectional chart boundaries",
      "Know when FAA airspace authorization is required",
    ],
    concepts: [
      { label: "Class B", value: "Solid blue", note: "Controlled airspace; authorization is required." },
      { label: "Class C", value: "Solid magenta", note: "Controlled airspace; authorization is required." },
      { label: "Class D", value: "Dashed blue", note: "Usually surrounds a towered airport." },
      { label: "Class E to surface", value: "Dashed magenta", note: "Authorization is required when the surface area applies." },
    ],
    scenario: {
      question:
        "Your launch point is inside a dashed blue circle surrounding a towered airport. The planned altitude is only 100 ft AGL. What is the key preflight action?",
      answer:
        "Obtain FAA authorization before operating. A low planned altitude does not by itself remove the authorization requirement in Class D airspace.",
    },
    takeaways: [
      "Airspace class is three-dimensional; read both lateral boundaries and altitude shelves.",
      "Class G generally does not require airspace authorization, but every other operating rule still applies.",
      "Check current NOTAMs and temporary flight restrictions in addition to the sectional chart.",
    ],
  },
  {
    id: 3,
    eyebrow: "Translate weather into aircraft risk",
    title: "Weather, METARs & TAFs",
    minutes: 25,
    summary:
      "Decode aviation weather and connect pressure, temperature, wind, and stability to small-UAS performance.",
    objectives: [
      "Decode a basic METAR and TAF",
      "Predict high density-altitude effects",
      "Recognize wind, visibility, and stability hazards",
    ],
    concepts: [
      { label: "METAR", value: "Observed", note: "A coded surface weather observation." },
      { label: "TAF", value: "Forecast", note: "A terminal forecast for a defined area and period." },
      { label: "High density altitude", value: "Less performance", note: "Warm, high, humid air reduces propeller and aircraft performance." },
      { label: "Stable air", value: "Smooth / poor visibility", note: "Often brings steady precipitation and stratiform clouds." },
    ],
    scenario: {
      question:
        "The temperature rises sharply while pressure falls at a high-elevation site. Your payload and battery are unchanged. What performance trend should you expect?",
      answer:
        "Density altitude increases, so aircraft performance generally decreases. Expect less thrust margin and potentially shorter endurance; reassess the mission and manufacturer limits.",
    },
    takeaways: [
      "Weather minimums are legal floors, not mission targets.",
      "Compare surface observations, forecasts, and on-site conditions.",
      "Gust spread and wind direction can matter more than the headline wind speed.",
    ],
  },
  {
    id: 4,
    eyebrow: "Run the mission like a crew",
    title: "Operations, CRM & airports",
    minutes: 20,
    summary:
      "Plan disciplined missions using clear roles, concise communication, airport awareness, and sound aeronautical decision-making.",
    objectives: [
      "Assign PIC, visual observer, and support roles",
      "Use standard traffic-pattern awareness",
      "Apply risk-management tools before launch",
    ],
    concepts: [
      { label: "PIC", value: "Final authority", note: "Owns the operational decision and safety outcome." },
      { label: "Visual observer", value: "Supports VLOS", note: "Communicates hazards and aircraft position to the PIC." },
      { label: "CTA F", value: "Common traffic", note: "Used for position awareness at many non-towered airports." },
      { label: "PAVE", value: "Risk scan", note: "Pilot, Aircraft, enVironment, External pressures." },
    ],
    scenario: {
      question:
        "Mid-mission, a visual observer calls out a low helicopter approaching the work area. The customer urges you to finish one last pass. What should govern your decision?",
      answer:
        "Yield to the manned aircraft and prioritize safety. The remote PIC’s authority and duty are not displaced by customer pressure; pause or end the mission as necessary.",
    },
    takeaways: [
      "Brief communication triggers before takeoff, including lost-link and intruder calls.",
      "External pressure is a recognized hazard, not a reason to compress safety margins.",
      "Never interfere with airport operations or manned aircraft.",
    ],
  },
  {
    id: 5,
    eyebrow: "Protect the performance margin",
    title: "Loading & aircraft performance",
    minutes: 17,
    summary:
      "Understand how payload, center of gravity, maneuvering, batteries, and the environment reshape the safe flight envelope.",
    objectives: [
      "Explain center-of-gravity effects",
      "Relate bank angle to load factor",
      "Use manufacturer data for loading decisions",
    ],
    concepts: [
      { label: "Added weight", value: "More demand", note: "Usually increases power required and reduces endurance." },
      { label: "CG outside limits", value: "Unstable or uncontrollable", note: "Follow the aircraft’s loading instructions." },
      { label: "Steeper bank", value: "Higher load factor", note: "The aircraft must produce more lift to hold altitude." },
      { label: "Cold battery", value: "Less available power", note: "Temperature can reduce usable capacity and voltage performance." },
    ],
    scenario: {
      question:
        "A payload is mounted farther aft than on the previous flight, but total weight is still below the maximum. Is the weight check alone sufficient?",
      answer:
        "No. Total weight and center of gravity are separate limits. Confirm the new loading arrangement against the manufacturer’s approved instructions before flight.",
    },
    takeaways: [
      "A legal weight can still produce an unsafe center of gravity.",
      "Performance planning should include wind, temperature, elevation, payload, and reserve.",
      "The remote PIC determines whether the aircraft can safely complete the operation.",
    ],
  },
  {
    id: 6,
    eyebrow: "Be ready when the plan changes",
    title: "Emergencies, night & Remote ID",
    minutes: 22,
    summary:
      "Close the loop with abnormal procedures, night physiology and lighting, operations over people, and Remote ID awareness.",
    objectives: [
      "Prioritize actions during abnormal events",
      "Recall night-operation preparation",
      "Recognize Remote ID and over-people considerations",
    ],
    concepts: [
      { label: "Emergency priority", value: "People first", note: "Maintain control, avoid aircraft and people, then troubleshoot." },
      { label: "Night lighting", value: "3 SM visibility", note: "Anti-collision lighting must meet the applicable requirement; intensity may be reduced for safety." },
      { label: "Dark adaptation", value: "Takes time", note: "Bright white light can quickly degrade night vision." },
      { label: "Remote ID", value: "Operational compliance", note: "Know the aircraft, broadcast method, and location rules that apply." },
    ],
    scenario: {
      question:
        "At night, anti-collision lighting produces glare that makes it harder for the crew to see the aircraft’s attitude. Must it remain at full intensity?",
      answer:
        "No. The remote PIC may reduce the light’s intensity when necessary for safety, while still managing the operation in accordance with the night rule.",
    },
    takeaways: [
      "Preprogram lost-link behavior for the actual site, not a generic default.",
      "Night operations require current knowledge or training and compliant anti-collision lighting.",
      "Operations over people depend on the aircraft category and the precise operating conditions.",
    ],
  },
];

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
  const [showScenario, setShowScenario] = useState(false);
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
  const correctCount = answers.reduce((count, answer, index) => count + (answer === questions[index].answer ? 1 : 0), 0);
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
    setShowScenario(false);
    setView("learn");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function markComplete() {
    const nextCompleted = completed.includes(activeLesson) ? completed : [...completed, activeLesson].sort();
    const next = lessons.find((item) => item.id > activeLesson && !completed.includes(item.id));
    writeProgress({ ...progress, completed: nextCompleted, activeLesson: next?.id ?? activeLesson });
    setShowScenario(false);
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
            <h2>Six flights to ready.</h2>
            <p>About 2 hours of focused lessons, then test the weak spots.</p>
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

              <section className="scenario-card">
                <div className="scenario-top">
                  <span className="scenario-badge">Scenario check</span>
                  <span>Think like the remote PIC</span>
                </div>
                <h2>{lesson.scenario.question}</h2>
                {showScenario ? (
                  <div className="scenario-answer" role="status">
                    <strong>Decision</strong>
                    <p>{lesson.scenario.answer}</p>
                  </div>
                ) : (
                  <button className="secondary-button" onClick={() => setShowScenario(true)}>Reveal the safest answer</button>
                )}
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
                  <span>Built from current FAA references</span>
                  <a href="https://www.faa.gov/training_testing/testing/acs" target="_blank" rel="noreferrer">Airman Certification Standards ↗</a>
                  <a href="https://www.faa.gov/uas/commercial_operators/become_a_drone_pilot" target="_blank" rel="noreferrer">FAA testing guide ↗</a>
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

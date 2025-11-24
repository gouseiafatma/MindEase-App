let currentMood = "";
let currentIssue = "";
let currentRisk = "none";

/* screen switching */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("active");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/* mood & issue selection */
function selectMood(mood) {
  currentMood = mood;
  updateGuidance();
  updateRiskUI();
}

function selectIssue(issue) {
  currentIssue = issue;
  updateGuidance();
  updateRiskUI();
}

/* simple risk model */
function computeRisk() {
  let score = 0;

  if (currentMood === "Stressed") score += 1;
  if (currentMood === "Overwhelmed") score += 2;
  if (currentMood === "Breaking down") score += 3;

  if (currentIssue.includes("NEET / JEE")) score += 2;
  if (currentIssue.includes("droppers")) score += 2;
  if (currentIssue.includes("Anxiety")) score += 2;
  if (currentIssue.includes("Burnout")) score += 2;
  if (currentIssue.includes("Hostel loneliness")) score += 1;
  if (currentIssue.includes("Relationship")) score += 1;

  if (score <= 1) return "low";
  if (score <= 4) return "medium";
  return "high";
}

/* update crisis banner */
function updateRiskUI() {
  const banner = document.getElementById("crisis-banner");
  const badge = document.getElementById("crisis-badge");
  const note = document.getElementById("crisis-note");
  if (!banner || !badge || !note) return;

  if (!currentMood && !currentIssue) {
    currentRisk = "none";
    banner.className = "crisis-banner low";
    badge.textContent = "Not evaluated yet";
    note.textContent = "Start a mood check to let MindEase estimate your stress level. This is only a prototype, no data is stored.";
    return;
  }

  currentRisk = computeRisk();

  banner.classList.remove("low", "medium", "high");
  banner.classList.add(currentRisk);

  if (currentRisk === "low") {
    badge.textContent = "Low";
    note.textContent = "Your current inputs look manageable. MindEase focuses on grounding and planning so stress doesn’t build up silently.";
  } else if (currentRisk === "medium") {
    badge.textContent = "Medium";
    note.textContent = "There are clear signs of stress. MindEase suggests stronger coping tools and may gently recommend talking to a counsellor.";
  } else {
    badge.textContent = "High (crisis risk)";
    note.textContent =
      "Your combination of mood and issues looks high-risk. In the full product, the SafeHand Crisis Support System would alert our team and offer you a free emergency session.";
  }
}

/* AI-style guidance text */
function updateGuidance() {
  const el = document.getElementById("guidance-text");
  if (!el) return;

  if (!currentMood && !currentIssue) {
    el.textContent =
      "Select a mood and a problem in the Mood Check screen. MindEase then combines both and shows a short, India-specific response that focuses on grounding, a 24-hour plan and when to escalate to a human counsellor.";
    return;
  }

  let text =
    "You are currently feeling " +
    (currentMood || "emotionally overloaded") +
    " and dealing with " +
    (currentIssue || "multiple pressures at once") +
    ". ";

  if (currentIssue.includes("NEET / JEE")) {
    text +=
      "We start with a 3–3–3 breathing cycle and then design a 24-hour plan focused only on the next small targets instead of rank, attempt count or relatives’ opinions. ";
  } else if (currentIssue.includes("Parental expectations")) {
    text +=
      "We separate your identity from your marks, script one calm conversation with parents and build a timetable that is realistic instead of fear-based. ";
  } else if (currentIssue.includes("Hostel loneliness")) {
    text +=
      "We add tiny anchors to your day – one short call home, one walk with a peer – so hostel life feels less like punishment and more like a temporary phase. ";
  } else if (currentIssue.includes("Burnout")) {
    text +=
      "We treat burnout as tiredness, not failure. Targets are lowered, breaks are added on purpose, and energy is rebuilt slowly so your brain stops seeing study as danger. ";
  } else if (currentIssue.includes("Anxiety")) {
    text +=
      "We use grounding exercises and thought reframing so your brain stops jumping directly to worst-case scenarios around exams, career and relationships. ";
  } else if (currentIssue.includes("Relationship")) {
    text +=
      "We protect your basic routine first – sleep, food, minimum study – and then help you process guilt, anger or grief around the relationship in small steps. ";
  } else {
    text +=
      "We break your situation into one small physical reset and one achievable action for the next few hours so you don’t feel frozen. ";
  }

  const risk = computeRisk();
  if (risk === "high") {
    text +=
      "Because your current pattern looks high-risk, MindEase would normally activate the SafeHand Crisis Support System: alerting our team, offering a free emergency session and guiding you to safe options around you.";
  } else if (risk === "medium") {
    text +=
      "If this pattern continues for many days, MindEase would gently suggest talking to a human counsellor and could offer discounted follow-up sessions through the SafeHand recovery plan.";
  } else {
    text +=
      "Right now, the focus is on keeping things from getting worse – small steps are enough; you don’t need perfection to be safe.";
  }

  el.textContent = text;
}

/* fake booking for demo */
function fakeBook(type) {
  let msg =
    "In the real app this button would open an anonymous booking screen where you choose time, language and chat/call.\n\n";

  if (currentRisk === "high") {
    msg +=
      "Because your current risk is HIGH, the SafeHand Crisis Support System would make your FIRST session free, and offer 2 discounted follow-up sessions to stabilise you.\n\n";
  }

  if (type === "micro") {
    msg += "You selected a ₹49 micro-session (10–15 min) for quick support.";
  } else {
    msg += "You selected a ₹99 deep-dive session (20–25 min) for deeper work.";
  }

  alert(msg);
}

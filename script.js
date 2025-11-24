let currentMood = "";
let currentIssue = "";

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
}

function selectIssue(issue) {
  currentIssue = issue;
  updateGuidance();
}

/* AI guidance text (fake but logical) */
function updateGuidance() {
  const el = document.getElementById("guidance-text");
  if (!el) return;

  if (!currentMood && !currentIssue) {
    el.textContent =
      "Select a mood and a problem in the previous screen. MindEase then combines both and shows a short, India-specific response.";
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
      "First, we do a 3–3–3 breathing cycle to calm your body. Then we plan just the next 24 hours of study instead of thinking about rank, attempt count or what relatives will say.";
  } else if (currentIssue.includes("Parental expectations")) {
    text +=
      "We help you separate your worth from marks, script one calm conversation with parents and design a realistic, not fear-based, timetable.";
  } else if (currentIssue.includes("Hostel")) {
    text +=
      "We add tiny social anchors – one call home, one short walk with a batchmate – so hostel does not feel like punishment.";
  } else if (currentIssue.includes("Burnout")) {
    text +=
      "Burnout means your brain is tired, not useless. We lower the target, add micro breaks and slowly rebuild your focus instead of forcing 12-hour study days.";
  } else if (currentIssue.includes("Anxiety")) {
    text +=
      "We use grounding tools and thought reframing so your brain stops jumping straight to worst-case scenarios about exams, future and relationships.";
  } else if (currentIssue.includes("Relationship")) {
    text +=
      "We protect your basic routine first – sleep, food, study – and then work on processing guilt, anger or grief from the relationship situation.";
  } else {
    text +=
      "We break the problem into one small physical reset and one achievable action for the next few hours so you don’t feel frozen.";
  }

  text +=
    " If your thoughts ever feel unsafe or suicidal, MindEase will push you towards a human counsellor or local emergency support instead of keeping you only with AI.";

  el.textContent = text;
}

/* fake booking for demo */
function fakeBook() {
  alert(
    "In the real app this button would open an anonymous booking screen.\nHere it is only a prototype action for the judges."
  );
}

// MindEase MVP logic (demo only – no real diagnosis or AI)
function moodCheck(level) {
  let message = "";

  if (level === "low") {
    message = "You're feeling okay today. Let's keep it steady with small positive steps.";
  } 
  else if (level === "medium") {
    message = "It seems you're overwhelmed. Let's slow down and focus on grounding.";
  } 
  else if (level === "high") {
    message = "You're not alone. Support is available. Connecting you to SafeHand support.";
  }

  alert(message);
}

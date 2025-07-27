
document.addEventListener("DOMContentLoaded", () => {
const input = document.getElementById('palindrome-input');
const checkBtn = document.getElementById('check-btn');
const result = document.getElementById('result');
const resultText = document.getElementById('result-text');
const resultEmoji = document.getElementById('result-emoji');
const stepsSection = document.getElementById('comparison-steps');
const stepsList = document.getElementById('steps-list');

//  Deny list (optional)
const denyList = ["badword", "offensive", "curse"];

//  Event Listeners
checkBtn.addEventListener("click", checkPalindrome);
input.addEventListener("keydown", (e) => {
 const main=document.querySelector(".container");
   main.style.height="910px"
  if (e.key === "Enter") {
    checkPalindrome();
  }
});

//  Core function
function checkPalindrome() {
  //  Clear previous result
  result.className = "hidden";
  stepsSection.className = "hidden";
  resultText.textContent = "";
  resultEmoji.textContent = "";
  stepsList.innerHTML = "";

  //  Get and trim input
  const originalInput = input.value.trim();

  //  Check empty input
  if (originalInput === "") {
    return showError("⚠️ Please enter a word or phrase.");
  }

  //  Check deny list
  const lowerInput = originalInput.toLowerCase();
  if (denyList.some(word => lowerInput.includes(word))) {
    return showError("⚠️ Please use appropriate language.");
  }

  //  Clean input using RegEx
  const cleanedInput = originalInput.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  //  Check if cleaned input is valid
  if (cleanedInput === "") {
    return showError("⚠️ Please enter at least one alphanumeric character.");
  }

  //  Initialize step tracking
  const steps = [];

  //  Recursively check palindrome
  const isPalindrome = checkPalindromeRecursive(cleanedInput, 0, cleanedInput.length - 1, steps);

  //  Display result and steps
  displayResult(isPalindrome, originalInput);
  displaySteps(steps);

  // Clear input field
  input.value = "";
}

//  Recursive checking function
function checkPalindromeRecursive(str, start, end, steps) {
  // Step 30: Base case — start >= end
  if (start >= end) return true;

  //  Get current characters
  const left = str[start];
  const right = str[end];

  //  Push step data
  steps.push({
    step: steps.length + 1,
    left,
    right,
    matched: left === right
  });

  //  Characters don't match
  if (left !== right) return false;

  //  Recurse inward
  return checkPalindromeRecursive(str, start + 1, end - 1, steps);
}

//  Show result
function displayResult(isPalindrome, originalInput) {
  result.className = ""; // Step 36: Unhide result
  result.classList.add(isPalindrome ? "palindrome" : "not-palindrome");

  if (isPalindrome) {
    resultText.textContent = `✅ "${originalInput}" is a palindrome!`;
    const happyEmojis = ["😊", "😍", "👌", "👍", "😉"];
    resultEmoji.textContent = happyEmojis[Math.floor(Math.random() * happyEmojis.length)];
  } else {
    resultText.textContent = `❌ "${originalInput}" is not a palindrome.`;
    const sadEmojis = ["😒", "😢", "😑", "😯", "🤐", "😣"];
    resultEmoji.textContent = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
  }
}

//  Display each step
function displaySteps(steps) {
  if (!steps.length) return;

  stepsSection.className = ""; // Unhide steps section

  steps.forEach(({ step, left, right, matched }) => {
    const li = document.createElement("li");
    li.style.marginBottom = "8px";

    const explanation = matched
      ? `✅ Step ${step}: '${left}' matches '${right}'. Keep checking...`
      : `❌ Step ${step}: '${left}' does NOT match '${right}'. This breaks the palindrome rule.`;

    li.innerHTML = `<span>${explanation}</span>`;
    stepsList.appendChild(li);
  });
}
// Error handler
function showError(message) {
  result.className = "";
  result.classList.add("not-palindrome");
  result.style.display = "block";
  resultText.textContent = message;
  resultEmoji.textContent = "⚠️";
}
});
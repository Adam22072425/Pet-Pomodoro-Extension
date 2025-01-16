// The bubble HTML, placing the custom cat icon as a sibling of .bubble-content
const bubbleHTML = `
  <div id="quoteBubble" class="quote-bubble">
    <div id="catIcon" class="icon-circle">
     <img src="${chrome.runtime.getURL('images/icon128.png')}" alt="Cat Icon" width="24" height="24">
    </div>

    <div class="bubble-content">
      <div class="bubble-pointer"></div>
      <p id="quoteText" class="quote-text"></p>
      <button id="refreshButton" class="refresh-button">
        <svg class="refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M23 4v6h-6"></path>
          <path d="M1 20v-6h6"></path>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
          <path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
        </svg>
        New Quote
      </button>
    </div>
  </div>
`;

// Insert the bubble into the page
document.body.insertAdjacentHTML('beforeend', bubbleHTML);

/************************************************
 *  DRAGGING FUNCTIONALITY
 ************************************************/
const quoteBubble = document.getElementById('quoteBubble');
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

quoteBubble.style.position = "absolute";
quoteBubble.style.left = "20px";
quoteBubble.style.top = "20px";

quoteBubble.addEventListener("mousedown", (e) => {
  e.preventDefault(); // Prevent default behavior
  isDragging = true;
  offsetX = e.clientX - quoteBubble.offsetLeft;
  offsetY = e.clientY - quoteBubble.offsetTop;
  quoteBubble.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const newLeft = Math.max(0, Math.min(window.innerWidth - quoteBubble.offsetWidth, e.clientX - offsetX));
    const newTop = Math.max(0, Math.min(window.innerHeight - quoteBubble.offsetHeight, e.clientY - offsetY));

    quoteBubble.style.left = `${newLeft}px`;
    quoteBubble.style.top = `${newTop}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  quoteBubble.style.cursor = "grab";
});

/************************************************
 *  QUOTE LOGIC
 ************************************************/
const quotes = [
  "Meow your way through life with curiosity and grace.",
  "Stay pawsitive, even when life gets a little hairy!",
  "Purr-severe through challenges, and you’ll always land on your feet.",
  "Chase your dreams like a cat chasing a red dot—relentlessly!",
  "Life’s too short not to knead happiness into every moment.",
  "Stretch, yawn, and remember: even small paws leave big imprints.",
  "Be as bold as a cat knocking things off a table—own your confidence.",
  "Take a cat nap, recharge, and then conquer the world.",
  "If you stumble, just land on your paws and keep going—like a cat!",
  "Remember, even a tiny meow can make a big difference in someone’s day."
];


function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function updateQuote() {
  const quoteText = document.getElementById('quoteText');
  const refreshIcon = document.querySelector('.refresh-icon');

  refreshIcon.classList.add('spinning');
  quoteText.classList.add('changing');

  setTimeout(() => {
    quoteText.textContent = getRandomQuote();
    refreshIcon.classList.remove('spinning');
    quoteText.classList.remove('changing');
  }, 1000);
}

updateQuote();
setInterval(updateQuote, 5 * 60 * 1000);

document.getElementById('refreshButton').addEventListener('click', (e) => {
  e.stopPropagation();
  updateQuote();
});

/************************************************
 *  MINIMIZE / MAXIMIZE HANDLER
 ************************************************/
const catIcon = document.getElementById('catIcon');
catIcon.addEventListener('click', (e) => {
  e.stopPropagation();
  quoteBubble.classList.toggle('minimized');
});

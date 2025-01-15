// The bubble HTML, placing the cat icon as a sibling of .bubble-content
const bubbleHTML = `
<div id="quoteBubble" class="quote-bubble">
  <div id="catIcon" class="icon-circle">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round">
      <!-- Custom pet icon - cute cat face -->
      <circle cx="12" cy="12" r="10"></circle>
      <!-- Ears -->
      <path d="M8 6 L8 10 L12 8 Z"></path>
      <path d="M16 6 L16 10 L12 8 Z"></path>
      <!-- Eyes -->
      <circle cx="9" cy="11" r="1" fill="white"></circle>
      <circle cx="15" cy="11" r="1" fill="white"></circle>
      <!-- Nose -->
      <circle cx="12" cy="13" r="0.5" fill="white"></circle>
      <!-- Mouth -->
      <path d="M10 15 C11 16.5, 13 16.5, 14 15" stroke="white" stroke-width="1"></path>
      <!-- Whiskers -->
      <path d="M7 13 L4 12 M7 14 L4 14 M7 15 L4 16" stroke="white" stroke-width="1"></path>
      <path d="M17 13 L20 12 M17 14 L20 14 M17 15 L20 16" stroke="white" stroke-width="1"></path>
    </svg>
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
 *  QUOTE LOGIC
 ************************************************/
const quotes = [
  "Life is what happens while you're busy making other plans.",
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Stay hungry, stay foolish.",
  "Think different.",
  "The future belongs to those who believe in the beauty of their dreams."
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function updateQuote() {
  const quoteText = document.getElementById('quoteText');
  const refreshIcon = document.querySelector('.refresh-icon');

  // Spin icon + animate text in
  refreshIcon.classList.add('spinning');
  quoteText.classList.add('changing');

  // Set a new quote
  quoteText.textContent = getRandomQuote();

  // Remove animations after 1 second
  setTimeout(() => {
    refreshIcon.classList.remove('spinning');
    quoteText.classList.remove('changing');
  }, 1000);
}

// Initialize the quote on page load
updateQuote();

// Update quote every 5 minutes
setInterval(updateQuote, 5 * 60 * 1000);

// Handle refresh button click
document.getElementById('refreshButton').addEventListener('click', (e) => {
  // Prevent the click from toggling minimized
  e.stopPropagation();
  updateQuote();
});

/************************************************
 *  MINIMIZE / MAXIMIZE HANDLER
 ************************************************/
const quoteBubble = document.getElementById('quoteBubble');
const catIcon     = document.getElementById('catIcon');

// Toggle .minimized class when user clicks the cat icon
catIcon.addEventListener('click', (e) => {
  e.stopPropagation(); // don't bubble up
  quoteBubble.classList.toggle('minimized');
});

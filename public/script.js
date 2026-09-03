const btn = document.getElementById('submitBtn');
const input = document.getElementById('questionInput');
const result = document.getElementById('result');

async function handleAsk() {
  const q = input.value.trim();

  if (!q) {
    result.innerHTML = `Please type a question first!`;
    return;
  }

  result.innerHTML = `Thinking...`;

  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: q })
    });

    const data = await res.json();
    result.innerText = data.answer;

  } catch (e) {
    result.innerHTML = `Failed to fetch response. Please try again!</span>`;
  }
}

btn.addEventListener('click', handleAsk);
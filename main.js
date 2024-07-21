const pages = {
  1: {
    text: 'This is the start of the adventure',
    next: {
      2: 'Go left',
      3: 'Go right',
    },
  },
  2: {
    text: 'You went to left',
    next: {
      1: 'Go back',
      4: 'Go to the end',
    },
  },
  3: {
    text: 'You went to right',
    next: {
      1: 'Go back',
      4: 'Go to the end',
    },
  },
  4: {
    text: 'The end',
    next: {
      1: 'Start again',
    },
  },
};

const mainText = document.getElementById('main-text');
const optionsDiv = document.getElementById('options');

function goToPage(page) {
  const pageData = pages[page];

  // Set text
  mainText.textContent = pageData.text;

  // Clear any existing options
  optionsDiv.innerHTML = '';

  // Create new options
  Object.entries(pageData.next || {}).forEach(([key, value]) => {
    const div = document.createElement('div');
    div.textContent = value;
    div.onclick = () => goToPage(key);
    optionsDiv.appendChild(div);
  });
}

goToPage(1);

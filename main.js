const player = {
  health: 100,
  gold: 10,
};

const pages = {
  start: {
    text: 'This is the start of the adventure',
    next: [
      { text: 'Go to the shop', goto: 'shop' },
      { text: 'Go to the cave', goto: 'cave' },
      { text: 'Go to the wood', goto: 'wood' },
    ],
  },
  cave: {
    text: 'The cave is empty.',
    next: [
      { text: 'Go back', goto: 'start' },
    ],
  },
  shop: {
    text: () => `The shop sells weapons. You have ${player.gold} gold.`,
    next: [
      {
        text: 'Buy an axe for 8 gold',
        goto: 'axe',
        if: () => player.gold >= 8,
      },
      {
        text: 'Buy a dagger for 4 gold',
        goto: 'dagger',
        if: () => player.gold >= 4,
      },
      {
        text: 'Buy a vorpal sword for 12 gold',
        goto: 'sword',
        if: () => player.gold >= 12
      },
      { text: 'Go back', goto: 'start' },
    ],
  },
  axe: {
    onload: () => {
      player.gold -= 8;
      player.axe = true;
    },
    text: 'You now have an axe',
    next: [
      { text: 'Continue', goto: 'shop' },
    ],
  },
  dagger: {
    onload: () => {
      player.gold -= 4;
      player.dagger = true;
    },
    text: 'You now have a dagger',
    next: [
      { text: 'Continue', goto: 'shop' },
    ],
  },
  sword: {
    onload: () => {
      player.gold -= 12;
      player.sword = true;
    },
    text: 'You now have a sword',
    next: [
      { text: 'Continue', goto: 'shop' },
    ],
  },
  wood: {
    text: 'You find a bear',
    next: [
      { text: 'Run away', goto: 'dead' },
      {
        text: 'Fight it',
        goto: 'win', if:
        () => player.axe || player.dagger || player.sword,
      },
    ],
  },
  dead: {
    text: 'The chases you, catches you, and eats you.',
    next: [
      { text: 'Start again', goto: 'start' },
    ],
  },
  win: {
    text: 'You defeat the bear and win the game.',
    next: [
      { text: 'Start again', goto: 'start' },
    ],
  },
};

const mainText = document.getElementById('main-text');
const optionsDiv = document.getElementById('options');

function goToPage(page) {
  const pageData = pages[page];

  // Call onLoad function if there is one
  if (pageData.onload) {
    pageData.onload();
  }

  // Set text
  const text = typeof pageData.text === 'function' ? pageData.text() : pageData.text;
  mainText.textContent = text;

  // Clear any existing options
  optionsDiv.innerHTML = '';

  // Create new options
  (pageData.next || []).forEach((next) => {
    // Check for conditional options
    if (!next.if || next.if()) {
      const div = document.createElement('div');
      div.textContent = next.text;
      div.onclick = () => goToPage(next.goto);
      optionsDiv.appendChild(div);
    }
  });
}

goToPage('start');

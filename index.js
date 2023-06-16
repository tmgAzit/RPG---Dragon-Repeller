let xp = 0;
let health = 100;
let gold = 100;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ['Stick'];

// assign all variable name to the given Id
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3 = document.querySelector('#button3');
const text = document.querySelector('#text');
const xpText = document.querySelector('#xpText');
const healthText = document.querySelector('#healthText');
const goldHealth = document.querySelector('#goldHealth');
const monsterStatus = document.querySelector('#monsterStats');
const monsterNameText = document.querySelector('#monsterNameText');
const monsterHealthText = document.querySelector('#mosterHealth');

// create an list of weapons
let weapons = [
  { name: 'Ak47', power: 50 },
  { name: 'Grenade', power: 100 },
  { name: 'Tank', power: 200 },
];

// create the list of monsters
let monsters = [
  { name: 'Slime', level: 2, health: 15 },
  {
    name: 'Nine-tailed Fox',
    level: 8,
    health: 60,
  },
  {
    name: 'Dragon',
    level: 20,
    health: 150,
  },
];
// create an arry of buttons and its properties
let locations = [
  {
    name: 'Town square',
    'button text': ['Go to Store', 'Go to cave', 'Fight dragon'],
    'button functions': [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store."',
  },
  {
    name: 'Store',
    'button text': [
      'Buy 10 health (10 gold)',
      'Buy weapon (30 gold)',
      'Go to town square',
    ],
    'button functions': [buyHealth, buyWeapon, goTown],
    text: 'You enter the store.',
  },
  {
    name: 'Cave',
    'button text': ['Fight slime', 'Fight nine-tails fox', 'Goto town square'],
    'button functions': [fightSlime, fightFox, goTown],
    text: 'You enter the cave. You see some monsters.',
  },
  {
    name: 'Fight',
    'button text': ['Attack', 'Dodge', 'Run'],
    'button functions': [attack, dodge, goTown],
    text: 'You are fighting a monster.',
  },
  {
    name: 'Kill monster',
    'button text': [
      'Go to Town square',
      'Go to Town square',
      'Go to town square',
    ],
    'button functions': [goTown, goTown, goTown],
    text: "The monster screams 'Arg!' as it dies. You gain experience points and find gold.",
  },
  {
    name: 'lose',
    'button text': ['Replay', 'Replay', 'Replay'],
    'button functions': [goTown, goTown, goTown],
    text: 'You die',
  },
  {
    name: 'win',
    'button text': ['REPLAY?', 'REPLAY?', 'REPLAY?'],
    'button functions': [restart, restart, restart],
    text: 'You defeat the dragon! YOU WIN THE GAME!',
  },
];
// initialise buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// update button when location change
function update(location) {
  monsterStatus.style.display = 'none';
  button1.innerText = location['button text'][0];
  button2.innerText = location['button text'][1];
  button3.innerText = location['button text'][2];
  button1.onclick = location['button functions'][0];
  button2.onclick = location['button functions'][1];
  button3.onclick = location['button functions'][2];
  text.innerText = location.text;
}

function goTown() {
  update(locations[0]);
}
// create assigned functions
function goStore() {
  update(locations[1]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = 'You have successfully brought the health.';
  } else {
    text.innerHTML = "You don't have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      goldText.innerText = gold;
      currentWeapon++;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = 'You have bought a ' + newWeapon;
      inventory.push(newWeapon);
      text.innerText += '. In your inventory you have: ' + inventory;
    } else {
      text.innerText = "You don't have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = 'You already have the most poweful weapon!';
    button2.innerText = 'Sell weapon for 15 gold.';
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 30;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = 'You sold a ' + currentWeapon + '.';
    text.innerText += ' In you Inventory, you have ' + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function goCave() {
  update(locations[2]);
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightFox() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStatus.style.display = 'block';
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = 'The ' + monsters[fighting].name + ' attacks.';
  text.innertext +=
    ' You attack it with your ' + weapons[currentWeapon].name + '.';
  health -= monsters[fighting].level;
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealth.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  }
  if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }
}

function dodge() {
  text.innerText =
    'You dodge the attack from the ' + monsters[fighting].name + '.';
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 100;
  currentWeapon = 0;
  inventory = ['stick'];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function winGame() {
  update(locations[6]);
}

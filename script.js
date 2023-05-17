// Get the table body
const tableBody = document.getElementById('table-body');

// Add event listeners to the win, loss, and tie buttons
const winButtons = document.querySelectorAll('.win-button');
const lossButtons = document.querySelectorAll('.loss-button');
const tieButtons = document.querySelectorAll('.tie-button');
const undoButton = document.getElementById('undo-button');

// Array to store the history of actions
let actionHistory = [];

winButtons.forEach(button => {
  button.addEventListener('click', handleWin);
});

lossButtons.forEach(button => {
  button.addEventListener('click', handleLoss);
});

tieButtons.forEach(button => {
  button.addEventListener('click', handleTie);
});

undoButton.addEventListener('click', undoAction);

// Handle Win button click
function handleWin() {
  const row = this.parentNode.parentNode;
  const pointsElement = row.querySelector('.points');
  const matchesPlayedElement = row.querySelector('.matches-played');
  const wonElement = row.querySelector('.won');
  const points = parseInt(pointsElement.textContent);
  const matchesPlayed = parseInt(matchesPlayedElement.textContent);
  const won = parseInt(wonElement.textContent);
  const updatedPoints = points + 2;
  const updatedMatchesPlayed = matchesPlayed + 1;
  const updatedWon = won + 1;

  updatePoints(row, updatedPoints, updatedMatchesPlayed, updatedWon);
  addActionToHistory(row, points, matchesPlayed, won, updatedPoints, updatedMatchesPlayed, updatedWon);
  sortTable();
}

// Handle Loss button click
function handleLoss() {
  const row = this.parentNode.parentNode;
  const pointsElement = row.querySelector('.points');
  const matchesPlayedElement = row.querySelector('.matches-played');
  const lostElement = row.querySelector('.lost');
  const points = parseInt(pointsElement.textContent);
  const matchesPlayed = parseInt(matchesPlayedElement.textContent);
  const lost = parseInt(lostElement.textContent);
  const updatedPoints = points; // Points remain the same for a loss
  const updatedMatchesPlayed = matchesPlayed + 1;
  const updatedLost = lost + 1;

  updateLoss(row, updatedPoints, updatedMatchesPlayed, updatedLost);
  addActionToHistory(row, points, matchesPlayed, lost, updatedPoints, updatedMatchesPlayed, updatedLost);
  sortTable();
}

// Handle Tie button click
function handleTie() {
  const row = this.parentNode.parentNode;
  const pointsElement = row.querySelector('.points');
  const matchesPlayedElement = row.querySelector('.matches-played');
  const tiedElement = row.querySelector('.tied');
  const points = parseInt(pointsElement.textContent);
  const matchesPlayed = parseInt(matchesPlayedElement.textContent);
  const tied = parseInt(tiedElement.textContent);
  const updatedPoints = points + 1;
  const updatedMatchesPlayed = matchesPlayed + 1;
  const updatedTied = tied + 1;

  updateTie(row, updatedPoints, updatedMatchesPlayed, updatedTied);
  addActionToHistory(row, points, matchesPlayed, tied, updatedPoints, updatedMatchesPlayed, updatedTied);
  sortTable();
}

// Update points for a row
function updatePoints(row, updatedPoints, updatedMatchesPlayed, updatedWon) {
  const pointsElement = row.querySelector('.points');
  const matchesPlayedElement = row.querySelector('.matches-played');
  const wonElement = row.querySelector('.won');
  
  pointsElement.textContent = updatedPoints;
  matchesPlayedElement.textContent = updatedMatchesPlayed;
  wonElement.textContent = updatedWon;

  row.dataset.originalPoints = updatedPoints;
  row.dataset.originalMatchesPlayed = updatedMatchesPlayed;
  row.dataset.originalWon = updatedWon;
}

// Update loss for a row
function updateLoss(row, updatedPoints, updatedMatchesPlayed, updatedLost) {
  const pointsElement = row.querySelector('.points');
  const matchesPlayedElement = row.querySelector('.matches-played');
  const lostElement = row.querySelector('.lost');
  
  pointsElement.textContent = updatedPoints;
  matchesPlayedElement.textContent = updatedMatchesPlayed;
  lostElement.textContent = updatedLost;

  row.dataset.originalPoints = updatedPoints;
  row.dataset.originalMatchesPlayed = updatedMatchesPlayed;
  row.dataset.originalLost = updatedLost;
}

// Update tie for a row
function updateTie(row, updatedPoints, updatedMatchesPlayed, updatedTied) {
  const pointsElement = row.querySelector('.points');
  const matchesPlayedElement = row.querySelector('.matches-played');
  const tiedElement = row.querySelector('.tied');
  
  pointsElement.textContent = updatedPoints;
  matchesPlayedElement.textContent = updatedMatchesPlayed;
  tiedElement.textContent = updatedTied;

  row.dataset.originalPoints = updatedPoints;
  row.dataset.originalMatchesPlayed = updatedMatchesPlayed;
  row.dataset.originalTied = updatedTied;
}

// Add an action to the history
function addActionToHistory(row, originalPoints, originalMatchesPlayed, originalWon, updatedPoints, updatedMatchesPlayed, updatedWon) {
  const action = {
    row: row,
    originalPoints: originalPoints,
    originalMatchesPlayed: originalMatchesPlayed,
    originalWon: originalWon,
    updatedPoints: updatedPoints,
    updatedMatchesPlayed: updatedMatchesPlayed,
    updatedWon: updatedWon,
  };

  actionHistory.push(action);
}

// Undo the last action
function undoAction() {
  if (actionHistory.length === 0) {
    return;
  }

  const lastAction = actionHistory.pop();

  const { row, originalPoints, originalMatchesPlayed, originalWon } = lastAction;
  const pointsElement = row.querySelector('.points');
  const matchesPlayedElement = row.querySelector('.matches-played');
  const wonElement = row.querySelector('.won');

  pointsElement.textContent = originalPoints;
  matchesPlayedElement.textContent = originalMatchesPlayed;
  wonElement.textContent = originalWon;

  row.dataset.originalPoints = originalPoints;
  row.dataset.originalMatchesPlayed = originalMatchesPlayed;
  row.dataset.originalWon = originalWon;

  sortTable();
}

// Sort the table based on points, wins, and losses
function sortTable() {
  const rows = Array.from(tableBody.getElementsByTagName('tr'));

  rows.sort((rowA, rowB) => {
    const pointsA = parseInt(rowA.querySelector('.points').textContent);
    const pointsB = parseInt(rowB.querySelector('.points').textContent);
    const wonA = parseInt(rowA.querySelector('.won').textContent);
    const wonB = parseInt(rowB.querySelector('.won').textContent);
    const lostA = parseInt(rowA.querySelector('.lost').textContent);
    const lostB = parseInt(rowB.querySelector('.lost').textContent);

    if (pointsA !== pointsB) {
      return pointsB - pointsA;
    } else if (wonA !== wonB) {
      return wonB - wonA;
    } else {
      return lostA - lostB;
    }
  });

  // Remove existing rows
  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }

  // Add sorted rows back to the table
  rows.forEach(row => {
    tableBody.appendChild(row);
  });
}

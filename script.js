const notes = [
    { name: "C4", file: "C4.mp3" },
    { name: "C#/Db4", file: "Cs4.mp3" },
    { name: "D4", file: "D4.mp3" },
    { name: "D#/Eb4", file: "Ds4.mp3" },
    { name: "E4", file: "E4.mp3" },
    { name: "F4", file: "F4.mp3" },
    { name: "F#/Gb4", file: "Fs4.mp3" },
    { name: "G4", file: "G4.mp3" },
    { name: "G#/Ab4", file: "Gs4.mp3" },
    { name: "A4", file: "A4.mp3" },
    { name: "A#/Bb4", file: "As4.mp3" },
    { name: "B4", file: "B4.mp3" },
    { name: "C5", file: "C5.mp3" }
];

let currentNote = null;
let answered = false;
let correctCount = 0;
let incorrectCount = 0;

const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const replayBtn = document.getElementById('replayBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const referenceBtn = document.getElementById('referenceBtn');
const choicesDiv = document.getElementById('choices');
const buttonsDiv = document.getElementById('buttons');
const resultDiv = document.getElementById('result');
const correctCountSpan = document.getElementById('correctCount');
const incorrectCountSpan = document.getElementById('incorrectCount');
const totalCountSpan = document.getElementById('totalCount');
const percentageSpan = document.getElementById('percentage');

// Helper function to play a note
function playNote(fileName) {
    const audio = new Audio(`audio/${fileName}`);
    audio.play();
}

// Start or Next Question
function startGame() {
    // Hide start button and show the next button when the game starts
    startBtn.style.display = 'none';
    nextBtn.style.display = 'block';

    // Reset the previous game data
    if (!answered && currentNote) {
        alert("Please select an answer before moving on!");
        return;
    }
    buttonsDiv.classList.remove('hidden');
    resultDiv.textContent = "";
    answered = false;

    // Randomly select a note
    currentNote = notes[Math.floor(Math.random() * notes.length)];
    playNote(currentNote.file);  // Play the note when the game starts

    // Generate choice buttons without number prefixes
    choicesDiv.innerHTML = "";
    notes.forEach(note => {
        const btn = document.createElement('button');
        const displayName = (note.name === 'C4' || note.name === 'C5') ? note.name : note.name.replace(/[0-9]/g, '');
        btn.textContent = displayName;
        btn.addEventListener('click', () => makeGuess(note.name));
        choicesDiv.appendChild(btn);
    });
}

// Handle guess
function makeGuess(selectedName) {
    if (answered) return; // Prevent double answering

    if (selectedName === currentNote.name) {
        resultDiv.textContent = "✅ Correct!\n";
        correctCount++;
    } else {
        resultDiv.textContent = `❌ Wrong! It was ${currentNote.name}\n`;
        incorrectCount++;
    }

    answered = true;
    updateScore();
}

// Replay current note
function replayNote() {
    if (currentNote) {
        playNote(currentNote.file);
    }
}

// Play reference note C4
function playReferenceNote() {
    playNote("C4.mp3");
}

// Update the score
function updateScore() {
    correctCountSpan.textContent = correctCount;
    incorrectCountSpan.textContent = incorrectCount;
    const total = correctCount + incorrectCount;
    totalCountSpan.textContent = total;
    const percentage = total === 0 ? 0 : Math.round((correctCount / total) * 100);
    percentageSpan.textContent = `${percentage}%`;
}

// Reset the game
function resetScore() {
    correctCount = 0;
    incorrectCount = 0;
    currentNote = null;
    answered = false;
    updateScore();
    resultDiv.textContent = "";
    startBtn.style.display = 'block';  // Show the Start button
    nextBtn.style.display = 'none';  // Hide the Next button
    buttonsDiv.classList.add('hidden');  // Hide the choices and answer buttons
}

// Event listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', replayNote);
referenceBtn.addEventListener('click', playReferenceNote);
resetScoreBtn.addEventListener('click', resetScore);

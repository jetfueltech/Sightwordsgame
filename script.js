document.addEventListener('DOMContentLoaded', function() {
    let originalWords = [];
    let words = [];
    let correctWords = [];
    let incorrectWords = [];
    let timer = null;

    const wordInput = document.getElementById('wordInput');
    const startGameButton = document.getElementById('startGame');
    const gameArea = document.getElementById('gameArea');
    const wordDisplay = document.getElementById('wordDisplay');
    const correctButton = document.getElementById('correct');
    const incorrectButton = document.getElementById('incorrect');
    const resultsDiv = document.getElementById('results');
    const finalScoreDiv = document.getElementById('finalScore');
    const playAgainButton = document.getElementById('playAgain');
    const newGameButton = document.getElementById('newGame');

    function resetGame() {
        clearTimeout(timer);
        words = [...originalWords]; 
        correctWords = []; 
        incorrectWords = []; 
        wordDisplay.textContent = ''; 
    }

    function showWord() {
        if (words.length === 0) {
            endGame();
            return;
        }
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.textContent = words[randomIndex];
        words.splice(randomIndex, 1);

        timer = setTimeout(() => {
            incorrectWords.push(wordDisplay.textContent);
            showWord();
        }, 7000);
    }

    startGameButton.addEventListener('click', function() {
        originalWords = wordInput.value.trim().split('\n').filter(Boolean);
        if (originalWords.length) {
            resetGame();
            gameArea.style.display = 'block';
            wordInput.style.display = 'none';
            startGameButton.style.display = 'none';
            showWord();
        } else {
            alert('Please enter some words to start the game.');
        }
    });

    correctButton.addEventListener('click', function() {
        clearTimeout(timer);
        correctWords.push(wordDisplay.textContent);
        showWord();
    });

    incorrectButton.addEventListener('click', function() {
        clearTimeout(timer);
        incorrectWords.push(wordDisplay.textContent);
        showWord();
    });

    playAgainButton.addEventListener('click', function() {
        resetGame();
        showWord();
        gameArea.style.display = 'block';
        resultsDiv.style.display = 'none';
    });

    newGameButton.addEventListener('click', function() {
        originalWords = []; 
        resetGame();
        wordInput.style.display = 'block';
        startGameButton.style.display = 'block';
        gameArea.style.display = 'none';
        resultsDiv.style.display = 'none';
    });

  function endGame() {
      const totalWords = correctWords.length + incorrectWords.length;
      const percentageCorrect = ((correctWords.length / totalWords) * 100).toFixed(2);
      document.getElementById('score').textContent = `Score: ${correctWords.length}/${totalWords} (${percentageCorrect}%)`;

      const resultsTable = document.getElementById('resultsTable');
      // Clear previous results
      resultsTable.innerHTML = '<tr><th>Correct</th><th>Incorrect</th></tr>';

      // Calculate the longest array length to iterate through both
      const longestLength = Math.max(correctWords.length, incorrectWords.length);

      for (let i = 0; i < longestLength; i++) {
          const row = resultsTable.insertRow(-1); // Insert a new row at the end of the table
          const correctCell = row.insertCell(0);
          const incorrectCell = row.insertCell(1);

          // Set text content for cells if the word exists
          correctCell.textContent = correctWords[i] || '';
          incorrectCell.textContent = incorrectWords[i] || '';
      }

      // Show the results and hide the game area
      gameArea.style.display = 'none';
      results.style.display = 'block';
  }
});

document.addEventListener("DOMContentLoaded", function () {
    const finalScoreElement = document.getElementById("finalScore");
    const mostRecentScore = localStorage.getItem("mostRecentScore");
    const usernameInput = document.getElementById("username");
    const saveScoreBtn = document.getElementById("saveScoreBtn");

    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    finalScoreElement.innerText = `Your Final Score: ${mostRecentScore}`;

    usernameInput.addEventListener("keyup", () => {
        saveScoreBtn.disabled = !usernameInput.value.trim();
    });

    function saveHighScore(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        if (!username) return;

        const scoreEntry = {
            name: username,
            score: parseInt(mostRecentScore),
        };

        highScores.push(scoreEntry);
        highScores.sort((a, b) => b.score - a.score); // Sort scores in descending order
        highScores.splice(5); // Keep only the top 5 scores

        localStorage.setItem("highScores", JSON.stringify(highScores));

        alert("Score saved successfully!");
        window.location.href = "/leaderboard.html"; // Redirect to the leaderboard page
    }

    saveScoreBtn.addEventListener("click", saveHighScore);
});
// const username = document.getElementById('username');
// const saveScoreBtn = document.getElementById('saveScoreBtn');
// const finalScore = document.getElementById('finalScore');
// const mostRecentScore = localStorage.getItem('mostRecentScore');
// const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// const logoutBtn = document.getElementById("logoutBtn");


// const MAX_HIGH_SCORES = 5;

// finalScore.innerText = mostRecentScore;


// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = !username.value;
// });

// const saveHighScore = (e) => {
//     e.preventDefault();

//     const score = {
//         score: mostRecentScore,
//         name: username.value,
//     };



//     highScores.push(score);
//     highScores.sort((a, b) => b.score - a.score);
//     highScores.splice(MAX_HIGH_SCORES);

//     localStorage.setItem('highScores', JSON.stringify(highScores));
//     window.location.assign('/')

//      // Logout button functionality
//      document.addEventListener("DOMContentLoaded", function () {
//      logoutBtn.addEventListener("click"), function () {
//         localStorage.removeItem("username"); // Clear user session
//         window.location.href = "/signIn.html"; // Redirect to Sign-In page
//        }
//     })
// }

document.addEventListener("DOMContentLoaded", function () {
    const leaderboardTable = document.getElementById("leaderboard");
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    leaderboardTable.innerHTML = highScores
        .map((score, index) => {
            return `<tr>
                        <td>${index + 1}</td>
                        <td>${score.name}</td>
                        <td>${score.score}</td>
                    </tr>`;
        })
        .join("");
});
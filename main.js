
const API_KEY = "A9AwSpLIKKqpA3RAunCKOAD2PG9fkeSZIm4h3HyYhhH30DJQ";

const articlesContainer = document.getElementById("articles-container");

const articleTypeInputs = document.querySelectorAll('input[name="articleType"]');

const timeFrameInputs = document.querySelectorAll('input[name="timeFrame"]');

let currentArticleType = "viewed";
let currentTimeFrame = "7";

async function fetchArticles() {
    showLoading();
    const url =
        `https://api.nytimes.com/svc/mostpopular/v2/${currentArticleType}/${currentTimeFrame}.json?api-key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        renderArticles(data.results);
    }
    catch (error) {
        console.error(error);
        showError("Could not load articles.");
    }
}

function renderArticles(articles) {

    articlesContainer.innerHTML = "";
    let displayedArticles = 0;
    for (let i = 0; i < articles.length; i++) {
        if (displayedArticles >= 5) {
            break;
        }
        const article = articles[i];
        try {
            const imageUrl = article.media[0]["media-metadata"][1].url;
            const articleCard = createArticleCard(article, imageUrl, displayedArticles + 1);
            articlesContainer.appendChild(articleCard);
            displayedArticles++;
        }
        catch (error) {
            console.log("Skipping invalid article...");
        }
    }
}


function createArticleCard(article, imageUrl, rank) {
    const articleCard = document.createElement("article");
    articleCard.classList.add("article-card");
    articleCard.innerHTML = `
        <img
            src="${imageUrl}"
            alt="Article image"
            class="article-image"
        />

        <div class="article-content">

            <h3 class="article-title">
                ${rank}) ${article.title}
            </h3>

            <p class="article-abstract">
                ${article.abstract}
            </p>

        </div>

        <span class="article-date">
            ${article.published_date}
        </span>
    `;
    return articleCard;
}


function showLoading() {
    articlesContainer.innerHTML = `
        <div class="loading">
            Loading articles...
        </div>
    `;
}


function showError(message) {
    articlesContainer.innerHTML = `
        <div class="error">
            ${message}
        </div>
    `;
}

articleTypeInputs.forEach(input => {
    input.addEventListener("change", () => {
        currentArticleType = input.value;
        fetchArticles();
    });
});


timeFrameInputs.forEach(input => {
    input.addEventListener("change", () => {
        currentTimeFrame = input.value;
        fetchArticles();
    });
});


fetchArticles();

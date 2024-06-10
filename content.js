// Function to hide specific articles
function hideArticles(blockedSubreddits) {
    // Check if the current URL is "https://www.reddit.com/r/all/"
    if (window.location.href === "https://www.reddit.com/r/all/") {
      // Select all article elements with the class "w-full m-0"
      const articles = document.querySelectorAll('article.w-full.m-0');
      
      // Loop through each article
      articles.forEach(article => {
        // Check if the article has a shreddit-post child
        const shredditPost = article.querySelector('shreddit-post');
        
        if (shredditPost) {
          // Get the subreddit-prefixed-name attribute
          const subredditName = shredditPost.getAttribute('subreddit-prefixed-name');
          
          // If the subreddit name is in the block list, hide the article
          if (blockedSubreddits.includes(subredditName)) {
            article.style.display = 'none';
          }
        }
      });
    }
  }
  
// Function to retrieve blocked subreddits from storage and hide articles
function checkAndHideArticles() {
  chrome.storage.sync.get({ blockedSubreddits: [] }, function(data) {
    hideArticles(data.blockedSubreddits);
  });
}

checkAndHideArticles();

// Observe changes in the DOM to hide new articles that match the criteria
const observer = new MutationObserver(checkAndHideArticles);
observer.observe(document.body, { childList: true, subtree: true });

// Optional: Also listen for scroll events to ensure articles are checked
window.addEventListener('scroll', checkAndHideArticles);
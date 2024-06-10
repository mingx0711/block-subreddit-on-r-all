document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('subreddit-input');
    const blockButton = document.getElementById('block-button');
    const blockedList = document.getElementById('blocked-list');
  
    // Load blocked subreddits from storage
    chrome.storage.sync.get({blockedSubreddits: []}, function(data) {
      data.blockedSubreddits.forEach(subreddit => {
        addSubredditToList(subreddit);
      });
    });
  
    // Add subreddit to block list
    blockButton.addEventListener('click', function() {
      const subreddit = input.value.trim();
      if (subreddit) {
        console.log(subreddit+" is added to blocklist")
        chrome.storage.sync.get({blockedSubreddits: []}, function(data) {
          const blockedSubreddits = data.blockedSubreddits;
          if (!blockedSubreddits.includes(subreddit)) {
            blockedSubreddits.push(subreddit);
            chrome.storage.sync.set({blockedSubreddits: blockedSubreddits}, function() {
              addSubredditToList(subreddit);
              input.value = '';
            });
          }
        });
      }
    });
  
    // Add subreddit to the displayed list
    function addSubredditToList(subreddit) {
      const li = document.createElement('li');
      li.textContent = subreddit;
      li.style.fontSize = '15px';
      li.style.marginTop = '5px';
      const unblockButton = document.createElement('button');
      unblockButton.textContent = 'Unblock';
      unblockButton.style.position = "relative";
      unblockButton.style.marginLeft = "10px";
      unblockButton.classList.add("ui","button");
      unblockButton.addEventListener('click', function() {
        console.log(subreddit +" is removed from blocklist")
        chrome.storage.sync.get({blockedSubreddits: []}, function(data) {
          const blockedSubreddits = data.blockedSubreddits.filter(item => item !== subreddit);
          chrome.storage.sync.set({blockedSubreddits: blockedSubreddits}, function() {
            li.remove();
          });
        });
      });
      li.appendChild(unblockButton);
      blockedList.appendChild(li);
    }
  });
  
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#d32f2f">
    <title>Chat - MarathiMatrimony</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="app-header">
        <a href="index.php" class="app-logo">
            <i class="fas fa-arrow-left" style="color: var(--text);"></i>
            <h1>Chat</h1>
        </a>
        <div class="header-actions">
            <div class="header-icon toggle-dark" title="Toggle Dark Mode">
                <i class="fas fa-moon"></i>
            </div>
        </div>
    </header>

    <div class="onboard-container" style="margin-top: 10px;">
        <div class="onboard-slide">
            <input type="text" placeholder="Search chats..." style="width:100%; padding:12px; border:1px solid var(--border); border-radius:8px; background: var(--card-bg); color: var(--text);">
        </div>
        <div class="story-list">
            <div class="story-item">
                <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?auto=format&fit=crop&w=150&q=60" alt="Chat">
                <div>
                    <h4>Neha</h4>
                    <p>Hey! How are you?</p>
                </div>
            </div>
            <div class="story-item">
                <img src="https://images.unsplash.com/photo-1621621667797-e06afc217fb0?auto=format&fit=crop&w=150&q=60" alt="Chat">
                <div>
                    <h4>Priya</h4>
                    <p>Let's connect this weekend.</p>
                </div>
            </div>
        </div>
    </div>

    <nav class="bottom-nav">
        <a href="index.php" class="nav-item">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>
        <a href="matches.php" class="nav-item">
            <i class="fas fa-user-friends"></i>
            <span>Matches</span>
        </a>
        <a href="mailbox.php" class="nav-item">
            <i class="fas fa-envelope"></i>
            <span>Mailbox</span>
        </a>
        <a href="chat.php" class="nav-item active">
            <i class="fas fa-comment-alt"></i>
            <span>Chat</span>
        </a>
        <a href="profile.php" class="nav-item">
            <i class="fas fa-user"></i>
            <span>Profile</span>
        </a>
    </nav>

    <script>
        const toggleDark = document.querySelector('.toggle-dark');
        toggleDark?.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            localStorage.setItem('mm_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        });
        if (localStorage.getItem('mm_theme') === 'dark') document.body.classList.add('dark');
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('service-worker.js').catch(() => {});
        }
    </script>
</body>
</html>

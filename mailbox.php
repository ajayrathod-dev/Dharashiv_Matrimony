<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#d32f2f">
    <title>Mailbox - MarathiMatrimony</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="app-header">
        <a href="index.php" class="app-logo">
            <i class="fas fa-arrow-left" style="color: var(--text);"></i>
            <h1>Mailbox</h1>
        </a>
        <div class="header-actions">
            <div class="header-icon toggle-dark" title="Toggle Dark Mode">
                <i class="fas fa-moon"></i>
            </div>
        </div>
    </header>

    <div class="section-header" style="margin-top: 10px;">
        <h3>Requests</h3>
        <div class="chip-container">
            <a class="chip active" href="#">Requests</a>
            <a class="chip" href="#">Accepted</a>
            <a class="chip" href="#">Declined</a>
        </div>
    </div>

    <div class="story-list">
        <div class="story-item">
            <img src="https://images.unsplash.com/photo-1621621667797-e06afc217fb0?auto=format&fit=crop&w=150&q=60" alt="Req">
            <div>
                <h4>Priya • Mumbai</h4>
                <p>Sent a connect request</p>
            </div>
        </div>
        <div class="story-item">
            <img src="data:image/jpeg;base64,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" alt="Req">
            <div>
                <h4>Neha • Pune</h4>
                <p>Wants to chat</p>
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
        <a href="mailbox.php" class="nav-item active">
            <i class="fas fa-envelope"></i>
            <span>Mailbox</span>
        </a>
        <a href="chat.php" class="nav-item">
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

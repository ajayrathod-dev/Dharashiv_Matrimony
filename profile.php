<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#d32f2f">
    <title>My Profile - MarathiMatrimony</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="app-header">
        <a href="index.php" class="app-logo">
            <i class="fas fa-arrow-left" style="color: var(--text);"></i>
            <h1>My Profile</h1>
        </a>
        <div class="header-actions">
            <div class="header-icon toggle-dark" title="Toggle Dark Mode">
                <i class="fas fa-moon"></i>
            </div>
        </div>
    </header>

    <div class="onboard-container" style="margin-top: 10px;">
        <div class="onboard-slide">
            <img src="data:image/jpeg;base64,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" alt="Profile Photo" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover;">
            <h3 style="margin-top: 10px; color: var(--text);">Rahul Patil</h3>
            <p style="color: var(--muted);">27 • 5'9" • Pune • Engineer</p>
            <div class="onboard-actions">
                <button class="btn-outline">Edit</button>
                <button class="btn-primary">Upgrade</button>
            </div>
        </div>
        <div class="onboard-slide">
            <h3 style="color: var(--text);">About</h3>
            <p style="color: var(--muted);">I am a software engineer. I love trekking and reading.</p>
        </div>
        <div class="onboard-slide">
            <h3 style="color: var(--text);">Preferences</h3>
            <p style="color: var(--muted);">Looking for a partner between 23–28, Marathi, Pune/Mumbai.</p>
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
        <a href="chat.php" class="nav-item">
            <i class="fas fa-comment-alt"></i>
            <span>Chat</span>
        </a>
        <a href="profile.php" class="nav-item active">
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

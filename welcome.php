<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#d32f2f">
    <title>Welcome - MarathiMatrimony</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <header class="app-header">
        <a href="index.php" class="app-logo">
            <h1>Marathi<span>Matrimony</span></h1>
        </a>
        <div class="header-actions">
            <div class="header-icon toggle-dark" title="Toggle Dark Mode">
                <i class="fas fa-moon"></i>
            </div>
        </div>
    </header>

    <div class="onboard-container" style="margin-top: 10px;">
        <div class="onboard-slide">
            <img src="https://images.unsplash.com/photo-1520975682039-3aa75c7d01f2?auto=format&fit=crop&w=600&q=60" alt="Verified">
            <h3 style="color: var(--text);">Verified Profiles</h3>
            <p style="color: var(--muted);">Trust and privacy come first.</p>
        </div>
        <div class="onboard-slide">
            <img src="https://images.unsplash.com/photo-1516826957135-600308c99f9b?auto=format&fit=crop&w=600&q=60" alt="Community">
            <h3 style="color: var(--text);">Marathi Community</h3>
            <p style="color: var(--muted);">Find matches from your community.</p>
        </div>
        <div class="onboard-slide">
            <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=60" alt="Fast">
            <h3 style="color: var(--text);">Fast & Easy</h3>
            <p style="color: var(--muted);">Start in minutes and connect.</p>
        </div>
        <div class="onboard-actions">
            <a class="btn-outline" href="login.php" style="text-align:center; flex:1;">Login</a>
            <a class="btn-primary" href="register.php" style="text-align:center; flex:1;">Register</a>
        </div>
    </div>

    <nav class="bottom-nav">
        <a href="index.php" class="nav-item active">
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

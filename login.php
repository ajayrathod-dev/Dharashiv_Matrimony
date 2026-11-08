<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#d32f2f">
    <title>Login - MarathiMatrimony</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="background: white; padding-top: 0; padding-bottom: 0;">

    <div class="auth-screen">
        <div class="auth-header">
            <img src="https://images.unsplash.com/photo-1617260273769-e70b7987820a?auto=format&fit=crop&w=500&q=60" alt="Welcome" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0 0 20px 20px; margin-bottom: 20px; margin-top: -30px;">
            <h1>Marathi<span>Matrimony</span></h1>
            <p>Welcome back!</p>
        </div>

        <form class="auth-form" action="index.php">
            <div class="input-group">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Matrimony ID / Mobile No.">
            </div>
            <div class="input-group">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Password">
            </div>
            
            <div style="text-align: right; margin-bottom: 20px;">
                <a href="#" style="color: #666; font-size: 0.85rem; text-decoration: none;">Forgot Password?</a>
            </div>

            <button type="submit" class="btn-block">Login</button>
            <button type="button" class="btn-block" style="background: white; color: #d32f2f; border: 1px solid #d32f2f;">Login via OTP</button>
        </form>

        <div class="auth-footer">
            <p>Don't have an account? <a href="register.php">Register Free</a></p>
        </div>
    </div>

</body>
</html>

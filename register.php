<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="theme-color" content="#d32f2f">
    <title>Register - MarathiMatrimony</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body style="background: white; padding-top: 0; padding-bottom: 0;">

    <div class="auth-screen">
        <div style="position: relative;">
            <img src="https://images.unsplash.com/photo-1596243604728-a5f9618b6d2f?auto=format&fit=crop&w=500&q=60" alt="Join Us" style="width: 100%; height: 180px; object-fit: cover; border-radius: 0 0 20px 20px; margin-bottom: 20px; margin-top: -30px;">
            <a href="login.php" style="position: absolute; top: 20px; left: 20px; color: white; font-size: 1.2rem; background: rgba(0,0,0,0.3); width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; border-radius: 50%;"><i class="fas fa-arrow-left"></i></a>
        </div>
        
        <div class="auth-header" style="text-align: left; margin-bottom: 20px;">
            <h1 style="font-size: 1.8rem;">Create Account</h1>
            <p>Join thousands of Marathi singles.</p>
        </div>

        <form class="auth-form" action="index.php">
            <div class="input-group">
                <label style="display:block; margin-bottom: 5px; color:#555;">Profile For</label>
                <div style="display: flex; gap: 10px; overflow-x: auto; padding-bottom: 10px;">
                    <span class="chip active">Self</span>
                    <span class="chip">Son</span>
                    <span class="chip">Daughter</span>
                    <span class="chip">Sibling</span>
                </div>
            </div>

            <div class="input-group">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Full Name">
            </div>

            <div class="input-group">
                <i class="fas fa-mobile-alt"></i>
                <input type="tel" placeholder="Mobile Number">
            </div>
            
            <div class="input-group">
                <i class="fas fa-envelope"></i>
                <input type="email" placeholder="Email ID">
            </div>

            <div class="input-group">
                <i class="fas fa-lock"></i>
                <input type="password" placeholder="Create Password">
            </div>

            <div class="input-group">
                <label style="display:block; margin-bottom: 5px; color:#555;">Religion</label>
                <select style="width: 100%; padding: 12px; border: 1px solid #eee; border-radius: 8px; background: #fff;">
                    <option>Hindu</option>
                    <option>Muslim</option>
                    <option>Christian</option>
                    <option>Buddhist</option>
                </select>
            </div>

            <button type="submit" class="btn-block">Register Free</button>
            <p style="font-size: 0.75rem; color: #999; margin-top: 15px; text-align: center;">
                By signing up, you agree to our Terms and Privacy Policy.
            </p>
        </form>

        <div class="auth-footer" style="margin-top: 20px;">
            <p>Already a member? <a href="login.php">Login</a></p>
        </div>
    </div>

    <script>
        const chips = document.querySelectorAll('.chip');
        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
            });
        });
    </script>
</body>
</html>

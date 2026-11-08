@echo off
title Dharashiv Matrimony Launcher
echo ========================================================
echo        Dharashiv Matrimony - Matrimonial Portal
echo ========================================================
echo.
echo Starting Backend (JSON Server on http://localhost:3001)...
start "Dharashiv Matrimony Backend" cmd /k "cd backend && node server.js"

echo Waiting 2 seconds...
timeout /t 2 /nobreak > nul

echo Starting Frontend (React + Vite on http://localhost:3000)...
start "Dharashiv Matrimony Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo   Backend:  http://localhost:3001
echo   Frontend: http://localhost:3000
echo   Demo Login: demo@dharashiv.com / demo123
echo ========================================================
echo.
pause


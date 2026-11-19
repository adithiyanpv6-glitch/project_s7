@echo off
title NICHE PRP - Offline Live Demo Launcher
color 0A

echo ======================================================================
echo    NOORUL ISLAM CENTRE FOR HIGHER EDUCATION (NICHE)
echo    PLACEMENT READINESS PLATFORM (PRP) - 100%% OFFLINE LIVE DEMO
echo ======================================================================
echo.
echo [*] Starting Backend Server (SQLite Database + APIs) on port 5000...
start "NICHE PRP Backend (Port 5000)" /min cmd /c "cd /d "%~dp0server" && npm run dev"

echo [*] Waiting 3 seconds for Backend to initialize...
timeout /t 3 /nobreak >nul

echo [*] Starting Frontend Production Engine on port 4173...
start "NICHE PRP Frontend (Port 4173)" /min cmd /c "cd /d "%~dp0client" && npx vite preview --port 4173 --host"

echo [*] Waiting 2 seconds for Frontend to initialize...
timeout /t 2 /nobreak >nul

echo.
echo ======================================================================
echo    SYSTEM INITIALIZED SUCCESSFULLY (100%% OFFLINE MODE)
echo ======================================================================
echo.
echo   Local Address:   http://localhost:4173
echo.
echo   DEMO CREDENTIALS:
echo   - Student:  student@placementprep.com  /  Student@123
echo   - Mentor:   mentor@placementprep.com   /  Mentor@123
echo   - Admin:    admin@placementprep.com    /  Admin@123
echo.
echo [*] Opening Browser to http://localhost:4173 ...
start http://localhost:4173/

echo.
echo Keep this window or the minimized background tasks open during your review.
echo When you are done, run STOP_OFFLINE_DEMO.bat to close all processes.
echo ======================================================================
pause

@echo off
title Stop NICHE PRP Offline Demo
color 0C

echo ======================================================================
echo    Stopping NICHE PRP Offline Services (Ports 5000 & 4173)...
echo ======================================================================
echo.

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000 ^| findstr LISTENING') do (
    echo [*] Stopping Backend process PID %%a on port 5000...
    taskkill /f /pid %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4173 ^| findstr LISTENING') do (
    echo [*] Stopping Frontend process PID %%a on port 4173...
    taskkill /f /pid %%a >nul 2>&1
)

echo.
echo [*] All offline demo servers stopped cleanly.
echo ======================================================================
timeout /t 2 >nul
exit

@echo off
REM Chay web Toan 7 tren Windows. Cach dung: nhap dup run.bat
REM   hoac: run.bat 8080   (doi cong, mac dinh 8000)
setlocal
chcp 65001 >nul
set PYTHONIOENCODING=utf-8
cd /d "%~dp0"

set PORT=8000
if not "%~1"=="" set PORT=%~1

REM Tim Python: uu tien "py -3", sau do "python"
set PY=
py -3 --version >nul 2>&1 && set "PY=py -3"
if not defined PY (
    python --version >nul 2>&1 && set "PY=python"
)
if not defined PY (
    echo [LOI] Khong tim thay Python 3. Cai tai https://www.python.org/downloads/
    echo       nho tich "Add python.exe to PATH" khi cai.
    pause
    exit /b 1
)

REM Mo trinh duyet sau 2 giay (doi server khoi dong)
start "" /b cmd /c "timeout /t 2 /nobreak >nul & start "" http://localhost:%PORT%"

%PY% server.py --port %PORT%

echo.
pause

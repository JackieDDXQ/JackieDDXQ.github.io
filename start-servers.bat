@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 正在启动 PMOdyssey 和三个系统的开发服务器...
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4 Address" ^| findstr /v "169.254" ^| findstr /v "127.0.0.1"') do (
    set "LOCAL_IP=%%a"
    set "LOCAL_IP=!LOCAL_IP: =!"
    goto :found_ip
)
:found_ip

if not defined LOCAL_IP set "LOCAL_IP=127.0.0.1"

echo 启动 PMOdyssey (端口 8080)...
start "PMOdyssey" cmd /k "cd /d "%~dp0" && python -m http.server 8080"
timeout /t 2 /nobreak >nul

echo 启动万象系统 Omni (端口 3001)...
start "Omni" cmd /k "cd /d "%~dp0projects\omni" && npm run dev -- --port 3001 --host"
timeout /t 3 /nobreak >nul

echo 启动云仓系统 Depot (端口 3002)...
start "Depot" cmd /k "cd /d "%~dp0projects\depot" && npm run dev -- --port 3002 --host"
timeout /t 3 /nobreak >nul

echo 启动灵霄系统 Cel (端口 3003)...
start "Cel" cmd /k "cd /d "%~dp0projects\cel\frontend" && npm run dev -- --port 3003 --host"
timeout /t 3 /nobreak >nul

echo.
echo ==============================================
echo 所有服务器已启动！
echo ==============================================
echo 本机访问（同一台电脑）：
echo   PMOdyssey:      http://localhost:8080
echo   云仓系统:       http://localhost:3002
echo   万象系统:       http://localhost:3001
echo   灵霄系统:       http://localhost:3003
echo ==============================================
echo 局域网访问（手机/其他电脑）：
echo   请确保设备连接到同一网络
echo   PMOdyssey:      http://!LOCAL_IP!:8080
echo   云仓系统:       http://!LOCAL_IP!:3002
echo   万象系统:       http://!LOCAL_IP!:3001
echo   灵霄系统:       http://!LOCAL_IP!:3003
echo ==============================================
echo 按任意键退出...
pause
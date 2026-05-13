@echo off
echo 正在启动 PMOdyssey 和三个系统的开发服务器...
echo.

echo 启动 PMOdyssey (端口 8080)...
start cmd /k "cd d:\Project\PMOdyssey && python -m http.server 8080"
timeout /t 2 /nobreak >nul

echo 启动万象系统 Omni (端口 3001)...
start cmd /k "cd d:\Project\omni && npm run dev -- --port 3001 --host"
timeout /t 3 /nobreak >nul

echo 启动云仓系统 Depot (端口 3002)...
start cmd /k "cd d:\Project\depot && npm run dev -- --port 3002 --host"
timeout /t 3 /nobreak >nul

echo 启动灵霄系统 Cel (端口 3003)...
start cmd /k "cd d:\Project\cel\frontend && npm run dev -- --port 3003 --host"
timeout /t 3 /nobreak >nul

echo.
echo 所有服务器已启动！
echo PMOdyssey: http://localhost:8080
echo 万象系统: http://localhost:3001
echo 云仓系统: http://localhost:3002
echo 灵霄系统: http://localhost:3003
echo.
echo 按任意键退出...
pause
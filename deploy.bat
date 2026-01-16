@echo off
echo ========================================
echo Deploy Frontend para VPS
echo ========================================
echo.

REM Configurações
set VPS_USER=backend
set VPS_HOST=89.117.33.220
set VPS_PASSWORD=##Flipper@@2026
set VPS_PATH=/home/backend/frontend-app
set HOST_KEY=SHA256:0eTwgAnl7z6gQPXYEgTyj7UmLB5iC9sUXDkylZUJ3I0
set PLINK="C:\Program Files\PuTTY\plink.exe"
set PSCP="C:\Program Files\PuTTY\pscp.exe"

echo [1/5] Fazendo build do projeto...
call npm run build
if errorlevel 1 (
    echo ERRO: Build falhou!
    pause
    exit /b 1
)
echo Build concluido com sucesso!
echo.

echo [2/5] Criando pasta no VPS...
%PLINK% -pw "%VPS_PASSWORD%" -hostkey "%HOST_KEY%" %VPS_USER%@%VPS_HOST% "mkdir -p %VPS_PATH%"
echo Pasta criada!
echo.

echo [3/5] Limpando arquivos antigos no VPS...
%PLINK% -pw "%VPS_PASSWORD%" -hostkey "%HOST_KEY%" %VPS_USER%@%VPS_HOST% "rm -rf %VPS_PATH%/*"
echo Arquivos antigos removidos!
echo.

echo [4/5] Transferindo arquivos (isso pode demorar)...
%PSCP% -pw "%VPS_PASSWORD%" -hostkey "%HOST_KEY%" -r dist\* %VPS_USER%@%VPS_HOST%:%VPS_PATH%/
if errorlevel 1 (
    echo ERRO: Transferencia falhou!
    pause
    exit /b 1
)
echo Arquivos transferidos com sucesso!
echo.

echo [5/5] Configurando servidor web no VPS...
%PLINK% -pw "%VPS_PASSWORD%" -hostkey "%HOST_KEY%" %VPS_USER%@%VPS_HOST% "cd %VPS_PATH% && if ! command -v serve &> /dev/null; then npm install -g serve; fi && pkill -f 'serve.*3000' || true && nohup serve -s . -l 3000 > server.log 2>&1 &"
echo.

echo ========================================
echo Deploy concluido com sucesso!
echo ========================================
echo.
echo Aplicacao rodando em: http://89.117.33.220:3000
echo.
pause

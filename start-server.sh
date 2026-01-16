#!/bin/bash
cd /home/backend/frontend-app
pkill -f 'python3.*http.server' 2>/dev/null || true
nohup python3 -m http.server 3000 > server.log 2>&1 &
sleep 2
echo "Servidor iniciado na porta 3000"
ps aux | grep 'python3.*http.server' | grep -v grep || echo "Erro ao iniciar servidor"

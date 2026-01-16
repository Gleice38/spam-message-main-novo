#!/usr/bin/env python3
"""
Servidor HTTP customizado para SPA (Single Page Application)
Retorna index.html para todas as rotas que não sejam arquivos estáticos
"""

import http.server
import socketserver
import os
from pathlib import Path

PORT = 3002

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Remove query string se existir
        path = self.path.split('?')[0]

        # Construir caminho completo do arquivo
        file_path = self.translate_path(path)

        # Se o arquivo existe, serve normalmente
        if os.path.isfile(file_path):
            return super().do_GET()

        # Se é uma pasta e existe index.html dentro, serve
        if os.path.isdir(file_path):
            index_path = os.path.join(file_path, 'index.html')
            if os.path.isfile(index_path):
                return super().do_GET()

        # Para qualquer outra rota (ex: /dashboard, /contacts, etc)
        # Retorna o index.html da raiz para o React Router funcionar
        self.path = '/index.html'
        return super().do_GET()

if __name__ == '__main__':
    Handler = SPAHandler

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"🚀 SPA Server rodando na porta {PORT}")
        print(f"📂 Servindo arquivos do diretório atual")
        print(f"🔄 Todas as rotas retornam index.html (React Router)")
        print(f"⚡ Acesse: http://localhost:{PORT}")
        httpd.serve_forever()

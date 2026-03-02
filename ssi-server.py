#!/usr/bin/env python3
"""
SSI (Server Side Includes) 対応ローカルサーバー

使い方:
  python3 ssi-server.py

ブラウザで http://localhost:8080 にアクセス
"""

import http.server
import socketserver
import os
import re
from pathlib import Path

PORT = 8888
DIRECTORY = Path(__file__).parent

class SSIHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """SSI対応のHTTPリクエストハンドラ"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def do_GET(self):
        """GETリクエストを処理（SSI処理を追加）"""
        # ファイルパスを取得
        file_path = self.translate_path(self.path)

        # ディレクトリの場合、index.htmlを探す
        if os.path.isdir(file_path):
            index_path = os.path.join(file_path, 'index.html')
            if os.path.exists(index_path):
                file_path = index_path

        # HTMLファイルの場合、SSI処理を行う
        if file_path.endswith('.html'):
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                # SSIを処理
                processed_content = self.process_ssi(content, file_path)

                # レスポンスを送信
                self.send_response(200)
                self.send_header('Content-type', 'text/html; charset=utf-8')
                self.send_header('Content-Length', len(processed_content.encode('utf-8')))
                # CORS対応（外部リソース読み込みを許可）
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
                self.send_header('Access-Control-Allow-Headers', 'Content-Type')
                self.end_headers()
                self.wfile.write(processed_content.encode('utf-8'))
                return
            except FileNotFoundError:
                pass
            except Exception as e:
                print(f'エラー: {e}')

        # HTMLファイル以外は通常の処理
        super().do_GET()

    def process_ssi(self, content, current_file):
        """SSIディレクティブを処理"""
        # <!--#include virtual="..." --> を検索
        pattern = r'<!--#include\s+virtual="([^"]+)"\s*-->'

        def replace_include(match):
            virtual_path = match.group(1)

            # 絶対パス（/で始まる）の場合、ドキュメントルートからの相対パスに変換
            if virtual_path.startswith('/'):
                # /web/... → web/...
                # /style-guide/... → style-guide/...
                # 現在のフォルダ構造に直接合わせる
                include_path = DIRECTORY / virtual_path.lstrip('/')
            else:
                # 相対パスの場合、現在のファイルからの相対パス
                current_dir = Path(current_file).parent
                include_path = current_dir / virtual_path

            # インクルードファイルを読み込む
            try:
                # エンコーディングを複数試す
                for encoding in ['utf-8', 'shift-jis', 'cp932', 'euc-jp']:
                    try:
                        with open(include_path, 'r', encoding=encoding) as f:
                            included_content = f.read()
                        print(f'✅ SSI読み込み成功 [{encoding}]: {virtual_path}')
                        # インクルードファイル内のSSIも再帰的に処理
                        return self.process_ssi(included_content, str(include_path))
                    except (UnicodeDecodeError, LookupError):
                        continue

                # すべてのエンコーディングで失敗
                raise UnicodeDecodeError('multi', b'', 0, 1, 'All encodings failed')

            except FileNotFoundError:
                print(f'⚠️  インクルードファイルが見つかりません: {virtual_path} → {include_path}')
                return f'<!-- SSI ERROR: File not found: {virtual_path} -->'
            except Exception as e:
                print(f'⚠️  インクルードエラー ({virtual_path}): {e}')
                return f'<!-- SSI ERROR: {str(e)} -->'

        # すべてのSSIディレクティブを置換
        processed = re.sub(pattern, replace_include, content)
        return processed

    def log_message(self, format, *args):
        """ログメッセージをカスタマイズ"""
        print(f'📄 {self.address_string()} - {format % args}')


def main():
    """メイン処理"""
    print('🚀 SSI対応ローカルサーバーを起動します\n')
    print(f'📁 ドキュメントルート: {DIRECTORY}')
    print(f'🌐 URL: http://localhost:{PORT}\n')
    print('ページビルダー: http://localhost:8888/page-builder/index.html')
    print('スタイルガイド: http://localhost:8888/20260224_モジュール/style-guide/module/button.html\n')
    print('⏹️  停止するには Ctrl+C を押してください\n')

    # サーバーを起動（ポート再利用を許可）
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), SSIHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print('\n\n⏹️  サーバーを停止しました')


if __name__ == '__main__':
    main()

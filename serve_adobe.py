from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
import socket
import sys
import webbrowser


class AdobeHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/__adobe_status":
            body = b"GraphiquesGPT Adobe server OK\n"
            self.send_response(200)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()

    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Resource-Policy", "cross-origin")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


def available_port(start):
    port = start
    while port < start + 30:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            try:
                sock.bind(("127.0.0.1", port))
                return port
            except OSError:
                port += 1
    raise RuntimeError("Aucun port disponible")


def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    requested = int(sys.argv[1]) if len(sys.argv) > 1 else 8787
    port = available_port(requested)
    url = f"http://127.0.0.1:{port}/index.html"
    server = ThreadingHTTPServer(("127.0.0.1", port), AdobeHandler)
    print("GraphiquesGPT - mode Export Adobe")
    print(f"URL : {url}")
    print("Laisse cette fenetre ouverte pendant l'utilisation.")
    webbrowser.open(url)
    server.serve_forever()


if __name__ == "__main__":
    main()

from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse, unquote
from urllib import request, error
import json
import os

API_BASE_URL = "https://api.restcountries.com/countries/v5"
API_TOKEN = "rc_live_demo"


class CountryHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path

        if path.startswith("/api/"):
            self.handle_api(path)
            return

        super().do_GET()

    def handle_api(self, path):
        try:
            if path == "/api/countries":
                url = f"{API_BASE_URL}/all?fields=names,flag,capitals,region,population,borders,codes,subregion,languages"
            elif path.startswith("/api/region/"):
                region = unquote(path.replace("/api/region/", "", 1))
                url = f"{API_BASE_URL}/region/{region}?fields=names,flag,capitals,region,population,borders,codes,subregion,languages"
            elif path.startswith("/api/country/"):
                code = unquote(path.replace("/api/country/", "", 1))
                url = f"{API_BASE_URL}/alpha/{code}?fields=names,flag,capitals,region,population,borders,codes,subregion,languages"
            else:
                self.send_json({"error": "Not found"}, status=404)
                return

            req = request.Request(
                url,
                headers={"Authorization": f"Bearer {API_TOKEN}"},
            )
            with request.urlopen(req, timeout=30) as response:
                payload = json.loads(response.read().decode("utf-8"))

            self.send_json(payload)
        except error.HTTPError as exc:
            try:
                body = exc.read().decode("utf-8")
                payload = json.loads(body)
            except Exception:
                payload = {"error": "API request failed"}
            self.send_json(payload, status=exc.code)
        except Exception as exc:
            self.send_json({"error": str(exc)}, status=500)

    def send_json(self, payload, status=200):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format, *args):
        return


if __name__ == "__main__":
    os.chdir(os.path.dirname(__file__))
    server = ThreadingHTTPServer(("127.0.0.1", 8000), CountryHandler)
    print("Server running at http://127.0.0.1:8000")
    server.serve_forever()

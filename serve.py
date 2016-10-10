#!/usr/bin/env python
import SimpleHTTPServer
import SocketServer

PORT = 3000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "Serving at port %r" % PORT

httpd.serve_forever()
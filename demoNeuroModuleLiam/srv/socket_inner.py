import socket_inner

s = socket_inner.socket_inner(socket_inner.AF_INET, socket_inner.SOCK_STREAM)

print("Socket created!")

host = 'www.google.com'
port = 80

remote_ip = socket_inner.gethostbyname(host)

print("IP Address of " + host + " is " + remote_ip)

s.connect((remote_ip, port))

print("Socket connected to " + host + " on ip " + remote_ip)

message = b"GET / HTTP/1.1\r\n\r\n"
s.sendall(message)

reply = s.recv(4096)

print(reply)

s.close()

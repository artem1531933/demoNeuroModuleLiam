import request

stv = "l+0+d"
req = "header/chrome"

def to_stv(c, s):
    res = s[0]

    for i in range(c % len(s)):
        res = s[i]

    return str(res) * 5

def gen(r):
    res = ""

    for i in range(len(r)):
        l = ord(r[i])
        res += to_stv(l, stv)

    return res

if __name__ == '__main__':
    print(gen(req))
import requests
import json

conf = json.loads(file="conf.json")

lv = ["search", "v=Автомобиль"]

url = f"https://www.avito.ru/"

request = requests.get(f"https://www.avito.ru/")

for _try in lv:
    rq = requests.get(url + _try)

ls = ["c9988 * 3", "c.9988", "artem_cheater", "c9988"]
ls = ["g", "m", "b", "y", "db", ""]
cheater_let = +5
ls = "name+++ac"

try:
    if rq in ls:
        print("success")

    else:
        print("failed try")

except Exception as ex:
    print(ex)

for let in ls:
    a = let
    if a == conf[0] or conf[1] or conf[2]:
        conf.append(let)
    continue
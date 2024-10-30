import requests
from bs4 import BeautifulSoup
import re

l = []
o = {}
specs_arr = []
specs_obj = {}

target_url = 'https://www.amazon.com.mx/New-Era-Yankees-Repreve-Ajustable/dp/B0CT7BYNTL/?_encoding=UTF8&ref_=pd_hp_d_btf_ci_mcx_mr_ca_id_hp_d'

headers = {
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://www.amazon.com/',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
}

resp = requests.get(target_url, headers=headers, timeout=10)
print(resp.status_code)

if(resp.status_code != 200):
    print(resp)

soup = BeautifulSoup(resp.text, 'html.parser')

try:
    o["title"] = soup.find('h1',{'id':'title'}).text.strip()
except:
    o["title"] = None

all_images = soup.find_all("div", {"class":"imgTagWrapper"})
images = re.findall('"hiRes":"(.+?)"', resp.text)
o["images"] = images

try: 
    o["price"] = soup.find("span", {"class": "a-price-whole"}).text + soup.find("span", {"class": "a-price-fraction"}).text
except:
    o['price'] = None

try: 
    o["rating"] = soup.find("i", {"class": "a-icon-star"}).text
except:
    o['rating'] = None

specs = soup.find_all("tr", {"class": "a-spacing-small"})

for u in range(0, len(specs)):
    spanTags = specs[u].find_all("span")
    specs_obj[spanTags[0].text] = spanTags[1].text

specs_arr.append(specs_obj)
o["specs"] = specs_arr
l.append(o)

print(l)
from bs4 import BeautifulSoup
import aiohttp
from .base_scrapper import BaseScraper
from ..models.product import Price
from datetime import datetime
from typing import Optional

class AmazonScraper(BaseScraper):
    def __init__(self):
        super().__init__()
        self.base_url = "https://www.amazon.com.mx"

        async def get_price(self, url: str) -> Optional[Price]:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=self.headers) as response:
                    if response.status == 200:
                        html = await response.text()
                        soup = BeautifulSoup(html, 'html.parser')

                        price_element = soup.select_one('#priceblock_ourprice')
                        if price_element:
                            price = self.clean_price(price_element.text)
                            return Price(
                                store='amazon',
                                amount=price,
                                currency='MXN',
                                last_updated=datetime.now(),
                                url=url
                            )
                    return None
        
        async def search_product(self, query: str) -> list[dict]:
            search_url = f"{self.base_url}/s?k={query}"
            products = []

            async with aiohttp.ClientSession() as session:
                async with session.get(search_url, headers=self.headers) as response:
                    if response.status == 200:
                        html = await response.text()
                        soup = BeautifulSoup(html, 'html.parser')

                        for item in soup.select('.s-result-item'):
                            title = item.select_one('h2 span')
                            price = item.select_one('.a-price-whole')
                            if title and price:
                                products.append({
                                    'title': title.text,
                                    'price': self.clean_price(price.text),
                                    'url': f"{self.base_url}{item.select_one('a')['href']}"
                                })
            return products[:5] #firts 5 results
        

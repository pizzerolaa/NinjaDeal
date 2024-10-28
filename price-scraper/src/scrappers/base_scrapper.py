from abc import ABC, abstractmethod
from typing import Optional
from ..models.product import Price

class BaseScraper(ABC):
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        self.session = None

        @abstractmethod
        async def get_price(self, url: str) -> Optional[Price]:
            pass

        @abstractmethod
        async def search_product(self, query: str) -> list[dict]:
            pass

        def clean_price(self, price_str: str) -> float:
            #delete money simbols and convert to float
            return float(price_str.replace('$', '').replace(',', '').strip())
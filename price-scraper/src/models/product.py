from dataclasses import dataclass
from datetime import datetime
from typing import Dict, List, Optional

@dataclass
class Price:
    store: str
    amount: float
    currency: str
    last_updated: datetime
    url: str

@dataclass
class Product:
    id: str
    name: str
    current_prices: Dict[str, Price]
    price_history: List[Dict[str, Price]]
    image_url: Optional[str]
    description: Optional[str]
    category: Optional[str]
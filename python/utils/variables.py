import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('GEONAMES_API_KEY')
GEONAMES_URL = os.getenv('GEONAMES_API_URL')

import os
from dotenv import load_dotenv

load_dotenv()

USER_AGENT = os.getenv('USER_AGENT')
DEEPL_API_KEY = os.getenv('DEEPL_API_KEY')

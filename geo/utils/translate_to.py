from translate import Translator
from utils.variables import DEEPL_API_KEY

translator = Translator(
  to_lang='en',
  provider='mymemory',
  secret_access_key=DEEPL_API_KEY
)

def translate_address(input_str: str) -> str:
  splitted_input_str = input_str.split(', ')
  city = f'{splitted_input_str[2]}, {splitted_input_str[-1]}'

  return translator.translate(city)

from fastapi import FastAPI, HTTPException
from geopy.geocoders import Nominatim

from utils.variables import USER_AGENT
from utils.translate_to import translate_address

app = FastAPI()
geocoder = Nominatim(user_agent=USER_AGENT)

@app.get('/reverse/')
def get_reverse_geolocation(longitude: float, latitude: float):
  geo = geocoder.reverse(str(latitude) + ',' + str(longitude))
  translated_geo = translate_address(geo.address)

  if geo.address:
    return {
      "address": translated_geo
    }
  else:
    raise HTTPException(422, "invalid data (longitude or latitude)")

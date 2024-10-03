from fastapi import FastAPI, HTTPException
import requests
from utils.variables import GEONAMES_URL, API_KEY
from requests.exceptions import HTTPError

app = FastAPI()

@app.get('/reverse')
def get_reverse_geolocation(longitude: float, latitude: float):
  try:
    response = requests.get(
      f'{GEONAMES_URL}/findNearbyPlaceNameJSON',
      params={
        'lat': latitude,
        'lng': longitude,
        'username': API_KEY,
        'lang': 'en'
      }
    ).json()

    print(response)

    if len(response['geonames']) == 0:
      raise HTTPException(404, 'no data')

    return {
      'placeName': response['geonames'][0]['name'],
      'countryName': response['geonames'][0]['countryName']
    }
  except HTTPError as http_err:
    raise HTTPException(http_err.status_code, http_err.reason)
  

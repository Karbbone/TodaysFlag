import requests
import json

def fetch_and_save_country_codes():
    url = "https://restcountries.com/v3.1/all?fields=cca2"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        country_codes = [country['cca2'] for country in data]

        # Écriture des données dans un fichier JSON
        with open('country_codes.json', 'w') as file:
            json.dump(country_codes, file)
        print("Les codes de pays ont été enregistrés dans country_codes.json.")
    else:
        print(f"Failed to fetch country codes: {response.status_code}")

fetch_and_save_country_codes()

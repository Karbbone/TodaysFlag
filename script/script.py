import json

def escape_apostrophes(value):
    return value.replace("'", "''") if isinstance(value, str) else value

with open('countries.json', 'r', encoding='utf-8') as file:
    countries = json.load(file)

sql_queries = []
for country in countries:
    country_name_english = escape_apostrophes(country['name']['common'])
    country_name_french = escape_apostrophes(country['translations']['fra']['common'])
    country_code = country['cca3']
    google_maps = escape_apostrophes(country['maps']['googleMaps'])
    open_street_maps = escape_apostrophes(country['maps']['openStreetMaps'])
    population = country.get('population', 'NULL')  # Utiliser NULL si la population est manquante
    flag_url = escape_apostrophes(country['flags'][1] if len(country['flags']) > 1 else country['flags'][0])

    sql_query = f"""
    INSERT INTO Country (country_name_english, country_name_french, country_code, google_maps, open_street_maps, population, flag_url, is_used)
    VALUES ('{country_name_english}', '{country_name_french}', '{country_code}', '{google_maps}', '{open_street_maps}', {population}, '{flag_url}', 0);
    """
    
    sql_queries.append(sql_query)

with open('insert_countries.sql', 'w', encoding='utf-8') as file:
    for query in sql_queries:
        file.write(query)

print("Les requêtes SQL ont été générées avec succès !")

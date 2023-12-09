import requests
import time
import os
import redis
from pymongo import MongoClient

import webapp.src.main.java.projetoIES.webapp.services.AuthenticationService as auth


def connect_to_redis():
    return redis.StrictRedis(host='redis', port=6379, decode_responses=True)

def get_email(token):
    user_email = auth.validateToken(token)
    return user_email


def get_flight_info(iata):
    base_url = os.getenv("http://localhost:8083")  # Replace with the base URL of your API
    api_url = f"{base_url}/api/flight/{iata}"
    
    try:
        response = requests.get(api_url)
        if response.status_code == 200:
            return response.json()  # Assuming the API returns JSON data for the flight
        elif response.status_code == 404:
            print(f"Flight with IATA code {iata} not found")
            return None
        else:
            print(f"Failed to fetch data for flight {iata}. Status code: {response.status_code}")
            return None
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        return None
    
def get_user_info(token):


def check(dictionary):
    while True:
        for key in dictionary:
            if key == flight:
                for value in dictionary[key]:
                    if value == key:
                        notifications(user, flight)

def notifications(user, flight):
    # while True:
        try:
            flight_info = get_flight_info(flight["iata"])
            # Check if the flight info was found
            if flight_info is not None:
                # Check if the flight is delayed
                if flight_info["status"] == "DELAYED":
                    # Send a notification to the user
                    print(f"Flight {flight_info['iata']} is delayed!")
                else:
                    print(f"Flight {flight_info['iata']} is on time")
            else:
                print(f"Flight {flight['iata']} not found")
            # Wait for 5 seconds
            time.sleep(5)
        except requests.RequestException as e:
            print(f"Request failed: {e}")
            # Wait for 5 seconds
            time.sleep(5)


if __name__ == "__main__":
    mongo_client = MongoClientmongo_client = MongoClient(f"mongodb://mongodb:27017/")
    db = mongo_client["my_mongodb_database"]
    if "flights_subscribed" not in db.list_collection_names():
        db.create_collection("flights_subscribed")
    collection = db["flights_subscribed"]
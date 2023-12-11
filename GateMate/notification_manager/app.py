import socket
import logging
import threading

import time
import os
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

""" import webapp.src.main.java.projetoIES.webapp.services.AuthenticationService as auth


# def connect_to_redis():
#     return redis.StrictRedis(host='redis', port=6379, decode_responses=True)

def get_email(token):
    user = auth.validateToken(token)
    return user.email


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
            time.sleep(5) """


def start_server():
    PORT = 1234
    ADDRESS = "0.0.0.0"
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((ADDRESS, PORT))
    s.listen(5)

    logging.info(f"Server listening on {ADDRESS}:{PORT}")

    while True:
        conn, addr = s.accept()
        logging.info(f"Connection from {addr} accepted!")
        data = conn.recv(1024)
        logging.info(f"Received {data} from {addr}")
        conn.close()


if __name__ == "__main__":
    mongo_client = MongoClientmongo_client = MongoClient(f"mongodb://mongodb:27017/")
    db = mongo_client["my_mongodb_database"]
    if "subscribed_flights" not in db.list_collection_names():
        db.create_collection("subscribed_flights")
    collection = db["subscribed_flights"]

    threading.Thread(target=start_server).start()

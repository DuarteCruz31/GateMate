import socket
import logging
import threading

import time
import os
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def sent_email(data, collection):
    data = data.decode()
    print(data)
    print("Email sent")


def start_server(collection):
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
        sent_email(data, collection)
        conn.close()


if __name__ == "__main__":
    mongo_client = MongoClientmongo_client = MongoClient(f"mongodb://mongodb:27017/")
    db = mongo_client["my_mongodb_database"]
    if "subscribed_flights" not in db.list_collection_names():
        db.create_collection("subscribed_flights")
    collection = db["subscribed_flights"]

    threading.Thread(target=start_server(collection)).start()

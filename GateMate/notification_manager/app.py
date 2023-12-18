"""
@file
@brief Description of the script/module.

@brief Description of the module.

This module contains a script that listens for incoming socket connections, receives flight update data, and sends email notifications to subscribed users.

@details
The script starts a server that listens for incoming socket connections on a specified port. When a connection is established, it receives flight update data, extracts relevant information, and sends email notifications to subscribed users. The email notifications include details about the flight updates. The script uses a MongoDB collection to store information about subscribed flights and their associated users.

@note
Make sure to set the required environment variables:
- EMAIL: Sender's email address.
- EMAIL_PASSWORD: Sender's email password.

@pre
- MongoDB instance is running and accessible at mongodb:27017.
- SMTP server is configured and accessible at smtp-relay.brevo.com:587.
- Required Python packages are installed (pymongo).

@warning
Ensure the MongoDB instance and SMTP server are correctly configured and running before executing this script.

@author André Oliveira <andreaoliveira@ua.pt>
@author Bruno Páscoa <brunopascoa03@ua.pt>
@author Duarte Cruz <duarteccruz@ua.pt>
@author Sara Almeida <sarafalmeida@ua.pt>
@date December 18, 2023
"""

import socket
import logging
import threading
import json

import time
import os
from pymongo import MongoClient
import smtplib

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def send_email(data, collection, email_server, sender_email):
    """
    @brief Function to send email notifications based on received flight update data.

    @param data: Received flight update data.
    @param collection: MongoDB collection for subscribed flights.
    @param email_server: SMTP server for sending emails.
    @param sender_email: Sender's email address.

    @details
    The function decodes the received data, extracts relevant information, and sends email notifications to subscribed users based on the flight update data.
    """
    data = data.decode()
    json_data = json.loads(data)

    # Retrieving information from MongoDB about the subscribed flight
    doc = collection.find_one({"flightIata": json_data["flightIata"]})
    if doc is None:
        return

    # Constructing email message
    message = """From: %s\r\nTo: %s\r\nSubject: %s\r\n\
    \r\n\n
    %s
    """ % (
        sender_email,
        ", ".join(doc["users"]),
        "Flight Updates",
        json.dumps(json_data),
    )

    logger.info(f"Sending email to {doc['users']}")

    # Sending email
    email_server.sendmail(sender_email, doc["users"], message)


def start_server(collection):
    """
    @brief Function to start the socket server for receiving flight update data.

    @param collection: MongoDB collection for subscribed flights.

    @details
    The function binds a socket to a specified address and port, listens for incoming connections, and processes received flight update data by calling the send_email function.
    """
    PORT = 1234
    ADDRESS = "0.0.0.0"
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((ADDRESS, PORT))
    s.listen(5)

    logging.info(f"Server listening on {ADDRESS}:{PORT}")

    while True:
        conn, addr = s.accept()
        data = conn.recv(1024)
        send_email(data, collection, email_server, sender_email)
        conn.close()


if __name__ == "__main__":
    # Connecting to MongoDB
    mongo_client = MongoClient(f"mongodb://mongodb:27017/")
    db = mongo_client["my_mongodb_database"]
    if "subscribed_flights" not in db.list_collection_names():
        db.create_collection("subscribed_flights")
    collection = db["subscribed_flights"]

    sender_email = os.environ["EMAIL"]

    # Connecting to SMTP server
    try:
        email_server = smtplib.SMTP("smtp-relay.brevo.com", 587)
        email_server.starttls()
        email_server.login(sender_email, os.environ["EMAIL_PASSWORD"])
    except Exception as e:
        logger.error(f"Error connecting to SMTP server: {e}")

    # Starting the socket server in a separate thread
    threading.Thread(target=start_server, args=(collection,)).start()

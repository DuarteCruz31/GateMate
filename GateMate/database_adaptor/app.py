"""
@file
@brief Description of the script/module.

@brief Description of the module.

This module contains a script that retrieves live flight data from a RabbitMQ queue, processes the data, and updates a MongoDB collection.

@details
The script subscribes to a RabbitMQ queue named "flights," receives JSON-formatted messages, and updates a MongoDB collection named "flights" with the live flight data. The script also performs cleanup tasks by deleting old documents and unsubscribing from outdated flights.

@note
Make sure to set the required environment variables:
- RABBITMQ_USER: RabbitMQ username.
- RABBITMQ_PASSWORD: RabbitMQ password.

@pre
- MongoDB instance is running and accessible at mongodb:27017.
- RabbitMQ instance is running and accessible at rabbitmq.
- Required Python packages are installed (pika, pymongo).

@warning
Ensure the MongoDB and RabbitMQ instances are correctly configured and running before executing this script.

@author André Oliveira <andreaoliveira@ua.pt>
@author Bruno Páscoa <brunopascoa03@ua.pt>
@author Duarte Cruz <duarteccruz@ua.pt>
@author Sara Almeida <sarafalmeida@ua.pt>
@date December 18, 2023
"""

import logging
import asyncio
import json
import pika
from pika.exceptions import ChannelWrongStateError
import os
from pymongo import MongoClient
import time
import socket

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def db_adaptor_live_data(channel, collection):
    """
    @brief Asynchronous function to adapt live flight data from RabbitMQ and update MongoDB.

    @param channel: RabbitMQ channel object.
    @param collection: MongoDB collection object.

    @details
    The function subscribes to the "flights" queue, processes incoming messages, updates the MongoDB collection with live flight data, and sends notifications for changes in flight details.
    """

    def callback(ch, method, properties, body):
        """
        @brief Callback function for processing RabbitMQ messages.

        @param ch: RabbitMQ channel.
        @param method: RabbitMQ method.
        @param properties: RabbitMQ properties.
        @param body: Message body (JSON-formatted live flight data).

        @details
        The callback function processes the incoming message, updates the MongoDB collection, and sends notifications for changes in flight details.
        """
        current_time = time.time() * 1000
        update_threshold = current_time - 30 * 60 * 1000

        collection.delete_many({"updated": {"$lt": update_threshold}})
        logger.info("Deleted old documents")

        if "subscribed_flights" in db.list_collection_names():
            subscribed_flights = db["subscribed_flights"]
            all_subscrbed_flights = subscribed_flights.find()
            for subscribed_flight in all_subscrbed_flights:
                existing_flight = collection.find_one(
                    {"flightIata": subscribed_flight["flightIata"]}
                )
                if existing_flight is None:
                    subscribed_flights.delete_one(
                        {"flightIata": subscribed_flight["flightIata"]}
                    )

            logger.info("Deleted old subscribed flights")

        try:
            data = json.loads(body)

            for flight in data["response"]:
                # Extracting relevant data from the incoming message
                reg_number = flight["reg_number"]
                latitude = float(flight["lat"])
                longitude = float(flight["lng"])
                altitude = float(flight["alt"])
                direction = float(flight["dir"])
                speed = float(flight["speed"])
                vertical_speed = float(flight["v_speed"])
                flight_number = flight["flight_number"]
                flight_iata = flight["flight_iata"]
                departure_icao = flight["dep_icao"]
                departure_iata = flight["dep_iata"]
                arrive_icao = flight["arr_icao"]
                arrive_iata = flight["arr_iata"]
                airline_icao = flight["airline_icao"]
                airline_iata = flight["airline_iata"]

                # Mapping airline ICAO codes to airline names
                airline_name = None
                if airline_icao == "QTR":
                    airline_name = "Qatar Airways"
                elif airline_icao == "BAW":
                    airline_name = "British Airways"
                elif airline_icao == "TAP":
                    airline_name = "TAP Portugal"
                elif airline_icao == "AFR":
                    airline_name = "Air France"
                elif airline_icao == "AAL":
                    airline_name = "American Airlines"
                elif airline_icao == "FPO":
                    airline_name = "ASL Airlines France"

                existing_flight = collection.find_one({"flightIata": flight_iata})

                # Constructing data to be inserted into MongoDB
                data_to_insert = {
                    "flightNumber": flight_number,
                    "airlineIata": airline_iata,
                    "airlineIcao": airline_icao,
                    "airlineName": airline_name,
                    "aircraftRegistration": reg_number,
                    "departure": {
                        "iata": departure_iata,
                        "icao": departure_icao,
                        "terminal": None,
                        "gate": None,
                        "delay": None,
                        "scheduled": None,
                        "estimated": None,
                        "actual": None,
                    },
                    "arrival": {
                        "iata": arrive_iata,
                        "icao": arrive_icao,
                        "terminal": None,
                        "gate": None,
                        "delay": None,
                        "scheduled": None,
                        "estimated": None,
                        "actual": None,
                    },
                    "live_data": {
                        "latitude": latitude,
                        "longitude": longitude,
                        "altitude": altitude,
                        "direction": direction,
                        "speed": speed,
                        "vertical_speed": vertical_speed,
                    },
                    "updated": int(current_time),
                }

                if existing_flight is not None:
                    # Updating existing document
                    existing_flight_departure = existing_flight["departure"]
                    existing_flight_arrival = existing_flight["arrival"]

                    if (
                        existing_flight_departure != data_to_insert["departure"]
                        or existing_flight_arrival != data_to_insert["arrival"]
                    ):
                        try:
                            # Sending notification for changes in flight details
                            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                            s.connect(("notification_manager", 1234))
                            s.sendall(
                                json.dumps(
                                    {
                                        "flightIata": flight_iata,
                                        "departure": data_to_insert["departure"],
                                        "arrival": data_to_insert["arrival"],
                                    }
                                ).encode()
                            )
                            logger.info(
                                "Sent notification for flight iata: %s", flight_iata
                            )
                            s.close()
                        except Exception as e:
                            logger.error(f"Error sending notification: {e}")

                    # Updating MongoDB document
                    collection.update_one(
                        {"flightIata": flight_iata}, {"$set": data_to_insert}
                    )
                    logger.info("Updated document for flight iata: %s", flight_iata)
                else:
                    # Inserting new document into MongoDB
                    data_to_insert["flightIata"] = flight_iata
                    collection.insert_one(data_to_insert)
                    logger.info(
                        "Inserted new document for flight iata: %s", flight_iata
                    )

        except json.JSONDecodeError as e:
            logger.error(f"Error decoding JSON: {e}")
        except Exception as e:
            logger.error(f"Error processing message: {e}")

    # Setting up RabbitMQ consumer
    channel.basic_consume(queue="flights", on_message_callback=callback, auto_ack=True)
    logger.info("Waiting for messages. To exit, press CTRL+C")
    channel.start_consuming()


if __name__ == "__main__":
    # Connecting to MongoDB
    mongo_client = MongoClient(f"mongodb://mongodb:27017/")
    db = mongo_client["my_mongodb_database"]
    if "flights" not in db.list_collection_names():
        db.create_collection("flights")
    collection = db["flights"]

    # Connecting to RabbitMQ
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            "rabbitmq",
            credentials=pika.PlainCredentials(
                os.environ["RABBITMQ_USER"], os.environ["RABBITMQ_PASSWORD"]
            ),
        )
    )

    channel = connection.channel()
    channel.queue_declare(queue="flights")

    # Running the asynchronous function
    asyncio.run(db_adaptor_live_data(channel, collection))

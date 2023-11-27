import logging
import asyncio
import json
import pika
from pika.exceptions import ChannelWrongStateError
import datetime
import os
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def db_adaptor(channel, collection):
    def callback(ch, method, properties, body):
        try:
            data = json.loads(body)

            for flight in data["data"]:
                flight_number = flight["flight"]["number"]
                if flight_number is not None:
                    if flight["aircraft"] is not None:
                        aircraft_registration = flight["aircraft"]["registration"]
                    else:
                        aircraft_registration = None

                    live_data = flight["live"]
                    if live_data is not None:
                        live_data["latitude"] = float(live_data["latitude"])
                        live_data["longitude"] = float(live_data["longitude"])
                        live_data["altitude"] = float(live_data["altitude"])
                        live_data["direction"] = float(live_data["speed"])
                        live_data["speed_horizontal"] = float(
                            live_data["speed_horizontal"]
                        )
                        live_data["speed_vertical"] = float(live_data["speed_vertical"])
                        live_data["is_ground"] = bool(live_data["speed"])

                    existing_flight = collection.find_one(
                        {"flight_number": flight_number}
                    )

                    data_to_insert = {
                        "flight_date": flight["flight_date"],
                        "departure": flight["departure"],
                        "arrival": flight["arrival"],
                        "airline_name": flight["airline"]["name"],
                        "aircraft_registration": aircraft_registration,
                        "live_data": flight["live"],
                    }

                    if existing_flight is not None:
                        collection.update_one(
                            {"flight_number": flight_number},
                            {"$set": data_to_insert},
                        )
                        logger.info(
                            "Updated document for flight number: %s", flight_number
                        )
                    else:
                        data_to_insert["flight_number"] = flight_number

                        collection.insert_one(data_to_insert)
                        logger.info(
                            "Inserted new document for flight number: %s", flight_number
                        )

        except json.JSONDecodeError as e:
            logger.error(f"Error decoding JSON: {e}")
        except Exception as e:
            logger.error(f"Error processing message: {e}")

    channel.basic_consume(
        queue="aviation_data", on_message_callback=callback, auto_ack=True
    )

    logger.info("Waiting for messages. To exit, press CTRL+C")
    channel.start_consuming()


if __name__ == "__main__":
    mongo_client = MongoClientmongo_client = MongoClient(f"mongodb://mongodb:27017/")
    db = mongo_client["my_mongodb_database"]
    if "flights" not in db.list_collection_names():
        db.create_collection("flights")
    collection = db["flights"]

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            "rabbitmq",
            credentials=pika.PlainCredentials(
                os.environ["RABBITMQ_USER"], os.environ["RABBITMQ_PASSWORD"]
            ),
        )
    )

    channel = connection.channel()
    channel.queue_declare(queue="aviation_data")

    asyncio.run(db_adaptor(channel, collection))

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


async def db_adaptor_live_data(channel, collection):
    def callback(ch, method, properties, body):
        try:
            data = json.loads(body)

            for flight in data["response"]:
                # logger.info(flight)
                hex = flight["hex"]
                reg_number = flight["reg_number"]
                flag = flight["flag"]
                latitude = float(flight["lat"])
                longitude = float(flight["lng"])
                altitude = float(flight["alt"])
                direction = float(flight["dir"])
                speed = float(flight["speed"])
                vertical_speed = float(flight["v_speed"])
                squawk = flight["squawk"]
                flight_number = flight["flight_number"]
                flight_icao = flight["flight_icao"]
                flight_iata = flight["flight_iata"]
                departure_icao = flight["dep_icao"]
                departure_iata = flight["dep_iata"]
                arrive_icao = flight["arr_icao"]
                arrive_iata = flight["arr_iata"]
                airline_icao = flight["airline_icao"]
                airline_iata = flight["airline_iata"]
                aircraft_icao = flight["aircraft_icao"]

                existing_flight = collection.find_one({"flight_number": flight_number})

                data_to_insert = {
                    "hex": hex,
                    "reg_number": reg_number,
                    "flag": flag,
                    "latitude": latitude,
                    "longitude": longitude,
                    "altitude": altitude,
                    "direction": direction,
                    "speed": speed,
                    "vertical_speed": vertical_speed,
                    "squawk": squawk,
                    "flight_icao": flight_icao,
                    "flight_iata": flight_iata,
                    "departure_icao": departure_icao,
                    "departure_iata": departure_iata,
                    "arrive_icao": arrive_icao,
                    "arrive_iata": arrive_iata,
                    "airline_icao": airline_icao,
                    "airline_iata": airline_iata,
                    "aircraft_icao": aircraft_icao,
                }

                if existing_flight is not None:
                    collection.update_one(
                        {"flight_number": flight_number}, {"$set": data_to_insert}
                    )
                    logger.info("Updated document for flight number: %s", flight_number)
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
        queue="live_data", on_message_callback=callback, auto_ack=True
    )

    logger.info("Waiting for messages. To exit, press CTRL+C")
    channel.start_consuming()


if __name__ == "__main__":
    mongo_client = MongoClientmongo_client = MongoClient(f"mongodb://mongodb:27017/")
    db = mongo_client["my_mongodb_database"]
    if "live_data" not in db.list_collection_names():
        db.create_collection("live_data")
    collection = db["live_data"]

    connection = pika.BlockingConnection(
        pika.ConnectionParameters(
            "rabbitmq",
            credentials=pika.PlainCredentials(
                os.environ["RABBITMQ_USER"], os.environ["RABBITMQ_PASSWORD"]
            ),
        )
    )

    channel = connection.channel()
    channel.queue_declare(queue="live_data")

    asyncio.run(db_adaptor_live_data(channel, collection))

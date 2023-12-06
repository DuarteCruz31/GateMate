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
                reg_number = flight["reg_number"]
                latitude = float(flight["lat"])
                longitude = float(flight["lng"])
                altitude = float(flight["alt"])
                direction = float(flight["dir"])
                speed = float(flight["speed"])
                vertical_speed = float(flight["v_speed"])
                flight_number = int(flight["flight_number"])
                flight_iata = flight["flight_iata"]
                departure_icao = flight["dep_icao"]
                departure_iata = flight["dep_iata"]
                arrive_icao = flight["arr_icao"]
                arrive_iata = flight["arr_iata"]
                airline_iata = flight["airline_iata"]

                if airline_iata == "QR":
                    airline_name = "Qatar Airways"
                elif airline_iata == "BA":
                    airline_name = "British Airways"
                elif airline_iata == "TP":
                    airline_name = "TAP Air Portugal"
                elif airline_iata == "AF":
                    airline_name = "Air France"
                elif airline_iata == "AA":
                    airline_name = "American Airlines"

                existing_flight = collection.find_one({"flighNumber": flight_number})

                data_to_insert = {
                    "flightIata": flight_iata,
                    "airlineIata": airline_iata,
                    "airlineName": airline_name,
                    "aircraftRegistration": reg_number,
                    "departure": {
                        "iata": departure_iata,
                        "icao": departure_icao,
                    },
                    "arrival": {
                        "iata": arrive_iata,
                        "icao": arrive_icao,
                    },
                    "live_data": {
                        "latitude": latitude,
                        "longitude": longitude,
                        "altitude": altitude,
                        "direction": direction,
                        "speed": speed,
                        "vertical_speed": vertical_speed,
                    },
                }

                if existing_flight is not None:
                    collection.update_one(
                        {"flighNumber": flight_number}, {"$set": data_to_insert}
                    )
                    logger.info("Updated document for flight number: %s", flight_number)
                else:
                    data_to_insert["flightNumber"] = flight_number

                    collection.insert_one(data_to_insert)
                    logger.info(
                        "Inserted new document for flight number: %s", flight_number
                    )

        except json.JSONDecodeError as e:
            logger.error(f"Error decoding JSON: {e}")
        except Exception as e:
            logger.error(f"Error processing message: {e}")

    channel.basic_consume(queue="flights", on_message_callback=callback, auto_ack=True)

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
    channel.queue_declare(queue="flights")

    asyncio.run(db_adaptor_live_data(channel, collection))

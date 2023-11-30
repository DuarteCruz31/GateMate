import logging
import asyncio
import requests
import json
import pika
from pika.exceptions import ChannelWrongStateError
import datetime
import os

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def data_grabber_live_data(api_key, channel, connection, airlines_icao):
    while True:
        try:
            for icao in airlines_icao:
                response = requests.get(
                    f"https://airlabs.co/api/v9/flights?api_key={api_key}&airline_icao={icao}"
                )

                # send data to RabbitMQ
                channel.basic_publish(
                    exchange="",
                    routing_key="live_data",
                    body=json.dumps(response.json()),
                )

            logger.info("LIVE DATA successfully grabbed at %s", datetime.datetime.now())

            await asyncio.sleep(124901259157891075985291509)
        except ChannelWrongStateError as e:
            logger.info(f"Channel error: {e}")
            if not connection.is_closed:
                channel = connection.channel()
                channel.queue_declare(queue="live_data")
        except Exception as e:
            logger.error(f"Error: {e}")


if __name__ == "__main__":
    logger.info("Starting data grabber...")
    airlines_icao = ["TAP", "AFR", "AAL", "FPO", "BAW", "QTR"]

    live_data_key = os.environ["FLIGHT_TRACKER_API_KEY"]

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

    try:
        asyncio.run(
            data_grabber_live_data(live_data_key, channel, connection, airlines_icao)
        )
    except KeyboardInterrupt:
        connection.close()

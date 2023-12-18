"""
@file
@brief Description of the script/module.

@brief Description of the module.

This module contains a script that continuously grabs live flight data from the AirLabs API, sends the data to a RabbitMQ queue, and handles potential errors.

@details
The script retrieves live flight data for specified airlines from the AirLabs API using the provided API key. The data is then sent to the "flights" RabbitMQ queue for further processing. The script includes error handling for channel state errors and other exceptions. It runs indefinitely with a specified fetch interval.

@note
Make sure to set the required environment variables:
- RABBITMQ_USER: RabbitMQ username.
- RABBITMQ_PASSWORD: RabbitMQ password.
- API_KEY: AirLabs API key.
- FETCH_INTERVAL: Interval (in minutes) for fetching live data.

@pre
- RabbitMQ instance is running and accessible at rabbitmq.
- Required Python packages are installed (requests, pika).

@warning
Ensure the RabbitMQ instance is correctly configured and running before executing this script.

@author André Oliveira <andreaoliveira@ua.pt>
         Bruno Páscoa <brunopascoa03@ua.pt>
         Duarte Cruz <duarteccruz@ua.pt>
         Sara Almeida <sarafalmeida@ua.pt>
@date December 18, 2023
"""

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
    """
    @brief Asynchronous function to continuously grab live flight data and send it to RabbitMQ.

    @param api_key: AirLabs API key.
    @param channel: RabbitMQ channel object.
    @param connection: RabbitMQ connection object.
    @param airlines_icao: List of airline ICAO codes to fetch live data for.

    @details
    The function continuously retrieves live flight data for specified airlines from the AirLabs API and sends the data to the "flights" RabbitMQ queue. It handles errors, including channel state errors, and runs with a specified fetch interval.
    """
    while True:
        try:
            for icao in airlines_icao:
                # Fetching live flight data from AirLabs API
                response = requests.get(
                    f"https://airlabs.co/api/v9/flights?api_key={api_key}&airline_icao={icao}"
                )

                # Sending data to RabbitMQ
                channel.basic_publish(
                    exchange="",
                    routing_key="flights",
                    body=json.dumps(response.json()),
                )

            logger.info("LIVE DATA successfully grabbed at %s", datetime.datetime.now())

            # Waiting for the next fetch interval
            await asyncio.sleep(int(os.environ["FETCH_INTERVAL"]) * 60)
        except ChannelWrongStateError as e:
            logger.info(f"Channel error: {e}")
            if not connection.is_closed:
                # Re-establishing RabbitMQ channel in case of an error
                channel = connection.channel()
                channel.queue_declare(queue="flights")
        except Exception as e:
            logger.error(f"Error: {e}")


if __name__ == "__main__":
    logger.info("Starting data grabber...")
    airlines_icao = ["TAP", "AFR", "AAL", "FPO", "BAW", "QTR"]

    live_data_key = os.environ["API_KEY"]

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

    try:
        # Running the asynchronous function
        asyncio.run(
            data_grabber_live_data(live_data_key, channel, connection, airlines_icao)
        )
    except KeyboardInterrupt:
        connection.close()

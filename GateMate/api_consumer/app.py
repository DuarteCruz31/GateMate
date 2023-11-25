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


async def data_grabber(api_key, channel, connection):
    while True:
        try:
            response = requests.get(
                f"http://api.aviationstack.com/v1/flights?access_key={api_key}"
            )

            data = json.loads(response.text)
            total = data["pagination"]["total"]
            num_pages = total // 100 + 1

            for i in range(num_pages):
                response = requests.get(
                    f"http://api.aviationstack.com/v1/flights?access_key={api_key}&offset={i*100}"
                )

                # send data to RabbitMQ
                channel.basic_publish(
                    exchange="",
                    routing_key="aviation_data",
                    body=json.dumps(response.json()),
                )

                logger.info("Data successfully grabbed at %s", datetime.datetime.now())

            await asyncio.sleep(300)
        except ChannelWrongStateError as e:
            logger.info(f"Channel error: {e}")
            if not connection.is_closed:
                channel = connection.channel()
                channel.queue_declare(queue="aviation_data")
        except Exception as e:
            logger.error(f"Error: {e}")


if __name__ == "__main__":
    api_key = os.environ["API_KEY"]

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

    try:
        asyncio.run(data_grabber(api_key, channel, connection))
    except KeyboardInterrupt:
        connection.close()

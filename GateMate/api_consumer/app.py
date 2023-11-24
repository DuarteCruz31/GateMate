from asyncio import sleep
import requests
import json
import pika
from pika.exceptions import ChannelWrongStateError
import datetime
import os


async def data_grabber(api_key, channel, connection):
    while True:
        try:
            response = requests.get(
                f"http://api.aviationstack.com/v1/flights?access_key={api_key}"
            )

            # send data to RabbitMQ
            channel.basic_publish(
                exchange="",
                routing_key="aviation_data",
                body=json.dumps(response.json()),
            )

            print("Data successfully grabbed at {}".format(datetime.datetime.now()))

            await sleep(60)
        except ChannelWrongStateError as e:
            print(f"Channel error: {e}")
            if not connection.is_closed:
                channel = connection.channel()
                channel.queue_declare(queue="aviation_data")
        except Exception as e:
            print(f"Error: {e}")

        finally:
            # Close the connection only when needed
            if not connection.is_closed:
                connection.close()

            await sleep(60)


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
        import asyncio

        asyncio.run(data_grabber(api_key, channel, connection))
    except KeyboardInterrupt:
        connection.close()

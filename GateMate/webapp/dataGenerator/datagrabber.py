from asyncio import sleep
import requests
import json
import pika
import datetime
import os


def data_grabber(api_key, channel, connection):
    while True:
        # make API request
        response = requests.get(
            f"http://api.aviationstack.com/v1/flights?access_key={api_key}"
        )

        # send data to RabbitMQ
        channel.basic_publish(
            exchange="", routing_key="aviation_data", body=json.dumps(response.json())
        )

        # close connection
        connection.close()

        # print success message
        print("Data successfully grabbed at {}".format(datetime.datetime.now()))

        sleep(60)


if __name__ == "__main__":
    # get api key from environment variable
    api_key = "a409cd26624360647095faf420068251"

    # set up RabbitMQ connection
    connection = pika.BlockingConnection(pika.ConnectionParameters("localhost"))
    channel = connection.channel()

    # declare queue
    channel.queue_declare(queue="aviation_data")

    data_grabber(api_key, channel, connection)

    # close connection
    connection.close()

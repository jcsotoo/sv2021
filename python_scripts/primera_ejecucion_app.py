# -*- coding: utf-8 -*-
"""
Se deben instalar las siguientes librerías
@author: franz
"""

import os

from flask import Flask, request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from twilio.rest import Client

app = Flask(__name__)


@app.route("/")
def incio():
    test = os.environ.get("Test")
    return test

@app.route("/sms")
def sms():
    account_sid = os.environ['TWILIO_ACCOUNT_SID']
    auth_token = os.environ['TWILIO_AUTH_TOKEN']
    client = Client(account_sid, auth_token)

    contenido = request.args.get("mensaje")
    destino = request.args.get("telefono")

    try:

        message = client.messages \
                        .create(
                             body=contenido,
                             from_='+18023929343',
                             to='+57'+destino
                         )

        print(message.sid)


        return "SMS enviado correctamente"

    except Exception as e:
        return "error enviando el mensaje"

@app.route("/envio-email")
def email():
    destino = request.args.get("correo_destino")
    asunto = request.args.get("asunto")
    mensaje = request.args.get("contenido")

    message = Mail(
    from_email='franzfernandez97@gmail.com',
    to_emails=destino,
    subject=asunto,
    html_content=mensaje)

    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return ("correo electronico enviado")
    except Exception as e:
        print(e.message)
        return ("error enviando correo")

if __name__ == '__main__':
    app.run()

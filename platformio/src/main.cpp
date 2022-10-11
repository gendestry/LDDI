#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "LEDHandler.h"


const char* ssid = "nLa";
const char* password = "tugicamalo";

LEDHandler led;
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

void initWifi();
void onWsEvent(AsyncWebSocket * server, AsyncWebSocketClient * client, AwsEventType type, void * arg, uint8_t *data, size_t len);
void helper(int index, u_int8_t r, u_int8_t g, u_int8_t b);

void setup() {
	led.reset();

	Serial.begin(9600);

	initWifi();

	ws.onEvent(onWsEvent);
	server.addHandler(&ws);

	server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
		request->send(200, "text/html", "<h1>Lan je debu</h1>Welcome to LED driver driver interface master! (JS je ful ez)");
	});

	server.begin();
}

void loop() {
	MDNS.update();
	ws.cleanupClients();

	// static bool doTehColor = false;

	// if(doTehColor) {
	//   static int count = 0;
	//   static CRGB colors[] = {CRGB::Red, CRGB::OrangeRed, CRGB::Orange, CRGB::Yellow, CRGB::YellowGreen, CRGB::Green, CRGB::Blue, CRGB::BlueViolet,  CRGB::Purple};

	//   for(int i = 0; i < NUM_LEDS - count; i++) {
	//     led.set(i, colors[i % 9]);
	//     led.show();
	//     delay(40);
	//     if(i < NUM_LEDS - count - 1)
	//       led.set(i, CRGB::Black);
	//   }

	//   count++;
	//   if(count == NUM_LEDS) {
	//     count = 0;
	//     led.reset();
	//   }
	//   delay(250);
	// }
}

void initWifi() {
	WiFi.begin(ssid, password);

	Serial.print("\nConnecting");
	while(WiFi.status() != WL_CONNECTED) {
		for(int i = 0; i < 30; i++) {
			led.animateWifi();
			delay(15);
		}

		Serial.print(".");
	}

	led.wifiConnected();

	Serial.printf("\nConnected to %s [%s]\n", WiFi.SSID().c_str(), WiFi.localIP().toString().c_str());

	if(MDNS.begin("LedDriverDriverInterface")) {
		Serial.println("MDNS responder started");
	}
	else {
		Serial.println("Error setting up MDNS responder!");
	}
}

void onWsEvent(AsyncWebSocket * server, AsyncWebSocketClient * client, AwsEventType type, void * arg, uint8_t *data, size_t len){
	switch(type) {
		case WS_EVT_CONNECT:
			Serial.printf("Client %u connected\n", client->id());
			break;
		case WS_EVT_DISCONNECT:
			Serial.printf("Client %u disconnected\n", client->id());
			break;
		case WS_EVT_DATA:
			//Serial.printf("Client %u sent %d bytes\n", client->id(), len);// : %s\n", client->id(), data);

			if(len % 4 != 0) {
				Serial.printf("Invalid data length\n");
				
				for(int i = 0; i < len; i++) {
					Serial.printf("%d", data[i]);
					if(i > 100) 
						break;
					if(i != len - 1)
						Serial.printf(", ");
				}
				Serial.printf("\n");
				return;
			}

			for(int i = 0; i < len; i += 4) {
				helper(data[i], data[i+1], data[i+2], data[i+3]);
				// Serial.printf("[%3d]  %3d, %3d, %3d\n", data[i], data[i+1], data[i+2], data[i+3]);
			}

			led.show();

			break;
		case WS_EVT_PONG:
			break;
		case WS_EVT_ERROR:
			Serial.printf("Client %u error\n", client->id());
			break;
	};
}

void helper(int index, u_int8_t r, u_int8_t g, u_int8_t b) {
	led.set(index,CRGB(r,g,b));
}

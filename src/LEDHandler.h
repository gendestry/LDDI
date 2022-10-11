#pragma once
#include <FastLED.h>

#define NUM_LEDS 144
#define DATA_PIN 2

class LEDHandler {
public:
	static int id;

	LEDHandler();
	~LEDHandler();

	CRGB& get(unsigned int index);
	void set(unsigned int index, CRGB c);
	void setAll(CRGB c);

	void brightness(uint8_t value);
	void reset();
	void show();

	void animateWifi(bool reset = false);
	void wifiConnected();
private:
	CRGB* leds;
};
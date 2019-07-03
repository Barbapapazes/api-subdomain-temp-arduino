// Temperature Sensor configuration
#define pinDHT11 2
SimpleDHT11 dht11;

// ESP AP Mode configuration
#define SSID_MODULE "Temp_Module"
#define PASSWORD "password"

// LEDs configuration
#define redLed 15
#define yellowLed 13
#define greenLed 12
#define blueLed 14

// button configuration
#define pinButton 0

// Time configuration
unsigned long previousMillis = 0;
unsigned long currentMillis;
long interval = 0;

// Store Location / SSID / Password
char value[3][40];

// Link between the setup and loop function
bool startServer = false;

// Start the Web Serveur
ESP8266WebServer server(80);

/*
   ESP8266 SPIFFS HTML Web Page with JPEG, PNG Image

*/

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>
#include <FS.h>   //Include File System Headers
#include <string.h>

#include <SimpleDHT.h>

int pinDHT11 = 2;
SimpleDHT11 dht11;

//ESP AP Mode configuration
const char *ssid = "ESPWebServer";
const char *password = "password";

char value[3][40];

bool startServer = false;

ESP8266WebServer server(80);

String readName() {
  File f = SPIFFS.open("/data.txt", "r");
  String message;
  if (!f) {
    Serial.println("Count file open failed on read.");
  } else {
    while (f.available()) {
      //Lets read line by line from the file
      message = f.readStringUntil('\n');
      break; //if left in, we'll just read the first line then break out of the while.
    }
    f.close();
    char str[120];
    int i = 0;
    message.toCharArray(str, 120);
    char *token = strtok(str, "&");
    while (token) {
      strcpy(value[i], token);
      token = strtok(NULL, "&");
      i++;
    }
    int j = 0;
    for (i = 0; i < 3 ; i++) {
      token = strtok(value[i], "=");
      while (token) {
        if (j == 1)
          strcpy(value[i], token);
        token = strtok(NULL, "=");
        j++;
      }
      j = 0;
    }
    for (i = 0; i < 3 ; i++) {
      puts(value[i]);
    }
  }
  return message;
}

void saveName(String message) {
  File f = SPIFFS.open("/data.txt", "w");

  if (!f) {
    Serial.println("Couldn't open the file");
  } else {
    f.println(message);
    f.close();
  }
}


void handleRoot() {
  server.sendHeader("Location", "/index.html", true);  //Redirect to our html web page
  server.send(302, "text/plane", "");
}

void handleRestart() {
  server.send(200, "text/plane", "restarting");
  ESP.restart();
}

void handleReset() {
  SPIFFS.format();   //Redirect to our html web page
  server.send(200, "text/plane", "ok");
}

void handleFile() {
  String message = readName();
  server.send(200, "text/plane", message);
}

void handleBody() { //Handler for the body path

  if (server.hasArg("plain") == false) { //Check if body received

    server.send(200, "text/plain", "Body not received");
    return;

  }

  String message = server.arg("plain");
  Serial.println(message);
  saveName(message);

  server.sendHeader("Location", "/receive.html", true);  //Redirect to our html web page
  server.send(302, "text/plane", "");
}

void handleWebRequests() {
  if (loadFromSpiffs(server.uri())) return;
  String message = "File Not Detected\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " NAME:" + server.argName(i) + "\n VALUE:" + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
  Serial.println(message);
}

void setup() {
  delay(1000);
  Serial.begin(115200);
  Serial.println();

  //Initialize File System
  SPIFFS.begin();
  Serial.println("File System Initialized");

  File f = SPIFFS.open("/data.txt", "r");

  if (!f) {
    startServer = true;
    //Initialize AP Mode
    WiFi.softAP(ssid);  //Password not used
    IPAddress myIP = WiFi.softAPIP();
    Serial.print("Web Server IP:");
    Serial.println(myIP);

    //Initialize Webserver
    server.on("/", handleRoot);
    server.on("/body", handleBody); //Associate the handler function to the path
    server.on("/file", handleFile);
    server.on("/restart", handleRestart);
    server.on("/reset", handleReset);
    server.onNotFound(handleWebRequests); //Set setver all paths are not found so we can handle as per URI
    server.begin();
  } else {
    f.close();
    readName();
    WiFi.mode(WIFI_STA);
    char *ssid = value[1];
    char *password = value[2];
    Serial.println(ssid);
    Serial.println(password);
    WiFi.begin("SFR_1680", "jiyd6cex46mqet9hmh62");   //WiFi connection

    while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion

      delay(500);
      Serial.println("Waiting for connection");

    }

    Serial.print("Connected to ");
    Serial.println(ssid);
  }


}

void loop() {
  if (startServer) {
    server.handleClient();
  } else {
    byte temperature = 0;
    byte humidity = 0;
    byte data[40] = {0};
    if (dht11.read(pinDHT11, &temperature, &humidity, data)) {
      Serial.print("Read DHT11 failed");
      return;
    }
    Serial.print("Sample OK: ");
    Serial.print((int)temperature); Serial.print(" *C, ");
    Serial.print((int)humidity); Serial.println(" %");

    if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

      HTTPClient http;    //Declare object of class HTTPClient

      http.begin("http://api.myapp:3000/temp");      //Specify request destination
      http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

      String data = "name=" + String(value[0]) +"&temp=" + String(temperature);
      int httpCode = http.PUT(data);   //Send the request
      String payload = http.getString();                  //Get the response payload

      Serial.println(httpCode);   //Print HTTP return code
      Serial.println(payload);    //Print request response payload

      http.end();  //Close connection

    } else {

      Serial.println("Error in WiFi connection");

    }

    delay(60000 * 30);  //Send a request every 60 seconds * 30 => 30 minutes
  }

}

bool loadFromSpiffs(String path) {
  String dataType = "text/plain";
  if (path.endsWith("/")) path += "index.htm";

  if (path.endsWith(".src")) path = path.substring(0, path.lastIndexOf("."));
  else if (path.endsWith(".html")) dataType = "text/html";
  else if (path.endsWith(".htm")) dataType = "text/html";
  else if (path.endsWith(".css")) dataType = "text/css";
  else if (path.endsWith(".js")) dataType = "application/javascript";
  else if (path.endsWith(".png")) dataType = "image/png";
  else if (path.endsWith(".gif")) dataType = "image/gif";
  else if (path.endsWith(".jpg")) dataType = "image/jpeg";
  else if (path.endsWith(".ico")) dataType = "image/x-icon";
  else if (path.endsWith(".xml")) dataType = "text/xml";
  else if (path.endsWith(".pdf")) dataType = "application/pdf";
  else if (path.endsWith(".zip")) dataType = "application/zip";
  File dataFile = SPIFFS.open(path.c_str(), "r");
  if (server.hasArg("download")) dataType = "application/octet-stream";
  if (server.streamFile(dataFile, dataType) != dataFile.size()) {
  }

  dataFile.close();
  return true;
}
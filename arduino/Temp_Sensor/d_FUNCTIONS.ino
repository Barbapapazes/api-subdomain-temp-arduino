void flashLED(int pinled) {
  
  for (int k = 0 ; k < 3 ; k++) {
    digitalWrite(pinled, 1);
    delay(50);
    digitalWrite(pinled,0);
    delay(50);
  }
}

void startSetUp() {
  for (int k = 12 ; k <= 15 ; k++) {
    pinMode(k, OUTPUT);
    digitalWrite(k, 0);
  }
  pinMode(pinButton, OUTPUT);
  
  delay(1000);
  Serial.begin(115200);
  Serial.println();

  //Initialize File System
  SPIFFS.begin();
  Serial.println("File System Initialized");

  flashLED(yellowLed);

}

void webServer() {
  startServer = true;

  //Initialize AP Mode
  WiFi.softAP(SSID_MODULE);  //Password not used
  IPAddress myIP = WiFi.softAPIP();
  Serial.print("Web Server IP:");
  Serial.println(myIP);

  // Routes for Web Server
  server.on("/", handleRoot);
  server.on("/body", handleBody);
  server.on("/file", handleFile);
  server.on("/restart", handleRestart);
  server.on("/reset", handleReset);

  server.onNotFound(handleWebRequests); //Set setver all paths are not found so we can handle as per URI

  //Initialize Webserver
  server.begin();
}

void connectToWifi() {
  WiFi.mode(WIFI_STA);

  // Load File and set value[] with the location ,the ssid and the password
  readName();
  char ssid[9];
  strcpy(ssid, value[1]);
  char password[21];
  strcpy(password, value[2]);
  
  WiFi.begin(ssid, password);   //WiFi connection

  while (WiFi.status() != WL_CONNECTED) {  //Wait for the WiFI connection completion
    delay(750);
    Serial.println("Waiting for connection");
  }

  flashLED(greenLed);

  Serial.print("Connected to ");
  Serial.println(value[1]);
}

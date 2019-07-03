void loop() {
  unsigned long currentMillis = millis();
  if (startServer) {
    server.handleClient();
  } else if (digitalRead(pinButton)) { // Access to set up mode => restart to start the server
    SPIFFS.remove("/set.txt");
    ESP.restart();
  } else if (currentMillis - previousMillis > interval){
    previousMillis = currentMillis;
    sendTemp(readTemp());
    interval = 60000 * 30;
  }
}

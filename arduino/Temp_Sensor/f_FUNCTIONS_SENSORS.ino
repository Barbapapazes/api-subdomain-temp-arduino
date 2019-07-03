byte readTemp() {
  byte temperature = 0;
  byte humidity = 0;
  byte data[40] = {0};
  if (dht11.read(pinDHT11, &temperature, &humidity, data)) {
    Serial.print("Read DHT11 failed");
    flashLED(redLed);
    return 101;
  }
  Serial.print("Sample OK: ");
  Serial.print((int)temperature); Serial.print(" *C, ");
  Serial.print((int)humidity); Serial.println(" %");

  return temperature;
}

int sendTemp(byte temperature) {
  if (temperature == 101) {
    return -1;
  }
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    HTTPClient http;    //Declare object of class HTTPClient

    http.begin("http://api.myapp:3000/temp");      //Specify request destination
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");  //Specify content-type header

    String data = "name=" + String(value[0]) + "&temp=" + String(temperature);
    int httpCode = http.PUT(data);   //Send the request
    flashLED(blueLed);
    String payload = http.getString();                  //Get the response payload


    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload

    if (httpCode != 200) {
      flashLED(redLed);
    } else {
      flashLED(greenLed);
    }

    http.end();  //Close connection
    
  } else {
    Serial.println("Error in WiFi connection");
    flashLED(redLed);
    return -1;
  }
}

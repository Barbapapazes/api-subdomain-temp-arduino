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
  
  flashLED(greenLed);
  File f = SPIFFS.open("/set.txt", "w");
  f.println("set");
  f.close();
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

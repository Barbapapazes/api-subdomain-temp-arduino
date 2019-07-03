void setup() {

  startSetUp();

  File f = SPIFFS.open("/set.txt", "r");

  if (!f) {
    webServer();
  } else {
    f.close();
    connectToWifi();
  }


}

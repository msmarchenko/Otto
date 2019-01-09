#include <EEPROM.h>
#include "Arduino.h"
#define SERIAL_SPEED 115200
#define SERIAL_ADDRESS 0
char chararrSerialRaw[50];
const char SETTING_CHAR[13] = "ROB-O-1-5-121";  // <----------------------------- Присваивать уникальный идентификатор сюда
//ROB-O-1-5-121 то что ставим
//⸮⸮R-1-5-121   было
//ROB-R-1-9-50  робот
//R-1-5-121     остаток
//ROB-L-3-1-4   лаба
void setup() {
  Serial.begin(SERIAL_SPEED);
  //EEPROM.put(SERIAL_ADDRESS, SETTING_CHAR);//   <----------------------------- У EEPROM ограничеено количество циклов записи, сначала думай, потом раскомменчивай!
  Serial.println(SETTING_CHAR);
  EEPROM.get(SERIAL_ADDRESS, chararrSerialRaw);
}

void loop() {
  Serial.println(chararrSerialRaw);
  delay(1000);

}

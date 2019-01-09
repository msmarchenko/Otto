#include <EEPROM.h>
#include "Arduino.h"
#define SERIAL_SPEED 115200
#define BLUE_CHECK 500
char blue_num;
void setup(){

  Serial.begin(SERIAL_SPEED);
  EEPROM.get(BLUE_CHECK, blue_num);
  pinMode(9, OUTPUT); 
  blue_num=0;
  if(!blue_num)
  {
   Serial.write("$$$");
   delay(100);
   char a[3];
       a[0] =Serial.read();
    a[1] =Serial.read();
    a[2] =Serial.read();
    a[2] =Serial.read();
   delay(1000);
   if(a[0]=='C'){
      Serial.println("SQ,16");
      delay(100);
      a[0] =Serial.read();
      a[1] =Serial.read();
      a[2] =Serial.read();
      a[2] =Serial.read();
      delay(100);
      if(a[1]=='A'){
      digitalWrite(10,HIGH);
      delay(100);
      digitalWrite(10,LOW);
    //  EEPROM.put(BLUE_CHECK, '1');//   <----------------------------- У EEPROM ограничеено количество циклов записи, сначала думай, потом раскомменчивай!
      //delay(2000);
      Serial.println("---");
      }
   }
    
    else
    {
      digitalWrite(9,HIGH);
      delay(100);
      digitalWrite(9,LOW);
    }
  }
}
void loop() {
}

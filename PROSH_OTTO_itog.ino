#define FIRMWARE_VERSION "00002"

#include <EEPROM.h>
#include "Arduino.h"
#include <Servo.h>
#include "Otto.h"
#define SERIAL_SPEED 115200
#define SERIAL_ADDRESS 0
#define data 2
#define clock 4

#define PIN_LEFT_LEG   2
#define PIN_RIGHT_LEG  3
#define PIN_LEFT_FOOT  4
#define PIN_RIGHT_FOOT 5

#define TRIM_LEFT_LEG   0
#define TRIM_RIGHT_LEG  0
#define TRIM_LEFT_FOOT  0
#define TRIM_RIGHT_FOOT 0

Otto Otto;  //This is Otto!


char chararrSerialRaw[50];
char chararrModel[21];
char chararrVersion[21];
char chararrPart[21];
char chararrSerial[21];
int MODEL_ID;





int notes[] = {262, 277, 294, 311, 330, 349, 370, 392, 415, 440, 466, 494, 523, 554, 587, 622, 659, 698, 740, 784, 831, 880, 932, 988, 1047};


byte commandState;
const byte COMMAND_STATE_WAITING_COMMAND=0;
const byte COMMAND_STATE_WAITING_COMMAND_TYPE=1;
const byte COMMAND_STATE_WAITING_DATA=2;
const byte COMMAND_STATE_WAITING_CRC=3;
const byte COMMAND_STATE_EXECUTING=4;




unsigned long startMillis= millis();  // Start of sample window

void parseSerialNumber(){
    EEPROM.get(SERIAL_ADDRESS, chararrSerialRaw);
    int iPointer = 0;
    while(chararrSerialRaw[iPointer] != '-'){
      iPointer++;
    }
    iPointer++;
    int iModelOffset = 0;
    while(chararrSerialRaw[iPointer] != '-'){
      chararrModel[iModelOffset] = chararrSerialRaw[iPointer];
      iModelOffset++;
      iPointer++;
    }
    iPointer++;

    int iVersionOffset = 0;
    while(chararrSerialRaw[iPointer] != '-'){
      chararrVersion[iVersionOffset] = chararrSerialRaw[iPointer];
      iVersionOffset++;
      iPointer++;
    }

    iPointer++;

    int iPartOffset = 0;
    while(chararrSerialRaw[iPointer] != '-'){
      chararrPart[iPartOffset] = chararrSerialRaw[iPointer];
      iPartOffset++;
      iPointer++;
    }

    iPointer++;


    int iSerialOffset = 0;
    while(chararrSerialRaw[iPointer] != 0 && (chararrSerialRaw[iPointer] >= '0' && chararrSerialRaw[iPointer] <='9')){
      chararrSerial[iSerialOffset] = chararrSerialRaw[iPointer];
      iSerialOffset++;
      iPointer++;
    }


    if(strcmp(chararrModel, "R") == 0
       && strcmp(chararrVersion, "1") == 0
       && (strcmp(chararrPart, "1") == 0 || strcmp(chararrPart, "2") == 0 || strcmp(chararrPart, "3") == 0 || strcmp(chararrPart, "4") == 0)){

       MODEL_ID=0;
    }
    else if(strcmp(chararrModel, "L") == 0
       && strcmp(chararrVersion, "1") == 0
       && strcmp(chararrPart, "1") == 0){

       MODEL_ID=1;
    }
    else if(strcmp(chararrModel, "L") == 0
       && strcmp(chararrVersion, "3") == 0
       && (strcmp(chararrPart, "1") == 0 || strcmp(chararrPart, "2") == 0 || strcmp(chararrPart, "3") == 0)){

       MODEL_ID=2;
    }


    else if(strcmp(chararrModel, "O") == 0              // O= Otto
         && strcmp(chararrVersion, "1") == 0           // s zavoda
        && (strcmp(chararrPart, "5") == 0 )){          // s zavoda

       MODEL_ID=3;                                     //MODEL_ID for OTTO
    }




    else{
       MODEL_ID=9999;
    }
}

int getDist(){
    digitalWrite(8, LOW);
    delayMicroseconds(2);
    digitalWrite(8, HIGH);
    delayMicroseconds(10);
    digitalWrite(8, LOW);
    long microseconds = pulseIn(9,HIGH,40000); //40000
    long distance;
     distance = microseconds/29/2;
     if (distance == 0){
       distance = 999;
    }
    return distance;
}
void printSensors(){

    Serial.write('#');
    Serial.write(getDist());
  }

void setup(){
    parseSerialNumber();
    Serial.begin(SERIAL_SPEED);
    //EEPROM.get(0, chararrSerialRaw);
   // Serial.print("robot id is: ");
    //Serial.print(chararrSerialRaw);
  pinMode( 8 , OUTPUT );
  pinMode( 9 , INPUT );
  commandState=COMMAND_STATE_WAITING_COMMAND;
  Otto.init(PIN_LEFT_LEG,PIN_RIGHT_LEG,PIN_LEFT_FOOT,PIN_RIGHT_FOOT,true);
  Otto.setTrims(TRIM_LEFT_LEG,TRIM_RIGHT_LEG, TRIM_LEFT_FOOT, TRIM_RIGHT_FOOT);
  Otto.home();
}

byte bytearrayData[20];
byte byteDataTail=0;
byte command=0;

void loop(){
//Serial.println(getDist());

//staying
   // TODO TODO Otto.jump(2,300);
    //TODO Otto.updown();//float steps=1, int T=1000, int h = 20
    //TODO Otto.swing();//float steps=1, int T=1000, int h=20
    //TODO Otto.tiptoeSwing();//float steps=1, int T=900, int h=20
    //TODO Otto.jitter();//float steps=1, int T=500, int h=20
    //TODO Otto.ascendingTurn();//float steps=1, int T=900, int h=20
    //TODO TODO Otto.shakeLeg ();//int steps=1, int T = 2000, int dir=RIGHT);
//forw/back
    //TODO TODO Otto.crusaito();//float steps=1, int T=900, int h=20, int dir=FORWARD
    //TODO TODO Otto.flapping(1,1000,);//float steps=1, int T=1000, int h=20, int dir=FORWARD
    //TODO TODO Otto.walk(10,125,FORWARD);
//left/right
   //TODO TODO Otto.turn();//float steps=4, int T=2000, int dir = LEFT
   //TODO TODO Otto.bend ();//int steps=1, int T=1400, int dir=LEFT
   //TODO TODO Otto.moonwalker();//float steps=1, int T=900, int h=20, int dir=LEFT

 //delay(1000);
 // NR_Servo.write(11);
   if( Serial.available() ){
      byte b = Serial.read();
      if(commandState== COMMAND_STATE_WAITING_COMMAND){
         switch(b){
            case ' ':{
               Serial.print(F("ROBBO-"));
               if(MODEL_ID < 10000){
                  Serial.write('0');
               }
               if(MODEL_ID < 1000){
                  Serial.write('0');
               }
               if(MODEL_ID < 100){
                  Serial.write('0');
               }
               if(MODEL_ID < 10){
                  Serial.write('0');
               }
               Serial.print(MODEL_ID);
               Serial.write('-');
               Serial.print(F(FIRMWARE_VERSION));
               Serial.write('-');
               Serial.print(chararrModel);
               Serial.print('-');
               for(int f = strlen(chararrVersion); f < 5; f++){
                  Serial.write('0');
               }
               Serial.print(chararrVersion);
               Serial.print('-');
               for(int f = strlen(chararrPart); f < 5; f++){
                  Serial.write('0');
               }
               Serial.print(chararrPart);
               Serial.print('-');
               for(int f = strlen(chararrSerial); f < 20; f++){
                  Serial.write('0');
               }
               Serial.print(chararrSerial);

               break;
            }
            case 'a':{
              command = b;
              commandState = COMMAND_STATE_WAITING_CRC;
              break;
            }
            case 'b':{//staying
              command = b;
              commandState = COMMAND_STATE_WAITING_DATA;
              break;
            }
            case 'c':{//moving forv/back
              command = b;
              commandState = COMMAND_STATE_WAITING_DATA;
              break;
            }
            case 's':{//serv state
              command = b;
              commandState = COMMAND_STATE_WAITING_DATA;
              break;
            }
         }
      }
      else if(commandState==COMMAND_STATE_WAITING_DATA){
         bytearrayData[byteDataTail] = b;
         byteDataTail++;
         switch(command){
            case 'b': {
              if (byteDataTail > 3) {
              commandState = COMMAND_STATE_WAITING_CRC;
            }
            break;
            }
            case 'c': {
            if (byteDataTail > 3) {
              commandState = COMMAND_STATE_WAITING_CRC;
            }
            break;
            }
            case 's': {
            if (byteDataTail > 4) {
              commandState = COMMAND_STATE_WAITING_CRC;
            }
            break;
            }
         }
      }
      else if(commandState==COMMAND_STATE_WAITING_CRC){

         if(b == '$'){
            switch(command){
              case 'a':{
                  printSensors();
                  break;
               }
              case 'b':{
                int tim = 125 * bytearrayData[0];
                float steps = float(bytearrayData[1]);
                byte hshka= (bytearrayData[2] >> 3);
                int chta = bytearrayData[2]%8;
                switch (chta) {
                  case 0:
                  {
                    Otto.ascendingTurn(steps,tim,hshka);
                    break;
                  }
                  case 1:
                  {
                    Otto.jitter(steps,tim,hshka);
                    break;
                  }
                  case 2:
                  {
                    Otto.tiptoeSwing(steps,tim,hshka);
                    break;
                  }
                  case 3:
                  {
                    Otto.swing(steps,tim,hshka);
                    break;
                  }
                  case 4:
                  {
                    Otto.updown(steps,tim,hshka);
                    break;
                  }
                  case 5:
                  {

                    break;
                  }
                  case 6:
                  {

                    break;
                  }
                  case 7:
                  {

                    break;
                  }

                }
                printSensors();
                break;
              }
              case 'c':  {
                int tim = 125 * bytearrayData[0];
                float steps = float(bytearrayData[1]);
                int dir = bytearrayData[2]%16 >> 3;
                if(!dir)
                dir--;
                byte hshka= 2*(bytearrayData[2] >> 4);
                int chta = bytearrayData[2]%8;
                switch (chta) {
                  case 0:
                  {
                    Otto.jump(steps,tim);
                    break;
                  }
                  case 1:
                  {
                    Otto.shakeLeg (steps,tim,dir);
                    break;
                  }
                  case 2:
                  {
                    Otto.bend (steps,tim,dir);
                    break;
                  }
                  case 3:
                  {
                     Otto.walk(steps,tim,dir);
                    break;
                  }
                  case 4:
                  {
                    Otto.turn(steps,tim,dir);
                    break;
                  }
                  case 5:
                  {
                    Otto.crusaito(steps,tim,hshka,dir);
                    break;
                  }
                  case 6:
                  {
                    Otto.flapping(steps,tim,hshka,dir);
                    break;
                  }
                  case 7:
                  {
                    Otto.moonwalker(steps,tim,hshka,dir);
                    break;
                  }

                }
                printSensors();
                break;
              }
              case 's': {
                int tim = 125 * bytearrayData[0];
                int a[4];
                a[0]=bytearrayData[1];
                a[1]=bytearrayData[2];
                a[2]=bytearrayData[3];
                a[3]=bytearrayData[4];
                Otto._moveServos(tim,a);
                printSensors();
                break;
              }
            }
         }
         commandState=COMMAND_STATE_WAITING_COMMAND;
      }
   }
}

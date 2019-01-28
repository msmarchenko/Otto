#include <Servo.h>
Servo myservo1;
Servo myservo2;
Servo myservo3;
Servo myservo4;
int pos[4];

void setup() 
{
  pos[0]=0;pos[1]=0;pos[2]=0;pos[3]=0;
  myservo1.attach(14);
  myservo2.attach(15);
  myservo2.attach(16);
  myservo2.attach(17);
}

void loop() 
{
  // устанавливаем сервоприводы в серединное положение
  myservo1.write(pos[0]++);
  myservo2.write(pos[1]++);
 if(pos[0]==180)
 {pos[0]=0;
 pos[1]=0;
 } delay(0);
}

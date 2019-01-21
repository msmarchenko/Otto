#include <Servo.h> 
Servo myservo;
void setup() 
{
  pinMode(10, OUTPUT);
  myservo.attach(10);
} 
void loop() 
{
  myservo.write(90);
  delay(500);
  myservo.write(0);
  delay(500);
  myservo.write(180);
  delay(500);
} 

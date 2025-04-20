IOT:
1B:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(12, OUTPUT);
}


// the loop function runs over and over again forever
void loop() {
  digitalWrite(12, HIGH);  // turn the LED on (HIGH is the voltage level)
  delay(1000);                      // wait for a second
  digitalWrite(12, LOW);   // turn the LED off by making the voltage LOW
  delay(1000);                      // wait for a second
}

2:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const int trig = 6;
const int echo = 7;
long totaltime;
int distance;

void setup() {
pinMode(trig, OUTPUT);
pinMode(echo, INPUT);
Serial.begin(9600);
}

void loop() {
digitalWrite(trig, LOW);
delayMicroseconds(2);
digitalWrite(trig, HIGH);
delayMicroseconds(10);
digitalWrite(trig, LOW);

totaltime = pulseIn(echo, HIGH);
distance = totaltime * 0.034 / 2;

Serial.print("Distance from Sensor: ");
Serial.println(distance);
}

3:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
void setup() {
// put your setup code here, to run once:
pinMode(D4, OUTPUT);
}

void loop() {
// put your main code here, to run repeatedly:
digitalWrite(D4, HIGH);
delay(3000);
digitalWrite(D4, LOW);
delay(3000);
}

INSTRUCTIONS:-
In File > Preferences > Additional boards manager URLs:

https://arduino.esp8266.com/stable/package_esp8266com_index.json

In Library Manager
Install – esp8266

4:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#include "DHT.h"


#define DPIN 4        //Pin to connect DHT sensor (GPIO number) D2
#define DTYPE DHT11   // Define DHT 11 or DHT22 sensor type


DHT dht(DPIN,DTYPE);


void setup() {
  Serial.begin(9600);
  dht.begin();
}


void loop() {
  delay(2000);
 
  float tc = dht.readTemperature(false);  //Read temperature in C
  float tf = dht.readTemperature(true);   //Read Temperature in F
  float hu = dht.readHumidity();          //Read Humidity


  Serial.print("Temp: ");
  Serial.print(tc);
  Serial.print(" C, ");
  Serial.print(tf);
  Serial.print(" F, Hum: ");
  Serial.print(hu);
  Serial.println("%");
}

INSTRUCTIONS:-
In File > Preferences > Additional boards manager URLs:

https://arduino.esp8266.com/stable/package_esp8266com_index.json

In Library Manager
Install – esp8266, DHT sensor library (Adafruit)

5:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
int pirPin = 12; // PIR sensor connected to digital pin 12
int motionStatus = 0; // Variable to store PIR output


unsigned long previousMillis = 0; // Variable to store the last time motion was detected
unsigned long interval = 500; // Interval to check motion (in milliseconds)


void setup() {
  Serial.begin(9600);
  pinMode(pirPin, INPUT);
}


void loop() {
  unsigned long currentMillis = millis();
 
  motionStatus = digitalRead(pirPin);


  // Check if enough time has passed (500ms interval)
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis; // Save the last time we checked for motion


    // If motion is detected
    if (motionStatus == HIGH) {
      Serial.print("Motion Detected at: ");
      Serial.println(currentMillis / 1000); // Time in seconds since the program started
    } else {
      Serial.print("No Motion at: ");
      Serial.println(currentMillis / 1000); // Time in seconds since the program started
    }
  }
}
----------------------------------------------------------------------OPTIONAL CODE---------------------------------------------------------------------------------------------------------------------------------
int calibrationTime = 30;
long unsigned int lowIn;
long unsigned int pause = 5000;

boolean lockLow = true;
boolean takeLowTime;

int pirPin = 3;
int ledPin = 13;

void setup() {
Serial.begin(9600);
pinMode(pirPin, INPUT);
pinMode(ledPin, OUTPUT);
digitalWrite(pirPin, LOW);

Serial.print("calibrating sensor ");
for (int i = 0; i < calibrationTime; i++) {
Serial.print(".");
delay(1000);
}
Serial.println(" done");
Serial.println("SENSOR ACTIVE");
delay(50);
}

void loop() {
if (digitalRead(pirPin) == HIGH) {
digitalWrite(ledPin, HIGH);
if (lockLow) {
lockLow = false;
Serial.println("---");
Serial.print("motion detected at ");
Serial.print(millis() / 1000);
Serial.println(" sec");
delay(50);
}
takeLowTime = true;
}

if (digitalRead(pirPin) == LOW) {
digitalWrite(ledPin, LOW);

if (takeLowTime) {
lowIn = millis();
takeLowTime = false;
}

if (!lockLow && millis() - lowIn > pause) {
lockLow = true;
Serial.print("motion ended at ");
Serial.print((millis() - pause) / 1000);
Serial.println(" sec");
delay(50);
}
}
}

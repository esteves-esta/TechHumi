#include <dht.h>

#define dht_pin 5 // define pino de sinal como 5 da Digital

dht DHT; //define objeto DTH da classe dht

float temp=0; // variavel que recebe numeros quabrados 0.00
int umi=0; // variavel que recebe numeros inteiros 0

void setup() {
  Serial.begin(9600); // serial em baund rates
}
void loop() {
 DHT.read11(dht_pin); // função dando o comando para o objeto usar o metodo de leitura do DHT11 que esta no dth_pin ou seja, porta 5 Digital
 umi = DHT.humidity;
 temp = DHT.temperature;
    Serial.print(temp);//pedindo a umidade que foi recolhida a cima
    Serial.print(",");//tabulando
    Serial.println(umi);//pedindo a temperatura

    delay(5000); // deplay de 1seg e meio
}

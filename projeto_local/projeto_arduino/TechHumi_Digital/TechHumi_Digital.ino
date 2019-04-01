#include <dht.h>//bibloteca usada do DHT11

#define dht_pin 5 // define pino de sinal como 5 da Digital

dht DHT; //define objeto DTH da classe dht

float temp=0; // variavel que recebe numeros quabrados 0.00
int umi=0; // variavel que recebe numeros inteiros 0

void setup() {
  Serial.begin(9600); // serial em baund rates
}
void loop() {
 DHT.read11(dht_pin); // dando o comando para o objeto usar o metodo de leitura do DHT11 que esta no dth_pin ou seja, porta 5 Digital
 temp = DHT.humidity;
 umi = DHT.temperature;
    Serial.print(umi);//pedindo a umidade que foi recolhida a cima
    Serial.print(" \t");//tabulando
    Serial.println(temp);//pedindo a temperatura

    delay(1500); // deplay de 1seg e meio
}

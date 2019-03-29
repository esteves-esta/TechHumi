#include <dht.h> // Inclui a biblioteca no seu código
 
dht DHT; // Cria um objeto da classe dht
uint32_t timer = 0;
 
void setup()
{
  Serial.begin(9600); // Inicializa serial com taxa de transmissão de 9600 bauds
}
 
void loop()
{
  // Executa 1 vez a cada 2 segundos
  if(millis() - timer>= 2000)
  {
 
    DHT.read11(A1); // chama método de leitura da classe dht,
                    // com o pino de transmissão de dados ligado no pino A1
 
    // Exibe na serial o valor de umidade
    Serial.print(DHT.humidity);
    Serial.println(" %");
 
    // Exibe na serial o valor da temperatura
    Serial.print(DHT.temperature);
    Serial.println(" Celsius");
 
    timer = millis(); // Atualiza a referência
  }
}

float temp=21; // variavel que recebe numeros quabrados 0.00
int umi=45; // variavel que recebe numeros inteiros 0
int cont;
int simula;

void setup() {
  Serial.begin(9600); // serial em baund rates
}

void loop() {
  
    Serial.print(temp);//pedindo a umidade que foi recolhida a cima
    Serial.print(",");//tabulando
    Serial.println(umi);//pedindo a temperatura

  if(simula == 5 ){
    if(temp < 23){
      temp+= 0.3;
    }
    else {
      temp = 21;
    }
  }

  if(cont == 10){
    if(umi < 60){
      umi += 1;
    } else {
      umi = 40; 
    }
  }
  
    cont = random(0, 20);
    simula = random(0, 6);
    
    delay(5000); // deplay de 1seg e meio
}

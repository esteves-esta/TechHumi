float temp=21; // variavel que recebe numeros quabrados 0.00
int umi=50; // variavel que recebe numeros inteiros 0

void setup() {
  Serial.begin(9600); // serial em baund rates
}

void loop() {
  
    Serial.print(temp);//pedindo a umidade que foi recolhida a cima
    Serial.print(",");//tabulando
    Serial.println(umi);//pedindo a temperatura

    if(temp < 23){
      temp+= 0.2;
    }
    else {
      temp = 20;
    }

    if(umi < 60){
      umi +=1.2;
    } else {
      umi = 40;
    }

    delay(5000); // deplay de 1seg e meio
}

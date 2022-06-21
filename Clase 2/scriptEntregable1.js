do{
    var select = parseInt(prompt("Calculadora rudimentaria, Ingrese un numero para ejecutar una operación\n1) Suma\n2) Resta\n3) Multiplicación\n4) División\n5) Tabla de multiplicar (El primer digito ingresado será que tabla deseas ver y el segundo hasta que numero será multiplicado)"));
}while((select<=0)||(select>5))

var num1 = parseInt(prompt("Ingrese el primer numero"));
var num2 = parseInt(prompt("Ingrese el segundo numero"));
var result = 0;
var all = "";

var i;



switch(select){
    case 1: 
        all = num1 + num2;
        break;
    case 2:
        all = num1 - num2;
        break;
    case 3:
        all = num1 * num2;
        break;
    case 4:
        
        while(num2===0){
            var num2 = parseInt(prompt("No se puede dividir por cero, por favor ingresa un numero distinto de cero! "));   
        }
        all = num1/num2;
        break;
    case 5:
        for(i = 0; i <= num2; i++){
            result = i*num1;
            all = all+num1+"x"+i+"= "+result+"\n";
        }
        break;

}
if(num1==num2){
    alert(all+"\n\nEl primer numero ingresado era igual al segundo!");
}
else if(num1<num2){
    alert(all+"\n\nEl primer numero ingresado era menor al segundo!");
}
else{
    alert(all+"\n\nEl primer numero ingresado era mayor al segundo!");
}
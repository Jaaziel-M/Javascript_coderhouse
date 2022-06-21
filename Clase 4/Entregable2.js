
//Basado en el plano del bar y en un dataset de stock pre establecido, se reservan y bloquean las posiciónes 
// Obviamente esto irá adquiriendo mas sentido conforme le agregue teoría de la clase al proyecto. Esto simplemente fue armado en base a lo visto hasta la presentación del desafio
// con clases esto va a quedar mucho mas optimizado
//se toman pedidos y se actualiza la mesa 
//para cada mesa se crea un registro de gastos 
//y se cancelan los precios 


function Pedido(puesto){
    monto = parseInt(prompt("por favor ingrese el monto del pedido para agregarlo a la mesa: "));
    puesto = parseFloat(puesto) + parseFloat(monto);
    alert("El importe fue agregado a la mesa seleccionada, gracias!");
    return puesto;
}

function Disponibilidad(puesto){
    if(puesto!=0){
        alert("La mesa se encuentra ocupada en estos momentos, por favor asignar otra!")
    }
    else{
        let opc = parseInt(prompt("la mesa se encuentra disponible! \n¿Desea realizar un pedido?\n1) Si\n2) No"))
        if (opc == 1){
            Pedido(puesto);
        }
        else{
            return puesto;
        }
    }
}

const PagarMesa = (puesto) => {return parseInt(puesto) - parseInt(puesto)};

function Menu(){
    let opcion = prompt("Que acción desea realizar? \nRealizar un pedido (1)\nConsultar la disponibilidad de una mesa (2)\nCancelar el saldo pendiente de una mesa (3)\nSalir del programa (4)")
    return opcion;
}



let Mesa1 =0;
//let Mesa2 =0;
//let Mesa3 =0;
//let Mesa4 =0;
//let Mesa5 =0;
//let Mesa6 =0;
//let Mesa7 =0;
//let Mesa8 =0;
//let Mesa9 =0;
//let Mesa10 =0;
//let Mesa11 =0;
//let Puesto1 =0;
//let Puesto2 =0;
//let Puesto3 =0;
//let Puesto4 =0;
//let Puesto5 =0;
//let Puesto6 =0;
var opcion =0;


while ((opcion<1)||(opcion>17)){
    opcion = parseInt(prompt(
        `
        Seleccione la posición:

        Mesa 1 (1)  Mesa 6 (6)      Puesto 1 (12)
        Mesa 2 (2)  Mesa 7 (7)      Puesto 2 (13)
        Mesa 3 (3)  Mesa 8 (8)      Puesto 3 (14)
        Mesa 4 (4)  Mesa 9 (9)      Puesto 4 (15)
        Mesa 5 (5)  Mesa 10 (10)    Puesto 5 (16) 
                    Mesa 11 (11)    Puesto 6 (17)
        `
    ));
}

//Lo hago solo con la mesa 1 para no hacer el codigo demasiado extenso

switch(opcion){

    case 1:
        Mesa1
        //opcion = parseInt(Menu());
        //alert("valor de opcion"+opcion)
        let salir = 1;
        do{
            opcion = parseInt(Menu());
            alert("valor de opcion"+opcion)
            
            switch(opcion){
                case 1: 
                    alert("entro en el segundo case 1")
                    Mesa1 = parseInt(Pedido(Mesa1))
                    alert("EL Saldo de la mesa 1 ahora es de: $"+Mesa1)
                    salir = parseInt(prompt("Desea salir del programa?\nSi(1)\nNo(2)"))
                    break;
                case 2:
                    Mesa1 = Disponibilidad(Mesa1);
                    salir = parseInt(prompt("Desea salir del programa?\nSi(1)\nNo(2)"))
                    break
                case 3:
                    Mesa1 = PagarMesa(Mesa1);
                    salir = parseInt(prompt("Desea salir del programa?\nSi(1)\nNo(2)"))
                    break
                case 4:
                    break;
            }
        }while(salir!=1)

        break;
//    case 2:
//        let Mesa2
//    case 3:
//        let Mesa3
//    case 4:
//        let Mesa4
//    case 5:
//        let Mesa5
//    case 6:
//        let Mesa6
//    case 7:
//        let Mesa7
//    case 8:   
//        let Mesa8
//    case 9:
//        let Mesa9  
//    case 10:
//        let Mesa10 
//    case 11:
//        let Mesa11 
//    case 12:
//        let Puesto1
//    case 13:
//        let Puesto2
//    case 14:
//        let Puesto3
//    case 15:
//        let Puesto4
//    case 16:
//        let Puesto5
//    case 17:
//        let Puesto6
}


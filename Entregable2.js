
//Basado en el plano del bar y en un dataset de stock pre establecido, se reservan y bloquean las posiciónes 
// Obviamente esto irá adquiriendo mas sentido conforme le agregue teoría de la clase al proyecto. Esto simplemente fue armado en base a lo visto hasta la presentación del desafio
// con clases esto va a quedar mucho mas optimizado
//se toman pedidos y se actualiza la mesa 
//para cada mesa se crea un registro de gastos 
//y se cancelan los precios 



function Puesto(CodMesa, Saldo){
    this.CodMesa = CodMesa;
    this.Saldo = Saldo;
}

let Puestos = [];

//inicializacion de todas las mesas en cero. 
for (let i=0; i<17; i++){
    if(i<11){
        Puestos.push(new Puesto("mesa"+(i+1), 0))
    }
    else{
        Puestos.push(new Puesto("puesto"+(i+1), 0))
    }
}
let RecaudacionTotal = 0;
let opcion =0;


function Pedido(numero){
    monto = parseInt(prompt("por favor ingrese el monto del pedido para agregarlo a la mesa: "));
    Puestos[parseInt(numero)-1].Saldo =  parseInt(Puestos[parseInt(numero)-1].Saldo) + monto
    alert("La mesa: "+Puestos[parseInt(numero)-1].CodMesa+"posee un saldo de: "+Puestos[parseInt(numero)-1].Saldo);
}

function Disponibilidad(busqueda){
    const puesto = Puestos.find( (puesto) => puesto.CodMesa == busqueda)
    if(puesto){
        alert("La mesa se encuentra en uso")
    }
    else{
        alert("La mesa puede ser utilizada")
    }
}




const PagarMesa = (puesto) => {parseInt(Puestos[puesto].Saldo) - parseInt(Puestos[puesto].Saldo)};


opcion = parseInt(prompt("Por favor ingrese que consulta desea realizar:\n\nVer o pagar el saldo  de una mesa (1)\nAgregar pedido a una mesa (2)\nConsultar mesas disponibles (3)\n\nAnalytics:\n\nConsultar el total de todas las mesas en este momento (4)\nConsultar la recaudación total del día (5)"))

while (opcion<1 || opcion>3){
    opcion = parseInt(prompt("Por favor ingrese que consulta desea realizar:\n\nVer o pagar el saldo  de una mesa (1)\nAgregar pedido a una mesa (2)\nConsultar mesas disponibles (3)\n\nAnalytics:\n\nConsultar el total de todas las mesas en este momento (4)\nConsultar la recaudación total del día (5)\nSalir (6)"))
}

switch(opcion){
    case 1:
        let lugar = parseint(prompt("por favor ingrese un numero de mesa:\n\nMesas (Del 1 al 11)\nPuestos (Del 12 al 17)"))
        while (lugar<1 || lugar>17){
            lugar = parseInt(prompt("por favor ingrese un numero de mesa:\n\nMesas (Del 1 al 11)\nPuestos (Del 12 al 17)"))
        }
        opcion = parseInt(prompt("Desea pagar o consultar el saldo del puesto seleccionado?\nPagar saldo (1)\nConsultar saldo (2)\nSalir (3)"))
        while(opcion < 1 || opcion >3){
            opcion = parseint(prompt("Desea pagar o consultar el saldo del puesto seleccionado?\nPagar saldo (1)\nConsultar saldo (2)\nSalir (3)"))
        }
        switch(opcion){
            case 1:
                parseInt(Puestos[lugar-1].Saldo)
                RecaudacionTotal = PagarMesa(lugar-1)
                break;
            case 2:
                alert("El saldo de la mesa seleccionada es: "+Puestos[lugar-1].Saldo)
                break;
            case 3:
                opcion = 0;
                break;
        }

        break;
    case 2:
        lugar = parseint(prompt("por favor ingrese un numero de mesa:\n\nMesas (Del 1 al 11)\nPuestos (Del 12 al 17)"));
        Pedido(lugar)
        break;
    case 3:
        const distintosdecero = Puestos.map((elemento) => { if(elemento.Saldo>0){return elemento.CodMesa} })
        let resultado = "Los puestos disponibles son: \n"
        distintosdecero.forEach((elemento) => {if(elemento!=null){resultado=resultado+elemento+"\n"}} ) 
        alert(resultado)
    case 4:
        const total = Puestos.reduce((acumulador, elemento) => acumulador + elemento.Saldo, 0)
        alert("El total de todas las mesas en servicio es: $"+total)
        break;
    case 5:
        alert("El total de la recaudación del día hasta el momento: $"+RecaudacionTotal)
        break;
    case 6:
        break;
}

function Puesto(CodMesa, Saldo){

        this.CodMesa = "Puesto "+CodMesa;
        this.Saldo = Saldo;

}


let Puestos = [];


//Captura de las acciones del HTML 

let lista = document.getElementById("listaM");
let botonok = document.getElementById("OK");
let formu = document.getElementById("formulario");
let input1 = document.getElementById("Input1").value;
let input2 = document.getElementById("Input2").value;





// esta funcion compara en el array (datos que no se muestran)
function compare(parametro){
        let checker = false;
        for (elemento of Puestos){
                if("Puesto "+parametro == elemento.CodMesa){
                        checker = true;
                        break
                        
                }else{
                        checker = false;
                }
        }

        return checker;
}


// esta función me indica en que indice del array está almacenado el puesto que se le pasa por parametro
const PuestosIndex = (num) => { 
        i=0
        for (item of Puestos){
                if("Puesto "+num == item.CodMesa){
                        return parseInt(i);
                }
                i++;
        }
        return undefined;
        
}


function PrintHTML(PuestoABuscar, AgregarSaldo){
        //Si encuentro el articulo en el array solo cambio el precio
        //si no lo encuentro lo agrego
        //Si cancelo el precio saco el item del array
        let ul = document.getElementById("listaM");
        if(compare(parseInt(PuestoABuscar))){
                console.log("entro en el if del printHTML")
                // actualizo el saldo en el array
                //Puestos[PuestosIndex(PuestoABuscar)].Saldo = Puestos[PuestosIndex(PuestoABuscar)].Saldo + AgregarSaldo;
                //buscar en el listado de items que hay en el ul el que matchea con este e imprimir nuevamente desde el array con saldo actualizado 
                
                let licounter = 0;
                var liencontrado = undefined;
                console.log(ul)
                console.log("longitud del array antes de recorrerse "+Puestos.length)
                //Buscador en el Array de Li
                for (ingreso of ul.children){
                        if (parseInt(PuestoABuscar) == ingreso.innerHTML[7]+ingreso.innerHTML[8]){
                                liencontrado = licounter;
                                console.log("encontró coincidencia")
                        }
                        else{
                                licounter = licounter +1;
                        }
                        
                }

                ul.children[liencontrado].innerHTML = Puestos[PuestosIndex(PuestoABuscar)].CodMesa+" Ocupada    Saldo  $"+Puestos[PuestosIndex(PuestoABuscar)].Saldo;

        }
        else{
                console.log("entro en el else del printHTML")
                let item = document.createElement("li");
                item.innerHTML = "Puesto "+PuestoABuscar+" Ocupada    Saldo  $"+AgregarSaldo;
                lista.appendChild(item);
        }
}




function gestion(event){
        event.preventDefault();
        input1 = document.getElementById("Input1").value;
        input2 = document.getElementById("Input2").value;
        
        console.log("lenght del array "+Puestos.length)

        if(compare(parseInt(input1))){
                console.log("entra en el if de la funcion ppal")
                Puestos[PuestosIndex(input1)].Saldo = parseInt(Puestos[PuestosIndex(input1)].Saldo) + parseInt(input2);
                PrintHTML(input1,input2)
        }
        else{
                console.log("entra directo al else en la funcion ppal")
                PrintHTML(input1,input2)
                Puestos.push(new Puesto(input1,input2))
                
        }
        

}

formu.addEventListener("submit", gestion)


console.log("end")


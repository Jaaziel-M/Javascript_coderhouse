
class Puesto{
        constructor(CodMesa, Saldo){
                this.CodMesa = "Puesto "+CodMesa;
                this.Saldo = Saldo;
        }

}

// Variables globales del programa
let Puestos = [];
let RecaudacionDiaria = 0;

// Captura de las acciones del HTML 

let lista = document.getElementById("listaM");
let botonok = document.getElementById("OK");
let formu = document.getElementById("formulario");
let formu2 = document.getElementById("formulario2");
let input1 = document.getElementById("Input1").value;
let input2 = document.getElementById("Input2").value;
let input3 = document.getElementById("Input3").value;
let EOD = document.getElementById("EOD")

// esta funcion compara en el array (datos que no se muestran)
function compare(parametro){
        const checker = Puestos.find((puesto) => puesto.CodMesa == "Puesto "+parametro) 
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
// funcion para recorrer el array ver cual tiene saldo cero y eliminar ese item del html 

function PrintHTML(PuestoABuscar, AgregarSaldo){
        //Si encuentro el articulo en el array solo cambio el precio
        // let ul = document.getElementById("listaM");
        if(compare(parseInt(PuestoABuscar))){
                // actualizo el saldo en el array
                //buscar en el listado de items que hay en el ul el que matchea con este e imprimir nuevamente desde el array con saldo actualizado 
                let licounter = 0;
                var liencontrado = undefined;
                //console.log(ul)
                //Buscador en el Array de Li
                for (ingreso of lista.children){
                        if (parseInt(PuestoABuscar) == ingreso.innerHTML[7]+ingreso.innerHTML[8]){
                                liencontrado = licounter;
                        }
                        else{
                                licounter = licounter +1;
                        }
                }
                lista.children[liencontrado].innerHTML = Puestos[PuestosIndex(PuestoABuscar)].CodMesa+" Ocupada    Saldo  $"+Puestos[PuestosIndex(PuestoABuscar)].Saldo;
        }
        else{
                let item = document.createElement("li");
                item.innerHTML = "Puesto "+PuestoABuscar+" Ocupada    Saldo  $"+AgregarSaldo;
                lista.appendChild(item);
        }
}
// Elimina el puesto con saldo 0 del html
function Pagar(PuestoABuscar){
        //let ul = document.getElementById("listaM");
        //let hijos = ul.children;
        let i = 0;
        let IndexHTML = undefined;
        let BufferSaldo = 0
        BufferSaldo = Puestos[PuestosIndex(PuestoABuscar)].Saldo;
        Puestos.splice(PuestosIndex(PuestoABuscar),1)
        for (hijo of lista.children){
                //console.log("iteracion - "+hijo.innerHTML)
                if (hijo.innerHTML[7]+hijo.innerHTML[8] == parseInt(PuestoABuscar)){
                        IndexHTML = i;
                }
                i++
        }
        lista.children[IndexHTML].remove()
        return BufferSaldo
}
// convierto el array actualizado a json 
const Json = (parametro) => {return JSON.stringify(parametro)};
const local = (clave,valor) => {localStorage.setItem(clave, valor)}
// Event listeners y funcionalidades a partir de ellos 
formu.addEventListener("submit", gestion)
formu2.addEventListener("submit", gestion2)

function gestion(event){
        event.preventDefault();
        input1 = document.getElementById("Input1").value;
        input2 = document.getElementById("Input2").value;        
        input3 = document.getElementById("Input3").value;
        if(((input1<1)||(input1>17)) || ((input2<1))){
                alert("Error! por favor ingrese un valor entre 1 y 17 para los puestos y un numero positivo distinto de cero para el saldo.")
        }
        else{
                if(compare(parseInt(input1))){
                        console.log(PuestosIndex(input1))
                        Puestos[PuestosIndex(input1)].Saldo = parseInt(Puestos[PuestosIndex(input1)].Saldo) + parseInt(input2);
                        PrintHTML(input1,input2)
                }
                else{
                        PrintHTML(input1,input2)
                        console.log(PuestosIndex(input1))
                        Puestos.push(new Puesto(input1,input2))
                }
        }
        Puestos.forEach((item) => {local(PuestosIndex(input1),Json(item))})
}
function gestion2(event){
        input3 = document.getElementById("Input3").value;
        event.preventDefault();
        RecaudacionDiaria = RecaudacionDiaria + parseInt(Pagar(input3))
}

EOD.onclick = () => {
        localStorage.clear()
        console.log("click en eod")
        let txts = document.getElementById("Txts")
        let msg = document.createElement("a")
        msg.innerHTML="La recaudación total del día fue $"+RecaudacionDiaria
        txts.appendChild(msg)
}


console.log("end")


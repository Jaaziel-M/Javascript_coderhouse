class Puesto{
        constructor(CodMesa, Saldo){
                this.CodMesa = "Puesto "+CodMesa;
                this.Saldo = parseInt(Saldo);
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
let ckeck = document.getElementById("Recaudacion")
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
                i++
        }
        return undefined;
}

// funcion para recorrer el array ver cual tiene saldo cero y eliminar ese item del html

function PrintHTML(PuestoABuscar, AgregarSaldo){
        //Si encuentro el articulo en el array solo cambio el precio
        if(compare(parseInt(PuestoABuscar))){
                // actualizo el saldo en el array
                //buscar en el listado de items que hay en el ul el que matchea con este e imprimir nuevamente desde el array con saldo actualizado
                let licounter = 0;
                var liencontrado = undefined;
                //Buscador en el Array de Li
                for (ingreso of lista.children){
                        (parseInt(PuestoABuscar) == ingreso.innerHTML[7]+ingreso.innerHTML[8]) ? (liencontrado = licounter) : (licounter = licounter +1)
                }
                if(liencontrado == undefined){
                        let item = document.createElement("li");
                        item.innerHTML = "Puesto "+PuestoABuscar+" Ocupada    Saldo  $"+AgregarSaldo;
                        lista.appendChild(item);
                }
                else{
                        lista.children[liencontrado].innerHTML = Puestos[PuestosIndex(PuestoABuscar)].CodMesa+" Ocupada    Saldo  $"+Puestos[PuestosIndex(PuestoABuscar)].Saldo;
                }
        }
        else{
                let item = document.createElement("li");
                item.innerHTML = "Puesto "+PuestoABuscar+" Ocupada    Saldo  $"+AgregarSaldo;
                lista.appendChild(item);
        }
}

// Elimina el puesto con saldo 0 del html y acumula el saldo anterior de una mesa en el total recaudado del día

function Pagar(PuestoABuscar){
        let i = 0;
        let IndexHTML = undefined;
        let BufferSaldo = 0
        if(PuestosIndex(PuestoABuscar)==undefined){
                swal({
                        title: "Error!",
                        text: "Por favor seleccioná una mesa que esté registrada y con saldo acumulado",
                        icon: "error",

                })
                return undefined
        }
        BufferSaldo = Puestos[PuestosIndex(PuestoABuscar)].Saldo;
        Puestos.splice(PuestosIndex(PuestoABuscar),1);
        for (hijo of lista.children){
                (hijo.innerHTML[7]+hijo.innerHTML[8] == parseInt(PuestoABuscar)) && (IndexHTML = i)
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

// si la pagina se actualiza por algun motivo, llevo al array todo lo que se haya almacenado en el Local Storage

for (let k=0; k < localStorage.length; k++){
        let key = localStorage.key(k)
        Puestos[k] = JSON.parse(localStorage.getItem(key))
        PrintHTML((parseInt(Puestos[k].CodMesa[7]+Puestos[k].CodMesa[8])), Puestos[k].Saldo)
}



// acciones de los inputs de pagar y de ingreso de saldos 
function gestion(event){
        event.preventDefault();
        input1 = document.getElementById("Input1").value;
        input2 = document.getElementById("Input2").value;       
        input3 = document.getElementById("Input3").value;
        if(((input1<1)||(input1>17)) || ((input2<1))){
                swal({
                        title: "Error!",
                        text: "Por favor, ingresá un valor entre 1 y 17 para los puestos y un numero positivo distinto de cero para el saldo.",
                        icon: "error",

                })
        }
        else{
                if(compare(parseInt(input1))){
                        Puestos[PuestosIndex(input1)].Saldo = parseInt(Puestos[PuestosIndex(input1)].Saldo) + parseInt(input2);
                        PrintHTML(input1,input2)
                }
                else{
                        PrintHTML(input1,input2)
                        Puestos.push(new Puesto(input1,input2))
                }
        }
        Puestos.forEach((item) => {local(parseInt(item.CodMesa[7]+item.CodMesa[8]),Json(item))})
}

function gestion2(event){
        input3 = document.getElementById("Input3").value;
        event.preventDefault();
        localStorage.removeItem(input3)
        BufferPago = Pagar(input3)
        if(BufferPago != undefined){
                RecaudacionDiaria = RecaudacionDiaria + parseInt(BufferPago)
        }
        
}
// La idea de este boton es al cerrar  el bar, se imprime el saldo recuadado y se borra toda la info del local storage. 
EOD.onclick = () => {
        lista = document.getElementById("listaM");
        swal({
                title: 'Finalizar el día?',
                text: "Atención! al aceptar, se eliminaran los datos del día en curso",
                icon: 'warning',
                buttons:{
                        cancel: "Cancelar",
                        aceptar: {
                                text: "Aceptar",
                                value: "aceptar",
                        },
                        confirm: true,
                }

                }).then((value) => {
                        
                if (value) {
                        localStorage.clear()
                        swal({
                        title: "La recaudación total del día fue $"+RecaudacionDiaria,
                        icon: 'success',
                        text: 'Se eliminaron los registros.'
                        })
                        for (item of lista.children){
                                item.remove()}
                }
                })
}


// boton simple que muestra el saldo recaudado hasta el momento como notificación
ckeck.onclick = () => {
        Toastify({
                text: "La recaudación diaria hasta el momento es de: \n$"+RecaudacionDiaria,
                gravity: "bottom",
                duration: 1000,
                newWindow: false,
                offset: {
                  x: 30, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                  y: 180 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                },
        }).showToast();
}

console.log("end")

let input4 = document.getElementById("Input4").value;
let formu3 = document.getElementById("formulario3");
let clear = document.getElementById("clear")
let lista = []
let listado = document.getElementById("listaM");
let listulikey = []
let listulival = []
formu3.addEventListener("submit", gestion3)


function gestion3(event){

    event.preventDefault();
    input4 = document.getElementById("Input4").value;
    if (input4 == ""){
        console.log("no ingresaste nada titan!")
        return
    }
    

    fetch('datos/DB.json')
    .then((res)=>res.json())
    .then( (data)=> {

        console.log("len de las keys antes del recorrido de la db: "+listulikey.length+" "+listulival.length)


        for (let i=0; i<data.length; i++){
            for(item of Object.values(data[i])){
                
                if(item == input4){
                    listulikey.push((Object.keys(data[i])))
                    listulival.push((Object.values(data[i])))
                }
            }

        }
        if(listado.childElementCount != 0){

            console.log(listado.childNodes)
            console.log(Object.values(listado.childNodes).length)
            console.log("el ul tiene las siguientes Li: "+listado.childElementCount)
            console.log(listado.childNodes[1])

            for(let p=0; p<=Object.values(listado.childNodes).length; p++){
                console.log(listado.childNodes[p])
            }
        }
        console.log("len de las keys luego del recorrido de la db: "+listulikey.length+" "+listulival.length)
        //
        for (i=0; i<listulikey.length; i++){
            console.log(listulikey.length)
            for(let j=0; j<6; j++){
                listado = document.getElementById("listaM");
                li = document.createElement("li");
                li.innerHTML = listulikey[i][j]+":   "+listulival[i][j];
                listado.appendChild(li);
            }
            br = document.createElement("br");
            //li.innerHTML = ""
            listado.appendChild(br);
        }
    })
}
clear.onclick = () =>{
    location.reload()
}

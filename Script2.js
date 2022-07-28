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
    
    'algo'.includes
    fetch('datos/DB.json')
    .then((res)=>res.json())
    .then( (data)=> {

        for (let i=0; i<data.length; i++){

            for(let j=0; j<6;j++){
                if((JSON.stringify(Object.values(data[i])[j])).includes(input4)){
                    listulikey.push((Object.keys(data[i])))
                    listulival.push((Object.values(data[i])))
                
                }
            }//
        }

        for (i=0; i<listulikey.length; i++){
            console.log(listulikey.length)
            for(let j=0; j<6; j++){
                listado = document.getElementById("listaM");
                li = document.createElement("li");
                li.innerHTML = listulikey[i][j]+":   "+listulival[i][j];
                listado.appendChild(li);
            }
            br = document.createElement("br");
            listado.appendChild(br);
        }
    })
}
clear.onclick = () =>{
    location.reload()
}

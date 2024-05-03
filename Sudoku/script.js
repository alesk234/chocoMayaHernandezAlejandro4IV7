let medidacuadricula;

function reiniciasudoku(){
    for(let fila = 0; fila < medidacuadricula ; fila++){
        for(let col = 0; col < medidacuadricula; col++){
            const celdaid = `celda-${fila}-${col}`;
            const celda = document.getElementById(celdaid);
            celda.value="";
            celda.classList.remove("Resolver", "efecto", "entradausuario");
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const btnresolver = document.getElementById("btnresolver");
    btnresolver.addEventListener('click', resolverjuego );
    const btnreiniciar = document.getElementById("btnreiniciar");
    btnreiniciar.addEventListener('click', reiniciasudoku);


    const tablaSudoku = document.getElementById("tabla-sudoku");
    medidacuadricula = 9;
    
    for (let fila = 0; fila < medidacuadricula; fila++) {
        const nuevafila = document.createElement("tr");
    
        for (let col = 0; col < medidacuadricula; col++) {
            const celda = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "celda";
            input.id = `celda-${fila}-${col}`;

            //validacion en tiempo real 
            input.addEventListener('input', function(event){
                validarentrada(event , fila, col);
            });

            celda.appendChild(input);
            nuevafila.appendChild(celda);
        }
        tablaSudoku.append(nuevafila);
    }
});

async function resolverjuego() {
    const medidacuadricula = 9;
    const listasudoku = [];
    //llenamos los valores del tablero
    for (let fila = 0; fila < medidacuadricula; fila++) {
        listasudoku[fila] = [];

        for (let col = 0; col < medidacuadricula; col++) {
            const celdaid = `celda-${fila}-${col}`;
            const celdavalor = document.getElementById(celdaid).value;
            listasudoku[fila][col] = celdavalor !== "" ? parseInt(celdavalor) : 0
        }
    }

    //identificamos las celda sque ingresa el usuario
    for (let fila = 0; fila < medidacuadricula; fila++) {

        for (let col = 0; col < medidacuadricula; col++) {
            const celdaid = `celda-${fila}-${col}`;
            const celda = document.getElementById(celdaid);

            if (listasudoku[fila][col] !== 0) {
                celda.classList.add("entradausuario");
            }
        }
    }

    //una vez resuleto el juego mostramos la solucion del tablero 
    if(sudoku(listasudoku)){
        for(let fila = 0; fila < medidacuadricula; fila ++){
            for(let col = 0 ; col < medidacuadricula; col++){
                const celdaid = `celda-${fila}-${col}`;
                const celda = document.getElementById(celdaid);

                if(!celda.classList.contains("entradausuario")){
                    celda.value = listasudoku[fila][col];
                    celda.classList.add("resolverefecto");
                    await efectoretraso(20);
                }
            }
        }
    } else{
        alert("no tiene solucion el juego")
    }
}

//creamos funcion sudoku - solucionador
function sudoku(tablero){
    const medidacuadricula = 9

    for(let fila = 0; fila < medidacuadricula ; fila++){
        for(let col = 0 ; col < medidacuadricula ; col++){
            if(tablero[fila][col] ===0){
                for(let num = 1; num <= 9 ; num ++){
                    if(verificaconflictor(tablero,fila,col,num)){
                        tablero[fila][col] = num;

                        //intentamos resolverlo con recusrividad
                        if(sudoku (tablero)){
                            return true;
                        }

                        tablero[fila][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true
}

//funcion para verificar la solucion y evitar errores
function verificaconflictor(tablero, fila, col, num) {
    const medidacuadricula = 9
    //verificamos la fila y la columna 
    for(let i = 0; i < medidacuadricula; i++){
        if(tablero[fila][i] === num || tablero [i] [col] === num){
            return false;
        }
    }
    //verificamos la cuadricula 3x3
    const filainicio =Math.floor(fila / 3 )* 3;
    const colinicio = Math.floor(col / 3)*3;

    for(let i = filainicio; i< filainicio + 3 ; i++){

        for(let j = colinicio; j < colinicio + 3 ; j++){
            if(tablero [i][j] === num){
                return false;
            }
        }
    }
    return true;
}

//creamos funcion para llenar el tablero automaticamente

function efectoretraso(ms){
    return new Promise(sudoku => setTimeout(sudoku , ms))
}

//creamos funcion para validar la entrada
function validarentrada(event, fila, col){
    const celdaid = `celda-${fila}-${col}`;
    const celda = document.getElementById(celdaid);
    const valor = celda.value;

    if(!/^[1-9]$/.test(valor)){
       // alert ("El numero no es valido, ingresa un valor del 1-9");
        Swal.fire({
            icon: "warning",
            title: "El numero ["+ valor +"] no es valido, ingresa un valor del 1-9",
            showConfirmButton: false,
            timer : 2500
          })
        celda.value = "";
        return;
    }

    const numeroingresado = parseInt(valor);

    for(let i = 0; i < 9 ; i++){
        if(i !== col && document.getElementById(`celda-${fila}-${i}`).value == numeroingresado){
            Swal.fire({
                icon: "warning",
                title: "El numero ["+ numeroingresado +"], ya existe en la fila.",
                showConfirmButton: false,
                timer : 2500
              })
            celda.value = "";
            return;
        }
        
        if(i !== fila && document.getElementById(`celda-${i}-${col}`).value == numeroingresado){
            Swal.fire({
                icon: "warning",
                title: "El numero ["+ numeroingresado +"], ya existe en la columna.",
                showConfirmButton: false,
                timer : 2500
              })
            celda.value = "";
            return;
        }
    }
    const subcuadriculafilainicio = Math.floor(fila / 3) * 3;
    const subcuadriculacolinicio = Math.floor(col / 3) * 3;

    for(let i = subcuadriculafilainicio; i < subcuadriculafilainicio + 3; i++){
        for(let j = subcuadriculacolinicio; j < subcuadriculacolinicio +3; j++){ // aquí se corrige subcuadriculacolinicio
            if(i !== fila && j !== col && document.getElementById(`celda-${i}-${j}`).value == numeroingresado){ // también se corrige aquí
    
                Swal.fire({
                    icon: "warning",
                    title: "El numero ["+ numeroingresado +"], ya existe en la misma subcuadricula 3x3.",
                    showConfirmButton: false,
                    timer : 2500
                  })
                celda.value = "";
                return;
    
            }
        }
    }
    
}


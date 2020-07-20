const mat = { q0: { '0': 'q4', '1': 'q1' },
              q1: { '0': 'q2', '1': 'q1' },
              q2: { '0': 'q2', '1': 'q3' },
              q3: { '0': 'q2', '1': 'q1' },
              q4: { '0': 'q4', '1': 'q4' } }
var afd = true;

for(let j = 0; j < Object.keys(mat).length; j++){
    if (mat[`q${j}`][0].length > 2 || mat[`q${j}`][1].length > 2) afd = false;
}

console.table(mat);
afd === true ? console.log("Es AFD") : console.log("Es AFND");
console.log("Estado inicial: q0\nEstado de aceptación: q3\n");
console.log("Digite una cadena: ");

var stdin = process.openStdin();
var digito, i, estadoActual;

stdin.addListener("data", data => {
    i = 0;
    cadena = data.toString();
    digito = cadena.charAt(i);
    estadoActual = "q0";
    while(digito !== "\r"){
        if (estadoActual === "q0") estadoActual = mat["q0"][digito];
        else if (estadoActual === "q1") estadoActual = mat["q1"][digito];
        else if (estadoActual === "q2") estadoActual = mat["q2"][digito];
        else if (estadoActual === "q3") estadoActual = mat["q3"][digito];
        else estadoActual = mat["q4"][digito];
        i++;
        digito = cadena.charAt(i);
    }
    if(estadoActual === "q3") console.log("Se acepta la cadena "+ data.toString().trim() + "\n")
    else console.log("No se acepta la cadena "+ data.toString().trim() + "\n")
    console.log("Digite una cadena: ");
});

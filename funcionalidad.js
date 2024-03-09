
let usuario = [];
let contraseña = [];
let confirmacionContraseña = [];
let valordefault= document.getElementById("saldo");
let saldo= valordefault.textContent;
const movimientos = [];


function registroUsuarios() {
    // Obtener datos del formulario de registro
    let usuarioInput = document.getElementById('usuario').value;
    let contraseñaInput = document.getElementById('contraseña').value;
    let confirmacionContraseñaInput = document.getElementById('confirmacionContraseña').value;
    let alerta= document.getElementById("alerta");
    


    // Verificar si los campos están vacíos
    if (!usuarioInput || !contraseñaInput || !confirmacionContraseñaInput) {
        alerta.innerHTML="registre todos los campos";
        return;
    }

    // Verificar si el usuario ya está registrado
    if (usuario.indexOf(usuarioInput) !== -1) {
        alerta.innerHTML="el usuario ya esta registrado";
        return;
    }

    // Verificar si la contraseña coincide con la confirmación
    if (contraseñaInput !== confirmacionContraseñaInput) {
        alerta.innerHTML="la contraseña no coincide con la confirmacion";
        return;
    }else{
        alerta.innerHTML="ha sido registrado con exito ";
    }

    // Ingreso de datos a los arreglos
    usuario.push(usuarioInput);
    contraseña.push(contraseñaInput);
    confirmacionContraseña.push(confirmacionContraseñaInput);

    // Limpiar los campos del formulario
    document.getElementById('usuario').value = '';
    document.getElementById('contraseña').value = '';
    document.getElementById('confirmacionContraseña').value = '';
}

function ValidacionUsuario() {
    let user = document.getElementById("user").value;
    let password = document.getElementById("pasw").value;
    let alertatwo = document.getElementById("alerta2");

    // Buscar el usuario en el arreglo
    const index = usuario.indexOf(user);

    if (index !== -1 && contraseña[index] === password) {
        console.log("Credenciales válidas, redirigiendo...");
        window.location.href = "./InterfazCajero.html";
    } else {
        alertatwo.innerHTML = "Usuario y/o contraseña incorrecta";
    }
}


//FUNCIONALIDADES DE LOS BOTONES DEL CAJERO//



//funcionalidad para mostrar las tablas//
function MostrarRetiro(){
    tabla= document.getElementById("retirar");
    tabla.style.display= "table";
    document.getElementById("transferir").style.display = "none";
    document.getElementById("movimientos").style.display= "none";
}

function MostrarTranseferencia(){
    tabla2= document.getElementById("transferir");
    tabla2.style.display = "table"
    document.getElementById("retirar").style.display = "none";
    document.getElementById("movimientos").style.display= "none";
}
function MostrarMovimientos() {
    // Obtener la tabla de movimientos
    const tablaMovimientos = document.getElementById("movimientos");

    // Limpiar la tabla eliminando todas las filas excepto la primera (encabezados)
    while (tablaMovimientos.rows.length > 1) {
        tablaMovimientos.deleteRow(1);
    }

    // Mostrar los movimientos almacenados en el arreglo
    for (const movimiento of movimientos) {
        const row = tablaMovimientos.insertRow(1); 
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = movimiento.tipo;
        cell2.innerHTML = `$${movimiento.monto}`;
    }

    // Mostrar la tabla de movimientos y ocultar las otras
    tablaMovimientos.style.display = "table";
    document.getElementById("retirar").style.display = "none";
    document.getElementById("transferir").style.display = "none";
}


//FUNCIONALIDADES DE CADA MODULO//

function FuncionRetiro() {
    let saldoinsuficiente = document.getElementById("saldoinsuficiente");
    valor_retiro = parseInt(document.getElementById("valorRetiro").value);

    if (saldo >= valor_retiro) {
        saldo -= valor_retiro;
        document.getElementById("saldo").textContent = "$" + saldo;

        // Agregar el retiro como un movimiento
        const movimiento = {
            tipo: "Retiro",
            monto: valor_retiro,
        };
        movimientos.push(movimiento);

    } else {
        saldoinsuficiente.innerHTML = "Su saldo es insuficiente";
    }
    document.getElementById("valorRetiro").value = '';
}

//Funcionalidad para transferir y almacenar los datos//
function FuncionTransferencias() {
    const cuentaDestino = document.getElementById("cuentaDestino").value;
    const cantidadTransferir = parseInt(document.getElementById("cantidadTransferir").value);
    const alertaTrans = document.getElementById("alerta-transfer");

    if (cantidadTransferir <= 0) {
        alertaTrans.innerHTML= "Ingresa cantidad valida para transferir";
    }

    if (saldo < cantidadTransferir) {
        alertaTrans.innerHTML= "saldo insuficiente para la transferencia";
        return;
    }

    // Realizar la transferencia
    saldo -= cantidadTransferir;
    document.getElementById("saldo").textContent = saldo;

    // Agregar movimiento a la tabla
    const tablaMovimientos = document.getElementById("movimientos");
    const row = tablaMovimientos.insertRow(1); 
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    cell1.innerHTML = "Transferencia";
    cell2.innerHTML = `$${cantidadTransferir}`;

    // Agregar el movimiento al arreglo
    const movimiento = {
        tipo: "Transferencia",
        monto: cantidadTransferir,
    };
    movimientos.push(movimiento);

    // Limpiar los campos de transferencia
    document.getElementById("cuentaDestino").value = '';
    document.getElementById("cantidadTransferir").value = '';
}  











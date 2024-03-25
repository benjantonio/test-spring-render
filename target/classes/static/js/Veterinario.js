/*veterinarios al cargar pagina */
window.addEventListener('load', () => {
    obtenerVeterinarios()


})

/*obtener veterinarios */
const obtenerVeterinarios = async() => {
    try {
        res = await fetch(`http://localhost:3000/lista_veterinario`),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        console.log(json);

    } catch (error) {
        let message = err.statusText || "Ocurrio un error"

    }
}

/*COMPROBAR CORREO */
const comprobarCorreo = () => {
    const correos = []
    var correo = document.querySelector("#email").value
    var resultado = false
    console.log(correo)
    fetch(`http://localhost:3000/lista_veterinario`)
        .then(response => response.json())
        .then(json => console.log("json ", json))
        .catch(err => console.log(err))
    json.forEach(j => {
        correos.push(j.correo)
    })
    correos.forEach(c => {
        if (correo == c) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Correo Existente',
                text: 'El correo ya se encuentra registrado a un Veterinario. Cambie el correo ingresado e intentelo de nuevo ',
                showConfirmButton: true,
            })
            resultado = true
        }
    })

    return resultado
}


/*agregar veterinarios */
const agregarVeterinario = async() => {

    comprobarCorreo()
    console.log(comprobarCorreo())

    if (comprobarCorreo()) {
        console.log(true)
    } else {
        try {
            let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        nombre: document.querySelector("#nombre").value,
                        correo: document.querySelector("#email").value,
                        celular: document.querySelector("#celular").value,
                        id_perfil: document.querySelector("#perfil").value,
                        id_cli: document.querySelector("#id_cli").value,
                        clave: document.querySelector("#clave").value,
                    })
                },
                res = await fetch("http://localhost:3000/enviar_veterinario", options),
                json = await res.json();

            if (!res.ok) throw { status: res.status, statusText: res.statusText }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Veterinario Agregado con Exito!!',
                    showConfirmButton: false,
                    timer: 1500

                })
                setTimeout(retrasarReload, 1500);
            }
        } catch (error) {
            console.log(error)

        }
    }


};

/*eliminar veterinario */
const eliminarVet = (id, nombre) => {
    Swal.fire({
        position: 'center',
        icon: 'question',
        text: `¿Desea eliminar a ${nombre}?`,
        showCancelButton: true,
        cancelButtonColor: '#FF3333',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar',
        confirmButtonColor: '#09d882'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminar(id)
        }
    })
}

const eliminar = async(id) => {
    try {
        let options = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
            },
            res = await fetch(`http://localhost:3000/eliminar_veterinario/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            location.reload();
        }
    } catch (error) {
        console.log(err)

    }
}

/*obtener un veterinario */
const obtenerVet = async(id) => {
    try {
        res = await fetch(`http://localhost:3000/veterinario/${id}`),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        console.log(json);
        document.querySelector(".txtIdV").value = json.id_veterinario
        document.querySelector(".txtNombre").value = json.nombre_completo
        document.querySelector(".txtCorreo").value = json.correo
        document.querySelector(".txtCelular").value = json.celular
        document.querySelector(".txtIdCli").value = json.id_cliente_id

    } catch (error) {
        console.log(error)

    }
}

/*actualizar veterinario */
const actualizarVet = async() => {
    id = document.querySelector(".txtIdV").value;
    try {
        let options = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    nombre: document.querySelector(".txtNombre").value,
                    correo: document.querySelector(".txtCorreo").value,
                    celular: document.querySelector(".txtCelular").value,
                    id_cli: document.querySelector(".txtIdCli").value
                })
            },
            res = await fetch(`http://localhost:3000/actualizar_veterinario/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Veterinario Actualizado con Exito!!',
                showConfirmButton: false,
                timer: 1500

            })
            setTimeout(retrasarReload, 1500);
        }
    } catch (error) {
        console.log(error)

    }
}

/*retrasar recarga pagina */
function retrasarReload() {
    location.reload();
}

/*validar form agregar */
const expresion = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const inpustAV = document.querySelectorAll(".inputAV")
const nombreV = document.querySelector("#nombre")
const claveV = document.querySelector("#clave")
const emailV = document.querySelector("#email")
const celularV = document.querySelector("#celular")
const btnAV = document.querySelector("#btnAV")

nombreV.addEventListener('keyup', () => {
    if (nombreV.value.length < 10) {
        document.querySelector("#errorNV").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorNV").style = 'display:none;'
    }
})

claveV.addEventListener('keyup', () => {
    if (claveV.value.length < 5) {
        document.querySelector("#errorCV").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorCV").style = 'display:none;'
    }
})

emailV.addEventListener('keyup', () => {
    if (expresion.correo.test(emailV.value)) {
        document.querySelector("#errorCoV").style = 'display:none;'
    } else {
        document.querySelector("#errorCoV").style = 'display:block; color:red;'
    }
})

celularV.addEventListener('keyup', () => {
    if (celularV.value.length == 9) {
        document.querySelector("#errorCeV").style = 'display:none;'

    } else {
        document.querySelector("#errorCeV").style = 'display:block; color:red;'
    }
})

inpustAV.forEach(i => {
    i.addEventListener('keyup', () => {
        console.log("FUNCIONA KEYUP")
        if (nombreV.value.length < 10 || claveV.value.length < 5 || !expresion.correo.test(emailV.value) || celularV.value.length < 9) {

            btnAV.disabled = true;
        } else {
            btnAV.removeAttribute("disabled")
        }
    })
});

/*validar form modificar vet */
const nombre = document.querySelector(".txtNombre")
const correo = document.querySelector(".txtCorreo")
const celular = document.querySelector(".txtCelular")
const btnActVet = document.querySelector("#btnActVet")
const inputsVM = document.querySelectorAll(".inputVM")

nombre.addEventListener('keyup', () => {
    if (nombre.value.length < 10) {
        document.querySelector("#errorNMV").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorNMV").style = 'display:none;'
    }
})

correo.addEventListener('keyup', () => {
    if (!expresion.correo.test(correo.value)) {
        document.querySelector("#errorCoMV").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorCoMV").style = 'display:none;'
    }
})

celular.addEventListener('keyup', () => {
    if (celular.value.length != 9) {
        document.querySelector("#errorCeMV").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorCeMV").style = 'display:none;'
    }
})

inputsVM.forEach(i => {
    i.addEventListener('keyup', () => {
        console.log("FUNCIONA KEYUP")
        if (nombre.value.length < 10 || !expresion.correo.test(correo.value) || celular.value.length != 9) {

            btnActVet.disabled = true;
        } else {
            btnActVet.removeAttribute("disabled")
        }
    })
});
/*cargar mascotas */
window.addEventListener('load', () => {
    obtenerMascotas()
})

const obtenerMascotas = async() => {
    try {
        res = await fetch(`http://localhost:3000/lista_mascota`),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        console.log(json);

    } catch (error) {
        let message = err.statusText || "Ocurrio un error"

    }
}




/*funcion recargar pagina */
// const recargar = () => {
//     Swal.fire({
//         position: 'center',
//         icon: 'success',
//         title: 'Mascota agregada con exito!!',
//         showConfirmButton: false,
//         timer: 1500
//     })
//     setTimeout(retrasarReload, 1500)
// }

/*obtener una mascota */
const obtenerMascota = async(id) => {
    try {
        res = await fetch(`http://localhost:3000/mascota/${id}`),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        console.log(json);
        document.querySelector(".txtIdM").value = json.id_mascota
        document.querySelector(".perfilPet").src = json.img
        document.querySelector(".urlImgM").value = document.querySelector(".perfilPet").src
        document.querySelector(".txtNombre").value = json.nombre
        document.querySelector(".txtRaza").value = json.raza
        document.querySelector(".txtEdad").value = json.edad
        document.querySelector(".txtTipo").value = json.tipo
        document.querySelector(".txtIdCli").value = json.id_cliente_id

    } catch (error) {
        let message = err.statusText || "Ocurrio un error"

    }
}

/*actualizar mascota */
var formActMas = document.querySelector("#modMas")
formActMas.addEventListener('submit', function(e) {
    e.preventDefault();
    id = document.querySelector(".txtIdM").value
    const formData = new FormData(e.currentTarget)

    if (!e.currentTarget.imagen.value || e.currentTarget.imagen.value == undefined || e.currentTarget.imagen.value == "") {
        putMasSinImg();

    } else {
        fetch(`http://localhost:3000/actualizar_mascota/${id}`, {
                method: 'PUT',
                body: formData
            })
            .then((res) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Mascota Actualizada con Exito!!',
                    showConfirmButton: false,
                    timer: 1500

                })
                setTimeout(retrasarReload, 1500)
            })
            .catch((err) => ("Erorr ", err))
    }
})

const putMasSinImg = async() => {
    id = document.querySelector(".txtIdM").value;
    try {
        let options = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    nombre: document.querySelector(".txtNombre").value,
                    raza: document.querySelector(".txtRaza").value,
                    edad: document.querySelector(".txtEdad").value,
                    tipo: document.querySelector(".txtTipo").value,
                    id_cli: document.querySelector(".txtIdCli").value,
                    img: document.querySelector(".urlImgM").value
                })
            },
            res = await fetch(`http://localhost:3000/actualizar_mascota_si/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mascota Actualizada con Exito!!',
                showConfirmButton: false,
                timer: 1500

            })
            setTimeout(retrasarReload, 1500);
        }
    } catch (error) {
        console.log(error)

    }
}

/*agregar mascota */
var form = document.querySelector(".formMascota")
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)

    fetch("http://localhost:3000/enviar_mascota", {
            method: 'POST',
            body: formData
        })
        .then((res) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mascota agregada con exito!!',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(retrasarReload, 1500)
        })
        .catch((err) => ("Erorr ", err))
})

/*eliminar mascota */
const eliminarMascota = (id, nombre) => {
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
            res = await fetch(`http://localhost:3000/eliminar_mascota/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            location.reload();
        }
    } catch (error) {
        console.log(err)

    }
}

/*validar campos form agregar mascota */
const inputFile = document.querySelector(".fileImg")
const nombreA = document.querySelector(".txtNombreA")
const razaA = document.querySelector(".txtRazaA")
const edadA = document.querySelector(".txtEdadA")
const tipoA = document.querySelector(".txtTipoA")
const btnAgregarM = document.querySelector("#btnAgregraM")
const inputsM = document.querySelectorAll("#floatingInput")

nombreA.addEventListener('keyup', () => {
    if (nombreA.value.length < 2) {
        document.querySelector("#errorN").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorN").style = 'display:none;'
    }
})

razaA.addEventListener('keyup', () => {
    if (razaA.value.length < 3) {
        document.querySelector("#errorR").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorR").style = 'display:none;'
    }
})

tipoA.addEventListener('keyup', () => {
    if (tipoA.value.length < 3) {
        document.querySelector("#errorT").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorT").style = 'display:none;'
    }
})

inputsM.forEach(i => {
    i.addEventListener('keyup', () => {
        if (nombreA.value.length < 2 || razaA.value.length < 3 || tipoA.value.length < 3 || edadA.value.length == 0) {
            btnAgregarM.disabled = true
        } else {
            btnAgregarM.removeAttribute("disabled")
        }
    })
})

inputFile.addEventListener('change', () => {
    inputsM.forEach(i => {
        i.removeAttribute("disabled")
    });
})

/*validar campos actualizar */
const nombre = document.querySelector(".txtNombre")
const raza = document.querySelector(".txtRaza")
const edad = document.querySelector(".txtEdad")
const tipo = document.querySelector(".txtTipo")
const btnActualizar = document.querySelector("#btnActMas")
const inputsMo = document.querySelectorAll("#modMas #floatingInput")

nombre.addEventListener('keyup', () => {
    if (nombre.value.length < 2) {
        document.querySelector("#errorNM").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorNM").style = 'display:none;'
    }
})

raza.addEventListener('keyup', () => {
    if (raza.value.length < 3) {
        document.querySelector("#errorRM").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorRM").style = 'display:none;'
    }
})

tipo.addEventListener('keyup', () => {
    if (tipo.value.length < 3) {
        document.querySelector("#errorTM").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorTM").style = 'display:none;'
    }
})

inputsM.forEach(i => {
    i.addEventListener('keyup', () => {
        if (nombre.value.length < 2 || raza.value.length < 3 || tipo.value.length < 3 || edad.value.length == 0) {
            console.log("VACIO")
            btnActualizar.setAttribute("disabled", true)
        } else {
            btnActualizar.removeAttribute("disabled")
        }
    })
})

/*retrasar recarga */
function retrasarReload() {
    location.reload();
}
/*Crear Publicación*/
var form = document.querySelector(".formAdop")

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)

    fetch("http://localhost:3000/enviar_adopcion", {
            method: 'POST',
            body: formData
        })
        .then((res) => recargarPag())
        .catch((err) => ("Erorr ", err))
});

/*Eliminar publicacion */
const eliminarPublicacion = (id, nombre) => {
    Swal.fire({
        position: 'center',
        icon: 'question',
        text: `¿Desea eliminar la publicación de ${nombre}?`,
        showCancelButton: true,
        cancelButtonColor: '#FF3333',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar',
        confirmButtonColor: '#09d882'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarPubli(id)
        }
    })
}

const eliminarPubli = async(id) => {
    try {
        let options = {
                method: "DELETE"
            },
            res = await fetch(`http://localhost:3000/eliminar_adopcion/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            location.reload();
        }
    } catch (error) {
        console.log(err)

    }
}

/*obtener publicacion */
const obtenerPubli = async(id) => {
    try {
        res = await fetch(`http://localhost:3000/adopcion/${id}`),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }

        console.log(json);
        document.querySelector(".txtIdP").value = json.id_publicacion
        document.querySelector(".imgPubli").src = json.img
        document.querySelector(".urlImg").value = document.querySelector(".imgPubli").src
        document.querySelector(".txtNombreAdop").value = json.nombre
        document.querySelector(".txtCorreo").value = json.correo
        document.querySelector(".txtCelular").value = json.celular
        document.querySelector(".txtEdadPubli").value = json.edad
        document.querySelector(".txtTipoAP").value = json.tipo_animal
        document.querySelector(".txtComentario").value = json.comentario
        document.querySelector(".txtIdCliPubli").value = json.id_cliente_id

    } catch (error) {
        let message = err.statusText || "Ocurrio un error"

    }
}

/*actualizar publicacion*/
var formActPubli = document.querySelector("#formActPubli")
formActPubli.addEventListener('submit', (e) => {
    e.preventDefault();
    id = document.querySelector(".txtIdP").value
    console.log("imagen ", e.currentTarget.imagen.value)
    const formData = new FormData(e.currentTarget)

    if (!e.currentTarget.imagen.value || e.currentTarget.imagen.value == undefined || e.currentTarget.imagen.value == "") {
        putSinImg();

    } else {
        fetch(`http://localhost:3000/actualizar_adopcion/${id}`, {
                method: 'PUT',
                body: formData
            })
            .then((res) => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Publicación Actualizada con Exito!!',
                    showConfirmButton: false,
                    timer: 1500

                })
                setTimeout(retrasarReload, 1500)
            })
            .catch((err) => ("Erorr ", err))
    }
})

const putSinImg = async() => {
    id = document.querySelector(".txtIdP").value;
    try {
        let options = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    nombre: document.querySelector(".txtNombreAdop").value,
                    correo: document.querySelector(".txtCorreo").value,
                    edad: document.querySelector(".txtEdadPubli").value,
                    celular: document.querySelector(".txtCelular").value,
                    tipo: document.querySelector(".txtTipoAP").value,
                    id_cli: document.querySelector(".txtIdCliPubli").value,
                    comentario: document.querySelector(".txtComentario").value,
                    img: document.querySelector(".urlImg").value
                })
            },
            res = await fetch(`http://localhost:3000/actualizar_adopcion_si/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Publicación Actualizada con Exito!!',
                showConfirmButton: false,
                timer: 1500

            })
            setTimeout(retrasarReload, 1500);
        }
    } catch (error) {
        console.log(error)

    }
}

/*Recargar Pagina*/
const recargarPag = () => {
    console.log("Hecho")
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Publicación agregada con exito!!',
        showConfirmButton: false,
        timer: 1500
    })
    setTimeout(retrasarReload, 1500)
}

/*validar campos form agregar mascota */
const expresion = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const inputFileAP = document.querySelector(".imgAP")
const nombreAP = document.querySelector(".nombreAP")
const correoAP = document.querySelector(".correoAP")
const celularAP = document.querySelector(".celularAP")
const edadAP = document.querySelector(".edadAP")
const tipoAP = document.querySelector(".tipoAP")
const comentarioAP = document.querySelector(".comentarioAP")
const btnAP = document.querySelector(".btnAP")
const inputsAP = document.querySelectorAll(".formAdop input")

nombreAP.addEventListener('keyup', () => {
    if (nombreAP.value.length < 2) {
        document.querySelector("#errorNAP").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorNAP").style = 'display:none;'
    }
})

correoAP.addEventListener('keyup', () => {
    if (expresion.correo.test(correoAP.value)) {
        document.querySelector("#errorCAP").style = 'display:none;'
    } else {
        document.querySelector("#errorCAP").style = 'display:block; color:red;'
    }
})

celularAP.addEventListener('keyup', () => {
    if (celularAP.value.length != 9) {
        document.querySelector("#errorCEAP").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorCEAP").style = 'display:none;'
    }
})

edadAP.addEventListener('keyup', () => {
    if (edadAP.value.length > 1) {
        document.querySelector("#errorEAP").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorEAP").style = 'display:none;'
    }
})

tipoAP.addEventListener('keyup', () => {
    if (tipoAP.value.length < 3) {
        document.querySelector("#errorTAP").style = 'display:block; color:red;'
    } else {
        document.querySelector("#errorTAP").style = 'display:none;'
    }
})


inputsAP.forEach(i => {
    i.addEventListener('keyup', () => {
        if (nombreAP.value.length < 2 || !expresion.correo.test(correoAP.value) || celularAP.value.length != 9 || edadAP.value.length == 0 || tipoAP.value.length < 3) {
            btnAP.disabled = true
        } else {
            btnAP.removeAttribute("disabled")
        }
    })
})

inputFileAP.addEventListener('change', () => {
    inputsAP.forEach(i => {
        i.removeAttribute("disabled")
    });
})






/*Retrasar recarga pagina */

function retrasarReload() {
    location.reload();
}
var textAreaRes = document.querySelector('.respuestaForo')
const fondoNegroBlur = document.querySelector("#fondoNegroBlur2") /* fondo oscuro transparente */
const contenedorPublicacion = document.querySelector("#contenedorPublicacion")

const part1 = document.querySelector(".part1-foro")
const part2 = document.querySelector(".part2-foro")
const part3 = document.querySelector(".part3-foro")
const part4 = document.querySelector(".part4-foro")

const tituloNew = document.querySelector(".tituloNewText")
const descripcionNew = document.querySelector(".descripcionNewTxt")

const contenedorRespuesta = document.querySelector(".respuesta-on")
const contenedorRespuestaOff = document.querySelector(".respuesta-off")

const id_usuario_on = document.querySelector(".id_usuario_on")
const creadorPublicacionTxt = document.querySelector(".creadorPublicacionTxt")
const cantPublicacionesTxt = document.querySelector(".cantPublicacionesTxt")
const fechaPublicacionTxt = document.querySelector(".fechaPublicacionTxt")
const tituloPublicacionTxt = document.querySelector(".tituloPublicacionTxt")
const descripcionPublicacionTxt = document.querySelector(".descripcionPublicacionTxt")

const eliminarPublicacionBtn = document.querySelector(".eliminar-publicacion")



function limpiarRespuestas() {
    const elements = document.getElementById("zona-respuestas").getElementsByTagName("div");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
};

var id_publicacion_abierta;
function abrirPublicacion(id_cliente, id_publicacion, creador, fecha, hora, titulo, descripcion) {

    console.log("USER ON: ",id_usuario_on.innerHTML)
    id_publicacion_abierta= id_publicacion;
    creadorPublicacionTxt.innerHTML = creador;
    fechaPublicacionTxt.innerHTML = fecha + " " + hora;
    tituloPublicacionTxt.innerHTML = titulo;
    descripcionPublicacionTxt.innerHTML = descripcion;

    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/respuestas-publicacion/${id_publicacion}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
            success: function (response) {
                limpiarRespuestas();
                $.each(response, function (indice, fila) {

                    var fechaModif= fila.fecha.slice(0,10);
                    $('#zona-respuestas').append('<div id="zona-respuestas"><div class="respuesta-publicacion"><div style="text-align: center;"><h6>Respuesta: </h6><img class="img-respuesta" src="../static/img/person-resp-foro.png" %}" alt=""><p style="margin: 0;"><span style="font-size: 14px; font-weight: 300; color: #333333;">-'+ fila.nombres+" "+fila.apellidos +'</span></p><p style="margin: 0;"><span style="font-size: 14px; font-weight: 300; color: #333333;"> '+fila.hora+" hrs. / "+fechaModif+'</span> </p></div><div style="text-align: center;"><h5 style="color: #222222;">Respuesta:</h5><p style="font-size: 15px; color: #333333;"> '+fila.comentario+'</p></div>')

                });
            }
        })
    });

    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/total-publicaciones/${id_cliente}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
            success: function (response) {
                cantPublicacionesTxt.innerHTML = response[0].total;
            }
        })
    });


    var id_logeado = id_usuario_on.innerHTML;
    
    if( id_logeado == 0){
        contenedorRespuesta.setAttribute("style", "opacity: 0; display:none;");
        contenedorRespuestaOff.setAttribute("style", "opacity: 1; display:block;");
    }else{
        contenedorRespuesta.setAttribute("style", "opacity: 1; display:block;");
        contenedorRespuestaOff.setAttribute("style", "opacity: 0; display:none;");
    }

    contenedorPublicacion.setAttribute("style", "opacity: 1; display:block;");
    fondoNegroBlur.setAttribute("style", "opacity: 1; display:block;");
}

function abrirPublicacion2(id_cliente, id_publicacion, creador, fecha, hora, titulo, descripcion) {

    contenedorRespuesta.setAttribute("style", "opacity: 0; display:none;");
    contenedorRespuestaOff.setAttribute("style", "opacity: 0; display:none;");

    console.log("USER ON: ",id_usuario_on.innerHTML)
    id_publicacion_abierta= id_publicacion;
    creadorPublicacionTxt.innerHTML = creador;
    fechaPublicacionTxt.innerHTML = fecha + " " + hora;
    tituloPublicacionTxt.innerHTML = titulo;
    descripcionPublicacionTxt.innerHTML = descripcion;

    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/respuestas-publicacion/${id_publicacion}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
            success: function (response) {
                limpiarRespuestas();
                $.each(response, function (indice, fila) {

                    var fechaModif= fila.fecha.slice(0,10);
                    $('#zona-respuestas').append('<div id="zona-respuestas"><div class="respuesta-publicacion"><div style="text-align: center;"><h6>Respuesta: </h6><img class="img-respuesta" src="../static/img/person-resp-foro.png" %}" alt=""><p style="margin: 0;"><span style="font-size: 14px; font-weight: 300; color: #333333;">-'+ fila.nombres+" "+fila.apellidos +'</span></p><p style="margin: 0;"><span style="font-size: 14px; font-weight: 300; color: #333333;"> '+fila.hora+" hrs. / "+fechaModif+'</span> </p></div><div style="text-align: center;"><h5 style="color: #222222;">Respuesta:</h5><p style="font-size: 15px; color: #333333;"> '+fila.comentario+'</p></div>')

                });
            }
        })
    });

    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/total-publicaciones/${id_cliente}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
            success: function (response) {
                cantPublicacionesTxt.innerHTML = response[0].total;
            }
        })
    });


    eliminarPublicacionBtn.setAttribute("style", "opacity: 1; display:flex;");
    contenedorPublicacion.setAttribute("style", "opacity: 1; display:block;");
    fondoNegroBlur.setAttribute("style", "opacity: 1; display:block;");
}

function eliminarPublicacion(){

    Swal.fire({
        position: 'center',
        icon: 'warning',
        text: `¿Desea eliminar esta publicación?`,
        showCancelButton: true,
        cancelButtonColor: '#FF3333',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, eliminar.',
        confirmButtonColor: '#09d882'
    }).then((result) => {
        if (result.isConfirmed) {

        $(function () {
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/eliminar-respuestas/${id_publicacion_abierta}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
                success: function (response) {
                    $(function () {
                        $.ajax({
                            type: 'DELETE',
                            url: `http://localhost:3000/eliminar-publicacion/${id_publicacion_abierta}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
                            success: function (response) {
                                location.reload();
                            }
                        })
                    });
                }
            })
        });
            
        }
    })

    
    
}

function enviarRespuesta() {
    

    var fechaActual = moment().format("YYYY-MM-DD");
    var horaActual = moment().format("HH:mm:ss");
    var comentario;
    if (textAreaRes.innerHTML = "") {
        comenario = " ";
    } else {
        comentario = textAreaRes.value;
    }

    try {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                fecha: fechaActual,
                hora: horaActual,
                comentario: comentario,
                id_cliente: id_usuario_on.innerHTML,
                id_publicacion: id_publicacion_abierta
            })
        },
            res = fetch(`http://localhost:3000/agregar_Respuesta_Foro/`, options),
            json = res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText }
    } catch (error) {

            
            $.ajax({
                type: 'GET',
                url: `http://localhost:3000/respuestas-publicacion/${id_publicacion_abierta}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
                success: function (response) {
                    console.log("TAMAÑO RESPONSE",response.length)
                    actualizarCantResp(response.length);
                }
            });

            function actualizarCantResp(tamaño){
                try {
                    let options = {
                            method: "PUT",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                id: id_publicacion_abierta,
                                respuestas: tamaño
                            })
                        },
                        res = fetch(`http://localhost:3000/agregar-total-respuestas/`, options),
                        json = res.json();
                    if (!res.ok) throw { status: res.status, statusText: res.statusText }
                } catch (error) {
                    console.log("ACTUALICE RESPUESTAS")
                }
            }
           



        Swal.fire({
            position: 'center',
            icon: 'success',
            text: `Se ha agregado la respuesta.`,
            showCancelButton: false,
            cancelButtonColor: '#FF3333',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#09d882'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })
    }
}

function abrirAgregarPublicacion() {
    part1.setAttribute("style", "opacity: 0; display:none;");
    part2.setAttribute("style", "opacity: 0; display:none;");
    part3.setAttribute("style", "opacity: 1; display:block;");
    part4.setAttribute("style", "opacity: 0; display:none;");
}

function abrirVerPublicaciones() {
    part1.setAttribute("style", "opacity: 0; display:none;");
    part2.setAttribute("style", "opacity: 0; display:none;");
    part3.setAttribute("style", "opacity: 0; display:none;");
    part4.setAttribute("style", "opacity: 1; display:block;");
}



function reiniciarPag(){
    location.reload();
};

function agregarPublicacion(){
    if(tituloNew.value.length <= 6){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El Titulo ingresado es demasiado corto.'
          })
    }else if (descripcionNew.value.length <= 6) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La descripción ingresada es demasiado corta.'
          })
    }else{
        var fechaActual = moment().format("YYYY-MM-DD");
        var horaActual = moment().format("HH:mm");
        var id_logeado = id_usuario_on.innerHTML;
        try {
            let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    titulo: tituloNew.value,
                    fecha: fechaActual,
                    hora: horaActual,
                    mensaje: descripcionNew.value,
                    id_cliente: id_logeado
                })
            },
                res = fetch(`http://localhost:3000/agregar_Publicacion_Foro/`, options),
                json = res.json();
            if (!res.ok) throw { status: res.status, statusText: res.statusText }
        } catch (error) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                text: `Se ha agregado la publicación con éxito.`,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#09d882'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            })
        }
    }
}


function cerrarPublicacion() {
    fondoNegroBlur.setAttribute("style", "opacity: 0; display:none;");
    contenedorPublicacion.setAttribute("style", "opacity: 0; display:none;");

}
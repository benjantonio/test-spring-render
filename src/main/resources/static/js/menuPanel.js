/* VARIABLES DE MENU RESPONSIVO */
const sideMenu = document.querySelector("aside");

/* Botones Abrir / Cerrar Menú */
const menuBtnCli = document.querySelector("#menu-btncli");
const closeBtnCli = document.querySelector("#close-btncli");

/* VARIABLES PARA ABRIR TABS ( Son los botones del Menú y las vistas de los tabs)*/
const fondoNegroBlur = document.querySelector("#fondoNegroBlur") /* fondo oscuro transparente */

/* Yo */
const yoBtn = document.querySelector("#yo-btn")
const yoTab = document.querySelector("#tabYo")

/* Mis Mascotas */
const misMascotasBtn = document.querySelector("#misMascotas-btn")
const misMascotasTab = document.querySelector("#tabMisMascotas")


const cerrarModPetBtn = document.querySelector(".btnModCerrar")

/* Imagenes Perfil Modificar Mascotas */
const perfilPerroImg = document.querySelector(".perfilPetPerro")
const perfilGatoImg = document.querySelector(".perfilPetGato")
const perfilExoticoImg = document.querySelector(".perfilPetExotico")

/* Botones Tipo de Mascota */
const tipoPetPerroBtn = document.querySelector(".tipoPerroBtn")
const tipoPetGatoBtn = document.querySelector(".tipoGatoBtn")
const tipoPetExoticoBtn = document.querySelector(".tipoExoticoBtn")

/*Mis adopciones */
const btnAdopciones = document.querySelector("#misAdopciones-btn")
const tabAdopciones = document.querySelector("#tabMisAdopciones")


/* Historial Citas */
const historialCitasBtn = document.querySelector("#historialCitas-btn")
const historialCitasTab = document.querySelector("#tabHistorialCitas")

/* Botón Abrir y Cerrar Detalle */
const detalleCitaBtn = document.querySelector("#detalleCita-btn")
const cerrarDetalleCitaBtn = document.querySelector("#cerrar-detalle-btn")

/* Contenedores */
const contDetalleCita = document.querySelector("#contenedorDetalle") /* ventana del detalle */

/* Contenedor Valoración */
const ventanaNoValorado = document.querySelector("#noValorado")
const ventanaValorado = document.querySelector("#valorado")

/* Botones de Valoración */
const val1Btn = document.querySelector("#voto1")
const val2Btn = document.querySelector("#voto2")
const val3Btn = document.querySelector("#voto3")
const val4Btn = document.querySelector("#voto4")
const val5Btn = document.querySelector("#voto5")

/* =================================================================================================================== */

/* BOTONES RESPONSIVOS */

/* Botón Abrir Menú */
menuBtnCli.addEventListener('click', () => {
    sideMenu.style = 'display:block;';
});

/* Botón Cerrar Menú */
closeBtnCli.addEventListener('click', () => {
    sideMenu.style = 'display:none;';
});

/* ============================================================================= */

/* MOSTRAR/OCULTAR TABS PANEL CLIENTE*/


/* ============================ YO =================================*/

/* Ventana "Yo" */
yoBtn.addEventListener('click', () => {
    yoTab.style = 'display:block;'
    misMascotasTab.style = 'display:none;';
    historialCitasTab.style = 'display:none;';
    tabAdopciones.style = 'display:none;'
});

/* ======================= MIS MASCOTAS ============================*/

/* Ventana "Mis Mascotas" */
misMascotasBtn.addEventListener('click', () => {
    misMascotasTab.style = 'display:block;';
    tabAdopciones.style = 'display:none;'
    yoTab.style = 'display:none;'
    historialCitasTab.style = 'display:none;';

});

/*Funciones Adopciones */
btnAdopciones.addEventListener('click', () => {
    tabAdopciones.style = 'display:block;'
    yoTab.style = 'display:none;'
    misMascotasTab.style = 'display:none;';
    historialCitasTab.style = 'display:none;';

})

// /* ======================= HISTORIAL DE CITAS ============================*/

/* Ventana "Historial Citas" */
historialCitasBtn.addEventListener('click', () => {
    historialCitasTab.style = 'display:block;';
    misMascotasTab.style = 'display:none;';
    yoTab.style = 'display:none;';
    tabAdopciones.style = 'display: none;';
});


////////////////////////////////////////////////////////////////////////////////////////////

/* FUNCIONES */

const txtFecha = document.querySelector(".txtFecha")
const txtMotivo = document.querySelector(".txtMotivo")
const txtNombreMascota = document.querySelector(".txtNombreMascota")
const txtTipoMascota = document.querySelector(".txtTipoMascota")
const txtNombreVet = document.querySelector(".txtNombreVet")
const txtCentroMedico = document.querySelector(".txtCentroMedico")
const txtTratamiento = document.querySelector(".txtTratamiento")
const txtComentario = document.querySelector(".txtComentarioVet")
const tituloValoracion = document.querySelector(".tituloValoracion")

/* Abrir detalle Cita su botón */
var id_cita_abierta;

function abrirDetalleCita(id_cita, fecha, motivo, nombreMascota, tipoMasota, nombreVet, centroMedico, tratamiento, comentario, valoracionActual) {
    id_cita_abierta = id_cita;
    txtFecha.innerHTML = fecha;
    txtMotivo.innerHTML = motivo;
    txtNombreMascota.innerHTML = nombreMascota;
    txtTipoMascota.innerHTML = tipoMasota;
    txtNombreVet.innerHTML = nombreVet;
    txtCentroMedico.innerHTML = centroMedico;
    txtTratamiento.innerHTML = tratamiento;
    txtComentario.innerHTML = comentario;

    if (valoracionActual > 0) {
        tituloValoracion.innerHTML = "¡Gracias por tus <span style='color: #208ce9;'>" + valoracionActual + "</span> patitas! "
        ventanaNoValorado.style = 'display:none;';
        ventanaValorado.style = 'display:block;';
    } else {
        ventanaNoValorado.style = 'display:block;';
        ventanaValorado.style = 'display:none;';
    }

    fondoNegroBlur.setAttribute("style", "opacity: 1; display:block; ");
    contDetalleCita.setAttribute("style", "opacity: 1; display:block;");
}



/////////////////////////////////////////////////////////////////////

/* Ocultar detalle Cita con click en botón Regresar */
cerrarDetalleCitaBtn.addEventListener('click', () => {
    fondoNegroBlur.setAttribute("style", "opacity: 0; display:none;");
    contDetalleCita.setAttribute("style", "opacity: 0; display:none;");
});

/* Valorar Veterinario en el Detalle */

function agregarValoracion(valoracion) {
    try {
        let options = {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    id: id_cita_abierta,
                    valoracion: valoracion
                })
            },
            res = fetch(`http://localhost:3000/valorar_cita_concluida/`, options),
            json = res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText }
    } catch (error) {
        tituloValoracion.innerHTML = "¡Gracias por tus <span style='color: #208ce9;'>" + valoracion + "</span> patitas! "
        ventanaNoValorado.style = 'display:none;';
        ventanaValorado.style = 'display:block;';
        setTimeout(function() {
            location.reload();
        }, 3000);
    }


}

/* Ocultar ventanas emergentes con click en FONDO NEGRO BLUR */
fondoNegroBlur.addEventListener('click', () => {
fondoNegroBlur.setAttribute("style", "opacity: 0; display:none;");
contDetalleCita.setAttribute("style", "opacity: 0; display:none;");
});




function enviarAnchoWeb() {
    let ancho = document.documentElement.clientWidth;

    if (ancho >= 751) {
        console.log("ANCHO ES MAYOR A 750")
        sideMenu.style = 'display:block;';
    } else {
        sideMenu.style = 'display:none;';
    }
}

function eliminarCitaEspera(id_cit) {
    Swal.fire({
        position: 'center',
        icon: 'warning',
        text: `¿Desea cancelar su hora médica?`,
        showCancelButton: true,
        cancelButtonColor: '#FF3333',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar.',
        confirmButtonColor: '#09d882'
    }).then((result) => {
        if (result.isConfirmed) {

            $(function() {
                $.ajax({
                    type: 'DELETE',
                    url: `http://localhost:3000/eliminar_cita_pendiente/${id_cit}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
                    success: function(response) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            text: `Se cancelado su hora con éxito.`,
                            showCancelButton: false,
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#09d882'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })
                    }
                })
            });

        }
    })
}
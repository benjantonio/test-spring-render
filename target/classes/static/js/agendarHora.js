var motivoConsulta = document.getElementById("consulta");
var mascota = document.getElementById("mascota");
var comuna = document.getElementById("comuna");
var centros = document.getElementById("centroA");
var veterinarios = document.getElementById("veterinario")
var btnContinuarApagado = document.querySelector(".btnContinuarApagado");
var btnContinuar = document.querySelector(".btnContinuar");
var mostrarcuadrito = document.querySelector(".cuadrito2");

var nombreVet = document.querySelector(".nombreVet");
var clinicaVet = document.querySelector(".clinicaVet");
var cantPatitas = document.querySelector(".cantPatitas");
var diaConsulta = document.getElementById("diaConsulta");
var horaConsulta = document.getElementById("horaConsulta");
var fotoVet = document.querySelector(".fotoVet");
var btnFinal = document.querySelector(".btnFinal");
var btnFinalDeshabilitado = document.querySelector(".btnFinalDeshabilitado");
var btnCancelar = document.querySelector(".btnCancelar");


var fondoNegroBlur = document.querySelector(".fondoNegroBlur");
var detalleFinal = document.querySelector(".detalleFinal");
var centroR = document.querySelector(".centroR");
var nombreVetR = document.querySelector(".nombreVetR");
var motivoConsultaR = document.querySelector(".motivoConsultaR");
var mascotaR = document.querySelector(".mascotaR");
var fechaR = document.querySelector(".fechaR");
var horaR = document.querySelector(".horaR");
var direccionR = document.querySelector("#direccionR");
var correoR = document.querySelector("#correoR")
var nombreCliente = document.querySelector(".nombreCliente");
var correoCliente = document.querySelector(".correoCliente");

let idCentroSelect;
let idComunaSelect;
let idVeterinarioSelect;
let idDiaConsulta;
let idCentro

/*CUANDO HAYA UN CAMBIO EN SELECT MOTIVO CONSULTA*/
motivoConsulta.addEventListener('change', () => {
    mascota.disabled = false;
})

/*CUANDO HAYA UN CAMBIO EN SELECT MASCOTA*/
mascota.addEventListener('change', () => {
    centros.disabled = false;
})

/****************************************************************************************************************************/
/********************************************** CENTROS Y VETERINARIOS ******************************************************/
/****************************************************************************************************************************/

/*CUANDO SE REALICE UN CAMBIO EN EL SELECT "CENTROS" (centroA EN HTML)*/
centros.addEventListener('change', () => {

    limpiarSelectFecha();
    limpiarSelectHoras();
    limpiarPatitas();
    limpiarInfoVet();

    mostrarcuadrito.setAttribute("style", "display:none;");


    /*Guardo la información que recibe el SELECT centroA y habilito el SELECT veterinarios*/
    idCentroSelect = centros.value;
    veterinarios.disabled = false;

    /*Limpio el SELECT veterinarios cuando no encuentra elementos*/
    function limpiarSelectVeterinarios() {
        const elements = document.getElementById("veterinario").getElementsByTagName("option");
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    /*Llamar a los veterinarios segun centro médico*/
    $(function() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/veterinarioCentro/${idCentroSelect}`,
            success: function(response) {
                for (var i = 0; i < veterinarios.length; i++) {
                    if (veterinarios.options[i].text != "Selecciona un veterinario") {
                        veterinarios.remove(i)
                    }
                }

                limpiarSelectVeterinarios();

                $.each(response, function(indice, fila) {
                    $('#veterinario').append("<option value='" + fila.id_veterinario + "'>" + fila.nombre_completo + "</option>")
                });

                if (response.length == 0) {
                    $('#veterinario').append("<option value='sinVet'>" + "No existen veterinarios" + "</option>")

                    btnContinuar.setAttribute("style", "display:none; ");
                    btnContinuarApagado.setAttribute("style", "display:flex; ");

                    mostrarcuadrito.setAttribute("style", "display:none; ");
                } else {
                    btnContinuar.setAttribute("style", "display:flex; ");
                    btnContinuarApagado.setAttribute("style", "display:none; ");
                }
            }
        })
    })

});

/* Limpiar Fechas */
function limpiarSelectFecha() {
    const elements = document.getElementById("diaConsulta").getElementsByTagName("option");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
};

btnContinuar.addEventListener('click', () => {
    var vetSeleccionado = veterinarios.options[veterinarios.selectedIndex].text;
    nombreVet.innerHTML = vetSeleccionado;

    fotoVet.setAttribute("style", "opacity: 1;");

    mostrarcuadrito.setAttribute("style", "display:block; ");
    limpiarSelectFecha();
    buscarFechas();
    mostrarValoracion();
});

/****************************************************************************************************************************/
/************************************************** FECHAS Y HORAS **********************************************************/
/****************************************************************************************************************************/
function fechaMenor(fechaMenor, fechaMayor) {

    if (fechaMenor < fechaMayor) {
        return true;
    } else {
        return false;
    }
}


/*CUANDO SE REALICE UN CAMBIO EN EL SELECT "veterinarios"*/
veterinarios.addEventListener('change', () => {

    btnFinal.setAttribute("style", "display:none; ");
    btnFinalDeshabilitado.setAttribute("style", "display:flex; ");
    diaConsulta.disabled = true;
    horaConsulta.disabled = true;

    limpiarSelectFecha();
    limpiarSelectHoras();
    limpiarPatitas();
    limpiarInfoVet();
});

function limpiarInfoVet() {
    fotoVet.setAttribute("style", "opacity: 0;");
    nombreVet.innerHTML = "";

}


function buscarFechas() {

    eliminarFechasVencidas();

    const listaFechasDisponibles = [];

    /* Guardo id de veterinario seleccionado */
    idVeterinarioSelect = veterinarios.value;

    /* Llamar horas disponible según veterinario seleccionado */
    $(function() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/fechasDisponibles/${idVeterinarioSelect}`,
            success: function(response) {
                console.log("RESCATE LAS HORAS DISPONIBLES")
                var fechaNueva;

                $.each(response, function(indice, fila) {

                    if (fila.fecha.slice(3, 5) == "01") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Enero" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "02") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Febrero" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "03") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Marzo" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "04") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Abril" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "05") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Mayo" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "06") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Junio" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "07") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Julio" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "08") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Agosto" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "09") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Septiembre" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "10") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Octubre" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "11") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Noviembre" + fila.fecha.slice(5, 11);
                    } else if (fila.fecha.slice(3, 5) == "12") {
                        fechaNueva = fila.fecha.slice(0, 3) + "Diciembre" + fila.fecha.slice(5, 11);
                    }


                    var existe = listaFechasDisponibles.some(fechaIn => fechaIn === fila.fecha);

                    /* extraigo fecha actual */
                    let date = new Date();
                    let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear();
                    console.log(output);

                    var fechaCita = moment(fila.fecha, "DD-MM-YYYY HH:mm").add(fila.hora.slice(0, 2), 'hours').add(fila.hora.slice(3), 'minutes');
                    var fechaActual = moment();

                    if (!existe && !fechaMenor(fechaCita.add(1, 'minutes'), fechaActual)) {
                        listaFechasDisponibles.push(fila.fecha)
                        console.log("AÑADI AL SELECT LA FECHA: ", fila.fecha)
                        $('#diaConsulta').append("<option value='" + fila.fecha + "'>" + fechaNueva + "</option>")
                    }
                });

                if (response.length == 0) {
                    $('#diaConsulta').append("<option value='sinFechas'>" + "No hay fechas disponibles" + "</option>")
                }


                buscarHoras();
            }
        })
    })
}

function eliminarFechasVencidas() {
    const listaCitasDisponibles = [];

    $(function() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/fechasDisponibles/${idVeterinarioSelect}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
            success: function(response) {
                $.each(response, function(indice, filaA) {
                    listaCitasDisponibles.push(filaA)
                });
                eliminarFecha(listaCitasDisponibles);
            }
        })
    });

}

function eliminarFecha(unaListaX) {
    unaListaX.forEach(citaDisponible => {
        var fechaCita = moment(citaDisponible.fecha, "DD-MM-YYYY HH:mm").add(citaDisponible.hora.slice(0, 2), 'hours').add(citaDisponible.hora.slice(3), 'minutes');
        var fechaActual = moment();
        var id_cita_disponible = citaDisponible.id_cita;



        if (fechaMenor(fechaCita.add(1, 'minutes'), fechaActual)) {
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:3000/eliminar_cita_disponible/${id_cita_disponible}`,
                success: function(response) {
                    fechaCita.add(-1, 'minutes')
                    console.log("HE ELIMINADO LA CITA ID:", citaDisponible.id_cita, fechaCita.format('DD-MM-YYYY HH:mm'))
                }
            });

        } else {
            fechaCita.add(-1, 'minutes')
            console.log("No eliminé: ", fechaCita.format('DD-MM-YYYY HH:mm'))
        }
    });
}

/* Limpiar Horas */
function limpiarSelectHoras() {
    const elements = document.getElementById("horaConsulta").getElementsByTagName("option");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

/*CUANDO SE REALICE UN CAMBIO EN EL SELECT "diaConsulta"*/
diaConsulta.addEventListener('change', () => {
    buscarHoras();

});

function buscarHoras() {
    idDiaConsulta = diaConsulta.value;
    horaConsulta.disabled = false;
    diaConsulta.disabled = false;
    horaConsulta.disabled = false;

    /*Listar horas disponibles según dia seleccionado*/
    $(function() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/horasDisponibles/${idDiaConsulta}/${idVeterinarioSelect}`,
            success: function(response) {

                limpiarSelectHoras();

                $.each(response, function(indice, fila) {
                    $('#horaConsulta').append("<option value='" + fila.id_cita + "'>" + fila.hora + "</option>")
                });

                btnFinal.setAttribute("style", "display:flex; ");
                btnFinalDeshabilitado.setAttribute("style", "display:none; ");

                if (response.length == 0) {
                    $('#horaConsulta').append("<option value='sinHoras'>" + "No existen horas disponibles" + "</option>")


                    btnFinal.setAttribute("style", "display:none; ");
                    btnFinalDeshabilitado.setAttribute("style", "display:flex; ");
                    diaConsulta.disabled = true;
                    horaConsulta.disabled = true;
                }
            }
        })
    })
}

/* =================== FUNCION VALORACION VETERINARIO ============= */

function limpiarPatitas() {
    const huellaActiva1 = document.querySelector("#huellaActiva1");
    const huellaActiva2 = document.querySelector("#huellaActiva2");
    const huellaActiva3 = document.querySelector("#huellaActiva3");
    const huellaActiva4 = document.querySelector("#huellaActiva4");
    const huellaActiva5 = document.querySelector("#huellaActiva5");
    const huellaInactiva1 = document.querySelector("#huellaInactiva1");
    const huellaInactiva2 = document.querySelector("#huellaInactiva2");
    const huellaInactiva3 = document.querySelector("#huellaInactiva3");
    const huellaInactiva4 = document.querySelector("#huellaInactiva4");
    const huellaInactiva5 = document.querySelector("#huellaInactiva5");


    const cantPatitas = document.querySelector("#cantPatitas");
    const msg1_valo = document.querySelector(".message-valoracion-1");
    const msg2_valo = document.querySelector(".message-valoracion-2");
    const desc1_valo = document.querySelector(".descripcion-valoracion-1");
    const desc2_valo = document.querySelector(".descripcion-valoracion-2");
    const desc3_valo = document.querySelector(".descripcion-valoracion-3");

    huellaActiva1.setAttribute("style", "display:none; ");
    huellaActiva2.setAttribute("style", "display:none; ");
    huellaActiva3.setAttribute("style", "display:none; ");
    huellaActiva4.setAttribute("style", "display:none; ");
    huellaActiva5.setAttribute("style", "display:none; ");

    huellaInactiva1.setAttribute("style", "display:none; ");
    huellaInactiva2.setAttribute("style", "display:none; ");
    huellaInactiva3.setAttribute("style", "display:none; ");
    huellaInactiva4.setAttribute("style", "display:none; ");
    huellaInactiva5.setAttribute("style", "display:none; ");

    msg1_valo.setAttribute("style", "display:none; ");
    msg2_valo.setAttribute("style", "display:none; ");
}

function mostrarValoracion() {


    /* Llamo a la API con el ID del veterinario*/

    $(function() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/valoracion2/${idVeterinarioSelect}`,
            success: function(response) {

                /* Declaro valor inicial valoración*/
                let valoracion = 0;
                valoracion = response[0].valoracion;

                const huellaActiva1 = document.querySelector("#huellaActiva1");
                const huellaActiva2 = document.querySelector("#huellaActiva2");
                const huellaActiva3 = document.querySelector("#huellaActiva3");
                const huellaActiva4 = document.querySelector("#huellaActiva4");
                const huellaActiva5 = document.querySelector("#huellaActiva5");
                const huellaInactiva1 = document.querySelector("#huellaInactiva1");
                const huellaInactiva2 = document.querySelector("#huellaInactiva2");
                const huellaInactiva3 = document.querySelector("#huellaInactiva3");
                const huellaInactiva4 = document.querySelector("#huellaInactiva4");
                const huellaInactiva5 = document.querySelector("#huellaInactiva5");


                const cantPatitas = document.querySelector("#cantPatitas");
                const msg1_valo = document.querySelector(".message-valoracion-1");
                const msg2_valo = document.querySelector(".message-valoracion-2");
                const desc1_valo = document.querySelector(".descripcion-valoracion-1");
                const desc2_valo = document.querySelector(".descripcion-valoracion-2");
                const desc3_valo = document.querySelector(".descripcion-valoracion-3");



                msg1_valo.style = 'display:block;';
                desc1_valo.setAttribute("style", "display:none; ");
                desc2_valo.setAttribute("style", "display:none; ");
                desc3_valo.setAttribute("style", "display:none; ");

                huellaInactiva1.setAttribute("style", "display:block; ");
                huellaInactiva2.setAttribute("style", "display:block; ");
                huellaInactiva3.setAttribute("style", "display:block; ");
                huellaInactiva4.setAttribute("style", "display:block; ");
                huellaInactiva5.setAttribute("style", "display:block; ");

                if (valoracion >= 1) {
                    huellaActiva1.style = 'display:block;';
                    huellaInactiva1.style = 'display:none;';
                    cantPatitas.innerHTML = valoracion;

                    msg1_valo.style = 'display:none;';
                    msg2_valo.style = 'display:grid;';
                    desc1_valo.style = 'display:block; text-align:center;';

                    if (valoracion >= 2) {
                        huellaActiva2.style = 'display:block;';
                        huellaInactiva2.style = 'display:none;';
                        desc1_valo.style = 'display:none;';
                        desc2_valo.style = 'display:block; text-align:center;';
                    }
                    if (valoracion >= 3) {
                        huellaActiva3.style = 'display:block;';
                        huellaInactiva3.style = 'display:none;';
                    }
                    if (valoracion >= 4) {
                        huellaActiva4.style = 'display:block;';
                        huellaInactiva4.style = 'display:none;';
                        desc2_valo.style = 'display:none;';
                        desc3_valo.style = 'display:block; text-align:center;';
                    }
                    if (valoracion >= 5) {
                        huellaActiva5.style = 'display:block;';
                        huellaInactiva5.style = 'display:none;';
                    }
                }
            }
        })





    })









}

btnFinal.addEventListener('click', () => {

    fondoNegroBlur.setAttribute("style", "display:block; opacity: 1;");
    detalleFinal.setAttribute("style", " display:block; opacity: 1;");

    mostrarDireccion();

    // var centroSeleccionado = centros.options[centros.selectedIndex].text;
    // centroR.innerHTML = centroSeleccionado;

    // var vetSeleccionado = veterinarios.options[veterinarios.selectedIndex].text;
    // nombreVetR.innerHTML = vetSeleccionado;

    // var motivoSeleccionado = motivoConsulta.options[motivoConsulta.selectedIndex].text;
    // motivoConsultaR.innerHTML = motivoSeleccionado;

    // var mascotaSeleccionado = mascota.options[mascota.selectedIndex].text;
    // mascotaR.innerHTML = mascotaSeleccionado;

    // var fechaSeleccionada = diaConsulta.options[diaConsulta.selectedIndex].text;
    // fechaR.innerHTML = fechaSeleccionada;

    // var HoraSeleccionada = horaConsulta.options[horaConsulta.selectedIndex].text;
    // horaR.innerHTML = HoraSeleccionada;
    obtenerCorreo()

    var centroSeleccionado = centros.options[centros.selectedIndex].text;
    centroR.value = centroSeleccionado;

    var vetSeleccionado = veterinarios.options[veterinarios.selectedIndex].text;
    nombreVetR.value = vetSeleccionado;

    var motivoSeleccionado = motivoConsulta.options[motivoConsulta.selectedIndex].text;
    motivoConsultaR.value = motivoSeleccionado;

    var mascotaSeleccionado = mascota.options[mascota.selectedIndex].text;
    mascotaR.value = mascotaSeleccionado;

    var fechaSeleccionada = diaConsulta.options[diaConsulta.selectedIndex].text;
    fechaR.value = fechaSeleccionada;

    var HoraSeleccionada = horaConsulta.options[horaConsulta.selectedIndex].text;
    horaR.value = HoraSeleccionada;

});

btnCancelar.addEventListener('click', () => {
    fondoNegroBlur.setAttribute("style", "display:none; opacity: o;");
    detalleFinal.setAttribute("style", " display:none; opacity: o;");
});

function limpiarVentana() {

}

function obtenerCorreo() {
    var idVeterinarioSelect = veterinarios.options[veterinarios.selectedIndex].value;
    $(function() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/veterinario/${idVeterinarioSelect}`,
            success: function(response) {
                correoR.value = response.correo
                correoVet = response.correo
            }
        })
    })

}

function mostrarDireccion() {

    idCentroSelect = centros.value;

    $(function() {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/direccion/${idCentroSelect}`,
            success: function(response) {

                console.log(response);
                if (response.length == 0) {
                    direccionR.value = "No tiene direccion, por favor contacte al centro veterinario."
                }

                direccionR.value = response[0].direccion;
                direccionCentroSel = response[0].direccion;

            }
        })
    })
}

function alertaConfirmacion() {
    Swal.fire({
        title: 'Agendar Hora',
        text: "¿Estas seguro que quieres agendar esta hora?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#27ba5f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {

            // var form = document.querySelector("#formHora")
            // form.addEventListener('submit', (e) => {
            //     e.preventDefault()
            // })

            anadirCita();


            Swal.fire(
                    'Hora agendada con éxito!',
                    '',
                    'success'
                )
                .then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
        }
    })
}

var idCitaDisponible;
var fechaSeleccionada;
var HoraSeleccionada;
var vetSeleccionado;
var motivoSeleccionado;
var mascotaSeleccionado;
var fechaModificada;

var correoVet;
var direccionCentroSel;

function cambiarFormatoFecha() {
    fechaSeleccionada = diaConsulta.options[diaConsulta.selectedIndex].text;

    var anno;
    var mes;
    var dia = fechaSeleccionada.slice(0, 2);

    if (fechaSeleccionada.includes("Enero")) {
        mes = "01";
    } else if (fechaSeleccionada.includes("Febrero")) {
        mes = "02"
    } else if (fechaSeleccionada.includes("Marzo")) {
        mes = "03"
    } else if (fechaSeleccionada.includes("Abril")) {
        mes = "04"
    } else if (fechaSeleccionada.includes("Mayo")) {
        mes = "05"
    } else if (fechaSeleccionada.includes("Junio")) {
        mes = "06"
    } else if (fechaSeleccionada.includes("Julio")) {
        mes = "07"
    } else if (fechaSeleccionada.includes("Agosto")) {
        mes = "08"
    } else if (fechaSeleccionada.includes("Septiembre")) {
        mes = "09"
    } else if (fechaSeleccionada.includes("Octubre")) {
        mes = "10"
    } else if (fechaSeleccionada.includes("Noviembre")) {
        mes = "11"
    } else if (fechaSeleccionada.includes("Diciembre")) {
        mes = "12"
    }

    if (fechaSeleccionada.includes("2022")) {
        anno = 2022;
    } else if (fechaSeleccionada.includes("2023")) {
        anno = 2023;
    }

    fechaModificada = anno + "-" + mes + "-" + dia;
}

function anadirCita() {
    try {

        

        idCitaDisponible = horaConsulta.options[horaConsulta.selectedIndex].value;
        HoraSeleccionada = horaConsulta.options[horaConsulta.selectedIndex].text;
        vetSeleccionado = veterinarios.value;
        motivoSeleccionado = motivoConsulta.options[motivoConsulta.selectedIndex].text;
        mascotaSeleccionado = mascota.value;

        // variable para email
        var centroMedico = centros.options[centros.selectedIndex].text;
        var veterinarioNombre = veterinarios.options[veterinarios.selectedIndex].text;
        cambiarFormatoFecha();
        enviarEmail(HoraSeleccionada, fechaSeleccionada, centroMedico, veterinarioNombre.trim(), direccionCentroSel, correoVet);

        console.log("id cita", idCitaDisponible, fechaModificada, HoraSeleccionada, motivoSeleccionado, mascotaSeleccionado, vetSeleccionado);

        let options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    fecha: fechaModificada,
                    hora: HoraSeleccionada,
                    motivo: motivoSeleccionado,
                    id_mascota: mascotaSeleccionado,
                    id_veterinario: vetSeleccionado
                })
            },
            res = fetch(`http://localhost:3000/anadir_cita_tomada/`, options),
            json = res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText }
    } catch (error) {
        console.log("Se añadio la cita");
        eliminarCitaDisponible(idCitaDisponible);
        
    }

    function eliminarCitaDisponible(idCitaDisponible) {

        console.log("Entre a eliminar cita");

        try {
            let options = {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json"
                    },
                },
                res = fetch(`http://localhost:3000/eliminar_cita_tomada/${idCitaDisponible}`, options),
                json = res.json();
            if (!res.ok) throw { status: res.status, statusText: res.statusText }
            else {}
        } catch (error) {
            Swal.fire({
                icon: 'success',
                title: '¡Cita finalizada con éxito!',
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#09d882'
            }).then((result) => {
                if (result.isConfirmed) {
                    location.reload();
                }
            });
        }
    }



    
}

function enviarEmail(laHora, laFecha, elCentro, elVeterinario, direccion, correoV){
    emailjs.send("service_go2wqeo","template_rm7miup",{
        nombreCliente: nombreCliente.innerHTML,
        hora: laHora,
        fecha: laFecha,
        veterinario: elVeterinario,
        centro: elCentro,
        direccion: direccion,
        correoVeterinario: correoV,
        correoCliente: correoCliente.innerHTML,
        });
}
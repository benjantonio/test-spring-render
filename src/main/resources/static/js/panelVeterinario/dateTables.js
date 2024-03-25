

$(document).ready(function () {

    $('#example').DataTable({
        "aaSorting": [],
        columns: [
            { key: 'Hora', sortable: true },
            { key: 'Fecha', sortable: true },
            { key: 'Motivo Consulta', sortable: true },
            { key: 'Mascota', sortable: true },
            { key: 'Dueño', sortable: true },
            { key: 'Estado', sortable: true },
            { key: 'Acción', sortable: false }
        ],



        responsive: true,

        "language": {

            "sProcessing": "Procesando...",
            "sLengthMenu": "Max. citas por página: _MENU_ ",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "No se encontraron citas registradas.",
            "sInfo": "Mostrando _END_ de un total de _TOTAL_ citas.",
            "sInfoEmpty": "Mostrando citas del 0 al 0 de un total de 0 citas.",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar",
            "sSearchInput": "form-control WAWAWA",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        }
    });
    $('#example input').addClass('uwaso');

    $('<div id="btnActualizar" style="display:flex;"><button id="actualizar-Pendientes" class="actualizarPendientes" style="margin: 0 10px 8px 30px; background:#ff9812; border: 0px; border-radius:20px; color:white; padding:2px 10px; box-shadow: 0.6px 1px 10px 0.6px #ff9812;" >Actualizar</button><p style="text-align: right; margin:3px 0 8px 5px; color: #ff9812; text-shadow: 1px 1px 1px #00000020; z-index: 99;">¡<span class="cantidadAtrasadas">1</span> Cita atrasada!</p></div><div></div>').appendTo('div.dataTables_filter');

    const buscarTabla = document.querySelector('.dataTables_filter')
    const btnActualizar = document.getElementById('btnActualizar');
    const cantidadAtrasadas = document.querySelector('.cantidadAtrasadas')

    const idLogeado3 = document.querySelector('.idVetLogeado');

    btnActualizar.setAttribute("style", "display: none;");
    btnActualizar.addEventListener('click', () => {
        location.reload();
    });

    //##############################################################################################//

    //CAMBIAR ESTADO CITAS ATRASADAS//
    function fechaMenor(fechaMenor, fechaMayor) {

        if (fechaMenor < fechaMayor) {
            return true;
        } else {
            return false;
        }
    }
    activo = false;
    contador = 0;
    contador2 = 0
    parar = false;
    cantAtras = 0;
    
    while (contador != 99998) {
        setTimeout(function () {
            console.log("\n[ITERACIÓN]");

            const listaCitasPendientes = [];
            $(function () {
                $.ajax({
                    type: 'GET',
                    url: `http://localhost:3000/lista_Horas_Pendientes/${idLogeado3.innerHTML}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
                    success: function (response) {
                        $.each(response, function (indice, fila) {
                            listaCitasPendientes.push(fila)
                        });
                        cambiarEstadoAtrasada(listaCitasPendientes);
                    }
                })
            });

            function cambiarEstadoAtrasada(unaListaX) {
                unaListaX.forEach(citaPendiente => {
                    var fechaCita = moment(citaPendiente.fecha.slice(0, 10), "YYYY-MM-DD").add(citaPendiente.hora.slice(0, 2), 'hours').add(citaPendiente.hora.slice(3), 'minutes');
                    var fechaActual = moment();
                    var id_cita_pendiente = citaPendiente.id_cita;

                    if (fechaMenor(fechaCita.add(1, 'minutes'), fechaActual) && citaPendiente.estado === 'En Espera') {
                        $.ajax({
                            type: 'GET',
                            url: `http://localhost:3000/actualizar_Horas_Pendientes/${id_cita_pendiente}`,
                            success: function (response) {
                                fechaCita.add(-1, 'minutes')
                                console.log("HE CAMBIADO EL ESTADO DE LA CITA ID:", citaPendiente.id_cita, fechaCita.format('YYYY-MM-DD HH:mm'))
                                console.log("cantidad atrasadas", cantAtras)
                                cantAtras++
                                cantidadAtrasadas.innerHTML=cantAtras;
                                btnActualizar.setAttribute("style", "display: flex;");
                                buscarTabla.setAttribute("style", "display:grid; grid-template-columns: auto auto auto; ")
                                activo = true;
                            }
                        });
                    } else {
                        fechaCita.add(-1, 'minutes')
                        console.log("En Espera: ", fechaCita.format('YYYY-MM-DD HH:mm'))
                    }
                });
            }
        }, contador * 3000);
        contador++
    }

    //RESPONSIVIDAD CONTENIDO DATETABLE//
    const rezise = () => {
        if (activo) {
            if (innerWidth < 1199) {
                buscarTabla.setAttribute("style", "display:grid; grid-template-columns: auto; ")
            } else {
                buscarTabla.setAttribute("style", "display:grid; grid-template-columns: auto auto auto; ")
            }
        }
    }
    addEventListener('resize', rezise)
    addEventListener('DOMContentLoaded', rezise)

});


//##############################################################################################//

/* ALERTA ELIMINAR CITA PENDIENTE */
const eliminarCita = (id, fecha, hora) => {
    Swal.fire({
        position: 'center',
        icon: 'question',
        text: `¿Desea eliminar la siguiente cita: ${hora} / ${fecha}?`,
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
/* CRUD ELIMINAR Cita Pendiente */
const eliminar = async (id) => {
    try {
        let options = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
        },
            res = await fetch(`http://localhost:3000/eliminar_cita_pendiente/${id}`, options),
            json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText }
        else {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cita eliminada con éxito.',
                showConfirmButton: true
            }).then((result) => {
                if (result.isConfirmed || swal.close) {
                    location.reload();
                }
            })
        }
    } catch (error) {
        console.log(err)

    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//#############################                                    #############################///////////////////////////////////////////////////////////////////////////////////////////////
//#########                            EJECUTAR CITA PENDIENTE                         #########///////////////////////////////////////////////////////////////////////////////////////////////
//#############################                                    #############################///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//======= ABRIR Y CARGAR CITA ======//
const fechaCitaPendiente = document.querySelector('.fechaCitaPendiente')
const motivoConsultaPendiente = document.querySelector('.motivoConsultaPendiente')
const nombreDuenoPendiente = document.querySelector('.nombreDuenoPendiente')
const contactoDueñoPendiente = document.querySelector('.contactoDueñoPendiente')
const nombreMascotaPendiente = document.querySelector('.nombreMascotaPendiente')
const edadMascotaPendiente = document.querySelector('.edadMascotaPendiente')
const tipoMascotaPendiente = document.querySelector('.tipoMascotaPendiente')
const razaMascotaPendiente = document.querySelector('.razaMascotaPendiente')
const ultimaCitaConcluida = document.querySelector('.ultimaCitaConcluida')

const contenidoIniciar = document.querySelector('.contenido-iniciar') /* INICIAR */
const contenidoIniciando = document.querySelector('.contenidoIniciando') /* INICIANDO */
const contenidoEnMarcha = document.querySelector('.contenidoEnMarcha') /* EN MARCHA */
const contadorIniciando = document.querySelector('.contadorIniciando')
const candado1 = document.getElementById('candado1')
const candado2 = document.getElementById('candado2')
const textoBloqueado1 = document.getElementById('textoBloqueado')
const textoBloqueado2 = document.getElementById('textoBloqueado2')
const titulo1 = document.getElementById('titulo-wrapper')
const titulo2 = document.getElementById('titulo-wrapper2')
const textAreaTratamiento = document.querySelector('.tratamientoVeterinario')
const textAreaComentario = document.querySelector('.comentarioVeterinario')

const fondoNegroBlur = document.querySelector("#fondoNegroBlur") /* fondo oscuro transparente */
const contenedorVerCita = document.querySelector(".contenedorDetalle") /* fondo oscuro transparente */

/* === CARGAR ULTIMA CITA CLIENTE === */
function cambiarUltimaCita(id_cliente, id_veterinario) {
    $(function () {
        $.ajax({
            type: 'GET',
            url: `http://localhost:3000/ultima_cita_concluida/${id_veterinario}/${id_cliente}`, // AQUI VA EL ID DEL VETERINARIO LOGEADO
            success: function (response) {
                if (response.length > 0) {
                    var ultimaCita = response[0].fecha + ' ' + response[0].hora + 'hrs'
                    ultimaCitaConcluida.innerHTML = ultimaCita;
                } else {
                    ultimaCitaConcluida.innerHTML = "Primera vez que viene";
                }
            }
        })
    });
}
/* === MOSTRAR CITA === */

var id_cli;
var id_vet;
var correo_dueno;
var correo_vet;
var nomb_vet;
function verCita(id_cliente, id_veterinario, fecha_cita, hora_cita, motivo_cita, nombre_dueno, apellido_dueno, contacto_dueno, nombre_mascota, edad_mascota, tipo_mascota, raza_mascota, mail_dueno,nombre_vet,mail_vet) {

    correo_dueno = mail_dueno;
    correo_vet = mail_vet;
    nomb_vet = nombre_vet;
    id_cli = id_cli;
    id_vet = id_vet;
    /* TEXTOS */
    cambiarUltimaCita(id_cliente, id_veterinario);
    fechaCitaPendiente.innerHTML = fecha_cita + ' | ' + hora_cita
    motivoConsultaPendiente.innerHTML = motivo_cita
    nombreDuenoPendiente.innerHTML = nombre_dueno + ' ' + apellido_dueno
    contactoDueñoPendiente.innerHTML = contacto_dueno
    nombreMascotaPendiente.innerHTML = nombre_mascota
    edadMascotaPendiente.innerHTML = edad_mascota
    tipoMascotaPendiente.innerHTML = tipo_mascota
    razaMascotaPendiente.innerHTML = raza_mascota

    /* MUESTRO VENTANA */
    fondoNegroBlur.setAttribute("style", "opacity: 1; display:block;");
    contenedorVerCita.setAttribute("style", "opacity: 1; display:block;");
}
/* === COMENZAR CITA === */
estadoComenzarCita = false;
function comenzarCita() {
    estadoComenzarCita = true;
    contenidoIniciar.setAttribute("style", "opacity: 0; display:none;");
    contenidoIniciando.setAttribute("style", "opacity: 1; display:grid;");

    var contador3 = 1;
    while (contador3 <= 3) {
        setTimeout(function () {
            contadorIniciando.innerHTML = contadorIniciando.innerHTML - 1;
            enMarcha(contadorIniciando.innerHTML);
        }, contador3 * 1000);
        contador3++
    }

    /* EN MARCHA */
    function enMarcha(contadorIni) {
        if (contadorIni == '0') {
            empezarDetener("Empezar");
            contenidoIniciando.setAttribute("style", "opacity: 0; display:0;");
            contenidoEnMarcha.setAttribute("style", "opacity: 1; display:grid;");
            textoBloqueado1.innerHTML = "Desbloqueado"
            textoBloqueado2.innerHTML = "Desbloqueado"
            titulo1.setAttribute("style", "color:#09d882;");
            titulo2.setAttribute("style", "color:#09d882;");
            textAreaTratamiento.disabled = false;
            textAreaComentario.disabled = false;
            textAreaTratamiento.placeholder = "Escribe un tratamiento...";
            textAreaComentario.placeholder = "Escribe un comentario..."
            candado1.innerHTML = "lock_open"
            candado2.innerHTML = "lock_open"
        }
    }
    /* FIN MARCHA */
}
/* Cancelar Cita Activada */
function cancelarCitaActiva() { /* Regreso para volver a Empezar */
    Swal.fire({
        position: 'center',
        icon: 'question',
        text: `¿Desea retroceder?`,
        showCancelButton: true,
        cancelButtonColor: '#FF3333',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, regresar',
        confirmButtonColor: '#09d882'
    }).then((result) => {
        if (result.isConfirmed) {
            empezarDetener("Detener");
            cronometro.innerHTML = "00:00:00";
            contadorIniciando.innerHTML = "3";
            estadoComenzarCita = false;
            contenidoIniciar.setAttribute("style", "opacity: 1; display:block;");
            contenidoIniciando.setAttribute("style", "opacity: 0; display:none;");
            contenidoEnMarcha.setAttribute("style", "opacity: 0; display:none;");
            textoBloqueado1.innerHTML = "Bloqueado"
            textoBloqueado2.innerHTML = "Bloqueado"
            titulo1.setAttribute("style", "color:#888888;");
            titulo2.setAttribute("style", "color:#888888;");
            textAreaTratamiento.disabled = true;
            textAreaComentario.disabled = true;
            textAreaTratamiento.value = "";
            textAreaComentario.value = "";
            textAreaTratamiento.placeholder = "Inicia para desbloquear...";
            textAreaComentario.placeholder = "Inicia para desbloquear..."
            textAreaTratamiento.style.height = "63px";
            textAreaComentario.style.height = "63px";
            candado1.innerHTML = "lock"
            candado2.innerHTML = "lock"
        }
    })
}

function alertaFinalizarCita() {
    Swal.fire({
        position: 'center',
        icon: 'warning',
        text: `¿Desea finalizar esta cita?`,
        showCancelButton: true,
        cancelButtonColor: '#FF3333',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, regresar',
        confirmButtonColor: '#09d882'
    }).then((result) => {
        if (result.isConfirmed) {
            finalizar();
            
        }
    })
}




var id_cit, id_cli, id_masc, id_vet, fech, hor, motiv;
function rescatarIds(id_cita, id_cliente, id_mascota, id_veterinario, fecha, hora, motivo) {
    var anno;
    var mes;
    var dia = fecha.slice(0,2).trim();
    var fechaModificada;

    if(dia.length == 1){
        dia = "0"+dia;
    }

    if (fecha.includes("Enero")){
        mes = "01";
    }
    else if(fecha.includes("Febrero")){
        mes = "02"
    }
    else if(fecha.includes("Marzo")){
        mes = "03"
    }
    else if(fecha.includes("Abril")){
        mes = "04"
    }
    else if(fecha.includes("Mayo")){
        mes = "05"
    }
    else if(fecha.includes("Junio")){
        mes = "06"
    }
    else if(fecha.includes("Julio")){
        mes = "07"
    }
    else if(fecha.includes("Agosto")){
        mes = "08"
    }
    else if(fecha.includes("Septiembre")){
        mes = "09"
    }
    else if(fecha.includes("Octubre")){
        mes = "10"
    }
    else if(fecha.includes("Noviembre")){
        mes = "11"
    }
    else if(fecha.includes("Diciembre")){
        mes = "12"
    }

    if(fecha.includes("2022")){
        anno=2022;
    }
    else if(fecha.includes("2023")){
        anno=2023;
    }

    fechaModificada = anno+"-"+mes+"-"+dia

    id_cit = id_cita;
    id_cli = id_cliente;
    id_masc = id_mascota;
    id_vet = id_veterinario;

    fech = fechaModificada;
    hor = hora;
    motiv = motivo;
}


function finalizar() {
    empezarDetener("Detener")
    try {
        let options = {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                tratamiento: textAreaTratamiento.value,
                comentario: textAreaComentario.value,
                fecha: fech,
                hora: hor,
                id_mascota: id_masc,
                id_veterinario: id_vet,
                motivo_consulta: motiv,
                duracion: cronometro.innerHTML,
                id_cliente: id_cli
            })
        },
            res = fetch(`http://localhost:3000/agregar_cita_concluida/`, options),
            json = res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText }
    } catch (error) {
        eliminarCitaRealizada(id_cit);
        console.log("CORREO2")
        console.log("correo dueno: ", correo_dueno)
            emailjs.send("service_uavzggg","template_vgwszek",{
                veterinario: nomb_vet,
                fecha: fech+" "+hor,
                mascota: nombreMascotaPendiente.innerHTML,
                tratamiento: textAreaTratamiento.value,
                comentario: textAreaComentario.value,
                correoVet: correo_vet,
                correoCliente: correo_dueno,
                });
    }

    function eliminarCitaRealizada(id){
        try {
            let options = {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
            },
                res = fetch(`http://localhost:3000/eliminar_cita_pendiente/${id}`, options),
                json = res.json();
            if (!res.ok) throw { status: res.status, statusText: res.statusText }
            else {
            }
        } catch (error) {
            Swal.fire(
                {
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

//################################################################################################################//

/* Función Cerrar Cita DESDE FONDO NEGRO BLUR*/
function cerrarCita() {
    if (!estadoComenzarCita) {
        fondoNegroBlur.setAttribute("style", "opacity: 0; display:none;");
        contenedorVerCita.setAttribute("style", "opacity: 0; display:none;");
    }
}

//##################################################################################################################################################################################//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* ======= INICIO CRONOMETRO ===== */
var cronometro = document.getElementById("crono");
var inicio = 0;
var timeout = 0;

function empezarDetener(elemento) {
    if (timeout == 0) {
        // empezar el cronometro

        elemento.value = "Detener";

        // Obtenemos el valor actual
        inicio = vuelta = new Date().getTime();

        // iniciamos el proceso
        funcionando();
    } else {
        // detemer el cronometro

        elemento.value = "Empezar";
        clearTimeout(timeout);
        timeout = 0;
    }
}
function funcionando() {
    // obteneos la fecha actual
    var actual = new Date().getTime();

    // obtenemos la diferencia entre la fecha actual y la de inicio
    var diff = new Date(actual - inicio);

    // mostramos la diferencia entre la fecha actual y la inicial
    var result = LeadingZero(diff.getUTCHours()) + ":" + LeadingZero(diff.getUTCMinutes()) + ":" + LeadingZero(diff.getUTCSeconds());
    document.getElementById('crono').innerHTML = result;

    // Indicamos que se ejecute esta función nuevamente dentro de 1 segundo
    timeout = setTimeout("funcionando()", 1000);
}
/* Funcion que pone un 0 delante de un valor si es necesario */
function LeadingZero(Time) {
    return (Time < 10) ? "0" + Time : + Time;
}

//################################################################################################################//


$(document).ready(function () {

    $('#example').DataTable({
        "aaSorting": [],
        columns: [
            { key: 'Fecha', sortable: true },
            { key: 'Hora', sortable: true },
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
            res = await fetch(`http://localhost:3000/eliminar_cita_disponible/${id}`, options),
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
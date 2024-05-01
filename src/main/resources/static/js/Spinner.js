function go_spinner(contenedor) {

    $("#" + contenedor).waitMe({
        effect: 'bounce', // El efecto de carga
        text: 'Cargando...', // El texto que se mostrará junto al indicador
        bg: 'rgba(255,255,255,0.7)', // El color de fondo del indicador
        color: '#000', // El color del texto del indicador
        maxSize: '', // El tamaño máximo del indicador
        source: '', // La ruta de la imagen de carga personalizada
        onClose: function () {} // La función a ejecutar cuando se cierra el indicador
    });

}

function hide_spinner(contenedor) {
    $("#" + contenedor).waitMe("hide");
}
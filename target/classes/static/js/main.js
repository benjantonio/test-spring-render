$(document).ready(function(){
    
    console.log("holaaaa")
    
    $('#idTabla').DataTable();
    
    
    
    $.getJSON("https://api.ipify.org?format=json", function(data) {
        var ipAddress = data.ip;
        // Envía la dirección IP al backend Spring Boot
        $.ajax({
            type: "POST",
            url: "/guardar-ip",
            data: { ip: ipAddress },  // Indica que el tipo de datos es texto plano
            success: function(response) {
                console.log("Dirección IP enviada correctamente al servidor.");
            },
            error: function(err) {
                console.error("Error al enviar la dirección IP al servidor:", err);
            }
        });
    });
    
});
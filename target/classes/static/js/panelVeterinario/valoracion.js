/* =================== FUNCION VALORACION VETERINARIO ============= */
const idLogeado2 = document.querySelector('.idVetLogeado').innerHTML;
console.log("idLogeado ====", idLogeado2)
/* Llamo a la API con el ID del veterinario*/
let urlValoracion = `http://localhost:3000/valoracion/${idLogeado2}`
fetch(urlValoracion)
  .then(response => response.json())
  .then(datos => verValoracion(datos))
  .catch(error => console.log(error))

/* Guardo valoración */
const verValoracion = (datos) => {
    /* Declaro valor inicial valoración*/
    let valoracion = 0;
    valoracion=datos[0].valoracion;

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
    
    
    if ( valoracion >= 1 ){
        huellaActiva1.style = 'display:block;';
        huellaInactiva1.style = 'display:none;';
        cantPatitas.innerHTML = valoracion;

        msg1_valo.style = 'display:none;';
        msg2_valo.style = 'display:grid;';
        desc1_valo.style = 'display:block; text-align:center;';

        if ( valoracion >= 2 ){
            huellaActiva2.style = 'display:block;';
            huellaInactiva2.style = 'display:none;';
            desc1_valo.style = 'display:none;';
            desc2_valo.style = 'display:block; text-align:center;';
        }
        if ( valoracion >= 3 ){
            huellaActiva3.style = 'display:block;';
            huellaInactiva3.style = 'display:none;';
        }
        if ( valoracion >= 4 ){
            huellaActiva4.style = 'display:block;';
            huellaInactiva4.style = 'display:none;';
            desc2_valo.style = 'display:none;';
            desc3_valo.style = 'display:block; text-align:center;';
        }
        if ( valoracion >= 5 ){
            huellaActiva5.style = 'display:block;';
            huellaInactiva5.style = 'display:none;';
        }
    }



}





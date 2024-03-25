var id = document.querySelectorAll(".idV")
var inputPAss = document.querySelectorAll(".passwordVet")
var btns = document.querySelectorAll(".entrarVet")
var btnsA = document.querySelectorAll("#verMas")
var clave = []

/*funciones al cargar pagina */
window.addEventListener('load', () => {
    obtenerVet()
    var inputPAss = document.querySelectorAll(".passwordVet")
    inputPAss.forEach(i => {
        i.addEventListener('keyup', () => {
            comprobarClaves()
        })
    })
    inputPAss.forEach(i => {
        i.value = ""
    });
    btnsA.forEach(btn => {
        btn.setAttribute("class", "desahabilitado");
    })

})

/*obtener veterinarios y sus claves */
const obtenerVet = async() => {
    for (let i = 0; i < id.length; i++) {
        try {
            res = await fetch(`http://localhost:3000/veterinario/${id[i].value}`),
                json = await res.json();

            if (!res.ok) throw { status: res.status, statusText: res.statusText }
            console.log(json.clave)


            clave.push(json.clave)


        } catch (error) {
            console.log(error)

        }

    }
    console.log(clave)
}

/*sweetalert*/
const avisoClaveIncorrecta = () => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Clave Incorrecta',
        showConfirmButton: true,
    })
    console.log("CLICK")
}


/**comprobar claves */
const comprobarClaves = () => {
    for (let i = 0; i < clave.length; i++) {
        if (inputPAss[i].value == clave[i]) {
            btns[i].removeAttribute('onclick')
            btnsA[i].removeAttribute("class");
        } else {
            btnsA[i].setAttribute("class", "desahabilitado");
        }
    }
}
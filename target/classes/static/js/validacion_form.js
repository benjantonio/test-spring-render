var form = document.querySelector("#form");
var inputs = document.querySelectorAll("#form input");
var selects = document.querySelectorAll("#form select");

const expresiones = {
    usuario: /^.{4,12}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    password: /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡.\-_]){1})\S{8,30}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    celular: /^\d{9,9}$/,
    edad: /^\d{2,}$/,
    direccion: /^[a-zA-Z0-9\s]{8,50}$/,
}

const campos = {
    usuario: false,
    nombre: false,
    apellido: false,
    password: false,
    correo: false,
    celular: false,
    edad: false,
    direccion: false,
    comuna: false,
    perfil: false
}

const validacion = (e) => {
    switch (e.target.name) {
        case "username":
            validarCampo(expresiones.usuario, e.target, 'usuario')
            break;
        case "password":
            validarCampo(expresiones.password, e.target, 'password')
            break;
        case "nombres":
            validarCampo(expresiones.nombre, e.target, 'nombre')
            break;
        case "apellidos":
            validarCampo(expresiones.nombre, e.target, 'apellido')
            break;
        case "email":
            validarCampo(expresiones.correo, e.target, 'correo')
            break;
        case "celular":
            validarCampo(expresiones.celular, e.target, 'celular')
            break;
        case "edad":
            validarEdad(expresiones.edad, e.target, 'edad')
            break;
        case "direccion":
            validarCampo(expresiones.direccion, e.target, 'direccion')
            break;
        case "comuna":
            validarSelect(e.target, 'comuna')
            break;
        case "perfil":
            validarSelect(e.target, 'perfil')
            break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.querySelector(`#${campo} input`).classList.add('border-succes')
        document.querySelector(`#${campo} input`).classList.remove('border-error')
        document.querySelector(`#${campo} span`).classList.add('oculto')
        document.querySelector(`#${campo} label`).classList.remove('label-err')
        campos[campo] = true;
    } else {
        document.querySelector(`#${campo} input`).classList.add('border-error')
        document.querySelector(`#${campo} input`).classList.remove('border-succes')
        document.querySelector(`#${campo} span`).classList.remove('oculto')
        document.querySelector(`#${campo} label`).classList.add('label-err')
        campos[campo] = false;
    }
}

const validarEdad = (expresion, input, campo) => {
    if (expresion.test(input.value) && input.value >= 18) {
        document.querySelector(`#${campo} input`).classList.add('border-succes')
        document.querySelector(`#${campo} input`).classList.remove('border-error')
        document.querySelector(`#${campo} span`).classList.add('oculto')
        document.querySelector(`#${campo} label`).classList.remove('label-err')
        campos[campo] = true;
    } else {
        document.querySelector(`#${campo} input`).classList.add('border-error')
        document.querySelector(`#${campo} input`).classList.remove('border-succes')
        document.querySelector(`#${campo} span`).classList.remove('oculto')
        document.querySelector(`#${campo} label`).classList.add('label-err')
        campos[campo] = false;
    }
}

const validarSelect = (input, campo) => {
    console.log("valor " + input.value)
    if (input.value !== "") {
        document.querySelector(`#${campo} select`).classList.add('border-succes')
        document.querySelector(`#${campo} select`).classList.remove('border-error')
        document.querySelector(`#${campo} span`).classList.add('oculto')
        document.querySelector(`#${campo} label`).classList.remove('label-err')
        campos[campo] = true;
    } else {
        document.querySelector(`#${campo} select`).classList.add('border-error')
        document.querySelector(`#${campo} select`).classList.remove('border-succes')
        document.querySelector(`#${campo} span`).classList.remove('oculto')
        document.querySelector(`#${campo} label`).classList.add('label-err')
        campos[campo] = false;
    }
}

var cbox = document.querySelector("#cbox")

const habilitarBtn = () => {
    console.log("funciona " + cbox.checked)
    if (cbox.checked == true) {
        if (campos.usuario && campos.nombre && campos.apellido && campos.password && campos.correo && campos.celular && campos.edad && campos.direccion && campos.comuna && campos.perfil) {
            document.querySelector("#enviar").removeAttribute("disabled", "")
        } else {
            document.querySelector("#enviar").setAttribute("disabled", "")
        }
    } else {
        document.querySelector("#enviar").setAttribute("disabled", "")
    }

}


inputs.forEach((input) => {
    input.addEventListener('keyup', validacion);
    input.addEventListener('blur', validacion);
})

selects.forEach((select) => {
    select.addEventListener('blur', validacion);
    select.addEventListener('onChange', habilitarBtn)
})
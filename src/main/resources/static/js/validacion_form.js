$(document).ready(function (e) {
    console.log("holaaaa registro")

    var $idSelectPerfil = $("#idSelectPerfil");
    var $idSelectComuna = $("#idSelectComuna");
    var $idBtnRegistrarse = $("#idBtnRegistrarse");


    $idSelectPerfil.select2({
        placeholder: "Seleccione un Tipo de Uso . . ."
    });

    $idSelectComuna.select2({
        placeholder: "Seleccione una Comuna . . ."
    });

    $idBtnRegistrarse.on("click", function (e) {
        crearRegistro();

    });

    function crearRegistro() {

        var usuario = $("#usuarioTxt").val();
        var password = $("#passwordTxt").val();
        var nombre = $("#nombreTxt").val();
        var apellido = $("#apellidoTxt").val();
        var celular = $("#celularTxt").val();
        var correo = $("#emailTxt").val();
        var edad = $("#edadTxt").val();
        var direccion = $("#direccionTxt").val();
        var perfil = $idSelectPerfil.val() || 0;
        var comuna = $idSelectComuna.val() || 0;

        //console.log(usuario, " | ", password, " | ", nombre, " | ", apellido, " | ", celular, " | ", correo, " | ", edad, " | ", direccion, " | ", perfil, " | ", comuna)
        if (perfil > 0 && comuna > 0 && (campos.usuario && campos.nombre && campos.apellido && campos.password && campos.correo && campos.celular && campos.edad && campos.direccion)) {
            Swal.fire({
                title: 'Confirmación Registro',
                text: '¿Estás seguro que desea registrarse con los datos ingresados?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#58bf72', // Color verde para el botón "Sí"
                cancelButtonColor: '#9a9ea1', // Color gris para el botón "Cancelar"
                confirmButtonText: 'Confirmar Registro',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {

                    go_spinner("spinnerContainer");

                    $.ajax({
                        url: "/login/registrarUsuario",
                        type: 'POST',
                        data: {usuario: usuario, password: password, nombre: nombre, apellido: apellido, celular: celular, correo: correo, edad: edad, direccion: direccion, perfil: perfil, comuna: comuna},
                        success: function (response) {
                            var data = (JSON.parse(response));
                            var resultado = data["resultado"];
                            var idUserNew = data["idUserNew"];

                            var msjAlerta = resultado.split(' , ');
                            if (msjAlerta[0] == "S") {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    html: '<span style="font-size: 20px;">Usuario registrado con éxito. \n-ID USUARIO: ' + idUserNew + '</span>',
                                    confirmButtonColor: '#898989'
                                }).then(() => {
                                    $("#idFormGoLogin").submit();
                                });
                                console.log("respuesta S. Creado con éxito. | ID USUARIO AGREGADO: ", idUserNew);
                            } else {
                                Swal.fire({
                                    position: 'center',
                                    icon: 'error',
                                    html: '<span style="font-size: 20px;">Ha ocurrido un error al registrar el usuario. Por favor, intentelo más tarde.</span>',
                                    confirmButtonColor: '#898989'
                                });
                                //swal("Error", msjAlerta[1], "error");
                            }

                            hide_spinner("spinnerContainer");
                        },
                        error: function (xhr, status, throwError) {
                            ajaxErrorHandler(xhr, status, throwError);
                            hide_spinner("spinnerContainer");
                        }
                    });



                }
            });

        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                html: '<span style="font-size: 20px;">Por favor, asegúrate de completar todos los campos obligatorios.</span>',
                confirmButtonColor: '#898989'
            });
        }

    }
});

var form = document.querySelector("#form");
var inputs = document.querySelectorAll("#form input");
var idSelectComuna = document.querySelectorAll("#idSelectComuna");
var idSelectPerfil = document.querySelectorAll("#idSelectPerfil");


const expresiones = {
    usuario: /^.{4,12}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    password: /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[@$?¡.\-_]){1})\S{8,30}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    celular: /^\d{9,9}$/,
    edad: /^\d{2,}$/,
    direccion: /^[a-zA-ZÀ-ÿ0-9\s]{3,}$/
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

    console.log("v")
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
    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.querySelector(`#${campo} input`).classList.add('border-succes')
        document.querySelector(`#${campo} input`).classList.remove('border-error')
        document.querySelector(`#${campo} .error-reg`).classList.add('oculto')
        document.querySelector(`#${campo} label`).classList.remove('label-err')
        campos[campo] = true;
    } else {
        document.querySelector(`#${campo} input`).classList.add('border-error')
        document.querySelector(`#${campo} input`).classList.remove('border-succes')
        document.querySelector(`#${campo} .error-reg`).classList.remove('oculto')
        document.querySelector(`#${campo} label`).classList.add('label-err')
        campos[campo] = false;
    }
}

const validarEdad = (expresion, input, campo) => {
    if (expresion.test(input.value) && input.value >= 18) {
        document.querySelector(`#${campo} input`).classList.add('border-succes')
        document.querySelector(`#${campo} input`).classList.remove('border-error')
        document.querySelector(`#${campo} .error-reg`).classList.add('oculto')
        document.querySelector(`#${campo} label`).classList.remove('label-err')
        campos[campo] = true;
    } else {
        document.querySelector(`#${campo} input`).classList.add('border-error')
        document.querySelector(`#${campo} input`).classList.remove('border-succes')
        document.querySelector(`#${campo} .error-reg`).classList.remove('oculto')
        document.querySelector(`#${campo} label`).classList.add('label-err')
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validacion);
    input.addEventListener('blur', validacion);
});

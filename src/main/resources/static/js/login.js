$(document).ready(function (e) {

        var $idUsername = $("#idUsername");
        var $idPassword = $("#idPassword");
        console.log("ok")
        $("#idBtnEntrar").on("click", function (e) {
            if ($idUsername.val() != "" && $idPassword.val() != "") {
                $("#idFormLogUser").submit();
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    html: '<span style="font-size: 20px;">Por favor, complete todos los campos.</span>',
                    confirmButtonColor: '#898989'
                });
            }
        });

    });
    
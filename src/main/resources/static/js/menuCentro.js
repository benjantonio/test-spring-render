const sideMenu = document.querySelector("aside");

const yoTabVet = document.querySelector("#tabYoCen")
const VeterinarioTab = document.querySelector("#tabVeterinarios")
const btnYoCen = document.querySelector("#yoCen-btn")
const btnMisVeterinarios = document.querySelector("#misVeterinarios-btn")

const menuBtnCli = document.querySelector("#menu-btncli");
const closeBtnCli = document.querySelector("#close-btncli");

const btnModificar = document.querySelector(".btn-modificarVet")
const panModificar = document.querySelector("#contenedorModPet")
const tabAddVet = document.querySelector(".tabAgregarVet")
const btnAddVet = document.querySelector("#addVet")


menuBtnCli.addEventListener('click', () => {
    sideMenu.style = 'display:block;';
});

closeBtnCli.addEventListener('click', () => {
    sideMenu.style = 'display:none;';
});

btnYoCen.addEventListener('click', () => {
    VeterinarioTab.style = 'display:none;';
    tabAddVet.style = 'display:none'
    yoTabVet.style = 'display:block;'
});

btnMisVeterinarios.addEventListener('click', () => {
    yoTabVet.style = 'display:none;'
    tabAddVet.style = 'display:none'
    VeterinarioTab.style = 'display:block;';
});


btnAddVet.addEventListener('click', () => {
    yoTabVet.style = 'display:none';
    VeterinarioTab.style = 'display:none';
    if (panModificar) {
        panModificar.style = 'display:none'
    }

    tabAddVet.style = 'display:block'
})

function enviarAnchoWeb() {
    let ancho = document.documentElement.clientWidth;

    if (ancho >= 751) {
        console.log("ANCHO ES MAYOR A 750")
        sideMenu.style.display = 'block';
    }

}
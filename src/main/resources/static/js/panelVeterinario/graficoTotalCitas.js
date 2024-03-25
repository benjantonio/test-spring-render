// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myAreaChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    datasets: [{
      label: "Citas Realizadas",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 12
        }
      }],
      yAxes: [{
        ticks: {

          maxTicksLimit: 12
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});





/*
const mostrar = (datos) =>{
  datos.forEach(element => {
    myAreaChart.data['datasets'][0].data.push(element.id_veterinario_id)
  }); */
  const idLogeado = document.querySelector('.idVetLogeado').innerHTML;
  console.log("idLogeado ====", idLogeado)
  var calculoFinal;
/* Llamo a la API */
let url = `http://localhost:3000/citas_concluidas/${idLogeado}`
fetch(url)
  .then(response => response.json())
  .then(datos => mostrar(datos))
  .catch(error => console.log(error))

var annoActual = moment().format("YYYY");
const mostrar = (datos) => {
  let enero = 0;
  let febrero = 0;
  let marzo = 0;
  let abril = 0;
  let mayo = 0;
  let junio = 0;
  let julio = 0;
  let agosto = 0;
  let septiembre = 0;
  let octubre = 0;
  let noviembre = 0;
  let diciembre = 0;

  /* Recorro la API con las citas del veterinario logeado */
  
  datos.forEach(element => {
    if (element.fecha.slice(0,7) == annoActual+"-01") {
      enero++;
    } else if (element.fecha.slice(0,7) == annoActual+"-02") {
      febrero++;
    } else if (element.fecha.slice(0,7) == annoActual+"-03") {
      marzo++;
    } else if (element.fecha.slice(0,7) == annoActual+"-04") {
      abril++;
    } else if (element.fecha.slice(0,7) == annoActual+"-05") {
      mayo++;
    } else if (element.fecha.slice(0,7) == annoActual+"-06") {
      junio++;
    } else if (element.fecha.slice(0,7) == annoActual+"-07") {
      julio++;
    } else if (element.fecha.slice(0,7) == annoActual+"-08") {
      agosto++;
    } else if (element.fecha.slice(0,7) == annoActual+"-09") {
      septiembre++;
    } else if (element.fecha.slice(0,7) == annoActual+"-10") {
      octubre++;
    } else if (element.fecha.slice(0,7) == annoActual+"-11") {
      noviembre++;
    } else if (element.fecha.slice(0,7) == annoActual+"-12") {
      diciembre++;
    }
  });

  myAreaChart.data['datasets'][0].data.push(enero)
  myAreaChart.data['datasets'][0].data.push(febrero)
  myAreaChart.data['datasets'][0].data.push(marzo)
  myAreaChart.data['datasets'][0].data.push(abril)
  myAreaChart.data['datasets'][0].data.push(mayo)
  myAreaChart.data['datasets'][0].data.push(junio)
  myAreaChart.data['datasets'][0].data.push(julio)
  myAreaChart.data['datasets'][0].data.push(agosto)
  myAreaChart.data['datasets'][0].data.push(septiembre)
  myAreaChart.data['datasets'][0].data.push(octubre)
  myAreaChart.data['datasets'][0].data.push(noviembre)
  myAreaChart.data['datasets'][0].data.push(diciembre)

   update(); //actualizo el grafico
   
}

//función para actualizar el grafico
function update(){
  myAreaChart.update();
}




const HOJA_DE_CALCULO= "https://docs.google.com/spreadsheets/d/1ihsuwzy1eb3MmIO9yOm2hpM_YCcq_bcfAhVqres9Rp8/edit#gid=0";
const SHEET_ID = '1ihsuwzy1eb3MmIO9yOm2hpM_YCcq_bcfAhVqres9Rp8';
const ACCESS_TOKEN = "ya29.a0AeTM1iczt4w8UrBqF1m1U-Wk4yQwwSV9TdFHa5WqSl5XUzTYhyNjxAwvYSu0buMKh74kXzZKClGvn5eF_6tipzNOi__Lj2txdA9LuUJa5aH3oyBZL_DmjDd94Jkkbxt6Ak-KO8mMXgzZkoljwGASd4lu0-X6aCgYKAR0SARESFQHWtWOmP18nl0H_SJit9xAZB1UD6g0163";
//Inicializamos la fecha a la fecha de hoy
document.getElementById('fecha').valueAsDate = new Date();


function onRegistrarGasto() {

  //Obtenemos los datos del formulario
  const medioPago = document.getElementById('medio-pago').value;
  const concepto = document.getElementById('concepto').value;
  const fecha = document.getElementById('fecha').value;
  const monto = document.getElementById('monto').value;

if(medioPago == ''|| concepto == '' || fecha == '' || monto == '' ){
  alert("Todos Los campos deben ser cargados obligatoriamente");
  return;
}
else
{
  
  //Creamos el JSON que espera nuestra API
  let data = {};
  let values = [];
  let fila = [medioPago, concepto, fecha, monto];
  values.push(fila);
  
  //Verificar que coincida con el nombre de la hoja de nuestro sheet
  data.range = "hojaGastos";
  data.majorDimension = "ROWS";
  data.values = values;

  //Invocamos al método POST de la API
  fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/hojaGastos:append?valueInputOption=USER_ENTERED`,
        {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
         body: JSON.stringify(data)
        }
  ).then(function (response) {
    response.json().then(function (data) {

    });
  });

  //Limpiamos los campos del formulario para permitir cargar un nuevo gasto
  document.getElementById('concepto').value = "";
  document.getElementById('fecha').valueAsDate = new Date();
  document.getElementById('monto').value = "";
}
};




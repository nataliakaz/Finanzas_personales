SHEET_ID = "1ihsuwzy1eb3MmIO9yOm2hpM_YCcq_bcfAhVqres9Rp8";
const TOKEN = "ya29.a0AeTM1icCSec3-vPUNXNbYc-DsOBDO6ZgrMI8jxqsLU_dZ-KckjFByZOmJqh59yqnOko6jFBvAj5M7lG5ffRL6Ct6iIy9cF6TLOaL4o3Ng-Pk2m92oBYz9mhVGIENbzOEjTR7fCBg9SF9-C8LRErOgEegRIElaCgYKAVMSARESFQHWtWOmZkfApnT9Q163Da4lLLyEjw0163";
/*"https://sheets.googleapis.com/v4/spreadsheets/1ihsuwzy1eb3MmIO9yOm2hpM_YCcq_bcfAhVqres9Rp8/values/hojaGastos!A1:D";*/


fetch (
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/hojaGastos!A1:D` ,
    {
        headers:  
        {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${TOKEN}`
        }  
    }
).then(function(response) {
   response.json().then((data) =>{
    const VALUES = data.values
    console.log(VALUES);
    const LISTA = document.getElementById("lista-gastos") //indico que todo lo de lista se observara dentro de lista-gastos

    for(let i = 0; i < VALUES.length; i++)
    {
        //contenedor de todas las filas
        const GASTOS = document.createElement("div")
        GASTOS.className = "gastos-item"

        //nombre producto
        const MEDIO_DE_PAGO = document.createElement("span")
        MEDIO_DE_PAGO.className = "item mediodepago"
        MEDIO_DE_PAGO.innerHTML = VALUES[i][0]
        
        //nombre precio
        const CONCEPTO = document.createElement("span")
        CONCEPTO.className = "item concepto"
        CONCEPTO.innerHTML = VALUES[i][1]

        //nombre bebida
        const FECHA = document.createElement("span")
        FECHA.className = "item fecha"
        FECHA.innerHTML = VALUES[i][2]

        //nombre costo bebida
        const MONTO = document.createElement("span")
        MONTO.className = "item monto"
        MONTO.innerHTML = VALUES[i][3] 
        

        //Gastos recoge los datos como hijos
        GASTOS.appendChild(MEDIO_DE_PAGO)
        GASTOS.appendChild(CONCEPTO)
        GASTOS.appendChild(FECHA)
        GASTOS.appendChild(MONTO)
        


        LISTA.appendChild(GASTOS)

    }

    const GastosGeneral =  document.getElementById("total")

        for (let i = 0; i < VALUES.length; i++)
        {
            //contenedor de todas las filas
                const  COSTO = document.createElement("div")
                COSTO.className = "total-item"
                
            //Convertir el costo string en number para efectuar la sumatoria de los gastos
                const COSTOTAL = document.createElement("span")
                COSTOTAL.className = "costosTotal"
             
                function sumaGastos (VALUES){
                let total = VALUES.filter(Element => parseFloat(VALUES[i][3]) > 0 );
                return total.reduce((suma, value) => suma + value, 0);
                }
                COSTOTAL.innerHTML = sumaGastos();
                COSTO.appendChild(COSTOTAL);
                GastosGeneral.appendChild(COSTO);
        }

     }).catch ((error)=>{
        
         })
    })
 
function capital() {
  let cap = parseFloat(document.getElementById("cap").value);
  if (isNaN(cap)) {
    window.alert("Por favor ingrese un número válido para el capital.");
    return;
  }
  if (cap < 0) {
    window.alert("Ingrese un número mayor que cero para el capital.");
    return;
  }

  var parseo = parseFloat(cap);
  var interes = parseo*(0.037/12);
  var total = interes + parseo

  document.getElementById("resul").value ="$" +  total;
}

function ejercicio2() {
  let venta1 = parseFloat(document.getElementById("venta1").value);
  let venta2 = parseFloat(document.getElementById("venta2").value);
  let venta3 = parseFloat(document.getElementById("venta3").value);
  let sueldo = parseFloat(document.getElementById("sueldobase").value);

  if (isNaN(venta1) || isNaN(venta2) || isNaN(venta3) || isNaN(sueldo)) {
    window.alert("Por favor ingrese números válidos para las ventas y el sueldo base.");
    return;
  }

  let comision = (venta1 + venta2 + venta3) * 0.1;
  let sueldototal = sueldo + comision;

  document.getElementById("sueldobaseresul").value = sueldo;
  document.getElementById("comisionresul").value = comision;
  document.getElementById("sueldotresul").value = sueldototal;
}

function ejercicio3() {
  let compra = parseFloat(document.getElementById("compra").value);

  if (isNaN(compra)) {
    window.alert("Por favor ingrese un número válido para el monto de la compra.");
    return;
  }

  let descuento = compra * 0.15;
  let preciofinal = compra - descuento;

  document.getElementById("compraresultado").value = preciofinal;
}

function ejercicio4() {
  let calificacion1 = parseFloat(document.getElementById("calificacion1").value);
  let calificacion2 = parseFloat(document.getElementById("calificacion2").value);
  let calificacion3 = parseFloat(document.getElementById("calificacion3").value);
  let califexamenfinal = parseFloat(document.getElementById("examenfinal").value);
  let trabajofinal = parseFloat(document.getElementById("trabajofinal").value);

  if (isNaN(calificacion1) || isNaN(calificacion2) || isNaN(calificacion3) || isNaN(califexamenfinal) || isNaN(trabajofinal)) {
    window.alert("Por favor ingrese números válidos para las calificaciones y el trabajo final.");
    return;
  }

  let promediocalificaciones = (calificacion1 + calificacion2 + calificacion3) / 3;
  let porcentajefinal = (promediocalificaciones * 0.55) + (califexamenfinal * 0.30) + (trabajofinal * 0.15);

  document.getElementById("calificacionfinal").value = porcentajefinal;
}

function ejercicio5() {
  let numeroalumnos = parseFloat(document.getElementById("numeroalumnos").value);
  let numeroalumnosh = parseFloat(document.getElementById("alumnosh").value);
  let numeroalumnosm = parseFloat(document.getElementById("alumnosm").value);

  if (isNaN(numeroalumnos) || isNaN(numeroalumnosh) || isNaN(numeroalumnosm)) {
    window.alert("Por favor ingrese números válidos para el número total de alumnos y el número de alumnos hombres y mujeres.");
    return;
  }

  let porcentajealumnosh = (numeroalumnosh * 100) / numeroalumnos;
  let porcentajealumnom = (numeroalumnosm * 100) / numeroalumnos;

  document.getElementById("porcentajealumnos").value = porcentajealumnosh;
  document.getElementById("porcentajealumnas").value = porcentajealumnom;
}

export function fecha_actual() {
  const date = new Date();
  let ano = date.getFullYear();
  let mes: number | string = date.getMonth();
  let dia: number | string = date.getDate();

  mes = agregar_ceros_mes(mes);
  dia = agregar_ceros_dia(dia);

  return ano + "-" + mes + "-" + dia;
}

function agregar_ceros_mes(mes: number) {
  if (mes < 10) {
    return `${mes + 1}`;
  }
  return mes;
}

function agregar_ceros_dia(dia: number) {
  if (dia < 10) {
    return `${0}${dia}`;
  }
  return dia;
}

import moment from "moment";

export function fecha_actual() {
  const date = new Date();
  let ano = date.getFullYear();
  let mes: number | string = date.getMonth() + 1;
  let dia: number | string = date.getDate();

  mes = agregar_ceros_mes(mes);
  dia = agregar_ceros_dia(dia);

  return ano + "-" + mes + "-" + dia;
}

function agregar_ceros_mes(mes: number) {
  if (mes < 10) {
    return `${0}${mes}`;
  }
  return mes;
}

function agregar_ceros_dia(dia: number) {
  if (dia < 10) {
    return `${0}${dia}`;
  }
  return dia;
}

export function getMondays(date: Date, day: number) {
  var d = date || new Date(),
    month = d.getMonth(),
    fecha = [];
  d.setDate(1);

  while (d.getDay() !== day) {
    d.setDate(d.getDate() + 1);
  }

  while (d.getMonth() === month) {
    fecha.push(new Date(d.getTime()));
    d.setDate(d.getDate() + 7);
  }

  return fecha.filter((item) => item > new Date());
}

export function incrementarMes(ultimo_pago: any) {
  return new Date(ultimo_pago).setMonth(new Date(ultimo_pago).getMonth() + 1);
}

export function diferencia_de_años(data: any): number {
  return moment(new Date(data)).diff(
    moment(new Date(fecha_actual())),
    "years",
    true
  );
}

export function diferencia_de_meses(data: any): number {
  console.log(fecha_actual());
  return moment(new Date(data)).diff(
    moment(new Date(fecha_actual())),
    "months",
    true
  );
}

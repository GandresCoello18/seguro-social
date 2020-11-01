import { Pago_INT, Usuario_INT } from "../interface";
import { diferencia_de_meses } from "./fecha";

export function validateStatus(
  User: Usuario_INT,
  pagos: Array<Pago_INT>
): string {
  const userPago: Array<Pago_INT> = pagos.filter(
    (pago: Pago_INT) => pago.id_user === User.id_user
  );

  let thisMes: any;
  if (userPago.length === 0) {
    thisMes = User.fecha_registro;
  } else {
    const ultimo_pago: string = userPago.reverse()[userPago.length - 1]
      .fecha_pago;
    thisMes = ultimo_pago;
  }

  let meses_atrasos = diferencia_de_meses(thisMes);

  if (Math.trunc(Math.abs(meses_atrasos)) > 0) {
    return "bg-danger";
  } else {
    return "bg-success";
  }
}

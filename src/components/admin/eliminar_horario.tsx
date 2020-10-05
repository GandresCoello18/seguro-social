import React from "react";
import { DeleteHorario } from "../../api/fetch/horario";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { ResponseAxios, Horario_INT } from "../../interface";
import { SetHorarios } from "../../redux/modulos/horarios";
import { RootState, Dispatch } from "../../redux";

interface Props {
  id_horario: string;
}

export function EliminarHorariorBtn({ id_horario }: Props) {
  const dispatch: Dispatch = useDispatch();
  const HorariosReducer: Array<Horario_INT> = useSelector(
    (state: RootState) => state.HorariosReducer.horarios
  );

  const remover_horario = async () => {
    const resDelete: ResponseAxios = await DeleteHorario(id_horario);

    if (resDelete.respuesta.type === "ERROR") {
      console.log(resDelete.respuesta.feeback);
    } else {
      const index: number = HorariosReducer.findIndex(
        (item) => item.id_horario === id_horario
      );
      HorariosReducer.splice(index, 1);
      dispatch(SetHorarios([...HorariosReducer]));
    }
  };

  return (
    <>
      <Button color="danger" onClick={remover_horario}>
        Remover
      </Button>
    </>
  );
}

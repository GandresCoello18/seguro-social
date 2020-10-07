import React from "react";
import { DeleteCita } from "../../api/fetch/cita";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Cita_INT, ResponseAxios } from "../../interface";
import { SetCitas } from "../../redux/modulos/citas";
import { RootState, Dispatch } from "../../redux";

interface Props {
  id_cita: string;
}

export function EliminarCitaBtn({ id_cita }: Props) {
  const dispatch: Dispatch = useDispatch();
  const CitasReducer: Array<Cita_INT> = useSelector(
    (state: RootState) => state.CitasReducer.citas
  );

  const remove_cita = async () => {
    const resDelete: ResponseAxios = await DeleteCita(id_cita);

    if (resDelete.respuesta.type === "ERROR") {
      console.log(resDelete.respuesta.feeback);
    } else {
      const index: number = CitasReducer.findIndex(
        (item) => item.id_cita === id_cita
      );
      CitasReducer.splice(index, 1);
      dispatch(SetCitas([...CitasReducer]));
    }
  };

  return (
    <>
      <Button color="danger" onClick={remove_cita}>
        Eliminar
      </Button>
    </>
  );
}

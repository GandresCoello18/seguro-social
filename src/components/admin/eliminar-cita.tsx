import React, { useState } from "react";
import { DeleteCita } from "../../api/fetch/cita";
import { Button, Tooltip } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Cita_INT, ResponseAxios } from "../../interface";
import { SetCitas } from "../../redux/modulos/citas";
import { RootState, Dispatch } from "../../redux";
import { BsFillTrashFill } from "react-icons/bs";

interface Props {
  id_cita: string;
  disable?: boolean;
}

export function EliminarCitaBtn({ id_cita, disable }: Props) {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

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
      <Button
        id="TooltipCitaDelete"
        disabled={disable}
        color="danger"
        onClick={remove_cita}
      >
        <BsFillTrashFill />
      </Button>
      <Tooltip
        placement="right"
        isOpen={tooltipOpen}
        target="TooltipCitaDelete"
        toggle={toggle}
      >
        ELiminar Cita
      </Tooltip>
    </>
  );
}

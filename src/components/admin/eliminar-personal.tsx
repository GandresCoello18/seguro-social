import React from "react";
import { RemovePersonal } from "../../api/fetch/personal";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Personal_IMT, ResponseAxios } from "../../interface";
import { RootState, Dispatch } from "../../redux";
import { SetPersonal } from "../../redux/modulos/personal";

interface Props {
  id_personal: number | undefined | any;
}

export function EliminarPersonalBtn({ id_personal }: Props) {
  const dispatch: Dispatch = useDispatch();
  const PersonalReducer: Array<Personal_IMT> = useSelector(
    (state: RootState) => state.PersonalReducer.personal
  );

  const remove_personal = async () => {
    const resDelete: ResponseAxios = await RemovePersonal(id_personal);

    if (resDelete.respuesta.type === "ERROR") {
      console.log(resDelete.respuesta.feeback);
    } else {
      const index: number = PersonalReducer.findIndex(
        (item) => item.id_personal === Number(id_personal)
      );
      PersonalReducer.splice(index, 1);
      dispatch(SetPersonal([...PersonalReducer]));
    }
  };

  return (
    <>
      <Button color="danger" onClick={remove_personal}>
        Remover
      </Button>
    </>
  );
}

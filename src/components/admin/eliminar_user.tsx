import React from "react";
import { DeleteUser } from "../../api/fetch/usuarios";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { ResponseAxios, Usuario_INT } from "../../interface";
import { SetUsuarios } from "../../redux/modulos/usuarios";
import { RootState, Dispatch } from "../../redux";

interface Props {
  id_user: string;
}

export function EliminarUserBtn({ id_user }: Props) {
  const dispatch: Dispatch = useDispatch();
  const UserReducer: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.usuarios
  );

  const remove_user = async () => {
    const resDelete: ResponseAxios = await DeleteUser(id_user);

    if (resDelete.respuesta.type === "ERROR") {
      console.log(resDelete.respuesta.feeback);
    } else {
      const index: number = UserReducer.findIndex(
        (item) => item.id_user === id_user
      );
      UserReducer.splice(index, 1);
      dispatch(SetUsuarios([...UserReducer]));
    }
  };

  return (
    <>
      <Button color="danger" onClick={remove_user}>
        Quitar
      </Button>
    </>
  );
}

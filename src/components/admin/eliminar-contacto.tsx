import React from "react";
import { DeleteContacto } from "../../api/fetch/contacto";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { Contacto_INT, ResponseAxios } from "../../interface";
import { SetContactos } from "../../redux/modulos/contactos";
import { RootState, Dispatch } from "../../redux";

interface Props {
  id_contacto: number | undefined | any;
}

export function EliminarContactoBtn({ id_contacto }: Props) {
  const dispatch: Dispatch = useDispatch();
  const ContactoReducer: Array<Contacto_INT> = useSelector(
    (state: RootState) => state.ContactosReducer.contacto
  );

  const remove_cita = async () => {
    const resDelete: ResponseAxios = await DeleteContacto(id_contacto);

    if (resDelete.respuesta.type === "ERROR") {
      console.log(resDelete.respuesta.feeback);
    } else {
      const index: number = ContactoReducer.findIndex(
        (item) => item.id_contacto === Number(id_contacto)
      );
      ContactoReducer.splice(index, 1);
      dispatch(SetContactos([...ContactoReducer]));
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

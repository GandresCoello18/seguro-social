import React from "react";
import { DeleteGrupo } from "../../api/fetch/grupo";
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { ResponseAxios, Grupo_afiliados_INT } from "../../interface";
import { SetGrupos } from "../../redux/modulos/grupos";
import { RootState, Dispatch } from "../../redux";

interface Props {
  id_grupo: number;
}

export function EliminarGrupoBtn({ id_grupo }: Props) {
  const dispatch: Dispatch = useDispatch();
  const GruposReducer: Array<Grupo_afiliados_INT> = useSelector(
    (state: RootState) => state.GruposReducer.grupos
  );

  const remover_horario = async () => {
    const resDelete: ResponseAxios = await DeleteGrupo(id_grupo);

    if (resDelete.respuesta.type === "ERROR") {
      console.log(resDelete.respuesta.feeback);
    } else {
      const index: number = GruposReducer.findIndex(
        (item) => item.id_grupo === id_grupo
      );
      GruposReducer.splice(index, 1);
      dispatch(SetGrupos([...GruposReducer]));
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

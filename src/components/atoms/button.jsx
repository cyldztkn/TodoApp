import Icon from "@mdi/react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  mdiTextBoxEditOutline,
  mdiTextBoxCheckOutline,
  mdiLoading,
  mdiClose,
  mdiPlusCircle,
  mdiDeleteOutline,
  mdiDeleteClockOutline,
  mdiDelete,
} from "@mdi/js";

function Button(props) {
  const [state, setState] = useState(props.inner);
  if (props.type == "submit") {
    let handleClick = () => {
      setState("Gönderiliyor");
      setTimeout(() => {
        setState("Gönderildi");
      }, 1000);
    };

    return (
      <button type="submit" className="fill-button" onClick={handleClick}>
        <Icon
          path={
            state == "Düzenle"
              ? mdiTextBoxEditOutline
              : state == "Gönderiliyor"
              ? mdiLoading
              : mdiTextBoxCheckOutline
          }
          size={1}
          spin={state == "Gönderiliyor"}
        />
        <p className="s">{state}</p>
      </button>
    );
  } else if (props.type == "reset") {
    return (
      <button type="reset" className="outline-button">
        <Icon path={mdiClose} size={1} />
        <p className="s">Vazgeç</p>
      </button>
    );
  } else if (props.type == "nav") {
    return (
      <button className="fill-button">
        <Icon path={mdiPlusCircle} size={1} />
        <p className="s">{props.inner}</p>
      </button>
    );
  } else if (props.type == "delete") {
    let handleClick = () => {
      setState("Siliniyor");
      setTimeout(() => {
        setState("Silindi");
      }, 1000);

      props.deleteFunc();
    };
    return (
      <button className="delete-button" onClick={handleClick}>
        <Icon
          path={
            state == "Delete"
              ? mdiDeleteOutline
              : state == "Siliniyor"
              ? mdiDeleteClockOutline
              : mdiDelete
          }
          size={1}
        />
        <p className="s">{state}</p>
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  inner: PropTypes.string,
  deleteFunc: PropTypes.func,
};

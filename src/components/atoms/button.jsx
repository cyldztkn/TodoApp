import Icon from "@mdi/react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  mdiTextBoxEditOutline,
  mdiTextBoxCheckOutline,
  mdiLoading,
  mdiClose,
  mdiPlusCircle,
  // mdiTextBoxEditOutline,
} from "@mdi/js";

function Button(props) {
  const [state, setState] = useState(props.inner);
  if (props.type == "submit") {
    let handleClick = () => {
      setState("Gönderiliyor");
      // setTimeout(setState("Gönderildi"), 400);
      setTimeout(() => {
        setState("Gönderildi");
      }, 1000);
    };

    return (
      <button type="submit" className="fill-button" onClick={handleClick}>
        {/* <Icon 
        path={
          (state=="Düzenle") 
          ? mdiTextBoxEditOutline 
          : mdiTextBoxCheckOutline 
          }  size={1} /> */}
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
  }
}

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  icon: PropTypes.string,
  inner: PropTypes.string,
};

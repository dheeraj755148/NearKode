import React from "react";
import "../../styles/formMain.css"

function FormItem(props) {
  return (
    <div className="form-items">
      <div className="form-item-name">{props.formItem}</div>
      <input type="text" name={props.formItem}/>
    </div>
  );
}

export default FormItem

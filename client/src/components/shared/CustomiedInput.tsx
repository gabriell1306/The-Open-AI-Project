import { TextField } from "@mui/material";
import React from "react";
type Props = {
  name: string;
  type: string;
  label: string;
  // value: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CustomizedInput(props: Props) {
  return (
    <>
      <TextField
        InputLabelProps={{
          style: {
            color: "white",
          },
        }}
        InputProps={{
          style: {
            width: "400px",
            borderRadius: 10,
            fontSize: 20,
            color: "white",
            backgroundColor: "#45453", // Thêm dòng này
          },
        }}
        autoComplete="off"
        margin="normal"
        name={props.name}
        label={props.label}
        type={props.type}
      />
    </>
  );
}

export default CustomizedInput;

import { useSelector, useState } from "react";
import "./Login.css";
import { Button, TextField, InputAdornment } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

const validationSchema = Yup.object({
  name: Yup.string().required("Username is required"),
  pwd: Yup.string().required("Password is required"),
});

const Login = () => {
  const [inputHovered, setInputHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  const initialValues = {
    name: "",
    pwd: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  const handleInputHover = () => {
    setInputHovered(true);
  };

  const handleInputLeave = () => {
    setInputHovered(false);
  };

  const handleButtonHover = () => {
    setButtonHovered(true);
  };

  const handleButtonLeave = () => {
    setButtonHovered(false);
  };

  const handleChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleBtnClick = () => {
    console.log("id: ", userName, "Pass: ", pass);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="login-container">
        <div className={`login-box ${inputHovered ? "input-hovered" : ""}`}>
          <Form>
            <h2>Login</h2>
            <TextFieldWithFormik name="name" label="Username" />
            <TextFieldWithFormik name="pwd" label="Password" type="password" />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={`login-button ${buttonHovered ? "button-hovered" : ""}`}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

const TextFieldWithFormik = ({ name, label, type = "text" }) => {
  const [field, meta] = useField(name);
  const icons = {
    name: <PersonIcon sx={{ color: "rgba(0, 0, 0, 0.45)" }} />,
    pwd: <LockIcon sx={{ color: "rgba(0, 0, 0, 0.45)" }} />,
  };
  return (
    <TextField
      style={{ marginBottom: "10px", paddingLeft: "0px" }}
      className="input"
      {...field}
      placeholder={label}
      type={type}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      InputProps={{
        startAdornment: (
          <InputAdornment
            sx={{ padding: "20.5px 10px", borderRadius: "5px", background: "#bbbb" }}
            position="start"
          >
            {icons[name]}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default Login;

import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import CustomField from "../../components/CustomField";
import Button from "../../components/Button";
import { CreateUser } from "../../services";

class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      formValue: { name: "", dni: "", email: "", mobile: "" },
      formSchema: Yup.object().shape({
        name: Yup.string().max(50, "Nombre muy largo").required("Este campo es requerido"),
        dni: Yup.string().required("Este campo es requerido"),
        email: Yup.string().email("El Correo no es valido").required("Este campo es requerido"),
        mobile: Yup.string().required("Este campo es requerido"),
      }),
      user: JSON.parse(localStorage.getItem("user")),
    };
  }

  onSubmitHandle = (value) => {
    this.setState({ isLoading: true });

    CreateUser(value)
      .then((response) => response.json())
      .then((data) => {
        const type = data.code === 201 ? "success" : "error";
        toast[type](data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        if (data.code === 201) {
          localStorage.setItem("user", JSON.stringify(data.payload));
          this.props.history.replace("/");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading, formValue, formSchema, user } = this.state;
    return (
      <Fragment>
        {user && user.id ? (
          <Redirect to="/" />
        ) : (
          <div className="flex justify-center py-10">
            <div className="w-full sm:w-1/2 lg:w-6/12 mb-6">
              <div className="mb-4">
                <h1 className="font-extrabold text-xl leading-none">Registrar Usuario</h1>
                <small className="text-gray-600 leading-none font-thin font-sans">
                  Complete el siguiente formulario
                </small>
              </div>
              <Formik
                initialValues={formValue}
                onSubmit={(values) => this.onSubmitHandle(values)}
                validationSchema={formSchema}>
                <Form>
                  <CustomField id="name" name="name" placeholder="Nombre" />
                  <CustomField id="dni" name="dni" placeholder="Documento de Identidad" />
                  <CustomField id="email" name="email" placeholder="Correo Electrónico" />
                  <CustomField id="mobile" name="mobile" placeholder="Teléfono" />
                  <Button type="submit" loading={isLoading} block>
                    Registrar
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default SignupScreen;

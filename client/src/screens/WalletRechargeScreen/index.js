import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomField from "../../components/CustomField";
import Button from "../../components/Button";
import { RechageWallet } from "../../services";

class WalletRechargeScreen extends Component {
  constructor(props) {
    super(props);

    const user = JSON.parse(localStorage.getItem("user"));
    this.state = {
      isLoading: false,
      formValue: { dni: user.dni, mobile: user.mobile, amount: "" },
      formSchema: Yup.object().shape({
        dni: Yup.string().required("Este campo es requerido"),
        mobile: Yup.string().required("Este campo es requerido"),
        amount: Yup.number().min(1, "Valor minimo es de 1").required("Este campo es requerido"),
      }),
    };
  }

  onSubmitHandle = (value) => {
    this.setState({ isLoading: true });

    RechageWallet(value)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          alert(data.message);
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
    const { isLoading, formValue, formSchema } = this.state;
    return (
      <div className="flex justify-center py-10">
        <div className="w-full sm:w-1/2 lg:w-6/12 mb-6">
          <div className="mb-4">
            <h1 className="font-extrabold text-xl leading-none">Recargar mi Billetera</h1>
            <small className="text-gray-600 leading-none font-thin font-sans">
              Complete el siguiente formulario
            </small>
          </div>
          <Formik
            initialValues={formValue}
            onSubmit={(values) => this.onSubmitHandle(values)}
            validationSchema={formSchema}>
            <Form>
              <CustomField
                id="dni"
                label="Documento de Identidad"
                name="dni"
                placeholder="Documento de Identidad"
                disabled
              />
              <CustomField
                id="mobile"
                label="Teléfono"
                name="mobile"
                placeholder="Teléfono"
                disabled
              />
              <div className="mt-4">
                <CustomField
                  id="amount"
                  name="amount"
                  label="Introduza su Saldo"
                  placeholder="Monto a Recargar"
                />
              </div>

              <Button type="submit" loading={isLoading} block>
                Recargar
              </Button>
            </Form>
          </Formik>
        </div>
      </div>
    );
  }
}

export default WalletRechargeScreen;

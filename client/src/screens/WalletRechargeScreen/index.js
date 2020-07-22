import React, { Component } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomField from "../../components/CustomField";
import Button from "../../components/Button";
import { RechageWallet } from "../../services";

class WalletRechargeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      formValue: { dni: "", mobile: "", amount: "" },
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
        console.log("response...", data);
        alert(data.message);
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
              <CustomField id="dni" name="dni" placeholder="Documento de Identidad" />
              <CustomField id="mobile" name="mobile" placeholder="Teléfono" />
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

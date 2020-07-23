import React, { Component } from "react";
import { toast } from "react-toastify";
import Toolbar from "../../components/Toolbar";
import Botton from "../../components/Button";
import { GetBalanceWallet, CreatePayment, PaymentConfirm } from "../../services";
import * as QueryString from "query-string";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: QueryString.parse(props.location.search),
      user: JSON.parse(localStorage.getItem("user")) || {},
      walletBalance: 0,
      isLoading: false,
    };
  }

  componentDidMount() {
    GetBalanceWallet({
      dni: this.state.user.dni,
      mobile: this.state.user.mobile,
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          walletBalance: data.payload.balance,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    const { action, sessionToken, token } = this.state.query;
    if (action === "paymentConfirm" && !!sessionToken && !!token) {
      this.onPaymentConfirm({ sessionToken, token });
    }
  }

  onCreatePay = (amount) => {
    this.setState({ isLoading: true });
    CreatePayment({
      dni: this.state.user.dni,
      mobile: this.state.user.mobile,
      amount: amount,
    })
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
          progress: 1,
        });
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  onPaymentConfirm = (data) => {
    PaymentConfirm(data)
      .then((response) => response.json())
      .then((data) => {
        const type = data.code === 200 ? "success" : "error";
        toast[type](data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 1,
        });
        this.props.history.replace("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { walletBalance, isLoading } = this.state;

    return (
      <main>
        <Toolbar balance={walletBalance} />
        <section className="my-10">
          <div className="flex flex-wrap pt-4 pb-10 m-auto mt-6 md:mt-1 lg:px-1 xl:px-1">
            <div className="w-full px-0 lg:px-4">
              <h2 className="px-12 mb-10 text-base font-bold text-center md:text-2xl text-blue-700">
                Seleccione el Plan
              </h2>

              <div className="flex flex-wrap items-center justify-center py-4 pt-0">
                <div className="w-full p-4 md:w-1/2 lg:w-1/3 plan-card ">
                  <div className="flex flex-col border rounded-lg shadow-lg group relative cursor-pointer hover:shadow-2xl">
                    <div className="w-full px-4 py-6 rounded-t-lg card-section-1">
                      <h3 className="mx-auto text-base font-semibold text-center underline text-blue-500 group-hover:text-white">
                        Standard
                      </h3>
                      <p className="text-5xl font-bold text-center group-hover:text-white text-blue-500">
                        $10.
                        <span className="text-3xl">00</span>
                      </p>
                      <p className="text-xs text-center uppercase group-hover:text-white text-blue-500">
                        Mensual
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full py-6 px-8 rounded-b-lg bg-blue-500">
                      <Botton
                        block
                        disabled={walletBalance < 10 ? true : false}
                        loading={isLoading}
                        onClick={() => this.onCreatePay("10")}>
                        Pagar
                      </Botton>
                    </div>
                  </div>
                </div>

                <div className="w-full p-4 md:w-1/2 lg:w-1/3">
                  <div className="flex flex-col rounded-lg shadow-lg relative cursor-pointer hover:shadow-2xl">
                    <div className="w-full px-4 py-8 rounded-t-lg bg-blue-500">
                      <h3 className="mx-auto text-base font-semibold text-center underline text-white group-hover:text-white">
                        Premium
                      </h3>
                      <p className="text-5xl font-bold text-center text-white">
                        $20.
                        <span className="text-3xl">00</span>
                      </p>
                      <p className="text-xs text-center uppercase text-white">Mensual</p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full py-6 px-8 rounded-b-lg bg-blue-500">
                      <Botton
                        block
                        disabled={walletBalance < 20 ? true : false}
                        loading={isLoading}
                        onClick={() => this.onCreatePay("20")}>
                        Pagar
                      </Botton>
                    </div>
                  </div>
                </div>

                <div className="w-full p-4 md:w-1/2 lg:w-1/3 plan-card">
                  <div className="flex flex-col rounded-lg shadow-lg group card-group relative hover:bg-jblue-secondary cursor-pointer hover:shadow-2xl">
                    <div className="w-full px-4 py-6 rounded-t-lg card-section-1">
                      <h3 className="mx-auto text-base font-semibold text-center underline text-blue-500 group-hover:text-white">
                        Elite
                      </h3>
                      <p className="text-5xl font-bold text-center group-hover:text-white text-blue-500">
                        $30.
                        <span className="text-3xl">00</span>
                      </p>
                      <p className="text-xs text-center uppercase group-hover:text-white text-blue-500">
                        Mensual
                      </p>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full h-full py-6 px-8 rounded-b-lg bg-blue-500">
                      <Botton
                        block
                        disabled={walletBalance < 30 ? true : false}
                        loading={isLoading}
                        onClick={() => this.onCreatePay("30")}>
                        Pagar
                      </Botton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default HomeScreen;

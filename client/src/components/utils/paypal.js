import React, { Component } from "react";
import PaypalExpressBtn from "react-paypal-express-checkout";
class PayPal extends Component {
  render() {
    const onSuccess = payment => {
      console.log(JSON.stringify(payment));
      this.props.onSuccess(payment);
      /* {"paid":true,"cancelled":false,"payerID":"R2576V6BHUUPS","paymentID":"PAYID-LSMAJZQ86399700CB026841U","paymentToken":"EC-9VR40623A0575210F","returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LSMAJZQ86399700CB026841U&token=EC-9VR40623A0575210F&PayerID=R2576V6BHUUPS","address":{"recipient_name":"PRAFFUL SINGH","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"email":"kelvin.lake912@gmail.com"}*/
    };

    const onCancel = data => {
      console.log(JSON.stringify(data));
    };

    const onError = err => {
      console.log(JSON.stringify(err));
    };

    let env = "sandbox";
    let currency = "USD";
    let total = this.props.toPay;

    const client = {
      sandbox:
        "ATumROS1op5bJEFgSGYxFRKk1b9oFaoqdwTCr8KUs3LMB3d5Rtd60IaEEHyRhy14bbLE1b3kJcXJrAPe",
      production: ""
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency={currency}
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: "large",
            color: "blue",
            shape: "rect",
            label: "checkout"
          }}
        />
      </div>
    );
  }
}

export default PayPal;

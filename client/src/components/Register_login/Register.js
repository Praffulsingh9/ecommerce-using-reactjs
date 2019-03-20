import React, { Component } from "react";
import { connect } from "react-redux";
import Formfield from "../utils/Form/formFields";
import { update, generateData, isFormValid } from "../utils/Form/formActions";
class Register extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formdata: {
      name: {
        element: "input",
        value: "",
        config: {
          name: "name_input",
          type: "text",
          placeholder: "Enter Your Name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      lastname: {
        element: "input",
        value: "",
        config: {
          name: "lastname_input",
          type: "text",
          placeholder: "Enter Your Lastname"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter Your Email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter Your Password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      confirmPassword: {
        element: "input",
        value: "",
        config: {
          name: "confirm_password_input",
          type: "password",
          placeholder: "Confirm Your Password"
        },
        validation: {
          required: true,
          confirm: "password"
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };

  submitForm = event => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, "register");
    let formIsValid = isFormValid(this.state.formdata, "register");

    if (formIsValid) {
      console.log(dataToSubmit);
    } else {
      this.setState({
        formError: true
      });
    }
  };

  updateForm = element => {
    const newFormdata = update(element, this.state.formdata, "register");
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  };

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <div className="register_login_container">
            <div className="left">
              <form onSubmit={event => this.submitForm(event)}>
                <h2>Personal Information</h2>
                <div className="form_block_two">
                  <div className="block">
                    <Formfield
                      id={"name"}
                      formdata={this.state.formdata.name}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <Formfield
                      id={"lastname"}
                      formdata={this.state.formdata.lastname}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                <div>
                  <Formfield
                    id={"email"}
                    formdata={this.state.formdata.email}
                    change={element => this.updateForm(element)}
                  />
                </div>
                <h2>Verify Password</h2>
                <div className="form_block_two">
                  <div className="block">
                    <Formfield
                      id={"password"}
                      formdata={this.state.formdata.password}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                  <div className="block">
                    <Formfield
                      id={"confirmPassword"}
                      formdata={this.state.formdata.confirmPassword}
                      change={element => this.updateForm(element)}
                    />
                  </div>
                </div>
                {this.state.formError ? (
                  <div className="error_label">Please check your data</div>
                ) : null}

                <button onClick={event => this.submitForm(event)}>
                  Create an Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Register);

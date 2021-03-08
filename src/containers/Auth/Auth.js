import React, {useEffect, useState} from 'react';
import classes from './Auth.module.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import {checkValidity} from '../../shared/utility' ;

const Auth =props => {
    const [controls, setControls] =useState(
       {
        email: {
          elementType: "input",
          elementConfig: {
            type: "email",
            placeholder: "Mail Address"
          },
          value: "",
          validation: {
            required: true,
            isEmail: true
          },
          valid: false,
          touched: false
        },
        password: {
          elementType: "input",
          elementConfig: {
            type: "password",
            placeholder: "Password"
          },
          value: "",
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        }
      });
     const [isSignUp, setIsSignUp]=useState(true);
   
    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== "/") {
          props.onSetAuthRedirectPath();
        }
      }, []);
    
    const  inputChangedHandler = (event, controlName) => {
        const updatedControls = {
          ...controls,
          [controlName]: {
            ...controls[controlName],
            value: event.target.value,
            valid: checkValidity(
              event.target.value,
             controls[controlName].validation
            ),
            touched: true
          }
        }
       setControls(updatedControls);
    }
   const  submitHandler=(event) =>{ 
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    }
   const switchAuthModeHandler = () => {
       setIsSignUp(!isSignUp);
      };

    
        const formElementsArray = [];
        for (let key in controls) {
          formElementsArray.push({
            id: key,
            config:controls[key]
          });
        }
        let form = formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={event => inputChangedHandler(event, formElement.id)}
              invalid={!formElement.config.valid}
              touched={formElement.config.touched}
              shouldValidate={formElement.config.validation}
            />
          );
        });
    if(props.loading)
        form=<Spinner />
        let errorMessage = null;
        if (props.error) {
          errorMessage = <p>{props.error.message}</p>;
        }

        let authRedirect = null;
        if(props.isAuthenticated){
            authRedirect= <Redirect to={props.authRedirectPath} />
        }
    
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                <Button clicked={switchAuthModeHandler} btnType="Danger">SWITCH TO {isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
                </form>
            </div>
        );
    }

const mapStateToProps= state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
         authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps= dispatch => {
    return{
         onAuth: (email,password,isSignUp)=> dispatch(actions.auth(email,password,isSignUp)),
         onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
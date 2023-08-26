import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading:false,
};

const accountSlice=createSlice({
  name:"account",
  initialState,
  reducers:{
    deposite(state,action){
      state.balance=state.balance+action.payload;
    },
    withdraw(state,action){
      state.balance=state.balance-action.payload;
    },

    requestLoan:{
      
      prepare(amount,purpose){
        return {
          payload:{amount,purpose}
        }
      },

      reducer(state,action){
      if(state.loan>0) return;

      state.loan=action.payload.amount;
      state.loanPurpose=action.payload.purpose;
      state.balance=state.balance+action.payload.amount;
    },

    },
  
    payLoan(state,action){
      state.balance-=state.loan;
      state.loan=0;
      state.loanPurpose="";
    }
  }
})

export const{deposite,withdraw,requestLoan,payLoan}=accountSlice.actions;

export default accountSlice.reducer;
/*
export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload,isLoading:false };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;

      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    case "account/convertingCurrency":
      return{...state,isLoading:true}

    default:
      return state;
  }
}

export function deposite(amount,currency) {
  if(currency==="USD")return { type: "account/deposite", payload: amount };
  
  return async function(dispatch,getState){

    dispatch({type:"account/convertingCurrency"})

    const res=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
    const data=await res.json();
    const converted=data.rates.USD;

    dispatch({type:"account/deposite",payload:converted })
  }

}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestloan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/

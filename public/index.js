console.log("script Working");

/////////////////////////Axios Functions/////////////////////////////////////

//Customer Form post

//Customer Form data handling
function FormSubmit(event) {
  //   const firstname = data.get("firstname");
  //   const lastname = data.get("lastname");
  //   const email = data.get("email");
  //   const phone = data.get("phone");
  //   const address = data.get("address");
  //   console.log({ value });
  return new Promise((resolve, reject) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    if (value) {
      //   console.log(value);
      resolve(value);
    } else {
      const err = "Something is wrong";
      reject(err);
    }
  });
}
function handleFormSubmit(event) {
  return FormSubmit(event)
    .then((val) => {
      console.log(val);
      axios
        .post("/api/createcustomer", {
          firstName: val.firstname,
          lastName: val.lastname,
          email: val.email,
          phone: val.phone,
          address: val.address,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

const customerForm = document.getElementsByClassName("customer-form");
customerForm[0].addEventListener("submit", handleFormSubmit);

// Add transaction data

const transactionForm = document.getElementsByClassName("transaction-form");
transactionForm[0].addEventListener("submit", handleFormSubmit);

// Add division data

const divisonForm = document.getElementsByClassName("division-form");
divisonForm[0].addEventListener("submit", handleFormSubmit);

//Get customerByID
const customerByIdForm = document.getElementsByClassName("customer-by-id");
customerByIdForm[0].addEventListener("submit", handleFormSubmit);

//Get transaction by division

const TransactionByDivisionForm = document.getElementsByClassName(
  "division-transactions"
);
TransactionByDivisionForm[0].addEventListener("submit", handleFormSubmit);

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
//Axios Get functions
let divisions = [];
//Get divisions and populate the division fields
window.addEventListener("load", function () {
  getDivisionData();
});
function getDivisionData() {
  axios
    .get("/api/getdivisions")
    .then((data) => {
      data.data.map((arr) => {
        divisions.push(arr);
      });
      // console.log(divisions);
      let divisionById = document.getElementById("division-form");
      let getTransactionByDivision = document.getElementById("get-division");
      // console.log(divisionById, getTransactionByDivision);

      divisions.map((data) => {
        // console.log(data.name, data._id);
        var option = document.createElement("option");
        option.text = data.name;
        option.value = data._id;
        divisionById.appendChild(option);
        // console.log(option);
      });
      divisions.map((data) => {
        // console.log(data.name, data._id);
        var option = document.createElement("option");
        option.text = data.name;
        option.value = data._id;
        getTransactionByDivision.appendChild(option);
        // console.log("this is second option", option);
      });
      // console.log(divisionById);
    })
    .catch((err) => console.log(err));
}

//Axios Post Functions
function handleCustomerFormSubmit(event) {
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

function handleTransactionFormSubmit(event) {
  return FormSubmit(event)
    .then((val) => {
      console.log(val.transactionType);
      axios
        .post("api/createtransaction", {
          customer: val.customer,
          ammount: val.ammount,
          division: val.division,
          transactionType: val.transactionType,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err, res));
    })
    .catch((err) => console.log(err));
}

function handleAddDivision(event) {
  return FormSubmit(event).then((val) => {
    console.log(val.Divison);
    axios
      .post("api/createdivision", {
        name: val.Divison,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  });
}

function handleGetTransactionByDivisionID(event) {
  return FormSubmit(event).then((val) => {
    console.log(val);
    axios
      .get(`api/transactionbydivision/divisionID=${val.divisionId}`)
      .then((data) => {
        console.log(data);
        var table = document
          .getElementById("myTable")
          .getElementsByTagName("tbody")[0];
        const newdata = data.data;
        console.log(newdata);
        data.data.map((transactions) => {
          console.log(transactions);
          var newRow = table.insertRow(table.rows.length);
          var TransactionId = newRow.insertCell();

          var Name = newRow.insertCell();

          var Division = newRow.insertCell();
          var Ammount = newRow.insertCell();
          var transactionType = newRow.insertCell();
          var text = document.createTextNode(transactions._id);
          TransactionId.appendChild(text);
          var text = document.createTextNode(transactions.customer);
          Name.appendChild(text);
          var text = document.createTextNode(transactions.division);
          Division.appendChild(text);
          var text = document.createTextNode(transactions.ammount);
          Ammount.appendChild(text);
          var text = document.createTextNode(transactions.transactionType);
          transactionType.appendChild(text);
        });
      })
      .catch((err) => console.log(err));
  });
}
const customerForm = document.getElementsByClassName("customer-form");
customerForm[0].addEventListener("submit", handleCustomerFormSubmit);

// Add transaction data

const transactionForm = document.getElementsByClassName("transaction-form");
transactionForm[0].addEventListener("submit", handleTransactionFormSubmit);

// Add division data

const divisonForm = document.getElementsByClassName("division-form");
divisonForm[0].addEventListener("submit", handleAddDivision);

//Get customerByID
const customerByIdForm = document.getElementsByClassName("customer-by-id");
customerByIdForm[0].addEventListener("submit", function () {
  console.log("clicked");
});

//Get transaction by division

const TransactionByDivisionForm = document.getElementsByClassName(
  "division-transactions"
);
TransactionByDivisionForm[0].addEventListener(
  "submit",
  handleGetTransactionByDivisionID
);

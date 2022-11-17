// Function to list all Expenses and push them in html
async function getAll() {
  axios.get("http://localhost:3000/getAll").then((expenses) => {
    expenses = expenses.data.allExpenses; // Getting Expenses as array
    const list = document.getElementById("list");
    list.innerHTML = "";
    // appending on list.innerHTML for each iteration of Expenses array
    expenses.forEach((expense) => {
      list.innerHTML =
        list.innerHTML +
        `<tr><td>${expense.cat}</td><td>${expense.amount}</td><td>${expense.desc}</td><td><button class="btn btn-warning"  onclick="deleteExpense(${expense.id})">Delete</button></td><td><buttn class="btn btn-info" onclick="editExpense(${expense.id})"> Edit</buttn></td></tr>`;
    });
  });
}
// Calling getAll on each load
getAll();

// Function to Add Expense
async function addexpense(e) {
  // e.preventDefault();
  const cat = e.target.cat.value;
  const amount = e.target.amount.value;
  const desc = e.target.desc.value;
  //Creating an object of the Expense
  const obj = {
    c: cat,
    a: amount,
    d: desc,
  };

  // Posting a single Expense
  await axios.post("http://localhost:3000/add-expense", obj);
  //Listing All
  getAll();
}

// Function to Delete Expense

async function deleteExpense(id) {
  //Sending Delete request through dynamic route via params
  axios.delete(`http://localhost:3000/delete-expense/${id}`).then(() => {
    //Listing All after deleting
    getAll();
  });
}

//Function to edit Expense

async function editExpense(id) {
  //Sending get request through dynamic route via params
  axios.get(`http://localhost:3000/get-Expense/${id}`).then((res) => {
    //pepopulate
    document.getElementById("cat").value = res.data[0].cat;
    document.getElementById("amount").value = res.data[0].amount;
    document.getElementById("desc").value = res.data[0].desc;
    //Calling Above written deleteExpense on id of above data
    deleteExpense(res.data[0].id).then(() => {
      //Listing All after deleting
      getAll();
    });
  });
}

// End of the File

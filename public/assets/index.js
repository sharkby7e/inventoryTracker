console.log("script is linked");

// selecting elements from page
const prodName = document.querySelector("#productName");
const desc = document.querySelector("#desc");
const submit = document.querySelector("#submit");
const all = document.querySelector("#all");
const list = document.querySelector("#list");
const warehouses = document.querySelector("#warehouses");
const stockStr = document.querySelector("#stock");
const whListOpts = document.querySelector("#whListOpts");
const whList = document.querySelector("#whList");

// add to db handler
const addDb = async (e) => {
  e.preventDefault();
  const name = prodName.value.trim();
  const description = desc.value.trim();
  const warehouse_id =
    warehouses.options[warehouses.selectedIndex].getAttribute("w-id");
  const stock = parseInt(stockStr.value.trim());
  if (name && description && warehouse_id && stock) {
    console.log(name, description, stock, warehouse_id);
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ name, stock, description, warehouse_id }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      alert(`${name} added to the database`);
      document.location.reload();
    } else {
      alert("Error Adding product to Database, please try again!");
    }
  } else {
    alert("Please Ensure form is filled out, and warehouse is selected");
  }
};

// get all products on page load
const getProducts = async () => {
  const getAll = await fetch("api/products", {
    method: "GET",
  });
  if (getAll.ok) {
    getAll.json().then((data) => display(data));
  } else {
    alert("");
  }
};

// add products from fetch to list on page load
const display = (data) => {
  list.innerHTML = "";
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    const { id, stock, name, description, warehouse } = data[i];
    const newLi = document.createElement("li");
    newLi.textContent = `${name} - ${description} ///
      Warehouse: ${warehouse.location} ///   `;

    const newInput = document.createElement("input");
    const newLabel = document.createElement("label");
    newLabel.textContent = "Current Stock: ";
    newInput.setAttribute("value", stock);
    newLi.append(newLabel);
    newLi.append(newInput);

    const newUp = document.createElement("button");
    newUp.setAttribute("up-id", `${id}`);
    newUp.textContent = "Update Stock";
    newLi.append(newUp);

    const newDl = document.createElement("button");
    newDl.setAttribute("del-id", `${id}`);
    newDl.textContent = "Delete";
    newLi.append(newDl);

    list.append(newLi);
  }
};

// handler to route to updateFetch or deleteFetch functions
const upDel = (e) => {
  e.preventDefault();
  if (e.target.hasAttribute("del-id")) {
    const id = e.target.getAttribute("del-id");
    deleteFetch(id);
  }
  if (e.target.hasAttribute("up-id")) {
    const id = e.target.getAttribute("up-id");
    const val = parseInt(e.target.previousSibling.value.trim());
    if (val && id) {
      updateFetch(val, id);
    } else {
      alert("Please update stock with a number!");
    }
  }
};

// updates stock
const updateFetch = async (val, id) => {
  console.log(val, id);
  const stock = val;
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify({ stock }),
    headers: { "Content-Type": "application/json" },
  });
  if (res.ok) {
    alert(`Stock updated!`);
    document.location.reload();
  } else {
    alert("Error Adding product to Database");
  }
};

//deletes item from db
const deleteFetch = async (id) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    alert(`Item deleted from the database!`);
    document.location.reload();
  } else {
    alert("Error deleting product from Database!");
  }
};

// gets warehouses from db,
const getWarehouses = async () => {
  const res = await fetch(`api/warehouses`, {
    method: "GET",
  });
  res.json().then((data) => populateDropdown(data));
};

//populates the two dropdowns
const populateDropdown = (arr) => {
  for (var i = 0; i < arr.length; i++) {
    const { location, id } = arr[i];
    const newWare = document.createElement("option");
    newWare.setAttribute("w-id", `${id}`);
    newWare.textContent = `${location}`;
    warehouses.append(newWare);
  }
};

//Event listeners
submit.addEventListener("click", addDb);
list.addEventListener("click", upDel);

const init = () => {
  getWarehouses();
  getProducts();
};
init();

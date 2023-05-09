const MOCK_URL = "http://localhost:8000/users";
let tbody = document.querySelector("tbody");
let addBtn = document.querySelector("#add");
let inputs = document.querySelectorAll("input");
let editStatus = false;
let editID = null;
async function drawTable() {
  tbody.innerHTML = "";
  await fetch(`${MOCK_URL}`)
    .then((resp) => resp.json())
    .then((data) =>
      data.forEach((item) => {
        let trElement = document.createElement("tr");

        trElement.innerHTML += `
              
              <td>${item.id}</td>
              <td>${item.Country}</td>
              <td>${item.City}</td>
              <td>${item.PostCode}</td>
              <td>
                <div class="buttons">
                <button class="editbtn" onclick=editBtn("${item.id}")>edit</button>
                 <button class="deletebtn" onclick=deleteBtn("${item.id}")>delete</button></div>
              </td>
              
              
              `;
        tbody.append(trElement);
      })
    );
}
drawTable();
async function deleteBtn(id) {
  await axios.delete(`${MOCK_URL}/${id}`);
}

addBtn.disabled = true;
function check() {
  //    let inputcheck= inputs.forEach(item=>item.value)
  if (inputs[1].value && inputs[2].value && inputs[3].value) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.setAttribute("disabled", "");
  }
}
inputs.forEach((item) => item.addEventListener("input", check));

addBtn.addEventListener("click", async function () {
  if (!editStatus) {
    let obj = {
      Country: inputs[1].value,
      City: inputs[2].value,
      PostCode: inputs[3].value,
    };
    await axios.post(`${MOCK_URL}`, obj);
   
  } else {
    let obj2 = {
      Country: inputs[1].value,
      City: inputs[2].value,
      PostCode: inputs[3].value,
    };
    await axios.patch(`${MOCK_URL}/${editID}`, obj2);

    inputs.forEach((item) => (item.value = ""));
    addBtn.innerText="ADD"
  }
});

async function editBtn(id) {
  editStatus = true;
  editID = id;
  let obj = await axios(`${MOCK_URL}/${id}`).then((resp) => resp.data);
  inputs[1].value = obj.Country;
  inputs[2].value = obj.City;
  inputs[3].value = obj.PostCode;
  addBtn.innerText="Edit"
}

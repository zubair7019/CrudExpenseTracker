let form = document.getElementById("addform");
let itemlist = document.getElementById("items");
const Amount = document.getElementById("inp1");
const Description = document.getElementById("inp2");
const category = document.getElementById("inp3");

//data will store after refresh the page///
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/66196bc60cc64ead8021044df8aa13a4/appointmentcell"
    )
    .then((response) => {
      // console.log(response.data)
      for (let i = 0; i < response.data.length; i++) {
        onscreenshow(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

form.addEventListener("submit", addItem);
//additem//
function addItem(e) {
  e.preventDefault();

  //get input value//
  let Amount = document.getElementById("inp1").value;
  let Description = document.getElementById("inp2").value;
  let category = document.getElementById("inp3").value;

  const obj = {
    Amount,
    Description,
    category,
  };
  /////asyn await use for update the list from ui and server//
  async function updateboth() {
    ///if data is present then delete it//
    await updateli(Description);
    ///after delete we are posting the list both//
    await axios
      .post(
        "https://crudcrud.com/api/66196bc60cc64ead8021044df8aa13a4/appointmentcell",
        obj
      )
      .then((response) => {
        onscreenshow(response.data);
        // console.log(response)
      })
      .catch((err) => console.log(err));
  }
  updateboth();
}

function onscreenshow(obj) {
  var li = document.createElement("li");
  var li = document.createElement("li");
  var li = document.createElement("li");

  //create delete button//
  var delbtn = document.createElement("button");
  delbtn.className = "delete";

  //create edit button//
  var editbtn = document.createElement("button");
  editbtn.className = "edt";

  //append delbtn//
  delbtn.appendChild(document.createTextNode("Delete"));

  //append editbtn//
  editbtn.appendChild(document.createTextNode("EDIT"));

  //adding item//

  li.appendChild(document.createTextNode(`${obj.Amount}`));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(`${obj.Description}`));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(`${obj.category}`));
  li.appendChild(document.createTextNode(" "));

  //for delete//
  li.appendChild(delbtn);
  //for edit//
  li.appendChild(editbtn);
  itemlist.appendChild(li);
}

/////remove fucntion//////

itemlist.addEventListener("click", removeitem);
function removeitem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("are you sure")) {
      var li = e.target.parentElement;
      const key = li.childNodes[2].textContent; ///unique key target//
      datadelte(key);
      itemlist.removeChild(li);
    }
  }
}

///for editing///
itemlist.addEventListener("click", editfun);

function editfun(e) {
  if (e.target.classList.contains("edt")) {
    var li = e.target.parentElement;
    //  console.log(li)
    let amt = li.childNodes[0].textContent; ///targeting index of item//
    let dis = li.childNodes[2].textContent;
    let cat = li.childNodes[4].textContent;
    // console.log(amt,dis,cat)
    let v1 = document.getElementById("inp1");
    let v2 = document.getElementById("inp2");
    let v3 = document.getElementById("inp3");
    v1.value = amt;
    v2.value = dis;
    v3.value = cat;
    datadelte(dis);
    itemlist.removeChild(li);
  }
}

function datadelte(key) {
  axios
    .get(
      "https://crudcrud.com/api/66196bc60cc64ead8021044df8aa13a4/appointmentcell"
    )
    .then((response) => {
      let data = response.data;
      for (let i = 0; i < data.length; i++) {
        if (key === data[i].Description) {
          // console.log(data[i]._id)
          axios.delete(
            `https://crudcrud.com/api/66196bc60cc64ead8021044df8aa13a4/appointmentcell/${data[i]._id}`
          );
        }
      }
    });
}
//////update the li item.//
function updateli(Des) {
  let lilist = itemlist.querySelectorAll("li");
  Array.from(lilist).forEach((li) => {
    let data = li.childNodes[2].textContent;
    if (Des == data) {
      datadelte(data);
      itemlist.removeChild(li);
      // console.log(li,data)
    }
  });
}


const preDefine = {
    "name": "company",
    "company": "trimble1",
    "employee": [
      {
        "id": 1,
        "name": "vishnu",
        "job": "dev"
      },
      {
        "id": 2,
        "name": "ajay",
        "job": "qa"
      },
      {
        "id": 3,
        "name": "vijay",
        "job": "test"
      }
    ]
  }

const textElem = "#textElem";
const errorElem = ".error";
const outputElem = ".output";
const elementSelector = value => document.querySelector(value);
let displayError = (data) => {
    let element = elementSelector(errorElem);
    element.innerText = data.message;
    setTimeout(() => {
        element.classList.toggle("disable");
    },1000)
}
let parents = "";
let childs = "";
let createParent = (data, haveSubData) => {
    let temp = haveSubData ? `<div class="parent"> 
    <div class="parent-val">${data[0]}</div>
    </div>
    ` : `<div class="parent"> 
    <div class="data-key">${data[0]}</div>
    <div class="data-val">${data[1]}</div>
    </div>
    `;
    parents += temp;
}
let createChild = (data, isArray) => {
    let temp = isArray ? `<div class="subchild"> 
        <div class="data-val">${data[0]}</div>
    `: `<div class="subchild">
    <div class="data-key">${data[0]}</div>
    <div class="data-val">${data[1]}</div></div>`;
    childs += temp;
}
let child="";
let renderThis = (data) => {
    for (let key of Object.keys(data)) {
        console.log(data[key],typeof (data[key]) !== "object", typeof (data[key]))
        if (typeof (data[key]) !== "object") {
            createParent([key, data[key]], false)
        }
        else {
            createParent([key], true)
            console.log(data[key])
            for (let subkey of Object.keys(data[key])) {
                // let subChilds =  "";
                if (Array.isArray(data[key][subkey])) {
                    createChild([data[key][subkey]], true)
                }
                else {
                    console.log(Object.keys(data[key][subkey]))
                    for (let subSubkey of Object.keys(data[key][subkey])) {
                        console.log(key,subkey, subSubkey)
                        createChild([subSubkey, data[key][subkey][subSubkey]], false)
                    }
                }
                child+=`<div class="child">${childs}</div>`
                childs="";
            }

            parents += `<div class="childs">${child}</div>`;
            child = "";
        }
    }
    // console.log(parents)
    elementSelector(outputElem).innerHTML = parents;
}
// renderThis(preDefine);

let inputData = (event)=>{
    try{
        let parseInput = JSON.parse(JSON.parse(JSON.stringify(event.target.value)));
        elementSelector(outputElem).innerHTML="";
        renderThis( parseInput)
    }
    catch (error){
        console.log(error)
        displayError(error)
    }
}
elementSelector(textElem).addEventListener("input",inputData)
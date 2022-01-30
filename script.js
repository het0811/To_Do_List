const inputBox = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAllButton = document.querySelector(".footer button");


inputBox.onkeyup = ()=>{
    let userData = inputBox.value; //getting what user enter in the input box.
    if(userData.trim() !=0) //  if user values aren't only spaces.
    {    
        addButton.classList.add("active") //active add button..;
    }
    else {
        addButton.classList.remove("active") //unactive add button..;
    }
} 
showT(); // calling function
//what if user click on add buttxon.. 
addButton.onclick = ()=>{
    let userData = inputBox.value; //getting what user enter in the input box.
    let getLocalStorage = localStorage.getItem("New to-do");// getting local storage;
    if(getLocalStorage == null){
        listAr = [];// create a empty array;
    }
    else{
            listAr = JSON.parse(getLocalStorage);// transform json string to js objects
    }
    listAr.push(userData);// push or add user data
    localStorage.setItem("New to-do",JSON.stringify(listAr));// transform js objects to json string
    showT(); // calling function
    addButton.classList.remove("active") //unactive add button..;

}
//function to add task list inside ul
function showT(){
    let getLocalStorage = localStorage.getItem("New to-do");// getting local storage;
    if(getLocalStorage == null){
        listAr = [];// create a empty array;
    }
    else{
            listAr = JSON.parse(getLocalStorage);// transform json string to js objects
    }
    const pendingnum = document.querySelector(".pendingnum");
    pendingnum.textContent = listAr.length; //size of remaining task;
    if(listAr.length > 0){
        clearAllButton.classList.add("active");
    }
    else {
        clearAllButton.classList.remove("active"); //if array size is 0 then inactive the clear all button;
    }
    let newTag = '';
    listAr.forEach((element, index) => {
    newTag += `<li>${element}<span onclick = "deleteT(${index})"; ><i class="fas fa-trash"></i></span></li>`; 
    });
    todoList.innerHTML = newTag; // adding a new list tag inside  ul tag
    inputBox.value = ""; 

}
//delete function
function deleteT(index){
    let getLocalStorage = localStorage.getItem("New to-do");// getting local storage;
    listAr = JSON.parse(getLocalStorage);// transform json string to js objects
    listAr.splice(index, 1);  //delete the indexed li
    
    //after remove update the local storage
    localStorage.setItem("New to-do",JSON.stringify(listAr));// transform js objects to json string
    showT(); // calling function

}
//for clear all the task from list
clearAllButton.onclick = () =>{
    listAr = [] // o/p will be empty;
    //after clear all lists 
    localStorage.setItem("New to-do",JSON.stringify(listAr));// transform js objects to json string
    showT(); // calling function;
}
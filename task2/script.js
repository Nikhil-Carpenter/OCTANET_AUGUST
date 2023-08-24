let inp = document.getElementById('inp')
let btn = document.getElementById("btn")
let list = document.getElementById("list")

let editing = false;
let editID;

let allTodo = [];

if (localStorage.getItem("allTodo")) {
    allTodo = JSON.parse(localStorage.getItem("allTodo"))
    display(allTodo)
}

btn.addEventListener("click",()=>{
    let todo={};
    if (allTodo.length!==0) {
        lastId = allTodo[allTodo.length-1].id
        todo.id = ++lastId;
    }else{
        todo.id = 1;
    }
    if (editing) {
       let editTodo = allTodo.find((ele)=>{
            return ele.id === editID;
        })
        editTodo.text = inp.value.trim()
        display(allTodo)
        editing = false;
        editID = null;
    }else{
        todo.text = inp.value.trim();
    
    if (todo.text !== '') {
        allTodo.push(todo)
        display(allTodo);
    }else{
        alert("please enter todo")
        display(allTodo);
    }
}
   
})

function display(allTodo){
    document.getElementById("list").innerHTML = "";

    allTodo.forEach(ele => {
        let li = document.createElement("li");
        li.classList.add("list_item")

        let span = document.createElement("span");
        span.innerHTML = ele.text;

       
   
        let btnDIv = document.createElement("div")

        let check = document.createElement("button")
        check.classList.add("fa-solid","fa-check","check")
        check.addEventListener("click",()=>{
            ele.completed = true;
            display(allTodo)
        })
        
        let del = document.createElement("button")

        del.classList.add("fa-solid","fa-trash-can","del")
        del.addEventListener("click",()=>{
            deleteToDo(ele.id)
        })

        let edit = document.createElement("button")

        edit.classList.add("fa-regular","fa-pen-to-square","edit")
        edit.addEventListener("click",()=>{
            EditToDo(ele)
        })

        if (ele.completed === true) {
            span.classList.add('completed')

            check.style.cursor = "not-allowed";
            check.style.opacity = "0.4"
            check.setAttribute("disabled",true)

            edit.style.cursor = "not-allowed";
            edit.style.opacity = "0.4"
            edit.setAttribute("disabled",true)
        }

        li.appendChild(span)
    
        btnDIv.append(check,edit,del)
        li.appendChild(btnDIv)
        list.appendChild(li)
    });
    localStorage.setItem("allTodo",JSON.stringify(allTodo))
    inp.value = '';
}

// function for deleting  a todo
function deleteToDo(id){
    let delItemIdx = allTodo.findIndex((elem,idx)=>{
        return elem.id === id;
    })
    allTodo.splice(delItemIdx,1);
    display(allTodo)
}

function EditToDo(ele){
    editing = true;
    inp.focus()
    if (editing) {
        btn.innerText = "Edit";
    }
    editID = ele.id;
    inp.value = ele.text;
}

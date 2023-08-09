let inp = document.getElementById('inp')
let btn = document.getElementById("btn")
let list = document.getElementById("list")

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
    todo.text = inp.value;
    if (todo.text !== '') {
        allTodo.push(todo)
        console.log(allTodo);
        display(allTodo);
    }else{
        alert("please enter todo")
        display(allTodo);
    }
   
})

function display(allTodo){
    document.getElementById("list").innerHTML = "";

    allTodo.forEach(ele => {
        let li = document.createElement("li");
        li.classList.add("list_item")

        let span = document.createElement("span");
        span.innerHTML = ele.text;

        if (ele.completed === true) {
            span.classList.add('completed')
        }
        li.appendChild(span)
   
        let btnDIv = document.createElement("div")
        
        let check = document.createElement("i")
        check.classList.add("fa-solid","fa-check","check")
        check.addEventListener("click",()=>{
            ele.completed = true;
            display(allTodo)
        })
        let del = document.createElement("i")

        del.classList.add("fa-solid","fa-trash-can","del")
        del.addEventListener("click",()=>{
            deleteToDo(ele.id)
        })
    
        btnDIv.append(check,del)
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


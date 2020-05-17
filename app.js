const addForm  = document.querySelector('.addToDo');
const addBtn = document.querySelector('.add-btn');
const ul = document.querySelector('ul');
const search =  document.querySelector('.search input');


//filter function for search
/*
filtertoDos consist an array set of all unmatched todos,
so that we can hide them using css class and only show the matching todo item as per the user search
*/
const filtertoDos = typedString =>{
  
    //chaining array methods

    //html collecton to array set - typecast, so that we can use array methods like filter, for-each etc;

  Array.from(ul.children).filter(li => {
    
        /* return li.textContent.includes(typedString);
        this will return result of matching string but we need to filter out non matching strings. 
        So   vvvv */
        return !(li.textContent.toLowerCase().includes(typedString));

   }).forEach(li => {
       //now applying the class that will hide these filtered set of unmatched items/todos
        li.classList.add('filtered');
   })

   //if somestring doesn't match while typing but while back spaving something do match for that case we will just reverse the above case;

   
  Array.from(ul.children).filter(li => li.textContent.toLowerCase().includes(typedString)).forEach(li =>li.classList.remove('filtered'));


}
//search and filter
search.addEventListener('keyup', () => {
    
    const typedString = search.value.trim().toLowerCase(); //trim to avoid whitespaces and case insensitive search
    filtertoDos(typedString);

});


//event delegation for deleting items/toDos
ul.addEventListener('click', e => {
 
    //checking if the trash icons is been cliked
    if(e.target.classList.contains('delete')){
        //then checking its parent element which is li
        e.target.parentElement.remove();


        // to insert empty list icon when no todo is present
        if(ul.childElementCount < 1)
        ul.classList.add('body-bg');  
    }
         // ul.classList.add('body-bg'); 
});

//create/ add item
const createList = todo =>{

    //to avoid empty strings
    if(todo.length){

    const li = ` 
    <li class="item">
        <span class='item-des'>${todo}</span>
        <i class="fas fa-trash delete"></i>
    </li>
    `;//create li tag

    ul.innerHTML += li;
    addForm.reset(); // reset all input fields inside our form after adding the item
    }else{
        alert("no toDo to add!")
    }

    //removing the empt list icon after adding out first toDO
    if(ul.childElementCount > 0)
    ul.classList.remove('body-bg');
};

const addtoDo = e =>{
    e.preventDefault();
    const todo = addForm.add.value.trim(); //trim removes all white spaces
    createList(todo);
}

addForm.addEventListener('submit',addtoDo);
addBtn.addEventListener('click', addtoDo);

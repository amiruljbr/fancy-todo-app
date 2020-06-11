const baseUrl = 'http://localhost:3000';

$(document).ready(function(){
  home();

  $('#login-form').submit(function(event){
    event.preventDefault();
    console.log('mashooooook');
    let username= $('#inputLoginEmail').val();
    let password = $('#inputLoginPassword').val(); 
    $.ajax({
      method: 'POST',
      url: baseUrl + '/users/login',
      data:{
        username, password
      }
    })
      .done(data=>{
        console.log(data);
        localStorage.setItem('token', data.token);
        home();
      })
      .fail(err=>{
        console.log(err)
      })    
  })

  $('#register-form').submit(function(event){
    event.preventDefault();
    console.log('register');
    $('#register').show()
    let username = $('#inputRegisterUsername').val();
    let email= $('#inputRegisterEmail').val();
    let password = $('#inputRegisterPassword').val(); 
    console.log(email,password,username)
    $.ajax({
      method: 'POST',
      url: baseUrl + '/users/create',
      data:{
        username, email, password
      }
    })
      .done(data=>{
        console.log(data)
      })
      .fail(err=>{
        console.log(err)
      })    
  })

  $('#todo-form').submit(function(event){
    event.preventDefault();
    console.log('todo');
    let title = $('#inputTitle').val();
    let description= $('#inputDescription').val();
    let due_date = $('#inputDueDate').val(); 
    $.ajax({
      method: 'POST',
      url: baseUrl + '/todos/create',
      headers: {
        access_token: localStorage.token
      },
      data:{
        title, description, due_date
      }
    })
      .done(data=>{
        console.log(data);
        home();
      })
      .fail(err=>{
        console.log(err)
      })  
  })
})

function auth(){
  if(localStorage.token!="false"){
    $('#home').show();
    $('#logout-btn').show();
    $('#login').hide();
    $('#register-btn').hide();
    $('#register').hide();
  } else {
    $('#home').hide();
    $('#register').hide();
    $('#register-btn').show();
    $('#logout-btn').hide();
    $('#login').show();
  }
}

function login(){
  $('#home').hide();
  $('#register').hide()
  $('#login').show()
}

function register(){
  $('#home').hide();
  $('#register').show()
  $('#login').hide()
}

function home(){
  auth();
  getTodos();
}

function logout(){
  localStorage.setItem('token', false);
  home();
}

function getTodos(){
  $.ajax({
    method: 'GET',
    url: baseUrl + '/todos',
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log(data);
      appendDataTodos(data);
    })
    .fail(err=>{
      console.log(err)
    }) 
}

function appendDataTodos(array){
  for (let i in array) {
    $('#dataTodos').append(`
    <tr>
      <th scope="row">3</th>
      <td>Menyapu</td>
      <td>Menyapu lantai</td>
      <td>
        <button type="button" class="btn btn-primary">Detail</button>
        <button type="button" class="btn btn-secondary">Edit</button>
        <button type="button" class="btn btn-danger">Delete</button>
           </td>
              </tr>
    `)
  }
}

function deleteTodos(idTodos){
  $.ajax({
    method: 'DELETE',
    url: baseUrl + '/todos/delete/' + idTodos,
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log(data);
      home();
    })
    .fail(err=>{
      console.log(err)
    }) 
}

function editTodos(idTodos){
  $.ajax({
    method: 'POST',
    url: baseUrl + '/todos/edit/' + idTodos,
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log(data);
      home();
    })
    .fail(err=>{
      console.log(err)
    }) 
}
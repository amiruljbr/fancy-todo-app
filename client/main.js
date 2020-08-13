const baseUrl = 'http://localhost:3000';
let urlImage = localStorage.urlImage;
let currentUsername = localStorage.username;

$(document).ready(function(){
  home();
  pictureProfileAppend();

  $('#login-form').submit(function(event){
    event.preventDefault();
    console.log('proses Login');
    let username= $('#inputLoginEmail').val();
    let password = $('#inputLoginPassword').val(); 
    $.ajax({
      method: 'POST',
      url: baseUrl + '/login',
      data:{
        username, password
      }
    })
      .done(data=>{
        console.log('login sukses',data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('urlImage', data.urlImage);
        localStorage.setItem('username', data.username);
        $('#inputLoginEmail').val('');
        $('#inputLoginPassword').val('');
        urlImage=data.urlImage;
        currentUsername=data.username;
        pictureProfileAppend();
        home();
      })
      .fail(err=>{
        $('#inputLoginEmail').val('');
        $('#inputLoginPassword').val(''); 
        console.log(err.responseJSON)
      })    
  })

  $('#register-form').submit(function(event){
    event.preventDefault();
    console.log('proses register');
    $('#register').show()
    let username = $('#inputRegisterUsername').val();
    let email= $('#inputRegisterEmail').val();
    let password = $('#inputRegisterPassword').val(); 
    $.ajax({
      method: 'POST',
      url: baseUrl + '/register',
      data:{
        username, email, password, urlImage
      }
    })
      .done(data=>{
        console.log('register sukses', data.id, data.email)
        home();
        $('#inputRegisterUsername').val('');
        $('#inputRegisterEmail').val('');
        $('#inputRegisterPassword').val('');
        $('#uploadImage').val(''); 
      })
      .fail(err=>{
        console.log(err.responseJSON)
      })    
  })

  $('#todo-form').submit(function(event){
    event.preventDefault();
    console.log('process input todo');
    let title = $('#inputTitle').val();
    let description= $('#inputDescription').val();
    let due_date = $('#inputDueDate').val(); 
    $.ajax({
      method: 'POST',
      url: baseUrl + '/todos',
      headers: {
        access_token: localStorage.token
      },
      data:{
        title, description, due_date
      }
    })
      .done(data=>{
        console.log('sukses input todo', data);
        $('#inputTitle').val('');
        $('#inputDescription').val('');
        $('#inputDueDate').val(''); 
        home();
      })
      .fail(err=>{
        console.log(err.responseJSON)
      })  
  })


  $('input[type=file]').on("change", function () {
      let $files = $(this).get(0).files;
      if ($files.length) {
          // Reject big files
          if ($files[0].size > $(this).data("max-size") * 1024) {
              console.log("Please select a smaller file");
              return false;
          }
          // Replace ctrlq with your own API key
          let apiUrl = 'https://api.imgur.com/3/image';
          let apiKey = '6661b94998c4ddb';

          let formData = new FormData();
          formData.append("image", $files[0]);

          let settings = {
              "async": true,
              "crossDomain": true,
              "url": apiUrl,
              "method": "POST",
              "datatype": "json",
              "headers": {
                  "Authorization": "Client-ID " + apiKey
              },
              "processData": false,
              "contentType": false,
              "data": formData,
              beforeSend: function (xhr) {
                  console.log("Uploading....");
              },
              success: function (res) {
                  console.log(res.data.link);
                  urlImage = res.data.link;
                  // $('body').append('<img src="' + res.data.link + '" />');
              },
              error: function () {
                  alert("Failed");
              }
          }
          $.ajax(settings).done(function (response) {
              console.log("Done");
          });
      }
    });




})

function auth(){
  if(localStorage.length!=0){
    $('#home').show();
    $('#logout-btn').show();
    $('#login').hide();
    $('#register-btn').hide();
    $('#register').hide();
    getTodos();
    $('#profilePicture').show();
  } else {
    $('#home').hide();
    $('#profilePicture').hide();
    $('#register').hide();
    $('#register-btn').show();
    $('#logout-btn').hide();
    $('#login').show();
  }
}

function pictureProfileAppend(){
  $('#profilePicture').empty();
  $('#profilePicture').append(`
        <img src="${urlImage}" width="30" height="30" alt=""> Welcome, ${currentUsername}`)
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
}

function logout(){
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  });
  localStorage.clear();
  home();
  $('#profilePicture').empty();
  urlImage='';
}

function getTodos(){
  // emptyDataTodos();
  $.ajax({
    method: 'GET',
    url: baseUrl + '/todos',
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log('loading data todos:',data);
      appendDataTodos(data);
    })
    .fail(err=>{
      console.log(err.responseJSON)
    }) 
}

function appendDataTodos(array){
  emptyDataTodos();
  for (let i=0; i<array.length;i++) {
    if(array[i].status=='uncompleted') {
      $('#dataTodos').append(`
      <tr>
        <th scope="row">${i +1}</th>
        <td>${array[i].title}</td>
        <td>${new Date(array[i].due_date).toDateString().replace(/ /,', ')}</td>
        <td>${array[i].status}</td>
        <td>
          <button onclick="doneTodos(${array[i].id})" type="button" class="btn btn-success">Done</button>
          <button  class="btn btn-primary" onclick="getDetailTodos(${array[i].id})" data-toggle="modal" data-target="#detailTodoModal" type="button">Detail</button>
          <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalId${array[i].id}">Edit</button>
          <button onclick="getDeleteTodos(${array[i].id})"  data-toggle="modal" data-target="#deleteTodoId" type="button" class="btn btn-danger">Delete</button>    
        </td>
      </tr>`)
    } else {
      $('#dataTodos').append(`
      <tr>
        <th scope="row">${i +1}</th>
        <td>${array[i].title}</td>
        <td>${new Date(array[i].due_date).toDateString().replace(/ /,', ')}</td>
        <td>${array[i].status}</td>
        <td>
          <button  class="btn btn-primary" onclick="getDetailTodos(${array[i].id})" data-toggle="modal" data-target="#detailTodoModal" type="button">Detail</button>
        </td>
      </tr>`)
    }
    
   
    $('#dataModal').append(`
  <!-- Modal -->
  <div class="modal fade" id="exampleModalId${array[i].id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <form id="form-edit-${array[i].id}">
          <div class="form-group">
            <label for="formGroupExampleInput">Title:</label>
            <input type="text" class="form-control" value="${array[i].title}" id="inputTitle${array[i].id}" placeholder="Input Title">
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput2">Description</label>
            <textarea class="form-control"  id="inputDescription${array[i].id}" placeholder="Input Description">${array[i].description}</textarea>
          </div>
          <div class="form-group">
            <label for="formGroupExampleInput3">Due Date</label>
            <input type="date" value="${array[i].due_date.toString().substr(0, 10)}" class="form-control" id="inputDueDate${array[i].id}">
          </div>
          <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Update</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>

<script>
  $('#form-edit-${array[i].id}').submit(function(event){
    event.preventDefault();
    console.log('process input todo');
    let title = $('#inputTitle${array[i].id}').val();
    let description= $('#inputDescription${array[i].id}').val();
    let due_date = $('#inputDueDate${array[i].id}').val(); 
    $.ajax({
      method: 'PUT',
      url: baseUrl + '/todos/${array[i].id}',
      headers: {
        access_token: localStorage.token
      },
      data:{
        title, description, due_date
      }
    })
      .done(data=>{
        console.log('sukses edit todo', data);
        location.reload();
      })
      .fail(err=>{
        console.log(err.responseJSON)
      })
  })
</script>
    `)
  }
}

function emptyDataTodos(){
  $('#dataTodos').empty();
  $('#dataModal').empty();
}

function deleteTodos(idTodos){
  console.log('proses delete')
  $.ajax({
    method: 'DELETE',
    url: baseUrl + '/todos/' + idTodos,
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log('data terdelete:',data);
      home();
    })
    .fail(err=>{
      console.log(err.responseJSON)
    }) 
}



function editTodos(idTodos){
  console.log('submit edit')
  $.ajax({
    method: 'PUT',
    url: baseUrl + '/todos/' + idTodos,
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log(data);
      home();
    })
    .fail(err=>{
      console.log(err.responseJSON)
    }) 
}

function doneTodos(idTodos){
  event.preventDefault
  console.log('submit done')
  $.ajax({
    method: 'PUT',
    url: baseUrl + '/todos/' + idTodos + '/done',
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log(data);
      home();
    })
    .fail(err=>{
      console.log(err.responseJSON)
    }) 
}

function getEditTodos(idTodos){
  console.log('process edit')
  $.ajax({
    method: 'GET',
    url: baseUrl + '/todos/' + idTodos,
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log(data);
      home();
    })
    .fail(err=>{
      console.log(err.responseJSON)
    }) 
}

function getDetailTodos(idTodos){
  console.log('process detail')
  $('#titleDetail').empty();
  $('#descriptionDetail').empty();
  $('#dueDateDetail').empty();
  $('#statusDetail').empty();
  $.ajax({
    method: 'GET',
    url: baseUrl + '/todos/' + idTodos,
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log(data);
      $('#titleDetail').append(data.title);
      $('#descriptionDetail').append(data.description.replace(/\n/g, "<br />"));
      $('#dueDateDetail').append(new Date(data.due_date).toDateString().replace(/ /,', '));
      $('#statusDetail').append(data.status);
      home();
    })
    .fail(err=>{
      console.log(err.responseJSON)
    }) 
}

function getDeleteTodos(idTodos){
  console.log('process delete')
  $('#titleDetailDel').empty();
  $('#descriptionDetailDel').empty();
  $('#dueDateDetailDel').empty();
  $('#statusDetailDel').empty();
  $('#buttonDeleteTodos').empty();
  $.ajax({
    method: 'GET',
    url: baseUrl + '/todos/' + idTodos,
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data=>{
      console.log(data);
      $('#titleDetailDel').append(data.title);
      $('#descriptionDetailDel').append(data.description.replace(/\n/g, "<br />"));
      $('#dueDateDetailDel').append(new Date(data.due_date).toDateString().replace(/ /,', '));
      $('#statusDetailDel').append(data.status);
      $('#buttonDeleteTodos').append(`
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
      <button onclick="deleteTodos(${data.id})" type="button" class="btn btn-danger" data-dismiss="modal">Delete</button>`)
      home();
    })
    .fail(err=>{
      console.log(err.responseJSON)
    }) 
}

function onSignIn(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: `http://localhost:3000/google-signin`,
    data: { id_token },
    success: function(data){
      localStorage.setItem("token", data.access_token)
      localStorage.setItem("email", data.email)
      localStorage.setItem('urlImage', data.urlImage);
      localStorage.setItem('username', data.email);
      currentUsername=data.email
      urlImage=data.urlImage;
      home();
    }
  })
  .done((data) => {
    pictureProfileAppend();
    console.log('Sukses Login Google', data)
  })
  .fail( err => { console.log('Gagal Login Google')})
}
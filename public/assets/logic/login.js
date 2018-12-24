$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $(".login");
  var userName = $("#username-input");
  var passwordInput = $("#password-input");

  // When the form is submitted, we validate there's an username and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: userName.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }

    // If we have an username and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    userName.val("");
    passwordInput.val("");
  });
   
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {

    let user = {
      username: userName.val().trim(),
      password: passwordInput.val().trim()
    };

    $.ajax("/api/logins", {
      type: "POST",
      data: user
    }).then(
      function () {
        console.log("created new member");
        // Reload the page to get the updated list
        location.reload();
        document.location.href = "/landing.html";
        
      }).catch(handleLoginErr);
    
    // $.post("/api/logins", {
    //   data: user
    // }).then(function(data) {
    //   // window.location.replace(data);
    //   document.location.href = "/landing.html";
      
    //   // If there's an error, log the error
    // }).catch(function(err) {
    //   console.log(err);
    // });
    
    
      // let newUser = {
      //   user_username: $("#username").val().trim(),
      //   password: $("#password-input").val().trim(),
      // };
    
    // $.ajax("/api/music", {
    //   type: "POST",
    //   data: newUser
    // }).then(
    //   function () {
    //     console.log("created new User");
    //     document.location.href = "/landing.html";
    //     // Reload the page to get the updated list
    //     // location.reload();
    //   }).catch(function(err) {
    //     console.log(err);
    //   });


  }

  
  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}

});

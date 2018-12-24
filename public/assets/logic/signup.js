$(document).ready(function() {
  // Getting references to our form and input
  let signUpForm = $("form.signup");
  let nameInput = $("#name-input")
  let emailInput = $("#email-input");
  let passwordInput = $("#password-input");
  let userNameInput = $("#username-input")

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    let userData = {
      name: nameInput.val().trim(), 
      email: emailInput.val().trim(),
      username: userNameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    // nameInput.val("");
    // emailInput.val("");
    // userNameInput.val("")
    // passwordInput.val("");
    // console.log("posted")
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser() {
    let newMember = {
      name: nameInput.val().trim(), 
      email: emailInput.val().trim(),
      username: userNameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    $.ajax("/api/signup", {
      type: "POST",
      data: newMember
    }).then(
      function () {
        console.log("created new member");
        // Reload the page to get the updated list
        location.reload();
        document.location.href = "/login.html";
        
      }).catch(handleLoginErr);
      
      
      // $.post("/api/signup", {
      //   newMember
      // }).then(function(data) {
      //   console.log(data);
  
      //   // window.location.replace(data);
      //   document.location.href = "/login.html";
  
      //   // res.sendFile(path.join(__dirname, "../public/login.html"));
  
      //   // If there's an error, handle it by throwing up a bootstrap alert
      // }).catch(handleLoginErr);  
    }
    
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});


document.getElementById('hamburger').addEventListener('click', function () {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show'); 
  });
  


function toggleSignup(){
    document.getElementById("login-toggle").style.backgroundColor="#fff";
     document.getElementById("login-toggle").style.color="#222";
     document.getElementById("signup-toggle").style.backgroundColor="#222";
     document.getElementById("signup-toggle").style.color="#fff";
     document.getElementById("login-form").style.display="none";
     document.getElementById("signup-form").style.display="block";
 }
 
 function toggleLogin(){
     document.getElementById("login-toggle").style.backgroundColor="#222";
     document.getElementById("login-toggle").style.color="#fff";
     document.getElementById("signup-toggle").style.backgroundColor="#fff";
     document.getElementById("signup-toggle").style.color="#222";
     document.getElementById("signup-form").style.display="none";
     document.getElementById("login-form").style.display="block";
 }
 


const loginButton = document.querySelector('.btn.login');
const signUpButton = document.querySelector('.btn.signup');

loginButton.addEventListener('click', submitLoginRequest);
signUpButton.addEventListener('click', submitSignUpRequest);


async function submitLoginRequest(){
  const emailInput = document.querySelector('#login-form input[type="text"]');
  const passwordInput = document.querySelector('#login-form input[type="password"]');
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if(!email || !password){
    alert('Please fill the required Fields');
    return;
  }

  try{
    const response = await fetch('/auth/login', {
      method:'POST',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify({email,password})
    });
    const data = await response.json();
    if(response.ok){
      alert('Login Successful');

      const token = data.access_token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userRoles = payload.roles;
      const userId = payload.sub;


      localStorage.setItem('authToken', token);
      localStorage.setItem('userRoles', userRoles);
      localStorage.setItem('userId', userId);
      window.location.href = '/index.html';
    }
    else{
      alert('Login Failed. PLease check your credentials.');
    }
  }
  catch(error){
    console.error("Error during login:", error);
    alert('An error occured. Please try again later');
  }
}


async function submitSignUpRequest(){
  const emailInput = document.querySelector('#signup-form input[type="email"]');
    const usernameInput = document.querySelector('#signup-form input[type="text"]');
    const passwordInput = document.querySelector('#signup-form input[type="password"]');
    const email = emailInput.value.trim();
    const name = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if(!email || !password || !name) {
      alert('Please fill the required fields');
      return;
    }

    try{
      const response = await fetch('/admin/signup', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, name, password})
      });
      console.log(response);
       if(response.ok){
        alert('SignUp Successfull! Please Log-In');
        toggleLogin();
       }
       else{
        alert(data.message || 'SignUp Failed, Please try again.');
       }

    }
    catch(error){
      console.log("Error: ", error);
      alert('An error Occured, Please try again');
    }
}


const submitButton = document.querySelector('#subscribe-button');


submitButton.addEventListener('click',function() {
  const emailInput = document.querySelector('#subscribe-email');
  const email = emailInput.value.trim();
  
  fetch(('/subscribe'), {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({email}),
  }) 
  .then(response => response.json())
  .then(data => alert(data.success?'Subscribed successfully!':'Subscription failed.'))
  .catch(()=>alert('An error occurred.'));
});

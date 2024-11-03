
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
 


const emailInput = document.querySelector('#subscribe-email');
const submitButton = document.querySelector('#subscribe-button');

submitButton.addEventListener('click',function() {
  
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

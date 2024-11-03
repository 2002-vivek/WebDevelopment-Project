// Hamburger Button



document.getElementById('hamburger').addEventListener('click', function () {
  var navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show'); 
});


// Items Hidden until scrolled
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

document.addEventListener('scroll',function() {
  const elementsToAnimate = document.querySelectorAll('.who-content .hidden, .why-content .hidden, .quality-content .hidden');

  elementsToAnimate.forEach((element) => {
    if (isInViewport(element)) {
        element.classList.add('show');  
    }
});
});


const emailInput = document.querySelector('#email');
const submitButton = document.querySelector('#submit');

submitButton.addEventListener('click',function() {
  
  const email = emailInput.value.trim();
  if (email === '') {
    alert('Please enter an email address to subscribe.');
    event.preventDefault(); 
    return;
  }
  
  fetch(('/subscribe'), {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({email}),
  }) 
  .then(response => response.json())
  .then(data => alert(data.success?'Subscribed successfully!':'Subscription failed.'))
  .catch(()=>alert('An error occurred.'));
});



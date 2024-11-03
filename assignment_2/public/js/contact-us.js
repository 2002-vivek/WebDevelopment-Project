
document.getElementById('hamburger').addEventListener('click', function () {
  var navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show'); 
});


document.getElementById('submit').addEventListener('click', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const message = document.getElementById('message').value;


  if (name.length < 3) {
    alert('Your name should be at least 3 characters long.');
    return;
  } 

  if (!(email.includes('.') && (email.includes('@')))) {
    alert('Please enter a valid email address.');
    return;
  } 

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    alert('Phone number must be 10 digits and contain only numbers.');
    return;
  }

  const wordCount = message.trim().split(/\s+/).length;
  if (wordCount <= 5) {
    alert('Message must contain more than 5 words.');
    return;
  }
  // console.log('Sending data to the server:', { name, email, phone, message });

  fetch('/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, phone, message }),
  })
    .then(response => response.json())
    .then(data => {
      
      if (data.success) {
        alert('Message sent successfully');
        window.location.reload();
      } else {
        alert('Error sending message');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error sending message');
  });


  function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('company').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('message').value = '';
}

})





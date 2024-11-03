document.getElementById('hamburger').addEventListener('click', function () {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show'); 
  });


  
const decrementButtons = document.querySelectorAll('.decrement');
const incrementButtons = document.querySelectorAll('.increment');
const quantityInputs = document.querySelectorAll('.quantity');
const totalElements = document.querySelectorAll('.total p:last-child'); 
const subtotalElement = document.querySelector('.subtotal p:last-child'); 
const requestButton = document.getElementById('request-btn');

const pricePerGuard = 10;
const serviceNames = ["Event Security Guard", "Residential Security Guard", "Site Security Guard"]; // Service names

function updateTotalAndSubtotal() {
    let subtotal = 0;

    quantityInputs.forEach((input, index) => {
        const quantity = parseInt(input.value);
        const total = quantity * pricePerGuard;
        totalElements[index].textContent = `$ ${total.toFixed(2)}`; 

        subtotal += total; 
    });

    subtotalElement.textContent = `$ ${subtotal.toFixed(2)}`;
}



decrementButtons.forEach((decrementButton,index) => {
    const quantityInput = quantityInputs[index];

    decrementButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 0) {
            quantityInput.value = currentValue - 1;
        }
        updateTotalAndSubtotal();
    });
})

incrementButtons.forEach((incrementButton, index) => {
    const quantityInput = quantityInputs[index];

    incrementButton.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        quantityInput.value = currentValue + 1;
        updateTotalAndSubtotal();
    });
})



requestButton.addEventListener('click', () => {
    const services =[];
    let Total = 0;

    quantityInputs.forEach((input,index) => {
        const quantity = parseInt(input.value);
        if(quantity>0){
            const serviceData = {
                service: serviceNames[index],
                count_of_guards: quantity,
                cost: quantity*pricePerGuard
            };
            Total += serviceData.cost;
            services .push(serviceData);
        }

    });
    const requestData = {
        services: services,
        total_cost:Total
    };
    console.log(requestData);



    fetch('/requestguards', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      
        if (data.success) {
          alert('Request submitted successfully');
          window.location.reload();
        } else {
          alert('Error submitting request');
        }
      }
    )
    .catch(()=>alert('An error occurred.'));

});

updateTotalAndSubtotal();



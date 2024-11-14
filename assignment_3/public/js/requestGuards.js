
document.getElementById('hamburger').addEventListener('click', function () {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show'); 
  });



const apiUrl = 'http://localhost:3000/requestguards'; 
let isEditMode = false;
let editRequestId = null;
const token = localStorage.getItem('authToken');




async function fetchGuardRequests() {
    const messageBox = document.getElementById('message');
    messageBox.textContent = 'Loading requests...';
    messageBox.classList.remove('d-none');


    const isAdmin = localStorage.getItem('userRoles').includes('admin');
    const url = isAdmin ? `${apiUrl}/admin` : `${apiUrl}/user`;

    try {
        const response = await fetch(url, {
            method:'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        if (data.length === 0) {
            messageBox.textContent = 'No requests found.';
            return;
        }

        renderTable(data);
        messageBox.classList.add('d-none');
    } catch (error) {
        console.error('Error fetching guard requests:', error);
        messageBox.textContent = 'Unable to load guard requests. Please try again later.';
    }
}


function renderTable(data) {
    const tableBody = document.getElementById('requestTableBody');
    tableBody.innerHTML = '';

    data.forEach((request, index) => {
        const eventGuards = request.services.find(s => s.service === 'Event Security Guard')?.count_of_guards || 0;
        const residentialGuards = request.services.find(s => s.service === 'Residential Security Guard')?.count_of_guards || 0;
        const siteGuards = request.services.find(s => s.service === 'Site Security Guard')?.count_of_guards || 0;

        const totalCost = request.total_cost;

        const row = `
            <tr id="row-${request._id}">
                <td>${index + 1}</td>
                <td>${eventGuards}</td>
                <td>${residentialGuards}</td>
                <td>${siteGuards}</td>
                <td>$${totalCost.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-id="${request._id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${request._id}">Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });

    attachEventListeners();
}


function attachEventListeners() {
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', handleEdit);
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDelete);
    });
}

function scrollToRequestForm(){
    const cartContainer = document.querySelector('.cart-container');
    if(cartContainer){
        cartContainer.scrollIntoView({behavior:'smooth', block:'start'});
    }
}


function handleRequestButtonClick() {
    isEditMode = false;
    editRequestId = null;
    clearForm();
    scrollToRequestForm();
}


async function handleEdit(event) {
    isEditMode = true;
    editRequestId = event.target.dataset.id;
    scrollToRequestForm();

    try {
        const response = await fetch(`${apiUrl}/${editRequestId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const requestData = await response.json();
        loadFormData(requestData);
    } catch (error) {
        console.error('Error loading request data:', error);
        alert('Unable to load request data. Please try again.');
    }
}


function loadFormData(requestData) {
    const quantityInputs = document.querySelectorAll('.quantity');
    const serviceNames = ["Event Security Guard", "Residential Security Guard", "Site Security Guard"];

    requestData.services.forEach((service) => {
        const index = serviceNames.indexOf(service.service);
        if (index !== -1) {
            quantityInputs[index].value = service.count_of_guards;
        }
    });

    updateTotalAndSubtotal();
}


function clearForm() {
    const quantityInputs = document.querySelectorAll('.quantity');
    quantityInputs.forEach(input => input.value = '0');
    updateTotalAndSubtotal();
}


async function handleDelete(event) {
    const requestId = event.target.dataset.id;
    const confirmDelete = confirm('Are you sure you want to delete this request?');

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${apiUrl}/${requestId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to delete request');

        const row = document.getElementById(`row-${requestId}`);
        row.remove();
        alert('Request deleted successfully!');
    } catch (error) {
        console.error('Error deleting request:', error);
        alert('Unable to delete the request. Please try again.');
    }
}



function updateTotalAndSubtotal() {
    const quantityInputs = document.querySelectorAll('.quantity');
    const totalElements = document.querySelectorAll('.total p:last-child'); 
    const subtotalElement = document.querySelector('.subtotal p:last-child'); 
    let subtotal = 0;
    const pricePerGuard = 10;

    quantityInputs.forEach((input, index) => {
        const quantity = parseInt(input.value);
        const total = quantity * pricePerGuard;
        totalElements[index].textContent = `$ ${total.toFixed(2)}`; 

        subtotal += total; 
    });

    subtotalElement.textContent = `$ ${subtotal.toFixed(2)}`;
}

document.getElementById('requestButton').addEventListener('click', scrollToRequestForm);



async function handleFormSubmit(){
    
    const serviceNames = ["Event Security Guard", "Residential Security Guard", "Site Security Guard"]; 
    const services = [];
    let totalCost = 0;


    quantityInputs.forEach((input, index) => {
        const quantity = parseInt(input.value) || 0;
        if (quantity > 0) {
            const serviceData = {
                service: serviceNames[index],
                count_of_guards: quantity,
                cost: quantity * 10
            };
            totalCost += serviceData.cost;
            services.push(serviceData);
        }
    });

    const requestData = {
        services: services,
        total_cost: totalCost,
        userId: localStorage.getItem('userId'),
    };

    try {
        const method = isEditMode ? 'PATCH' : 'POST';
        const url = isEditMode ? `${apiUrl}/${editRequestId}` : apiUrl;

        const response = await fetch(url, {
            method: method,
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} request`);

        alert(`Request ${isEditMode ? 'updated' : 'created'} successfully!`);
        window.location.reload();
    } catch (error) {
        console.error('Error submitting request:', error);
        alert('An error occurred. Please try again.');
    }
}

document.getElementById('requestButton').addEventListener('click', handleRequestButtonClick);
document.querySelectorAll('.edit-btn').forEach(button => button.addEventListener('click', handleEdit));
document.getElementById('request-btn').addEventListener('click', handleFormSubmit);

const decrementButtons = document.querySelectorAll('.decrement');
const incrementButtons = document.querySelectorAll('.increment');
const quantityInputs = document.querySelectorAll('.quantity');




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






document.addEventListener('DOMContentLoaded', () => {
    fetchGuardRequests();
    updateTotalAndSubtotal();
});

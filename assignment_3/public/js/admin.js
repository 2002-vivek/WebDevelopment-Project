document.getElementById('hamburger').addEventListener('click', function () {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show'); 
  });



const apiUrl = 'http://localhost:3000/admin';
let isEditMode = false;
let editRequestId = null;
const token = localStorage.getItem('authToken');




async function fetchUsers() {
    const messageBox = document.getElementById('message');
    messageBox.textContent = 'Loading requests...';
    messageBox.classList.remove('d-none');

    try{
        const response = await fetch(`${apiUrl}/users`, {
            method:'GET',
            headers:{
                 'Authorization': `Bearer ${token}`,
                 'Content-Type': 'application/json'
            }
        });
        if(!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        if(data.length === 0){
            messageBox.textContent('No Users found');
            return;
        }
        renderTable(data);
        messageBox.classList.add('d-none');
    } catch(error){
        console.log('Error Fetching users: ', error );
        messageBox.textContent = 'Unable to load users requests. Please try again later.';
        }
}



function renderTable(data){
    const tableBody = document.getElementById("requestTableBody");
    tableBody.innerHTML = '';

    data.forEach((request, index) => {
        const name = request.name;
        const email = request.email;
        const hashedPassword = request.password;
        const roles = request.roles;

        const row = `
            <tr id="row-${request._id}">
                <td>${index+1}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${hashedPassword}</td>
                <td>${roles}</td>
                <td>
                    <button class="btn btn-warning btn-sm edit-btn" data-id="${request._id}">Edit</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${request._id}">Delete</button>
                </td>
            </tr>
            `;
        tableBody.innerHTML +=row;
    });

    attachEventListeners();
}

function attachEventListeners(){
    const editButtons = document.querySelectorAll('.edit-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    editButtons.forEach(button => {
        button.addEventListener('click', handleEdit);
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDelete);
    });
}

document.getElementById('addUser_button').addEventListener('click', () => {
    isEditMode = false;
    editRequestId = null;
    clearForm();
    new bootstrap.Modal(document.getElementById('userModal')).show();
});

function loadFormData(user) {
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPassword').value = '';
    document.getElementById('userRoles').value = user.roles.join(', ');



}

function clearForm() {
    document.getElementById('userForm').reset();
}

document.getElementById('saveUserButton').addEventListener('click', handleFormSubmit);

async function handleFormSubmit(){
    
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const roles = document.getElementById('userRoles').value;

    const requestData = { name, email, password, roles: roles.split(',').map(role => role.trim()) };
    
    try {
        const method = isEditMode ? 'PATCH' : 'POST';
        const url = isEditMode ? `${apiUrl}/users/${editRequestId}` : `${apiUrl}/signup`;

        const response = await fetch(url, {
            method: method,
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) throw new Error(`Failed to ${isEditMode ? 'update' : 'create'} request`);

        alert(`Request ${isEditMode ? 'updated' : 'created'} successfully!`);
        const modalElement = document.getElementById('userModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        fetchUsers();
    } catch (error) {
        console.error('Error submitting user data:', error);
        alert('An error occurred. Please try again.');
    }
}

function handleUserButtonClick() {
    isEditMode = false;
    editRequestId = null;
    clearForm();
}


async function handleEdit(event){
    isEditMode = true;
    editRequestId = event.target.dataset.id;

    

    try {
        const response = await fetch(`${apiUrl}/users/${editRequestId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const requestData = await response.json();

        const modalElement = document.querySelector('#userModal');
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();
        loadFormData(requestData);

        

    } catch (error) {
        console.error('Error loading request data:', error);
        alert('Unable to load request data. Please try again.');
    }
}





async function handleDelete(event) {
    const requestId = event.target.dataset.id;
    console.log(requestId);
    const confirmDelete = confirm('Are you sure you want to delete this user?');

    if (!confirmDelete) return;

    try {
        const response = await fetch(`${apiUrl}/users/${requestId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Failed to delete user');

        const row = document.getElementById(`row-${requestId}`);
        row.remove();
        alert('User deleted successfully!');
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Unable to delete the user. Please try again.');
    }
}





document.getElementById('addUser_button').addEventListener('click', handleUserButtonClick);
document.querySelectorAll('.edit-btn').forEach(button => button.addEventListener('click', handleEdit));


document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    
});
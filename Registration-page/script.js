document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registration");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;


        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);

        const userData = {
            name : username,
            email : email,
            password : password
        };
        console.log(userData);

        const userDataJson = JSON.stringify(userData);
        localStorage.setItem(userData.email,userDataJson);
        form.reset();
    });
});
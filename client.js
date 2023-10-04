       const script = document.createElement('script');


       script.onload = () => {

       const socket = io("ws://localhost:3000");
       
        const form = document.getElementById("form");
        const input = document.getElementById("input");
        const messages = document.getElementById("messages");
        const welcome = document.getElementById("welcome");

        const username = prompt("Enter you username please");
        welcome.textContent = `Welcome to the chat ${username}`;


        form.addEventListener("submit", (lst) => {
            lst.preventDefault();
            if(input.value){
                socket.emit("chat message", {username, message: input.value});
                input.value = "";
            }
        })

        socket.on("chat message", (data => {
            const li = document.createElement("li");
            li.textContent = `${data.username}: ${data.message}`;
            messages.appendChild(li);
        }))
    }
        document.body.appendChild(script);
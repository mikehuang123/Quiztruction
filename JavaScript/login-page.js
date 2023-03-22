import db from "./database.js";


let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
 
signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});
 
login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});



document.getElementById("signBtn").onclick = async ()=>{
    // when register clicked
    console.log("Signup clicked");

    if(document.getElementById("signupName").value == ""){
        alert("Name must be filled out");
        return false;
    }

    if(document.getElementById("signupEmail").value == ""){
        alert("Email must be filled out");
        return false;
    }

    if(document.getElementById("signupPassword1").value == ""){
        alert("Password must be filled out");
        return false;
    }

    if(document.getElementById("signupPassword1").value != document.getElementById("signupPassword2").value){
        alert("Two password does not matched");
        return false;
    }

    // pass all validation - setup database
    try{
       db.collection("Account").add({
            name : document.getElementById("signupName").value,
            email : document.getElementById("signupEmail").value,
            password : document.getElementById("signupPassword1").value
       })
       .then(()=>{
            console.log("Account Written");
       })
       .catch((e) => {
            console.log("Error create user... ", e);
       });

    } catch(e){
        console.error("Error create user... " , e);
    }

    
}


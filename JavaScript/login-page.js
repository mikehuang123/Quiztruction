const firebaseConfig = {
    apiKey: "AIzaSyAoiwpM4SMW2fx1E0RSXCIzMsYIXT84kv4",
    authDomain: "quizstruction.firebaseapp.com",
    projectId: "quizstruction",
    storageBucket: "quizstruction.appspot.com",
    messagingSenderId: "1012312141205",
    appId: "1:1012312141205:web:2b4fc0bce20599a9d21a9c"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();


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

    // add check register email is already register or not here later

    // pass all validation - setup database
    try{
       db.collection("Account").add({
            name : document.getElementById("signupName").value,
            email : document.getElementById("signupEmail").value,
            password : document.getElementById("signupPassword1").value
       })
       .then(()=>{
            console.log("Account Written");
            document.getElementById("signupName").value = "";
            document.getElementById("signupEmail").value = "";
            document.getElementById("signupPassword1").value = "";
            document.getElementById("signupPassword2").value = "";
            location.reload();
            
       })
       .catch((e) => {
            console.log("Error create user... ", e);
       });

    } catch(e){
        console.error("Error create user... " , e);
    }

    
}


document.getElementById("loginBtn").onclick = async ()=>{
    // when login clicked
    console.log("Login clicked");


    if(document.getElementById("loginEmail").value == ""){
        alert("Email must be filled out");
        return false;
    }

    if(document.getElementById("loginPassword").value == ""){
        alert("Password must be filled out");
        return false;
    }

    let loginId = null;

    // pass all validation
    try{
        db.collection('Account').get()
            .then((snapShot) =>{
                snapShot.docs.forEach((doc => {
                    let items = doc.data();
                    //items = JSON.stringify(items);
                
                if(document.getElementById("loginEmail").value == items.email && document.getElementById("loginPassword").value == items.password){
                        // set current login id
                        console.log("Login id: " + doc.id);
                        loginId = doc.id;

                        // store id and name in localStorage
                        localStorage.setItem("loginId", doc.id);    //const id = localStorage.getItem("loginId");
                        localStorage.setItem("loginName", items.name); 

                        // clear input field
                        document.getElementById("loginEmail").value = "";
                        document.getElementById("loginPassword").value = "";


                }
        
                }))}
            )
            .finally(()=>{
                if(loginId != null){
                    // clear input field
                    document.getElementById("loginEmail").value = "";
                    document.getElementById("loginPassword").value = "";
            
                    // -> profile page
                    window.location.href = "profile.html"  // change to the actual address after we host it if it doesnt work
            
                }
                else{
                    alert("Login failed, please check your email or password...");
                }
            });


    } catch(e){
        console.error("Error login user... " , e);
    }

    
    
   

   
}

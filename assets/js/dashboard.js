const config = {
    apiKey: "AIzaSyDXUPO19126VnfIiVrxM-ACRcEcJp4NZPM",
    authDomain: "dk-portfolio-c51f2.firebaseapp.com",
    databaseURL: "https://dk-portfolio-c51f2.firebaseio.com",
    projectId: "dk-portfolio-c51f2",
    storageBucket: "dk-portfolio-c51f2.appspot.com",
    messagingSenderId: "295096513397",
    appId: "1:295096513397:web:afedd783ad86102e51d93c",
    measurementId: "G-FGGQ62B349"
};
// Initialize Firebase
firebase.initializeApp(config);

const firestore = firebase.firestore();

// Global Variables
const itemForm = document.querySelector("#portfolioPosts");
const uploadItem = document.querySelector("#addPortItem");
const progressBar = document.querySelector("#progressBar");
const progressHandler = document.querySelector("#progressHandler");
const portItems = document.querySelector("#folio");
const portInfo = document.querySelector("#port-content");
const portImg = document.querySelector("#portfolio-large");
const loading = document.querySelector("#loader");


// // Login Authentication
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       window.location.href = "dashboard.html";
//       window.alert("Welcome to Your Dashboard");
//     } else {
//       // No user is signed in.
//       window.alert("Wrong Details: Try again!");
//     }
//   });


//   function access(){
//     var userEmail = document.getElementById("email").value;
//     var userPass = document.getElementById("password").value;

//     firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;

//       console.log(errorMessage);
//       // ...
//     });

//   }

//   function logout(){
//     firebase.auth().signOut().then(function() {
//       // Sign-out successful.
//     }).catch(function(error) {
//       // An error happened.
//     });
//     window.alert("Bye Check AGAIN");
//   }

const getItems = async () => {
    let portArray = [];
    let docs = await firebase.firestore().collection("myportfolio").get().catch(err => console.log(err));
    docs.forEach(doc => {
        portArray.push({
            "id": doc.id,
            "data": doc.data()
        });
    });

    createContainer(portArray);
}

const getItem = async () => {
    let postId = getItemIdFromURL();

    if (loading != null) {
        loading.innerHTML = "<div><div class='lds-circle'><div></div></div><p>Loading Post...</p></div>";
    }

    let portfolio = await firebase.firestore().collection("myportfolio").doc(postId).get().catch(err => console.log(err));


    // currentId = post.id;
    // currentContent = post.data().content;
    // currentTitle = post.data().title;
    // oldPostCover = post.data().fileref;

    if (loading != null) {
        loading.innerHTML = "";
    }

    // if(post && deleteButton != null){
    //     deleteButton.style.display = "block";
    // }

    // if(post && editButton != null){
    //     editButton.style.display = "block";
    // }

    createChild(portfolio.data());
}


const createChild = (postData) => {
    if (portInfo != null) {
        let wrapper = document.createElement("div");
        let heading = document.createElement("h1");
        let headingNode = document.createTextNode(postData.title);
        heading.appendChild(headingNode);
        let paragraph = document.createElement("p");
        let paragraphNode = document.createTextNode(postData.description);
        paragraph.appendChild(paragraphNode);
        let url = document.createElement("a");
        let urlNode = document.createTextNode("See live project");
        url.setAttribute("href", postData.url);
        url.appendChild(urlNode);
        url.innerHTML = url.innerHTML + " <i class='bx bxs-right-arrow'></i>";

        heading.classList.add("contact-bigtext");
        paragraph.classList.add("contact-smalltext");
        wrapper.appendChild(heading);
        wrapper.appendChild(paragraph);
        wrapper.appendChild(url);

        portInfo.appendChild(wrapper);
    }

    if (portImg != null) {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src", postData.pcover);
        img.setAttribute("loading", "lazy");

        img.classList.add("portfolio-large-img");
        div.appendChild(img);
        portImg.appendChild(div);
    }
}


const getItemIdFromURL = () => {
    let postLocation = window.location.href;
    let hrefArray = postLocation.split("/");
    let postId = hrefArray.slice(-1).pop();

    return postId;
}

// Create post container
const createContainer = async (arr) => {
    if (portItems != null) {
        arr.map(poitems => {
            let div = document.createElement("div");
            let pcover = document.createElement("img");
            let title = document.createElement("h2");
            let description = document.createElement("p");
            let anchor = document.createElement("a");
            let anchorNode = document.createTextNode("See full project");
            anchor.setAttribute("href", "project-page.html#/" + poitems.id);
            anchor.appendChild(anchorNode);
            anchor.innerHTML = anchor.innerHTML + " <i class='bx bxs-right-arrow'></i>";

            pcover.setAttribute("src", poitems.data.pcover);
            pcover.setAttribute("loading", "lazy");

            pcover.classList.add("portfolio-img");
            title.textContent = poitems.data.title;
            description.textContent = poitems.data.description;
            div.classList.add("poitems");
            div.appendChild(pcover);
            div.appendChild(title);
            div.appendChild(description);
            div.appendChild(anchor);
            portItems.appendChild(div);
        });

    }
}

// Create Portfolio Item to Database
if (itemForm != null) {
    let d;
    itemForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (document.getElementById("title").value != "" && document.getElementById("description").value != "" && document.getElementById("url").value != "" && document.getElementById("portfolioCover").files[0] != "") {

            let title = document.getElementById("title").value;
            let description = document.getElementById("description").value;
            let url = document.getElementById("url").value;
            let pcover = document.getElementById("portfolioCover").files[0];
            console.log(pcover);

            const storageRef = firebase.storage().ref();
            const storageChild = storageRef.child(pcover.name);

            console.log("Uploading file...");
            const portCover = storageChild.put(pcover);

            await new Promise((resolve) => {
                portCover.on("state_changed", (snapshot) => {

                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(Math.trunc(progress));

                    if (progressHandler != null) {
                        progressHandler.style.display = "block";
                    }

                    if (uploadItem != null) {
                        uploadItem.disabled = true;
                    }

                    if (progressBar != null) {
                        progressBar.value = progress;
                    }
                }, (error) => {
                    //error
                    console.log(error);
                }, async () => {
                    const downloadURL = await storageChild.getDownloadURL();
                    d = downloadURL;
                    console.log(d);
                    resolve();
                });
            });


            const fileRef = await firebase.storage().refFromURL(d);

            let portfolioItems = {
                title,
                description,
                url,
                pcover: d,
                fileref: fileRef.location.path
            }

            await firebase.firestore().collection("myportfolio").add(portfolioItems);
            console.log("post added successfully");

            if (uploadItem != null) {
                window.location.replace("portfolio.html");
                uploadItem.disabled = false;
            }


        } else {
            console.log("must fill all the inputs")
        }

    });

}


//check if the DOM is fully loaded and load Portfolio Items
document.addEventListener("DOMContentLoaded", (e) => {
    getItems();
    getItem();
    // if(!location.href.includes("index.html") && !location.href.includes("create.html") ){
    //     getPost();
    // }
});
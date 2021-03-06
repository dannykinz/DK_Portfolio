const check = document.referrer;

if (check == "dashboard.html") {
    window.alert("You Need Admin Access to View this Page!")
} else {
    window.location.href = "access-me.html";
};
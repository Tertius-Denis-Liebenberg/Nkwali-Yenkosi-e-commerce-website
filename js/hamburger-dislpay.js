// Toggles the hamburger Menu
function toggleMenu(element){
    var menu = document.getElementById("inMenu");
    if(menu.style.display === "none" || menu.style.display === ""){
        // Changes to fa-times
        element.innerHTML = "<i class='fa fa-times'></i>"
        menu.style.display = "block"
    }
    else{
        // Changes back to fa-bars
        element.innerHTML = "<i class='fa fa-bars'></i>"
        menu.style.display = "none"
    }
}
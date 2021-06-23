const generBtn = document.querySelector('.dropbtn');
const generSearch = document.querySelector('#myInput');

generBtn.addEventListener('click', myFunction)
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

generSearch.addEventListener("input", filterFunction);

function filterFunction(event) {
    
    const filter = generSearch.value.toUpperCase();
    const div = document.getElementById("myDropdown");
    const a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
   
}





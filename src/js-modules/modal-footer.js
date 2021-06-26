import variables from './variables.js';

(() => {
    
  variables.openModalBtnFooter.addEventListener("click", openModalFooter);
    
  function openModalFooter(e) {     
        variables.modalFooter.classList.remove("footer-hidden");
        window.addEventListener("keydown", onPressEscapeFooter);
        variables.closeModalBtnFooter.addEventListener("click", closeModalFooter);
        variables.modalFooter.addEventListener("click", backdropCloseModalFooter);   
  };

  
    function closeModalFooter() {
      
      variables.closeModalBtnFooter.removeEventListener("click", closeModalFooter);
      variables.modalFooter.classList.add("footer-hidden");
      variables.modalFooter.removeEventListener("click", closeModalFooter);
      window.removeEventListener('keydown', onPressEscapeFooter);
    }
    function onPressEscapeFooter(event) {
      if (event.code === 'Escape') {
        closeModalFooter();
      }
    }
    function backdropCloseModalFooter(event) {
      if (event.currentTarget === event.target) {
      closeModalFooter();
    }
    }
})();



const coll = document.getElementsByClassName("collapsible");
let i;

for(i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      console.log('clik')
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
           content.style.display = "none";
          
        } else {
            content.style.display = "block";
            
        }
        
    });
}


  

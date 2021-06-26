

(() => {
    
    const btnsFooter = {
      openModalBtnFooter: document.querySelector("[data-footer-modal-open]"),
      closeModalBtnFooter: document.querySelector(".data-footer-modal-close-button"),
      modalFooter: document.querySelector(".footer-backdrop"),
      
    };
    console.log(btnsFooter)
  
    btnsFooter.openModalBtnFooter.addEventListener("click", openModalFooter);
    
    function openModalFooter(e) {
      
       
        btnsFooter.modalFooter.classList.remove("footer-hidden");
        window.addEventListener("keydown", onPressEscapeFooter);
        btnsFooter.closeModalBtnFooter.addEventListener("click", closeModalFooter);
        btnsFooter.modalFooter.addEventListener("click", backdropCloseModalFooter);
      
      };

  
    function closeModalFooter() {
      
      btnsFooter.closeModalBtnFooter.removeEventListener("click", closeModalFooter);
      btnsFooter.modalFooter.classList.add("footer-hidden");
      btnsFooter.modalFooter.removeEventListener("click", closeModalFooter);
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
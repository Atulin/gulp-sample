(_ => {
   let inputs = document.querySelectorAll('input.o-form-control');
   
   for (let i of inputs) {
      i.dataset.init = i.value;

      i.addEventListener('input', e => {
         console.log(e.target.value !== e.target.dataset.init);

         if (e.target.value !== e.target.dataset.init) {
            e.target.classList.add('changed');
         } else {
            e.target.classList.remove('changed');
         }

      });
   }
   
})()
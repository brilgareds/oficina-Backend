async function postData(url = '', data = {}) {  
        const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
      });
      return response.json();
    }
    

    async function getData(url = '') {  
        const response = await fetch(url, {
          method: 'GET', 
          mode: 'cors', 
          cache: 'no-cache',
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
        });
        return response.json();
      }


     function simulateClick(id,tiempo,evento) {
       console.log(id)
        let event = new Event(evento, {bubbles: true});
        let elem = document.getElementById(id); 
        setTimeout(() =>{           
            elem.dispatchEvent(event);
        },tiempo)
      }


      function validateRadioButtons (name){
        let crediActual = document.getElementsByName(name);
        let stringServi3 = 0; 
        for(let v = 0; v < crediActual.length; v++)
        {
            if (crediActual[v].checked)
                {
               
                stringServi3++
                }
        }

        // if(stringServi3 === 0){
        //     for(var i = 0; i < crediActual.length; i++)
        //     {
        //         let selector = 'label[for=' + crediActual[i].id + ']';
        //         let label = document.querySelector(selector);
        //         label.classList.remove('btn-outline-primary')
        //         label.classList.add('btn-outline-danger')

        //     }
        // }else{
        //     for(let x = 0; x < crediActual.length; x++)
        //     {
        //         let selector = 'label[for=' + crediActual[x].id + ']';
        //         let label = document.querySelector(selector);
        //         label.classList.add('btn-outline-primary')
        //         label.classList.remove('btn-outline-danger')

        //     }
        // }

        return stringServi3;

    }


    function validateCheckButtons(name){
        // var thingToRemove = document.querySelectorAll('.'+name);
        // thingToRemove.forEach(element => element.classList.remove('is-invalid'));

        
        let els = document.getElementsByClassName(name);
        let stringServi = 0; 
        for(let i = 0; i < els.length; i++)
        {
            if(els[i].checked){
                stringServi++;
            }
        }

        // if(stringServi === 0){
        //     for(let i = 0; i < els.length; i++)
        //     {
        //         els[i].classList.add('is-invalid')
        //     }
        // }
        return stringServi
    }

    function  validateInputSelect(name){

        // var thingToRemove = document.querySelectorAll(".invalid-feedback");
        // thingToRemove.forEach(element => element.remove());

        let inputs = document.getElementsByClassName(name);
        let cont = 0; 
        for(var x = 0; x < inputs.length; x++)
        {
            // const parent =  inputs[x].parentNode;
            
            if (!inputs[x].value){
                cont++;
              //  inputs[x].classList.add('is-invalid')
               // parent.innerHTML += '<div class="invalid-feedback">Campo obligatorio</div>'
            }else{
              //  inputs[x].classList.remove('is-invalid')
            }
        }

        return cont;
    }
        
    export {postData,getData,simulateClick,validateCheckButtons,validateRadioButtons,validateInputSelect}
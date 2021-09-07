async function postData(url = '', data = {}) {  

  console.log(data);

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
        let event = new Event(evento, {bubbles: true});
        let elem = document.getElementById(id); 
        setTimeout(() =>{           
            elem.dispatchEvent(event);
        },tiempo)
      }
        
    export {postData,getData,simulateClick}
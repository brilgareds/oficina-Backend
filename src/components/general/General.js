import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../config/config";

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



    function putInputRequerid(identificador,tipo,accion,label){
      const campo =  document.querySelector(identificador)
      const labelCampo = document.querySelector(`label[for=${label}]`)
      if(labelCampo.getElementsByTagName('span').length){
        labelCampo.getElementsByTagName('span')[0].remove()
      }
      switch (campo.type) {
               case 'text':
                   if(accion === 'add'){
                       campo.classList.add('inputRequired')
                       campo.removeAttribute('readOnly')
                       labelCampo.innerHTML += '<span class="text-danger">*</span>'
                   }else  if(accion === 'remove'){
                       campo.classList.remove('inputRequired')
                       campo.setAttribute('readOnly','readOnly')
                       campo.value= ''
                   }
              break;

               case 'number':
                   if(accion === 'add'){
                       campo.classList.add('inputRequired')
                       campo.removeAttribute('readOnly')
                       labelCampo.innerHTML += '<span class="text-danger">*</span>'
                   }else  if(accion === 'remove'){
                       campo.classList.remove('inputRequired')
                       campo.setAttribute('readOnly','readOnly')
                       campo.value= ''
                   }
                break;

               case 'select-one':
                if(accion === 'add'){
                    campo.classList.add('inputRequired')
                    // labelCampo.classList.add('text-danger')
                    campo.removeAttribute('disabled')
                    labelCampo.innerHTML += '<span class="text-danger">*</span>'
                }else  if(accion === 'remove'){
                    campo.classList.remove('inputRequired')
                    campo.setAttribute('disabled','disabled')
                    campo.value= ''
                    
                }

                break;

               case 'radio':
                if(accion === 'add'){
                    campo.classList.add('inputRequired')
                    labelCampo.innerHTML += '<span class="text-danger">*</span>'
                }else  if(accion === 'remove'){
                    campo.classList.remove('inputRequired')
                    campo.value= ''
                }

               break;

               case 'date':
                if(accion === 'add'){
                    campo.classList.add('inputRequired')
                    campo.removeAttribute('readOnly')
                    labelCampo.innerHTML += '<span class="text-danger">*</span>'
                }else  if(accion === 'remove'){
                    campo.classList.remove('inputRequired')
                    campo.setAttribute('readOnly','readOnly')
                    campo.value= ''
                   
                }
              break;
      
          default:
              break;
      }
      
   }

    function validateInputTabs(tabidentificador){
    let labelValidate = ''
    document.querySelectorAll('.active .inputRequired').forEach(element =>{
        const type = element.type
        const val = element.value.trim()
        const id = element.id
        let label =''
        const name = element.name


        if(type === 'radio'){
            label = document.querySelector(`label[for=${name}]`)
        }else{
            label = document.querySelector(`label[for=${id}]`)
        }
        let labelast = label.textContent.substring(0, label.textContent.lastIndexOf("*"));

        switch (type) {
            case 'text':
                if(val === ''){
                    labelValidate += `<li class="list-group-item border-0">${labelast }</li>`
                }
            break;
            case 'number':
                if(!val){
                    labelValidate += `<li class="list-group-item border-0">${labelast }</li>`
                }
            break;
            case 'select-one':

                if(val === '' ){
                    labelValidate += `<li class="list-group-item border-0">${labelast }</li>`
                }

            break;
            case 'select-multiple':
            
            break;

            case 'radio':
              const vali =  document.querySelector(`input[name=${name}]:checked`)? document.querySelector(`input[name=${name}]:checked`).value.trim():''
              if(vali === ''){
                labelValidate += `<li class="list-group-item border-0">${labelast }</li>`
              }
            break;
            case 'date':
                if(val === ''){
                    labelValidate += `<li class="list-group-item border-0">${labelast }</li>`
                }
            break;
            case 'file':
                if(val === '' ){
                    labelValidate += `<li class="list-group-item border-0">${labelast }</li>`
                }
    
                break
              case 'password':
                if(val === '' ){
                    labelValidate += `<li class="list-group-item border-0">${labelast }</li>`
                }
              break
              case 'email':
                if(val === '' ){
                    labelValidate += `<li class="list-group-item border-0">${labelast }</li>`
                }
              break
        
            default:
                break;
            }
        })

        // console.log(labelValidate);

        if(labelValidate){
            let list = `<ul class="list-group list-group-flush inline-flex">
                            ${labelValidate}
                        </ul>`
                Swal.fire({
                    title: "<h5 class='text-primary'>Validar las siguientes preguntas</h5>",
                    html: list,
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonColor: "#A6A6A6",
                    confirmButtonText: 'Cerrar'
                });
            
        }

        return labelValidate;

    }

    function loadDataValidate(){
        const url = `${baseUrl}/v1/menuOV/formulariosCompletados`;
        const dataUser = JSON.parse( localStorage.getItem("d_u"));
        const cedula = parseInt(dataUser['cedula'])
        const empresa = parseInt(dataUser['empresa'])
        const datos = { NRO_DOCUMENTO:cedula,CODIGO_EMPRESA:empresa };

        postData(url,datos).then(element =>{
            const ele = element[0]
    
            setTimeout(() => {
                if(ele.INFORMACION_BASICA_CODIGO){
                    document.getElementById('colorCheck1').classList.remove('checkGrey')
                    document.getElementById('colorCheck1').classList.add('checkGreen')
                }else{
                    document.getElementById('colorCheck1').classList.add('checkGrey')
                }
                if(ele.EDUCACION_CODIGO){
                    document.getElementById('colorCheck2').classList.remove('checkGrey')
                    document.getElementById('colorCheck2').classList.add('checkGreen')
                }else{
                    document.getElementById('colorCheck2').classList.add('checkGrey')
    
                }
                if(ele.FAMILIARES_CODIGO){
                    document.getElementById('colorCheck3').classList.remove('checkGrey')
                    document.getElementById('colorCheck3').classList.add('checkGreen')
                }else{
                    document.getElementById('colorCheck3').classList.add('checkGrey')
    
                }
                if(ele.DATOS_ADICIONALES_CODIGO){
                    document.getElementById('colorCheck4').classList.remove('checkGrey')
                    document.getElementById('colorCheck4').classList.add('checkGreen')
                }else{
                    document.getElementById('colorCheck4').classList.add('checkGrey')
    
                }
                if(ele.SALUD_CODIGO){
                    document.getElementById('colorCheck5').classList.remove('checkGrey')
                    document.getElementById('colorCheck5').classList.add('checkGreen')
                }else{
                    document.getElementById('colorCheck5').classList.add('checkGrey')
    
                }
                if(ele.VIVIENDA_CODIGO){
                    document.getElementById('colorCheck6').classList.remove('checkGrey')
                    document.getElementById('colorCheck6').classList.add('checkGreen')
                }else{
                    document.getElementById('colorCheck6').classList.add('checkGrey')
    
                }
            }, 500);
           


        })

      }

    async  function getFileFromAzure(url){
        axios({
            method: 'get',
            url: url, // blob url eg. blob:http://127.0.0.1:8000/e89c5d87-a634-4540-974c-30dc476825cc
            responseType: 'blob',
            headers: {
                'Content-Type': 'application/file'
              },
        }).then(function(response){
             var reader = new FileReader();
             reader.readAsDataURL(response.data); 
             reader.onloadend = function() {
                 var base64data = reader.result;
                 return base64data
             }
    
        })

      }




        
    export {postData,getData,simulateClick,putInputRequerid,validateInputTabs,loadDataValidate,getFileFromAzure}
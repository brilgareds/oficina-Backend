import React from 'react';
import { routes } from '../../environments/environments.ts';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import total from '../../assets/img/calificanos/respuesta-positiva.png'
import posi from '../../assets/img/calificanos/positiva.png'
import imparcial from '../../assets/img/calificanos/imparcial.png'
import negativa from '../../assets/img/calificanos/negativa.png'
import totalNega from '../../assets/img/calificanos/totalmente-negativa.png'
import correo from '../../assets/img/calificanos/correo.png'
import whatsapp from '../../assets/img/calificanos/whatsapp.png'
import { postData } from '../general/General';
import { baseUrl } from '../../config/config';


export const ImportantBottons = () => {
   
    const modalCalificanos= () =>{



       const data = `
            <div class="d-flex  text-white justify-content-center ">
                <div class="col"><div class="p-1 ">
                    <input type="radio" data-validateemotion="1" data-campobd="1314" name="radioCalificanos" id="radioData1" class="buttonsAnswers btn-check me-1"><label for="radioData1" class="labelTextAnswers"><img class="imgAnswers" src=${total} /><p></p>Totalmente positiva</label></input>
                </div></div>
                <div class="col"><div class="p-1 ">
                    <input type="radio" data-validateemotion="1" data-campobd="1315" name="radioCalificanos" id="radioData2" class="buttonsAnswers btn-check me-1"><label for="radioData2" class="labelTextAnswers"><img class="imgAnswers" src=${posi}  /><p></p>Positiva</label></input>
                </div></div>
                <div class="col"><div class="p-1 ">
                    <input type="radio" data-validateemotion="0" data-campobd="1316" name="radioCalificanos" id="radioData3" class="buttonsAnswers btn-check me-1"><label for="radioData3" class="labelTextAnswers"><img class="imgAnswers" src=${imparcial} /><p></p>Imparcial</label></input>
                </div></div>
                <div class="col"><div class="p-1 ">
                    <input type="radio" data-validateemotion="0" data-campobd="1317" name="radioCalificanos" id="radioData4" class="buttonsAnswers btn-check me-1"><label for="radioData4" class="labelTextAnswers"><img class="imgAnswers" src=${negativa} /><p></p>Negativa</label></input>
                </div></div>
                <div class="col"><div class="p-1 ">
                    <input type="radio" data-validateemotion="0" data-campobd="1318" name="radioCalificanos" id="radioData5" class="buttonsAnswers btn-check me-1"><label for="radioData5" class="labelTextAnswers"><img class="imgAnswers" src=${totalNega} /><p></p>Totalmente negativa</label></input>
                </div></div>
            </div>
            <div class="seeDivComunicate" hidden="hidden">
                <hr  class="line-calificanos" >
                <div class="container text-white mb-4">¿Cómo quieres que nos comuniquemos contigo?</div>
                <div class="d-flex  text-white justify-content-center ">
                    <div class="col-2"><div class="p-1 ">
                        <input type="radio" name="checkComunication" data-campobd="377" id="checkData1" class="buttonsAnswers btn-check me-1"><label for="checkData1"><img class="imgAnswers" src=${correo} /><br><p></p>Correo</label></input>
                    </div></div>
                    <div class="col-2"><div class="p-1 ">
                        <input type="radio" name="checkComunication" data-campobd="W" id="checkData2" class="buttonsAnswers btn-check me-1"><label for="checkData2"><img class="imgAnswers" src=${whatsapp} /><br><p></p>Whatsapp</label></input>
                    </div></div>

                </div>

                <div class="mb-2" id="divaddDataComunicate" hidden><input class="form-control " type="text" id="addDataComunicate" name="addDataComunicate"/></div>

            </div>
            <div class="d-flex  text-white justify-content-center mb-2">
                <button class="btn btn-calificanos"  id="btncalifica">Enviar respuestas</button>

            </div>
            <div class="alert " id="alertaDatosmodal" role="alert"></div>
            `
          Swal.fire({
            title: ' ',
            html: ('<div class="container text-white mb-4">¿Cómo calificarías tu experiencia trabajando con nuestra empresa?</div><p></p>'+
                  `${data}`),
            background:'#0F4F80',
            showCloseButton:true,
            showConfirmButton:false,
            allowOutsideClick:false,
            allowEscapeKey:false,
            focusConfirm:false,
          })

            const but = document.getElementById("btncalifica")
            but.addEventListener('click',function(){
                console.log("prueba  ")

                const contaAnsw =  document.querySelectorAll('input[name=radioCalificanos]:checked').length
                const contaComun =  document.querySelectorAll('input[name=checkComunication]:checked').length
                const divAlert =  document.getElementById('alertaDatosmodal')

                if(contaAnsw === 0){
                    divAlert.classList.add('alert-info')
                    divAlert.innerHTML = "Debes seleccionar una respuesta"
                    setTimeout(() => {
                        divAlert.classList.remove('alert-info')
                        divAlert.innerHTML = ''
                    }, 2000);
                    return false
                }else{
                    const radioCheckedAnswers = document.querySelector('input[name=radioCalificanos]:checked')
                    console.log(radioCheckedAnswers.dataset.validateemotion)
                    console.log("es igual a cero 22222")
                    if(radioCheckedAnswers.dataset.validateemotion === '0'){
                        console.log("es igual a cero ")
                        if(contaComun === 0){
                            divAlert.classList.add('alert-info')
                            divAlert.innerHTML = "Debes seleccionar un medio de comunicación"
                            setTimeout(() => {
                                divAlert.classList.remove('alert-info')
                                divAlert.innerHTML = ''
                            }, 2000);
                            return false
                        }else{
                            console.log("envia todos")
                            sendQualification()
                        }

                    }else{
                        console.log('se envia data carita')
                        sendQualification()
                    }
                }



            },false)

            const rad = document.querySelectorAll('input[name=radioCalificanos]');
            for (let i = 0; i < rad.length; i++) {
                rad[i].addEventListener('change', function() {
                    const divHidden = document.getElementsByClassName('seeDivComunicate')
                    console.log(this.dataset.validateemotion)
                    if(this.dataset.validateemotion === '1'){
                        divHidden[0].setAttribute('hidden','hidden')
                        document.getElementById('addDataComunicate').value= ''
                        document.getElementById('divaddDataComunicate').setAttribute('hidden','hidden')

                        if(document.querySelectorAll('input[name=checkComunication]:checked').length){
                            console.log('entro quitar cheked por si hay seleciconados ')
                            document.querySelectorAll('input[name=checkComunication]:checked')[0].checked = false
                        }
                    }else{
                        divHidden[0].removeAttribute('hidden')
                    }
                });
            }

            const radComunicate = document.querySelectorAll('input[name=checkComunication]');
            for (let i = 0; i < radComunicate.length; i++) {
            
                radComunicate[i].addEventListener('click',function(){
                    const radio =  document.querySelectorAll('input[name=checkComunication]:checked')[0].dataset.campobd
                    const data =JSON.parse(localStorage.getItem("d_u"))
                    const mail = data.mail
                    const phone = data.numeroCelular
                    const input = document.getElementById('addDataComunicate')
                    document.getElementById('divaddDataComunicate').removeAttribute('hidden')
                    if(radio === 'W'){
                        input.value = phone
                    }else if(radio === '377'){
                        input.value = mail
                    }
                })
            }


    }

    const sendQualification = () => {
      const data =JSON.parse(localStorage.getItem("d_u"))
      const input = document.getElementById('addDataComunicate')


      let noti = document.querySelectorAll('input[name=checkComunication]:checked').length === 0 ? '': document.querySelectorAll('input[name=checkComunication]:checked')[0].dataset.campobd
    //   let send = document.querySelectorAll('input[name=radioCalificanos]:checked').length === 0 ? '': document.querySelectorAll('input[name=radioCalificanos]:checked')[0].dataset.campobd

      const datos =  {
            "OVT_CEDULA": parseInt(data.cedula),
            "input_add": input.value?input.value:'',
            "sendNotification":noti,
            "CALIFICACION": parseInt(document.querySelectorAll('input[name=radioCalificanos]:checked')[0].dataset.campobd)

          }

          postData(`${baseUrl}/v1/qualification/crearRegistroQualification`,datos).then(ele => {
              console.log(ele)
          })



        console.log("se va para la bd")
    }

    return (
        <div className="col-md-12 text-center" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 47%), 1fr))', paddingRight: '0', paddingLeft: '0', marginTop: '2.5rem' }}>
            <div className="text-end">
                <Link to={{ pathname: routes.ingreso.url }}>
                    <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice zoom" type="submit" name="submit">
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span><i className="bi bi-door-open-fill" style={{ fontSize: '1.7rem' }}></i></span>
                            <span style={{ marginLeft: '0.3rem' }}>Control de ingreso y salida</span>
                        </span>
                    </button>
                </Link>
            </div>
            <div className="text-start">
                <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice zoom" onClick={ () => modalCalificanos()}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span><i className="bi bi-bookmark-star-fill" style={{ fontSize: '1.7rem' }}></i></span>
                        <span style={{ marginLeft: '0.3rem' }}>Califícanos y comunícate</span>
                    </span>
                </button>
            </div>
        </div>
    )
}


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')  //to target with id need #
const message2 = document.querySelector('#message-2')
//e is for event



weatherform.addEventListener('submit', (e) =>{
    e.preventDefault()
    message1.textContent= 'loading....'
    message2.textContent = ' '
    const location = search.value
    //console.log(location)
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            message1.textContent =  data.error
        }
        else{
            message1.textContent =  data.thelocation
            message2.textContent = data.thedata.current_temp + ' Degrees feels like ' +  data.thedata.feelslike + ' Degrees and it is ' + data.thedata.weather_desc
        }
    })
})

})
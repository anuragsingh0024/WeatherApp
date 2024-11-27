const input = document.querySelector('input')
const btn = document.querySelector('button')
const icon = document.querySelector('#icon')
const temp = document.getElementById('temp')
const feelsLike = document.getElementById('feels-like')
const humidity = document.getElementById('humidity')
const Locationn = document.querySelector('#location')
const spin  = document.querySelector('#spin')

const apiKey = "d2161dc861b6d1b196418525e1d94c8b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";


btn.addEventListener('click', async (e)=>{
 spin.style.display = "block"
  if(input.value === ''){
    document.querySelector('#error').innerText = "Please Enter City name"
    document.querySelector('#error').style.display = "block"
    spin.style.display = "none"
    return;
  }
  let city = input.value
  document.querySelector('#error').style.display = "none"
 await getWeather(city);
  spin.style.display = "none"
  
  input.value = ''
})



const getWeather = async (city)=> {
  const encodedCity = encodeURIComponent(city);
  
  const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
  if(response.status === 404){
    document.querySelector('#error2').innerText = "Please Enter a valid city name"
    document.querySelector('#error2').style.display = "block"

         
         return;
  }
  document.querySelector('#error2').style.display = "none"
   const data = await response.json();
         console.log(data)
         
        
         const iconCode = data.weather[0].icon
         const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

         document.querySelectorAll('i').forEach(item=> {
          item.style.display = "block"
            document.querySelector('#devider').style.display = "block"
            document.querySelectorAll('.hidd').forEach(item=> {
              item.style.display = "block"
            })
 })


         icon.src = iconUrl
         temp.innerText = `${data.main.temp} °C`
         Locationn.innerText = ` ${data.name}, ${data.sys.country}`
         feelsLike.innerText = `${data.main.feels_like}`
         humidity.innerText = `${data.main.humidity}%`
     //    feelsLike.innerHTML = `<p><b>Feels Like: </b> ${data.main.feels_like}</p>`
}


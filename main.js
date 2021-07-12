const weatherApp = {
    data () {
        return {
            key: '44cc22073a3eaf46a220bb8ddffa8517',
            units: 'metric',
            cities: [
                {
                    title : "london",
                    time: "10:00",
                    temp: "25",
                    weather: "sun"
                },{
                    title : "riga",
                    time: "9:00",
                    temp: "25",
                    weather: "sun"
                }
            ]
        }
    },
    watch: {
        units (newUnit) {
            if (newUnit==='metric') {
                this.cities.forEach ( city => { city.temp = Math.round((city.temp-32)*5/9 )})
            } else {
                this.cities.forEach ( city => { city.temp = Math.round((city.temp*9/5)+32)})
            }
        }
    },
    methods: {
        updateCity(city,index) {
            const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+this.key;
            axios
                .get( url )
                .then(response => { 
                   
                      this.cities[index].temp = ( ( this.units === 'metric' ) ? Math.round((response.data.main.temp-32)*5/9) : response.data.main.temp );
                      this.cities[index].weather = response.data.weather[0].main;
                  
                    console.log(response.data);
                } )
                .catch(error => {
                    console.error("There was an error!", error.message);
                });
        }
    },
    mounted: function() {
        this.cities.forEach( (city,index) => this.updateCity(city.title, index))
    },
    computed: {
        tempText () {
            return '&#176;'+(this.units === 'metric') ?"C" : "F";
        }
    }
}

Vue.createApp(weatherApp).mount('#app')
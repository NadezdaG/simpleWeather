//new Date().getTime();

const weatherApp = {
    data () {
        return {
            key: '44cc22073a3eaf46a220bb8ddffa8517',
            units: 'metric',
            times: [],
            tempText: '° C',
            allCities: [],
            typedText: '',
            cities: []
        }
    },
    watch: {
        units (newUnit) {
            alert('a');
            if (newUnit==='metric') {
                this.cities.forEach ( city => { city.temp = Math.round((city.temp-32)*5/9 )});
                this.tempText = "° C";
            } else {
                this.cities.forEach ( city => { city.temp = Math.round((city.temp*9/5)+32)});
                this.tempText = '° F';
            }
        },
        cities: {
            handler: function (newCities) {
                localStorage.cities = JSON.stringify(newCities);
            },
            deep: true,
        }
    },
    methods: {
        loadCities() {
            const url = 'https://restcountries.eu/rest/v2/all';
            axios
                .get( url )
                .then(response => { 
                    this.allCities = response.data.map(city => city.capital);
                } )
                .catch(error => {
                    console.error("There was an error!", error.message);
                });
        },

        addCity(city) {
            this.cities.push({
                title : city,
                time: "",
                temp: "",
                hours: 0,
                minutes: 0,
                weather: "",
                timezone: 0,
            });
            this.updateCity( city, this.cities.length-1 );
            this.typedText = "";
            
        },

        removeCity (remove) {
            this.cities = this.cities.splice(remove,1);
        },

        updateCity(city,index) {
            const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+this.key;
            axios
                .get( url )
                .then(response => { 
                        let date = new Date();
                      this.cities[index].temp = ( ( this.units === 'metric' ) ? Math.round((response.data.main.temp-32)*5/9) : response.data.main.temp );
                      this.cities[index].weather = response.data.weather[0].main;
                      this.cities[index].timezone = response.data.timezone;
                      this.cities[index].hours = date.getUTCHours()+response.data.timezone/3600;
                      this.cities[index].minutes = date.getUTCMinutes();

                } )
                .catch(error => {
                    console.error("There was an error!", error.message);
                });
        },

        updateTime () {
            this.cities.forEach( (city ) => {
                let date = new Date();
                city.hours = date.getUTCHours()+city.timezone/3600;
                city.minutes = date.getUTCMinutes();;
            });
        }
    },
    mounted: function() {
        this.loadCities();
        if (localStorage.cities) {
            this.cities = JSON.parse(localStorage.getItem("cities") || "[]");
        }
        this.cities.forEach( (city,index) => this.updateCity(city.title, index));
        setInterval(this.updateTime, 10000);
    },
    computed: {
        filteredCities () {
            if (this.typedText.length>1) { 
            let regex = new RegExp(this.typedText, "i");
            return this.allCities.filter(city => city.match(regex));
            } else {
                return [];
            }
        }
    }
}

Vue.createApp(weatherApp).mount('#app')
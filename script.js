const baseUrl = "https://localhost:7013/api/InfoScreen"
const importantInfoUrl = "https://localhost:7013/api/ImportantInfo"
//const baseUrl = "https://infoscreenrk.azurewebsites.net/api/infoscreen"

const { createApp, ref } = Vue

createApp({
    data() {
        return {
            infoScreen: [],
            newInfoScreen: { id: 0, date: "", time: "", room: "", title: ""},
            updateData: { id: null, date: null, time: null, room: null, title: null},
            deleteData: { id: null, date: null, time: null, room: null, title: null},
            //importantInfo: '',
            newImportantInfo: { id: 0, info: "" },
            updateImportantInfo: { id: null, info: null },
            deleteImportantInfo: { id: null },

            addMessage: "",
            updateMessage: "",
            deleteMessage: "",

        }
    },
    methods: {
        getInfoScreen() {
            this.getInfoScreenHelper(baseUrl)
        },

        async getInfoScreenHelper(url) {
            try {
                const response = await axios.get(url)
                this.infoScreen = await response.data
                console.log(this.infoScreen)
            }
            catch (ex) {
                alert(ex.message)
            }
        },

        async tempImportantInfo() {
            try {
                const response = await axios.post(baseUrl, this.newInfoScreen)
                this.addMessage = "Posten er tilføjet til infoskærmen"
                setTimeout(() => { this.addMessage = "" }, 2000)
                this.newInfoScreen = { id: 0, date: "", time: "", room: "", title: ""}
                this.getInfoScreen()
            }
            catch (ex) {
                alert("Udfyld alle felter for at føje posten til skærmen.")
            }
        },

        async addInfoScreen() {
            try {
                const response = await axios.post(baseUrl, this.newInfoScreen)
                this.addMessage = "Posten er tilføjet til infoskærmen"
                setTimeout(() => { this.addMessage = "" }, 2000)
                this.newInfoScreen = { id: 0, date: "", time: "", room: "", title: ""}
                this.getInfoScreen()
            }
            catch (ex) {
                alert("Udfyld alle felter for at føje posten til skærmen.")
            }
        },

        async updateInfoScreen() {
            const url = `${baseUrl}/${this.updateData.id}`
            try {
                const response = await axios.put(url, this.updateData)
                this.updateMessage = "Posten er rettet på infoskærmen"
                setTimeout(() => { this.updateMessage = "" }, 2000)
                this.updateData = { id: null, date: null, time: null, room: null, title: null }
                this.getInfoScreen()
            }
            catch (ex) {
                alert(ex.message)
            }
        },

        async deletePost() {
            const url = `${baseUrl}/${this.deleteData.id}`
            try {
                const response = await axios.delete(url)
                this.deleteMessage = "Posten er slettet"
                setTimeout(() => { this.deleteMessage = "" }, 2000)
                this.deleteData = { id: null, date: null, time: null, room: null, title: null }
                this.getInfoScreen()
            }
            catch (ex) {
                alert(ex.message)
            }
        },

        // Methods for handling important information
        async addInfo() {
            try {
                const response = await axios.post(importantInfoUrl, this.newImportantInfo);
                this.addMessage = "Vigtig information tilføjet";
                setTimeout(() => { this.addMessage = "" }, 2000);
                this.newImportantInfo = { id: 0, info: "" },
                this.getInfoScreen()
            }
            catch (ex) {
                alert("Fejl ved tilføjelse af vigtig information.");
            }
        },

        async updateInfo() {
            try {
                const response = await axios.put(importantInfoUrl + '/1', this.updateImportantInfo); // Assuming ID is '1' for update
                this.updateMessage = "Vigtig information opdateret";
                setTimeout(() => { this.updateMessage = "" }, 2000);
                this.getInfoScreen()
            }
            catch (ex) {
                alert("Fejl ved opdatering af vigtig information.");
            }
        },

        async deleteInfo() {
            try {
                const response = await axios.delete(importantInfoUrl + '/1'); // Assuming ID is '1' for deletion
                this.deleteMessage = "Vigtig information slettet";
                this.importantInfo = ''; // Clear the local model
                setTimeout(() => { this.deleteMessage = "" }, 2000);
                this.getInfoScreen()
            }
            catch (ex) {
                alert("Fejl ved sletning af vigtig information.");
            }
        },
    

        //skriv måned på dansk
        currentDate() {
            const months = ["januar", "februar", "marts", "april", "maj", "juni", "juli", "august", "september", "oktober", "november", "december"];
            const weekday = ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"];
            const current_date = new Date();
            let day = weekday[current_date.getUTCDay()];
            let month_value = current_date.getMonth();
            return `${day} den. ${current_date.getDate()}. ${months[month_value]}, ${current_date.getFullYear()}`;
        },
    },
    computed: {
        // sortedDates() {
        //     function sorted(infoScreen, currentdate) {
        //         var currentdate = new Date(); 
        //         if(infoScreen.Date != currentdate.getDate())
        //         {
        //             return 0
        //         }
        //         return this.infoScreen.sorted()
        //     }
        // },
        //Sortér opslag på tidspunkt, tidligt til sent
        sortedScreens() {
            return this.infoScreen.sort((a, b) => a.time < b.time ? -1 : 1);
        },
      },
    mounted() {
        this.getInfoScreen();
    },

}).mount("#app")

//PICTURE SLIDESHOW
var index = 0;
slideshow();

function slideshow() {
    var i;
    var pics = document.getElementsByClassName("slides");
    for (i = 0; i < pics.length; i++) {
        pics[i].style.display = "none";
    }
    index++;
    if (index > pics.length) { index = 1 }
    pics[index - 1].style.display = "block";
    setTimeout(slideshow, 30000);
}

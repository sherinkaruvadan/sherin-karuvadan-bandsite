//Define api class
class BandSiteApi{
    constructor(apikey){
        this.apikey = apikey;
        this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    }

    //method to post a comment
    async postComment(comment){

    }

    // method to get all comments
    async getComments(){
    
        const url = `${this.baseUrl}comments?api_key=${this.apikey}`;
        try{
            const response = await axios.get(url);
            return response.data;
        }catch(error){
            console.log(error);
        }
    }
    //method to get all shows
    async getShows(){

        const url = `${this.baseUrl}showdates?api_key=${this.apikey}`;
        try{
            const response = await axios.get(url);
            return response.data;
        }
        catch(error){
            console.error(error);
        }
    }
}
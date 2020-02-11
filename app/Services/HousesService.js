import store from "../store.js";
import House from "../Models/House.js";

// @ts-ignore
let _api = axios.create({
  baseURL: "//bcw-gregslist.herokuapp.com/api/houses",
  timeout: 3000
});

class HousesService {



  getHouses() {
    _api
      .get("")
      .then(res => {
        let apiHouses = res.data.data.map(h => new House(h));
        store.commit("houses", apiHouses);
        console.log("from API", apiHouses)
        console.log(store.State.houses, "store houses")
      })
      .catch(error => {
        console.error(error);
      });
  }
  addHouse(newHouse) {
    _api
      .post("", newHouse)
      .then(res => {
        let newApiHouse = new House(res.data.data);
        //NOTE Gets cars from the state and adds additional car into new array
        let houses = [...store.State.houses, newApiHouse];
        store.commit("houses", houses);
      })
      .catch(error => {
        console.error(error);
      });
  }
  deleteHouse(id) {
    debugger
    _api
      .delete(id)
      .then(() => {
        let filteredHouses = store.State.houses.filter(h => h._id != id);
        store.commit("houses", filteredHouses);
      })
      .catch(error => {
        console.error(error);
      });
  }
}


const housesService = new HousesService();
export default housesService;
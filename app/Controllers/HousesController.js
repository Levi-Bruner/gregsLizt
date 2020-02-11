import HousesService from "../Services/HousesService.js"
import store from "../store.js"

//Private
function _draw() {
  let houses = store.State.houses;
  let houseElem = document.getElementById("houses");
  let template = "";

  houses.forEach(house => {
    template += house.Template;
  });

  houseElem.innerHTML = template;
}

export default class HousesController {
  constructor() {
    store.subscribe("houses", _draw);
    this.getAllHouses()
  }

  getAllHouses() {
    HousesService.getHouses();
  }

  addHouse(event) {
    event.preventDefault();

    // NOTE formData is an alias for our submitted form from our html
    let formData = event.target;
    // NOTE newcar is an object with all the inputted values from our form
    let newHouse = {
      bedrooms: formData.bedrooms.value,
      bathrooms: formData.bathrooms.value,
      imgUrl: formData.imgUrl.value,
      levels: formData.levels.value,
      year: formData.year.value,
      price: formData.price.value,
      description: formData.description.value
    };
    console.log(newHouse);
    HousesService.addHouse(newHouse);
    formData.reset();
    // @ts-ignore
    $("#house-form").modal("toggle");
  }

  delete(id) {
    HousesService.deleteHouse(id);
  }

}
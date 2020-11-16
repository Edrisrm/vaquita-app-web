import moment from "moment";

export const loadingInventory = (inventory = []) => {
  return inventory.map((e) => ({
    ...e,
    _id: e._id,
    animal_number: e.animal_number,
    image: e.image,
    breed: e.breed,
    status: e.status,
    division: e.division,
    weight: e.weight,
    age_in_months: e.age_in_months,
    date: moment(e.date).toDate(),
  }));
};

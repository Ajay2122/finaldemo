// Define the initial state for the gig form
export const INITIAL_STATE = {
  // Get the user ID from local storage, or set it to null if not available
  userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
  title: "",
  cat: "",
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

// Define the gig reducer function
export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      // Update the value of the input field based on the name and value provided in the action payload
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "ADD_IMAGES":
      // Update the cover image and images array with the values provided in the action payload
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };
    case "ADD_FEATURE":
      // Add a new feature to the features array by appending it to the existing array
      return {
        ...state,
        features: [...state.features, action.payload],
      };
    case "REMOVE_FEATURE":
      // Remove a feature from the features array based on the feature value provided in the action payload
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };
    default:
      return state;
  }
};

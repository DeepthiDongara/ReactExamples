import { configureStore, createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name : "products",
    initialState:{
        Veg: [
  { 
    id: 1, 
    name: "Tomato", 
    price: 40, 
    imageUrl: "/images/tomato.jpg", 
    description: "Fresh red tomatoes, perfect for curries, salads, and sauces." 
  },
  { 
    id: 2, 
    name: "Potato", 
    price: 30, 
    imageUrl: "/images/potato.jpg", 
    description: "Farm-fresh potatoes, rich in starch, ideal for fries and curries." 
  },
  { 
    id: 3, 
    name: "Onion", 
    price: 50, 
    imageUrl: "/images/onion.jpg", 
    description: "Crispy and aromatic onions, essential for every Indian dish." 
  },
  { 
    id: 4, 
    name: "Carrot", 
    price: 60, 
    imageUrl: "/images/carrot.jpg", 
    description: "Sweet and crunchy carrots, loaded with Vitamin A." 
  },
  { 
    id: 5, 
    name: "Cabbage", 
    price: 35, 
    imageUrl: "/images/cabbage.webp", 
    description: "Leafy green cabbage, great for salads, soups, and stir-fry." 
  },
  { 
    id: 6, 
    name: "Cauliflower", 
    price: 45, 
    imageUrl: "/images/cauliflower.jpg", 
    description: "Healthy cauliflower, a versatile veggie for curries and snacks." 
  },
  { 
    id: 7, 
    name: "Spinach", 
    price: 25, 
    imageUrl: "/images/spinach.jpg", 
    description: "Iron-rich spinach leaves, great for soups and curries." 
  },
  { 
    id: 8, 
    name: "Brinjal", 
    price: 55, 
    imageUrl: "/images/brinjal.jpg", 
    description: "Fresh purple brinjals, perfect for curries and fry dishes." 
  },
  { 
    id: 9, 
    name: "Green Peas", 
    price: 70, 
    imageUrl: "/images/Green peas.jpg", 
    description: "Sweet and tender green peas, great for curries and pulao." 
  },
  { 
    id: 10, 
    name: "Capsicum", 
    price: 80, 
    imageUrl: "/images/capsicum.avif", 
    description: "Colorful and crunchy capsicum, ideal for salads and pizzas." 
  }
],
NonVeg:[
  { 
    id: 11, 
    name: "Chicken", 
    price: 200, 
    imageUrl: "images/chicken.avif", 
    description: "Fresh farm chicken, rich in protein and perfect for curries or grills."
  },
  { 
    id: 12, 
    name: "Mutton", 
    price: 600, 
    imageUrl: "images/mutton.jpg", 
    description: "Tender mutton with a rich taste, ideal for biryanis and stews."
  },
  { 
    id: 13, 
    name: "Beef", 
    price: 450, 
    imageUrl: "images/beef.jpg", 
    description: "Juicy beef cuts, perfect for steaks, roasts, and grills."
  },
  { 
    id: 14, 
    name: "Fish", 
    price: 300, 
    imageUrl: "images/fish.jpg", 
    description: "Fresh catch of the day, rich in omega-3 and flavorsome."
  },
  { 
    id: 15, 
    name: "Prawns", 
    price: 500, 
    imageUrl: "images/prawns.jpg", 
    description: "Delicious prawns, great for curries, fries, and grills."
  },
  { 
    id: 16, 
    name: "Crab", 
    price: 550, 
    imageUrl: "images/crab.jpg", 
    description: "Fresh crabs with rich flavor, best for seafood lovers."
  },
  { 
    id: 17, 
    name: "Turkey", 
    price: 700, 
    imageUrl: "images/turkey.jpg", 
    description: "Premium turkey meat, lean and tasty for roasts and grills."
  },
],
 Beverages : [
  {
    id: 21,
    name: "Mango Smoothie",
    price: 120,
    imageUrl: "images/mango.avif",
    description: "A refreshing blend of ripe mangoes, yogurt, and honey."
  },
  {
    id: 22,
    name: "Iced Coffee",
    price: 90,
    imageUrl: "images/coffee.avif",
    description: "Chilled coffee served with ice and a splash of milk."
  },
  {
    id: 23,
    name: "Green Tea",
    price: 60,
    imageUrl: "images/green tea.jpg",
    description: "Hot, soothing green tea rich in antioxidants."
  },
  {
    id: 24,
    name: "Strawberry Milkshake",
    price: 110,
    imageUrl: "images/strawberry.jpg",
    description: "Creamy milkshake made with fresh strawberries."
  },
  {
    id: 25,
    name: "Lemonade",
    price: 50,
    imageUrl: "images/lemonade.jpg",
    description: "Refreshing lemonade with a hint of mint."
  },
  {
    id: 26,
    name: "Hot Chocolate",
    price: 100,
    imageUrl: "images/hotchocolate.jpg",
    description: "Rich hot chocolate topped with marshmallows."
  },
  {
    id: 27,
    name: "Orange Juice",
    price: 70,
    imageUrl: "images/orange juice.webp",
    description: "Freshly squeezed orange juice packed with Vitamin C."
  },
  {
    id: 28,
    name: "Cold Coffee",
    price: 95,
    imageUrl: "images/coldcoffee.avif",
    description: "Smooth and creamy cold coffee with ice cream."
  },
  {
    id: 29,
    name: "Watermelon Juice",
    price: 80,
    imageUrl: "images/watermelon.avif",
    description: "Chilled watermelon juice to beat the heat."
  },
  {
    id: 30,
    name: "Masala Chai",
    price: 40,
    imageUrl: "images/masalachai.webp",
    description: "Traditional Indian spiced tea brewed with milk."
  }
],
Desserts : [
  {
    id: 100,
    name: "Chocolate Cake",
    description: "Rich and moist chocolate sponge layered with creamy ganache.",
    imageUrl: "https://images.pexels.com/photos/533326/pexels-photo-533326.jpeg",
    price: 250
  },
  {
    id: 101,
    name: "Cheesecake",
    description: "Classic New York-style cheesecake with a buttery biscuit base.",
    imageUrl: "https://sugargeekshow.com/wp-content/uploads/2022/12/cherry_cheesecake_featured-4-of-6-copy.jpg",
    price: 300
  },
  {
    id: 102,
    name: "Ice Cream Sundae",
    description: "Scoops of vanilla ice cream topped with chocolate syrup and nuts.",
    imageUrl: "https://images.pexels.com/photos/461430/pexels-photo-461430.jpeg",
    price: 180
  },
  {
    id: 103,
    name: "Brownies",
    description: "Fudgy chocolate brownies with a crisp top and gooey center.",
    imageUrl: "https://images.pexels.com/photos/227432/pexels-photo-227432.jpeg?auto=compress&cs=tinysrgb&w=1200",
    price: 150
  },
  {
    id: 104,
    name: "Cupcakes",
    description: "Fluffy cupcakes topped with colorful buttercream frosting.",
    imageUrl: "https://sallysbakingaddiction.com/wp-content/uploads/2017/06/moist-chocolate-cupcakes-5.jpg",
    price: 120
  },
  {
    id: 105,
    name: "Fruit Tart",
    description: "Crispy pastry filled with custard and topped with fresh fruits.",
    imageUrl: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
    price: 220
  },
  {
    id: 106,
    name: "Macarons",
    description: "French almond meringue cookies with creamy fillings.",
    imageUrl: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg",
    price: 280
  },
  {
    id: 107,
    name: "Panna Cotta",
    description: "Italian dessert made with sweetened cream and berry coulis.",
    imageUrl: "https://images.pexels.com/photos/3026807/pexels-photo-3026807.jpeg",
    price: 260
  },
  {
    id: 108,
    name: "Apple Pie",
    description: "Traditional apple pie with spiced apple filling and flaky crust.",
    imageUrl: "https://www.recipetineats.com/tachyon/2022/11/Apple-Pie_8.jpg?resize=500%2C500&quality=100",
    price: 240
  },
  {
    id: 109,
    name: "Donuts",
    description: "Glazed and frosted donuts with a soft and fluffy inside.",
    imageUrl: "https://myurbantreats.com/wp-content/uploads/2022/01/Donuts-with-chocolate-glaze-500x500.jpg",
    price: 100
  }
],


 reducers:{}

}


})



const cart = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart: (state, action) => {
      let item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem: (state, action) => {
      let index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },
    incrementQuantity: (state, action) => {
      let item = state.find(item => item.id === action.payload.id);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decrementQuantity: (state, action) => {
      let item = state.find(item => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) item.quantity -= 1;
        else {
          let index = state.findIndex(i => i.id === action.payload.id);
          if (index !== -1) state.splice(index, 1);
        }
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const {addToCart,removeItem,incrementQuantity,decrementQuantity,clearCart}=cart.actions;




// orders slice
let ordersSlice=createSlice({
  name:"orders",
  initialState:[],
  reducers:{
    addOrder:(state,action)=>{
      state.push(action.payload);
    } ,
  }
  }
);
export const {addOrder}=ordersSlice.actions;



// auth slice
const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      const user = action.payload;
      const exists = state.users.find(
        (u) => u.username === user.username || u.email === user.email
      );

      if (exists) {
        state.error = "Username or email already exists";
      } else {
        state.users.push(user);
        state.currentUser = user;
        localStorage.setItem("users", JSON.stringify(state.users));
        localStorage.setItem("currentUser", JSON.stringify(user));
        state.error = null;
      }
    },
    login: (state, action) => {
      const { username, password } = action.payload;
const user = state.users.find(
  (u) => u.username === username && u.password === password
);

      if (user) {
        state.currentUser = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
        state.error = null;
      } else {
        state.error = "Invalid email or password";
      }
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { register, login, logout, clearError } = authSlice.actions;




 const store=configureStore({
    reducer:{
        products:productsSlice.reducer,
        cart:cart.reducer ,
        orders:ordersSlice.reducer,
       auth:authSlice.reducer
    }
 });
 export default store;
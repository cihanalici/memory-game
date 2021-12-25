import { createSlice } from "@reduxjs/toolkit";

export const memorySlice = createSlice({
  name: "memories",
  initialState: {
    items: [
      { src: "angular2", matched: false },
      { src: "vue", matched: false },
      { src: "react", matched: false },
      { src: "grunt", matched: false },
      { src: "phantomjs", matched: false },
      { src: "ember", matched: false },
      { src: "babel", matched: false },
      { src: "ionic", matched: false },
      { src: "meteor", matched: false },
      { src: "yeoman", matched: false },
      { src: "yarn", matched: false },
      { src: "nodejs", matched: false },
      { src: "bower", matched: false },
      { src: "browserify", matched: false },
    ],
    cards: [],
    choiceOne: null,
    choiceTwo: null,
    point: 100,
  },
  reducers: {
    shuffleCardsAction: (state, action) => {
      const shuffledCards = [...state.items, ...state.items]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));

      
      state.cards = shuffledCards
    },
    updateChoiceOne: (state, action) => {
      state.choiceOne = action.payload;
    },
    updateChoiceTwo: (state, action) => {
      state.choiceTwo = action.payload;
    },
    compareSelectedCards: (state, action) => {
      state.cards.map((card) => {
        if(card.src === state.choiceOne.src) {
          return card.matched = true
        } else {
          return card
        }
      })
    },
  },
});

export const { shuffleCardsAction, updateChoiceOne, updateChoiceTwo, compareSelectedCards } = memorySlice.actions;
export default memorySlice.reducer;

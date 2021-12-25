import React, { useEffect, useState } from "react";
import  { useSelector, useDispatch} from "react-redux"

import SingleCard from "./components/SingleCard";
import { compareSelectedCards, shuffleCardsAction, updateChoiceOne, updateChoiceTwo } from "./redux/memorySlice"
import "./App.css"


function App() {
  const dispatch = useDispatch()

  const cards = useSelector((state) => state.memories.cards)
  const choiceOne = useSelector((state) => state.memories.choiceOne)
  const choiceTwo = useSelector((state) => state.memories.choiceTwo)

  // console.log(choiceOne)
  // console.log(choiceTwo)

  // const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [disabled, setDisabled] = useState(false)
  const [point, setPoint] = useState(0)

  // shuffle cards
  const shuffleCards = () => {
    dispatch(shuffleCardsAction())

    dispatch(updateChoiceOne(null))
    dispatch(updateChoiceTwo(null))  
    setTurns(0);
    setPoint(0);
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? dispatch(updateChoiceTwo(card))   : dispatch(updateChoiceOne(card));
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        // setCards((prevCards) => {
        //   return prevCards?.map((card) => {
        //     if (card.src === choiceOne.src) {
        //       return { ...card, matched: true };
        //     } else {
        //       return card;
        //     }
        //   });
        // });
        dispatch(compareSelectedCards())
        setPoint(prev => prev + 50)
        resetTurn();
      } else if (choiceTwo.src !== choiceOne.src) {
        setTimeout(() => resetTurn(), 1000);
        setPoint(prev => prev - 10)
      }
    }
  }, [choiceTwo, choiceOne]);

  //reset choices increase turn
  const resetTurn = () => {
    dispatch(updateChoiceOne(null))
    dispatch(updateChoiceTwo(null))  
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false)
  };

  // start a new game automaticly
  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards?.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      <p>Point: {point}</p>
    </div>
  );
}

export default App;
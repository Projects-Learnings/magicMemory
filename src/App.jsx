import './App.css'
import {useEffect, useState} from "react";
// Import images
// import helmetImg from './img/helmet-1.png'
// import potionImg from './img/potion-1.png'
// import ringImg from './img/ring-1.png'
// import scrollImg from './img/scroll-1.png'
// import shieldImg from './img/shield-1.png'
// import swordImg from './img/sword-1.png'
import coverImg from './img/cover.png'
import Card from "./components/Card.jsx";


const images = import.meta.glob('./img/*.png', {eager: true});

const cardImages = [
    // { src: "/img/helmet-1.png" },
    // { src: "/img/potion-1.png" },
    // { src: "/img/ring-1.png" },
    // { src: "/img/scroll-1.png" },
    // { src: "/img/shield-1.png" },
    // { src: "/img/sword-1.png" }
    {src: images['./img/helmet-1.png'].default, matched: false},
    {src: images['./img/potion-1.png'].default, matched: false},
    {src: images['./img/ring-1.png'].default, matched: false},
    {src: images['./img/scroll-1.png'].default, matched: false},
    {src: images['./img/shield-1.png'].default, matched: false},
    {src: images['./img/sword-1.png'].default, matched: false}
]

function App() {
//shuffle cards
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [isGameOver, setIsGameOver] = useState(false);
    const shuffleCards = () => {
        const shuffledCards = ([...cardImages, ...cardImages])

            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random()}))
        setCards(shuffledCards)
        console.log(shuffledCards)
        setTurns(0)
        setIsGameOver(false)

    }
    const handleChoice = (card) => {
        //console.log(card, turns)
        console.log(cards)
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

    }

    useEffect(() => {
        console.log("fired")

        if (choiceOne && choiceTwo) {
            setDisabled(true)
            console.log("match")
            if (choiceOne.src === choiceTwo.src) {

                setCards(prevCard => {
                    return prevCard.map(card => {
                        // console.log(card.card.src)

                        //console.log(card.card.src,choiceOne.card.src)
                        //console.log(">>",{...card, matched: true})

                        if (card.src === choiceOne.src) {
                            console.log(card)
                            return {...card, matched: true}
                        }
                        return card
                    })

                })
                // Check if all cards are matched

                // shuffleCards()

                resetTurn()
            } else {
                console.log("no match")
                setTimeout(() => resetTurn(), 1000)
                resetTurn()
            }
        }

    }, [choiceOne, choiceTwo]);
    useEffect(() => {
        const allMatched = cards.every(card => card.matched);
        if (allMatched) {
            setIsGameOver(true);
        }
    }, [cards])
    useEffect(() => {
        shuffleCards()
    }, []);

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevState => prevState + 1)
        setDisabled(false)

    }

    return (
        <div className="App">
            <h1>Magic Match</h1>
            {isGameOver ? (
                <div className="game-over">
                    <h2>🎉 Game Over! 🎉</h2>
                    <p>You completed the game in {turns} turns!</p>
                </div>
            ) : (
                <p>No of turns: {turns}</p>
            )}

            <button onClick={shuffleCards}>New Game</button>
            <div className="card-grid">
                {cards.map((card) => (

                    < Card
                        card={card}
                        coverImg={coverImg}
                        key={card.id}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />

                ))}
            </div>

        </div>
    )
}


export default App

import PropTypes from 'prop-types';
import './Card.css'

// function Card({card, coverImg, handleChoice, flipped}) {
//     const handleClick = () => {
//         handleChoice(card)
//     }
//
//     return (
//         <div className="card">
//             <div className={flipped ? "flipped" : ""}>
//
//
//                 <img className="front" src={card.src} alt="card Front"/>
//                 <img className="back" onClick={handleClick} src={coverImg} alt="card Back"/>
//
//             </div>
//         </div>
//
//     )
// }

function Card({card, coverImg, handleChoice, flipped, disabled}) {
    // console.log(">>>", {...card})
    const handleClick = () => {

        if (!flipped && !disabled) {
            handleChoice(card);
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="card Front"/>
                <img className="back" onClick={handleClick} src={coverImg} alt="card Back"/>
            </div>
        </div>
    );
}


Card.propTypes = {
    card: PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        matched: PropTypes.bool.isRequired,
    }).isRequired,
    coverImg: PropTypes.string.isRequired,
    handleChoice: PropTypes.func.isRequired,
    flipped: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
};


export default Card

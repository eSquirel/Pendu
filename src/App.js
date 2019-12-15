import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types'

const LETTRES = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const MOTS = ['COCHONDINDE', 'CAILLOUX', 'STYX', 'PHOENIX', 'ALEATOIRE', 'PIGEON', 'NOCTAMBULE', 'AGRICULTEUR', 'ROSE', 'PARAPLUIE', 'RHAPSODIE', 'TOMBEAU','TRAMPOLINE']
const LOCKED = '❌'

var running = true
class App extends Component{

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  state = {
    erreurs: 0,
    usedLetter: [],
    toGuess: this.getRandomWord(),
  }
getRandomWord() {

    return MOTS[Math.floor(Math.random() * MOTS.length)];
  }

computeDisplay(mot) {

const {usedLetter, toGuess} = this.state
 var arr = toGuess.split('').map(e => (usedLetter.includes(e) ? e : '_ '))

 return arr.join('')
  }
getFeedBack (lettre){

return this.state.usedLetter.includes(lettre)
}

handleClick (x) {

const {usedLetter, erreurs, toGuess} = this.state

this.setState({ usedLetter: usedLetter.concat(x) })
//ou usedLetter: [...usedLetter, x]
toGuess.split('').includes(x) ? console.log('Bien!') : this.setState({erreurs: erreurs + 1})

//console.log("clic", x, usedLetter);
}
//conserve le binding et les variables de l'etat local
newGame = () => {

  this.setState({erreurs: 0, toGuess: this.getRandomWord(), usedLetter: []})
  running = true;
}
  render() {

const {toGuess, erreurs} = this.state;
const win = this.computeDisplay(toGuess).split('').filter( e => e === '_').length === 0;
const lose = erreurs >= 8;

if (lose) {
  running = false;
}

if (win) {
  running = false;
}
    return(

       <div className = "pendu">

         <span className="erreurs">
          Erreurs :  {erreurs} / 8
         </span>

           <h2 className = "masque">
           {this.computeDisplay(toGuess)}
        </h2>

        {running &&  LETTRES.map((laLettre, index) => (
          <Clavier lettre={laLettre} used={this.getFeedBack(laLettre)} key={index} onClick={this.handleClick} />))
        }

        {win && <span className='win'> Bravo ! <br/>
          <button className ='replay' onClick ={this.newGame} > Rejouer </button> </span>
        }

        {lose && <span className='lose'> Perdu ! <br/>
          <button className ='replay' onClick ={this.newGame} > Rejouer </button> </span>
        }

    </div>
    )
  }

}

const Clavier = ({lettre, used, onClick}) => (

    <button className={`lettre ${used}`} onClick={()=>onClick(lettre)} >
      {used ? LOCKED : lettre}
    </button>


)

Clavier.propTypes = {
  lettre: PropTypes.string.isRequired,
  used: PropTypes.bool.isRequired
}

export default App;

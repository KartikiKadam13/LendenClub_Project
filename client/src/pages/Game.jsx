import React, { useEffect } from 'react'
import Square from '../components/Square'
import { useState, useContext } from 'react'
import { AppContent } from '../context/AppContext'

const renderFrom = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]

const Game = () => {

      const { userData } = useContext(AppContent)

    const [gameState, setGameState] = useState(renderFrom);
    const [currentPlayer, setCurrentPlayer] = useState('circle');
    const [finishedState, setfinishedState] = useState(false);
    const[finishedArrayState, setFinishedArrayState] = useState([]);
    


    const checkWinner = ()=>{

        //row dynamic
        for(let row = 0; row < gameState.length; row++){
            if(gameState[row][0] === gameState[row][1] && gameState[row][1] === gameState[row][2]){
                setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2 ])
                return gameState[row][0];
            }

        }

        //column dymanic
        for(let col = 0; col < gameState.length; col++){
            if(gameState[0][col] === gameState[1][col] && gameState[1][col] === gameState[2][col]){

                setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col ])

                return gameState[0][col];
            }

        }

        if(gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2]){
            return gameState[0][0];
        }

        if(gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0]){
            return gameState[0][2];
        }

        const isDrawMatch = gameState.flat().every(e => {
            if(e === 'circle' || e ==='cross'){
                return true;
            }
        });
        if(isDrawMatch){
            return 'draw';
        }
    }

    useEffect(()=>{
        const winner = checkWinner();

        if(winner){
            setfinishedState(winner)
        }
    },[gameState]);

   




  return (

    <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-r from-stone-100 to-sky-100'>

    <div className='flex flex-row w-full  gap-30 items-center justify-center'>
        <div className='w-30 h-12 bg-black mt-10 mb-10 rounded-full text-white text-center pt-2.5'>{userData ? userData.name : ''}</div>
        <div className='w-30 h-12 mt-10 mb-10 bg-black rounded-full text-white text-center m pt-2.5'>Opponent</div>
    </div>

      <div className='bg-[#070F2B] p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm '>
        <h1 className='text-3xl font-semibold text-white text-center mb-3'>TIC TAC TOE</h1>
        <div className='grid grid-cols-3 items-center'>
            {
                gameState.map((arr, rowIndex)=>
                     arr.map((e, colIndex) =>{
                        return <Square 
                        finishedArrayState = {finishedArrayState}
                        finishedState = {finishedState}
                        currentPlayer = {currentPlayer}
                        setCurrentPlayer = {setCurrentPlayer}
                        setGameState={setGameState}
                        id={rowIndex * 3 + colIndex} 
                        key={rowIndex * 3 + colIndex}/>;
                    })
                )
            }
        </div>
        { finishedState && finishedState !== 'draw' &&(
            <h2 className='text-white text-center mt-5 text-lg'> The winner is {''}:{'   '} {finishedState}</h2>)}

{ finishedState && finishedState === 'draw' &&(
            <h2 className='text-white text-center mt-5 text-lg'>It's a Draw</h2>)}
      </div>
      
    </div>
  )
}

export default Game

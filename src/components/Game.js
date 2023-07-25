import './Game.css';
import { useState } from 'react';

const Box = ({value,clsName,handleClick}) => {
	return(
		<div className={`ttt-box ${clsName}`} onClick={handleClick}>{value}</div>
	);
}

const checkWinner = (boxVal) => {
	const matches = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,6,4]
	];
	for(let i=0;i<matches.length;i++){
		const [x,y,z] = matches[i];
		if(boxVal[x] === boxVal[y] && boxVal[x] === boxVal[z]){
			const matchedBox = document.querySelectorAll(`.box${x},.box${y},.box${z}`);
			if(boxVal[x]) matchedBox.forEach(el=>el.classList.add("done"))
			return boxVal[x];
		}
	}
	return null;
}

const Game = () => {
	const [boxVal,setBoxVal] = useState(Array(9).fill(null));
	const [isXNext,setIsXNext] = useState(true);

	const updateBox = (i) => {
		if(boxVal[i] || checkWinner(boxVal)){ 
			return;
		}
		const duplVal = boxVal.slice(); 
		duplVal[i] =  isXNext ? "X" : "O";
		setBoxVal(duplVal);
		setIsXNext(!isXNext);
	}

	const result = checkWinner(boxVal);

	return(
		<>
			<div className='ttt-wrap'>
				<div className="ttt-row">
					{
						Array.from("012345678").map((i)=>{
							return(
								<Box key={i} value={boxVal[i]} handleClick={()=>updateBox(i)} clsName={`box${i}`} />
							);
						})
					}
				</div>
			</div>
			{result &&
				<div>
					<div className="result">Winner is: {result}</div>
					<div className="confetti">
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
						<div className="confetti-piece"></div>
					</div>
				</div>
			}
		</>
	);
}

export default Game;
import { createContext, useState } from "react";
import { dishesData } from "../constants";
export const dishesContext = createContext();
export const Provider = ({ children }) => {
	const [dishes, setDishes] = useState(dishesData);
	// const [dishes, setDishes] = useState([]);
	const [numberOfPans, setNumberOfPans] = useState(7);
	const [numberOfStoves, setNumberOfStoves] = useState(10);
	const [cleaningTime, setCleaningTime] = useState(5);
	const [temperature, setTemperature] = useState(null);
	const [coolingTime, setCoolingTime] = useState(null);
	const [optimizedState, setOptimizedState] = useState(null);
	return (
		<dishesContext.Provider
			value={{
				dishes,
				setDishes,
				numberOfPans,
				setNumberOfPans,
				numberOfStoves,
				setNumberOfStoves,
				cleaningTime,
				setCleaningTime,
				temperature,
				setTemperature,
				coolingTime,
				setCoolingTime,
				optimizedState,
				setOptimizedState,
			}}
		>
			{children}
		</dishesContext.Provider>
	);
};

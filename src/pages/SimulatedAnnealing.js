//This page is the Simulated Annealing page of the application, which imports the SimulatedAnnealingContainer, required to present a graphical representation of the simulated annealing algorithm along with the percentage of completion at any point within the algorithm's execution and renders them whenever the user navigates to the Simulated Annealing section once he's filled out the necessary details pertaining to dishes and logistics

import React, { useContext, useState } from "react";
import { SimulatedAnnealingContainer } from "../containers";
import { SuccessAlert } from "../components";
import { dishesContext } from "../context/stateContext";
export const SimulatedAnnealing = () => {
	const { success, setSuccess } = useContext(dishesContext);
	return (
		<>
			<SuccessAlert success={success} setSuccess={setSuccess} />
			<SimulatedAnnealingContainer
				success={success}
				setSuccess={setSuccess}
			/>
		</>
	);
};

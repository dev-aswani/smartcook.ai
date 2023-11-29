//This page is the Simulated Annealing page of the application, which imports the necessary components and containers required to present a graphical representation of the simulated annealing algorithm along with the percentage of completion at any point within the algorithm's execution and renders them wheneve the user navigates to the Simulated Annealing section once he's filled out the necessary details pertaining to dishes and logistics

import React, { useState } from "react";
import { SimulatedAnnealingContainer } from "../containers";
import { SuccessAlert } from "../components";
export const SimulatedAnnealing = () => {
	const [success, setSuccess] = useState(null);
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

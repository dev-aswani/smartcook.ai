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

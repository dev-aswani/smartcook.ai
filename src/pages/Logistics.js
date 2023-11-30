//This page is the Logistics page of the application, which imports the LogisticsContainer, required to read and update user input related to logistical details such as number of pans, stoves and the cleaning time and renders them when the user navigates to the Logistics section.

import React, { useState } from "react";
import { SuccessAlert } from "../components";
import { LogisticsContent } from "../containers";
export const Logistics = () => {
	const [success, setSuccess] = useState(null);
	return (
		<>
			<SuccessAlert success={success} setSuccess={setSuccess} />
			<LogisticsContent success={success} setSuccess={setSuccess} />
		</>
	);
};

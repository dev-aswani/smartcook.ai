import React, { useState } from "react";
import { ChartPageContent } from "../containers";
import { SuccessAlert } from "../components";
export const ChartPage = () => {
	const [success, setSuccess] = useState(null);
	return (
		<>
			<SuccessAlert success={success} setSuccess={setSuccess} />
			<ChartPageContent success={success} setSuccess={setSuccess} />
		</>
	);
};

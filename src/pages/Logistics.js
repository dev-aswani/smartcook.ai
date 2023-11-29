import React, { useState } from "react";
import { Navbar } from "../components";
import { SuccessAlert } from "../components";
import { Box } from "@mui/material";
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

import React, { useState } from "react";
import { Navbar } from "../components";
import { DetailsPageContent } from "../containers";
import { SuccessAlert } from "../components";
import { Box } from "@mui/material";
export const DetailsPage = () => {
	const [success, setSuccess] = useState(null);
	return (
		<Box sx={{ minHeight: "100%" }}>
			<SuccessAlert success={success} setSuccess={setSuccess} />
			<DetailsPageContent success={success} setSuccess={setSuccess} />
		</Box>
	);
};

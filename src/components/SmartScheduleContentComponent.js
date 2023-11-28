import { Divider, Paper, Typography } from "@mui/material";
import React from "react";

export const SmartScheduleContentComponent = ({ content }) => {
	let newContent = content ? content.split("----------") : [];
	// newContent.splice(0, 1);
	// newContent = newContent.map((item, index) =>
	// 	index == 0 ? item : "At" + item
	// );

	console.log(newContent);

	return (
		<Paper elevation={1} sx={{ p: 2 }}>
			<Typography sx={{ mb: 2, color: "text.secondary" }} component="pre">
				{newContent.map((stage, index) => (
					<React.Fragment key={index}>
						<p>{stage}</p>
						{index < newContent.length - 1 && <Divider />}
					</React.Fragment>
				))}
			</Typography>
		</Paper>
	);
};

import { Box, Divider, Paper, Typography } from "@mui/material";
import React from "react";
export const SmartScheduleContentComponent = ({ content }) => {
	let newContent = content ? content.split("----------") : [];
	// newContent.splice(0, 1);
	// newContent = newContent.map((item, index) =>
	// 	index == 0 ? item : "At" + item
	// );
	console.log(newContent);
	newContent = newContent.map((stage, index) =>
		index === 0 ? (
			<b>{stage}</b>
		) : (
			// <Typography sx={{ m: 2 }}>{stage}</Typography>
			<p>{stage}</p>
		)
	);

	return (
		<Paper elevation={1} sx={{ p: 2 }}>
			<Typography sx={{ mb: 2, color: "text.secondary" }} component="pre">
				{newContent.map((stage, index) => (
					<React.Fragment key={index}>
						{stage}
						{index < newContent.length - 1 && <Divider />}
					</React.Fragment>
				))}
			</Typography>
		</Paper>
	);
};

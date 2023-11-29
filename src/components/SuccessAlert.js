//This component is used by various containers and pages to generate a success alert to promptly inform the user about the successful completion of a wide variety of taks, such as successful addition, modification, and/or deletion of a dish, successful addition and/or updation of logisitical details, successful completion of the simulated annealing algorithm and subsequent generation of the smart schedule.

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export const SuccessAlert = ({ success, setSuccess }) => {
	return (
		<Box sx={{ mx: 3 }}>
			<Collapse in={success ? true : false}>
				<Alert
					color="primary"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setSuccess(null);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					sx={{ mb: 2, alignItems: "center" }}
				>
					{success}
				</Alert>
			</Collapse>
		</Box>
	);
};

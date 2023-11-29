//This container is used to read and update the user input pertaining to dish details such as dish names and cooking times, also performing the necessary validation while at it. It imports the necessary components required to accomplish the aforementioned tasks

import React, { useState } from "react";
import { DishList, DishInput } from "../components";
import { SuccessAlert } from "../components";
export const HomeContainer = () => {
	const [editModeIndex, setEditModeIndex] = useState(null);

	const [success, setSuccess] = useState(null);
	return (
		<>
			<SuccessAlert
				success={success}
				setSuccess={setSuccess}
			></SuccessAlert>
			<DishInput
				editModeIndex={editModeIndex}
				setEditModeIndex={setEditModeIndex}
				setSuccess={setSuccess}
			/>
			<DishList
				setEditModeIndex={setEditModeIndex}
				setSuccess={setSuccess}
			/>
		</>
	);
};

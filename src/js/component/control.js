import React from "react";
import PropTypes from "prop-types";

export function Control(props) {
	return (
		<a
			onClick={() => {
				props.funcion();
			}}
			style={{ cursor: "pointer" }}
			className={`m-2 ${props.color} align-center`}>
			<h5>
				<i className={`fas fa-${props.tipoB}`}></i>
			</h5>
		</a>
	);
}

Control.propTypes = {
	funcion: PropTypes.func,
	tipoB: PropTypes.string,
	color: PropTypes.string
};

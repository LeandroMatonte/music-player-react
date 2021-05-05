import React from "react";
import PropTypes from "prop-types";

export function SongList(props) {
	return (
		<div className="list-group list-group-flush">
			{props.list.map((elem, index) => {
				return (
					<a
						style={{ cursor: "pointer" }}
						key={index}
						onClick={() => props.cambiar(index, false)}
						className={`song list-group-item list-group-item-action list-group-item-dark d-flex px-1${
							index == props.actual ? " seleccionado" : ""
						}`}>
						<h5 className="text-white-50 ml-1 my-0">{index + 1}</h5>
						<h5 className="text-white ml-4 my-0">{elem.name}</h5>
					</a>
				);
			})}
		</div>
	);
}

SongList.propTypes = {
	list: PropTypes.array,
	cambiar: PropTypes.func,
	actual: PropTypes.number
};

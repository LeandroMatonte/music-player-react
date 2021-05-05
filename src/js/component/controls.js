import React, { useState } from "react";
import PropTypes from "prop-types";
import { Control } from "./control";

export function Controls(props) {
	const [shuffle, setShuffle] = useState(false);
	const cambiarCancion = direccion => {
		direccion === "anterior"
			? props.cambiar(props.actual - 1, shuffle)
			: props.cambiar(props.actual + 1, shuffle);
	};

	const [volumen, setVolumen] = useState(1.0);

	const cambiarVolumen = direccion => {
		if (
			props.song.current.volume != undefined &&
			props.song.current.volume >= 0 &&
			props.song.current.volume <= 1.0
		) {
			if (direccion == "bajar") {
				if (props.song.current.volume != 0) {
					props.song.current.volume =
						(Math.floor(props.song.current.volume * 10) - 1) / 10;
				}
			} else {
				if (props.song.current.volume != 1.0) {
					props.song.current.volume =
						(Math.floor(props.song.current.volume * 10) + 1) / 10;
				}
			}
			setVolumen(props.song.current.volume);
		}
	};

	const repeat = () => {
		props.song.current.loop = !props.song.current.loop;
		setSeleccionado(props.song.current.loop);
	};

	const [seleccionado, setSeleccionado] = useState(false);

	return (
		<div className="row">
			<div className="col-sm-0 col-md-4"></div>

			<div className="col-sm-6 col-md-4">
				<div className="d-flex align-items-center justify-content-center">
					<Control
						funcion={() => {
							setShuffle(!shuffle);
						}}
						tipoB="random"
						color={shuffle ? "text-info" : "text-light"}
					/>
					<Control
						funcion={() => {
							cambiarCancion("anterior");
						}}
						tipoB="backward"
						color="text-light"
					/>
					<Control
						funcion={props.controlPlay}
						tipoB={props.botonP}
						color="text-light"
					/>
					<Control
						funcion={() => {
							cambiarCancion("siguiente");
						}}
						tipoB="forward"
						color="text-light"
					/>
					<Control
						funcion={repeat}
						tipoB="redo-alt"
						color={seleccionado ? "text-info" : "text-light"}
					/>
				</div>
			</div>

			<div className="col-sm-6 col-md-4">
				<div className="d-flex align-items-center justify-content-center">
					<Control
						funcion={() => {
							cambiarVolumen("bajar");
						}}
						tipoB="volume-down"
						color="text-light"
					/>

					<Control
						funcion={() => {
							cambiarVolumen("subir");
						}}
						tipoB="volume-up"
						color="text-light"
					/>
					<div className="text-light">
						<h5>volumen: {Math.floor(volumen * 100)}%</h5>
					</div>
				</div>
			</div>
		</div>
	);
}

Controls.propTypes = {
	actual: PropTypes.number,
	botonP: PropTypes.string,
	controlPlay: PropTypes.func,
	cambiar: PropTypes.func,
	song: PropTypes.object
};

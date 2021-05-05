import React, { useState, useRef } from "react";
import { SongList } from "./songList";
import { Controls } from "./controls";

export function Home() {
	//Obtener canciones mediante la API
	const [songs, setSongs] = useState([]);

	const obtenerCanciones = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			setSongs(data);
		} catch (error) {
			console.log(error);
		}
	};
	obtenerCanciones();

	const [botonP, setBotonP] = useState(`play`);
	const [actual, setActual] = useState(-1);
	const [songDuration, setSongDuration] = useState(100);
	let song = useRef();
	let barra = useRef();

	const cambiarCancion = (songId, shuffle) => {
		let songPosition = songId;
		if (!shuffle) {
			if (songPosition < 0) {
				songPosition = songs.length - 1;
			} else if (songPosition >= songs.length) {
				songPosition = 0;
			}
		} else {
			songPosition = Math.floor(Math.random() * songs.length);
		}

		song.current.src =
			"https://assets.breatheco.de/apis/sound/" + songs[songPosition].url;
		setActual(songPosition);
		song.current.play();

		if (song.current.paused) {
			setBotonP(`play`);
		} else if (!song.current.paused) {
			setBotonP(`pause`);
		}

		//set duracion
		song.current.onloadedmetadata = () => {
			setSongDuration(song.current.duration);
		};
	};

	//Funcion del boton play
	const controlPlay = () => {
		if (actual != -1) {
			if (song.current.paused) {
				song.current.play();
				setBotonP(`pause`);
			} else if (!song.current.paused) {
				song.current.pause();
				setBotonP(`play`);
			}
		} else {
			cambiarCancion(0, false);
		}
	};

	return (
		<div id="contenedor" className="container-fluid p-0">
			<audio ref={song} src="" />
			<div className="songList">
				<SongList
					list={songs}
					cambiar={cambiarCancion}
					actual={actual}
				/>
			</div>
			<div className="controles fixed-bottom">
				<div className="col-12">
					<div className="mt-2 mx-3 d-flex align-items-center">
						<input
							onChange={() => {
								song.current.currentTime = barra.current.value;
							}}
							type="range"
							value={actual != -1 ? song.current.currentTime : 0}
							className="form-control-range"
							max={songDuration}
							ref={barra}
						/>
					</div>
				</div>

				<Controls
					actual={actual}
					botonP={botonP}
					controlPlay={controlPlay}
					cambiar={cambiarCancion}
					song={song}
				/>
			</div>
		</div>
	);
}

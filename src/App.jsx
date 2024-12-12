import { useEffect, useState } from "react";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map";
import { getPlacesData } from "./api/travelAdviserAPI";

const App = () => {
	const [places, setPlaces] = useState([]);
	const [filteredPlaces, setFilteredPlaces] = useState([]);
	const [coords, setCoords] = useState({ lat: 18.5204, lng: 73.8567 });
	const [bounds, setBounds] = useState({
		sw: { lat: 18.4575, lng: 73.8228 },
		ne: { lat: 18.5803, lng: 73.9399 },
	});
	const [searchTerm, setSearchTerm] = useState("");
	const [childClicked, setChildClicked] = useState(null);
	const [type, setType] = useState("restaurants");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		
		getPlacesData(type, bounds.sw, bounds.ne)
			.then((data) => {
				const validPlaces = data.filter((place) => place && place.name);
				setPlaces(validPlaces);
				setFilteredPlaces([]);
			})
			.catch((error) => {
				console.error("Error fetching places:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [coords, bounds, type]);

	useEffect(() => {
		const filtered = places.filter(
			(place) =>
				place.name &&
				place.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredPlaces(filtered);
	}, [searchTerm, places]);

	return (
		<div className="min-h-screen flex flex-col">
			<Header onSearch={setSearchTerm} />
			<div className="flex flex-col md:flex-row flex-grow">
				<List
					places={filteredPlaces.length ? filteredPlaces : places}
					childClicked={childClicked}
					type={type}
					setType={setType}
					isLoading={isLoading}
				/>
				<Map
					coords={coords}
					setCoords={setCoords}
					setBounds={setBounds}
					places={filteredPlaces.length ? filteredPlaces : places}
					setChildClicked={setChildClicked}
					isLoading={isLoading}
				/>
			</div>
		</div>
	);
};

export default App;

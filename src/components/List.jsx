import React, { useState, useRef, useEffect } from "react";
import PlaceDetails from "./PlaceDetails";
import { FiFilter } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

const List = ({ places, childClicked, type, setType, isLoading }) => {
	const [minRating, setMinRating] = useState(0);
	const [placeRefs, setPlaceRefs] = useState({});

	// Create refs for each place
	const createRefs = () => {
		const refs = {};
		places.forEach((place) => {
			refs[place.location_id] = React.createRef();
		});
		setPlaceRefs(refs);
	};

	useEffect(() => {
		createRefs();
	}, [places]);

	// Scroll to the clicked place
	useEffect(() => {
		if (childClicked && placeRefs[childClicked.location_id]) {
			placeRefs[childClicked.location_id].current?.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
	}, [childClicked, placeRefs]);

	const filteredPlaces = places.filter((place) => {
		const ratingMatch = place.rating >= minRating;
		return ratingMatch;
	});

	return (
		<div className="w-full md:w-1/3 bg-gray-50 p-4 overflow-y-auto max-h-[90vh] space-y-4">
			<div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
				<h2 className="text-xl md:text-2xl font-bold text-gray-800">
					Discover {type.charAt(0).toUpperCase() + type.slice(1)}
				</h2>
				<div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
					{/* Type Selection Dropdown */}
					<div className="relative w-full md:w-auto">
						<select
							value={type}
							onChange={(e) => setType(e.target.value)}
							className="w-full appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="restaurants">Restaurants</option>
							<option value="hotels">Hotels</option>
							<option value="attractions">Attractions</option>
						</select>
						<FiFilter className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
					</div>

					{/* Rating Filter */}
					<div className="relative w-full md:w-auto">
						<select
							value={minRating}
							onChange={(e) => setMinRating(Number(e.target.value))}
							className="w-full appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value={0}>All Ratings</option>
							<option value={3}>3+ Stars</option>
							<option value={4}>4+ Stars</option>
							<option value={4.5}>4.5+ Stars</option>
						</select>
						<span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
							★
						</span>
					</div>
				</div>
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center py-8">
					<ImSpinner2 className="animate-spin text-4xl text-blue-500" />
					<span className="ml-2 text-gray-600">Loading places...</span>
				</div>
			) : filteredPlaces.length === 0 ? (
				<div className="text-center text-gray-500 py-8">
					No places found. Try adjusting your search or map view.
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4">
					{filteredPlaces.map((place) => (
						<div ref={placeRefs[place.location_id]} key={place.location_id}>
							<PlaceDetails
								place={place}
								className="transition transform hover:scale-105 hover:shadow-lg"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default List;

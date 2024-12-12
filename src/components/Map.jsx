import React from "react";
import {
	MapContainer,
	TileLayer,
	useMapEvents,
	Marker,
	Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const Map = ({ coords, setCoords, setBounds, places, setChildClicked }) => {
	const MapEventsHandler = () => {
		useMapEvents({
			moveend: (e) => {
				const map = e.target; // Reference to the map instance
				const center = map.getCenter(); // Get the center coordinates
				const bounds = map.getBounds(); // Get the map bounds
				setCoords({ lat: center.lat, lng: center.lng });
				setBounds({ sw: bounds.getSouthWest(), ne: bounds.getNorthEast() });
			},
			zoomend: (e) => {
				const map = e.target;
				const bounds = map.getBounds();
				setBounds({ sw: bounds.getSouthWest(), ne: bounds.getNorthEast() });
			},
		});
		return null;
	};

	return (
		<MapContainer
			center={coords}
			zoom={13}
			style={{ height: "90vh", width: "70%" }}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			<MapEventsHandler />
			{places.map((place, index) => {
				if (place.latitude && place.longitude) {
					// Create a small card-like icon using Leaflet's divIcon
					const customIcon = L.divIcon({
						className: "custom-card-icon", // Custom class for styling
						html: `
                            <div style="
                                display: flex; 
                                flex-direction: column; 
                                align-items: center; 
                                justify-content: center; 
                                width: 60px; 
                                padding: 5px; 
                                background: white; 
                                border-radius: 5px; 
                                box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
                                text-align: center;">
                                <img 
                                    src="${
																			place?.photo?.images?.original?.url ||
																			"default-icon.png"
																		}" 
                                    alt="${place.name}" 
                                    style="width: 50px; height: 40px; object-fit: cover;" 
                                />
                                <span style="font-size: 10px; font-weight: bold; padding: 5px;">
                                    ${place.name || "Unknown"}
                                </span>
                            </div>
                        `,
						iconSize: [50, 50], // Size of the icon container
						popupAnchor: [0, -25], // Adjust position of the popup relative to the icon
					});

					return (
						<Marker
							key={index}
							position={[place.latitude, place.longitude]}
							icon={customIcon}
						>
							<Popup>
								<div>
									<img
										src={
											place?.photo?.images?.original?.url || "default-icon.png"
										}
										alt={place.name}
										className="w-full h-20 object-cover"
									/>
									<div className="flex justify-between items-center gap-2 mt-2 ">
										<h3 className="font-bold">{place.name}</h3>
										<p>
											{place.rating}{" "}
											<span className="text-yellow-400 mr-2">
												{"★".repeat(Math.round(place.rating))}
												{"☆".repeat(5 - Math.round(place.rating))}
											</span>
										</p>
									</div>
									<button
										onClick={() => setChildClicked(place)}
										className="bg-[#F7418F] text-white px-2 py-1 rounded-md"
									>
										See More
									</button>
									<p>{place.address}</p>
								</div>
							</Popup>
						</Marker>
					);
				} else {
					console.log(`Invalid coordinates for place:`, place);
					return null;
				}
			})}
		</MapContainer>
	);
};

export default Map;

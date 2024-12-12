import React from "react";

const PlaceDetails = ({ place }) => {
	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden">
			{/* Image */}
			<img
				src={
					place.photo
						? place.photo.images.large.url
						: "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
				}
				alt={place.name}
				className="w-full h-64 object-cover"
			/>

			{/* Content */}
			<div className="p-4">
				{/* Name */}
				<h2 className="text-2xl font-bold mb-3">{place.name}</h2>

				{/* Rating */}
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center">
						<span className="text-yellow-400 mr-2">
							{"★".repeat(Math.round(place.rating))}
							{"☆".repeat(5 - Math.round(place.rating))}
						</span>
						<span className="text-gray-500">
							{place.num_reviews} review{place.num_reviews > 1 && "s"}
						</span>
					</div>
				</div>

				{/* Price Level and Ranking */}
				<div className="mb-3">
					<p className="text-gray-700">
						<span className="font-semibold">Price:</span>{" "}
						{place.price_level || "N/A"}
					</p>
					<p className="text-gray-700">
						<span className="font-semibold">Ranking:</span>{" "}
						{place.ranking || "N/A"}
					</p>
				</div>

				{/* Awards */}
				{place?.awards?.map((award) => (
					<div
						key={award.display_name}
						className="flex items-center justify-between bg-gray-100 rounded-lg p-2 mb-3"
					>
						<img
							src={award.images.small}
							alt={award.display_name}
							className="w-6 h-6 mr-2"
						/>
						<p className="text-sm text-gray-600">{award.display_name}</p>
					</div>
				))}

				{/* Cuisine */}
				<div className="flex flex-wrap gap-2 mb-3">
					{place?.cuisine?.map(({ name }) => (
						<span
							key={name}
							className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full"
						>
							{name}
						</span>
					))}
				</div>

				{/* Address */}
				{place.address && (
					<p className="text-gray-600 mb-3 flex items-center">
						<span className="material-icons-outlined text-gray-400 mr-2">
							location_on
						</span>
						{place.address}
					</p>
				)}

				{/* Phone */}
				{place.phone && (
					<p className="text-gray-600 mb-3 flex items-center">
						<span className="material-icons-outlined text-gray-400 mr-2">
							phone
						</span>
						{place.phone}
					</p>
				)}
			</div>

			{/* Actions */}
			<div className="flex justify-around p-4 border-t">
				<button
					onClick={() => window.open(place.web_url, "_blank")}
					className="bg-[#F7418F] text-white px-4 py-2 rounded-lg hover:bg-[#ff0672] transition"
				>
					Trip Advisor
				</button>
				<button
					onClick={() => window.open(place.website, "_blank")}
					className="bg-[#F7418F] text-white px-4 py-2 rounded-lg hover:bg-[#ff0672] transition"
				>
					Website
				</button>
			</div>
		</div>
	);
};

export default PlaceDetails;

import React, { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

const Header = ({ onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<header className="bg-[#F7418F] text-white p-4 shadow-lg">
			<div className="container mx-auto flex items-center justify-between">
				{/* Logo and Title */}
				<div className="flex items-center space-x-3">
					<FiMapPin className="text-3xl" />
					<h1 className="text-2xl font-bold tracking-wider">TravelMapper</h1>
				</div>

				{/* Search Box */}
				<form onSubmit={handleSearch} className="flex-grow max-w-md mx-4">
					<div className="relative">
						<input
							type="text"
							placeholder="Search places..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full px-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-300"
						/>
						<button
							type="submit"
							className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
						>
							<FiSearch className="text-white" />
						</button>
					</div>
				</form>
			</div>
		</header>
	);
};

export default Header;

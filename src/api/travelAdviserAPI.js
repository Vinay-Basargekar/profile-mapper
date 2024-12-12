import axios from "axios";

export const getPlacesData = async (type,sw,ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: sw.lat,
					bl_longitude: sw.lng,
					tr_longitude: ne.lng,
					tr_latitude: ne.lat,
				},
				headers: {
					"x-rapidapi-key":
						"b34bb36a7bmsh2c2b6018f2f813bp11a385jsnc0b098254769",
					"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
				},
			}
		);
		return data;
	} catch (error) {
		console.error(error);
	}
};

const images = {
	mGardens: require('@/assets/images/vendors/m_gardens/m_logo.jpg'),
};

type Data = {
	id: number;
	title: string;
	imgUrl: number;
	href: string;
	rating: number;
	startingPrice: number;
};

const data: Data[] = [
	{
		id: 1,
		title: 'Michael Gardens',
		imgUrl: images.mGardens,
		href: '',
		rating: 3,
		startingPrice: 300,
	},
	{
		id: 2,
		title: 'Shawarma Republik - YKC Woji',
		imgUrl: '',
		href: '',
		rating: 4,
		startingPrice: 500,
	},
	{
		id: 3,
		title: 'Chicken Republic - Woji',
		imgUrl: '',
		href: '',
		rating: 2.5,
		startingPrice: 350,
	},
	{
		id: 4,
		title: 'Food Palace',
		imgUrl: '',
		href: '',
		rating: 3,
		startingPrice: 500,
	},
	{
		id: 5,
		title: 'Genesis Restaurant - GRA',
		imgUrl: '',
		href: '',
		rating: 4,
		startingPrice: 600,
	},
	{
		id: 6,
		title: 'Cafe33 Powered by iphy',
		imgUrl: '',
		href: '',
		rating: 3.5,
		startingPrice: 400,
	},
	{
		id: 7,
		title: 'Cold Stone Creamery - Peter Odili',
		imgUrl: '',
		href: '',
		rating: 4.5,
		startingPrice: 1000,
	},
	{
		id: 8,
		title: 'Pinkberry - GRA',
		imgUrl: '',
		href: '',
		rating: 4,
		startingPrice: 1300,
	},
	{
		id: 9,
		title: 'Sugarcane continental / Calabar Kitchen',
		imgUrl: '',
		href: '',
		rating: 3.5,
		startingPrice: 350,
	},
	{
		id: 10,
		title: 'Amala HeadQuarters - GRA',
		imgUrl: '',
		href: '',
		rating: 4,
		startingPrice: 400,
	},
	{
		id: 11,
		title: 'Vineyard Juice Bar',
		imgUrl: '',
		href: '',
		rating: 3.5,
		startingPrice: 200,
	},
	{
		id: 12,
		title: 'Genesis Restaurant Rumuomasi',
		imgUrl: '',
		href: '',
		rating: 3.5,
		startingPrice: 200,
	},
];

export default data;

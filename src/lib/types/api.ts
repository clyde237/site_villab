export interface CmsContent {
	name: string;
	hero: {
		title: string | null;
		subtitle: string | null;
		cta_label: string | null;
		background_image: string | null;
	};
	about: {
		title: string | null;
		body: string | null;
	};
	contact: {
		intro: string | null;
		hours: string | null;
		address: string | null;
		phone: string | null;
		email: string | null;
	};
	gallery: string[];
	seo: {
		title: string | null;
		description: string | null;
	};
}

export interface RoomTypeApi {
	id: number;
	name: string;
	description: string | null;
	base_capacity: number;
	max_capacity: number;
	size_sqm: number | null;
	bed_configuration: string | null;
	amenities: string[];
	photos: string[];
	price: { amount: number; formatted: string };
	available_rooms_count: number;
}

export interface MenuItemApi {
	id: number;
	name: string;
	description: string | null;
	type: string | null;
	image: string | null;
	price: { amount: number; formatted: string };
}

export interface MenuCategoryApi {
	id: number;
	name: string;
	items: MenuItemApi[];
}

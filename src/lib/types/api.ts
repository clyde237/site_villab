export interface CmsContent {
	name: string;
	// Logo importé à la création de l'établissement dans pms (URL absolue)
	logo: string | null;
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
	// Structure par pages/sections gérée depuis pms (onglet "Contenu du site").
	// Absente sur une instance pms antérieure aux onglets -> chaque section
	// retombe alors sur son contenu statique et reste affichée.
	pages?: SitePages | null;
}

// ==========================================
// Contenu CMS par pages/sections (miroir de
// App\Support\SiteContentSchema côté pms)
// ==========================================

export interface SectionBase {
	enabled: boolean;
}

export interface TitleDescItem {
	title: string | null;
	description: string | null;
}

export interface BannerSection extends SectionBase {
	title: string | null;
	subtitle: string | null;
	background_image: string | null;
}

export interface HomeHeroSection extends SectionBase {
	title: string | null;
	subtitle: string | null;
	cta_label: string | null;
	background_image: string | null;
}

export interface PhilosophySection extends SectionBase {
	title: string | null;
	body: string | null;
	image: string | null;
	values: TitleDescItem[];
}

export interface ServicesSection extends SectionBase {
	title: string | null;
	subtitle: string | null;
	items: TitleDescItem[];
}

export interface RoomsSection extends SectionBase {
	title: string | null;
	subtitle: string | null;
}

export interface TestimonialsSection extends SectionBase {
	items: { author: string | null; text: string | null }[];
}

export interface VideoSection extends SectionBase {
	url: string | null;
}

export interface OffersSection extends SectionBase {
	title: string | null;
	subtitle: string | null;
	items: { title: string | null; description: string | null; price: string | null }[];
}

export interface RestaurantHomeSection extends SectionBase {
	title: string | null;
	body: string | null;
	image: string | null;
}

export interface DiscoverySection extends SectionBase {
	title: string | null;
	subtitle: string | null;
	items: TitleDescItem[];
}

export interface InstagramSection extends SectionBase {
	handle: string | null;
	images: string[];
}

export interface NewsletterSection extends SectionBase {
	title: string | null;
	subtitle: string | null;
}

export interface ContactFormSection extends SectionBase {
	title: string | null;
	intro: string | null;
}

export interface ExperienceSection extends SectionBase {
	title: string | null;
	body: string | null;
	image: string | null;
}

export interface GallerySection extends SectionBase {
	images: string[];
}

export interface WelcomeSection extends SectionBase {
	title: string | null;
	body: string | null;
	image: string | null;
}

export interface FacilitiesSection extends SectionBase {
	title: string | null;
	items: TitleDescItem[];
}

export interface ContactInfoSection extends SectionBase {
	intro: string | null;
	hours: string | null;
}

export interface MapSection extends SectionBase {
	embed_url: string | null;
}

export interface SitePages {
	home: {
		hero: HomeHeroSection;
		philosophy: PhilosophySection;
		services: ServicesSection;
		rooms: RoomsSection;
		testimonials: TestimonialsSection;
		video: VideoSection;
		offers: OffersSection;
		restaurant: RestaurantHomeSection;
		discovery: DiscoverySection;
		instagram: InstagramSection;
		newsletter: NewsletterSection;
		contact_form: ContactFormSection;
	};
	heb: {
		banner: BannerSection;
	};
	resto: {
		banner: BannerSection;
		experience: ExperienceSection;
		gallery: GallerySection;
	};
	about: {
		banner: BannerSection;
		welcome: WelcomeSection;
		facilities: FacilitiesSection;
	};
	contact: {
		banner: BannerSection;
		info: ContactInfoSection;
		map: MapSection;
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

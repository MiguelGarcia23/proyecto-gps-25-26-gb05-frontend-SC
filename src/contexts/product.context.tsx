import type { Song } from './song.context.tsx';
import type { Album } from './album.context.tsx';

// @ts-ignore
export enum ProductType {
	TSHIRT = 'tshirt',
	HOODIE = 'hoodie',
	CAP = 'cap',
	POSTER = 'poster',
	TOTEBAG = 'totebag',
	STICKERS = 'stickers',
	PHONECASE = 'phonecase',
	BRACELET = 'bracelet',
	MUG = 'mug',
}

export interface Product {
	uuid: string;
	type: ProductType;
	title: string;
	description: string;
	price: number;
	reference: Song | Album;
	referenceType: 'song' | 'album';
	previews: string[];
}

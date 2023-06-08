interface BaseTypes {
  id?: number;
  name: string;
}

export interface Menus extends BaseTypes {
  price: number;
  locationIds: number;
  asset_url?: string;
  description?: string;
  isAvailable: boolean;
}

export interface MenuCategory extends BaseTypes {}

export interface Addon extends BaseTypes {
  price: number;
  isAvailable: boolean;
  addonCategoriesIds: string;
}

export interface AddonCategory extends BaseTypes {
  isRequired: boolean;
}
export interface Location extends BaseTypes {
  companyId?: string;
  address?: string;
}
export interface MenuLocation {
  id: number;
  menus_id: number;
  locations_id: number;
  is_available: boolean;
}
export interface Company {
  id: string;
  name: string;
  address: string;
}

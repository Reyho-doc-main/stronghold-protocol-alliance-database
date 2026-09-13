import type { ShopItemDto } from "../dtos/shopItem.dto";

export type ShopItemSearchCategory = "name" | "effects";

export interface ShopItemSearchGroup {
  category: ShopItemSearchCategory;
  label: string;
  items: ShopItemDto[];
}

const CATEGORY_LABELS: Record<ShopItemSearchCategory, string> = {
  name: "Name matches",
  effects: "Ability matches",
};

// Has Priority order (most relevant first)
const CATEGORY_ORDER: ShopItemSearchCategory[] = ["name", "effects"];

const stripHtmlTags = (html: string): string => html.replace(/<[^>]*>/g, " ");

function matchItem(item: ShopItemDto, needle: string): ShopItemSearchCategory | null {
  if (item.itemName.toLowerCase().includes(needle)) return "name";
  if (stripHtmlTags(item.effectDesc).toLowerCase().includes(needle)) return "effects";
  return null;
}

// Returns null when there's no active search term
export function groupShopItemsBySearch(items: ShopItemDto[], term: string): ShopItemSearchGroup[] | null {
  const needle = term.trim().toLowerCase();
  if (!needle) return null;

  const buckets: Record<ShopItemSearchCategory, ShopItemDto[]> = { name: [], effects: [] };

  for (const item of items) {
    const category = matchItem(item, needle);
    if (category) buckets[category].push(item);
  }

  return CATEGORY_ORDER.filter((category) => buckets[category].length > 0).map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: buckets[category],
  }));
}

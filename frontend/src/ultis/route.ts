import { ConstanthPathEnum } from '../constanth/constanth.path';

export const getProductDetailRoute = (productId: string, shopId: string) => {
  return ConstanthPathEnum.PRODUCT_DETAIL.replace(
    ':product_id',
    productId,
  ).replace(':shop_id', shopId);
};

export const getProductShopRoute = (productId: string) => {
  return ConstanthPathEnum.PRODUCT_SHOP.replace(':product_id', productId);
};

export const getCategoryRoute = (categoryName: string) => {
  return ConstanthPathEnum.PRODUCT_CATEGORY.replace(
    ':category_name',
    categoryName,
  );
};

export const getSearchRoute = (input: string) => {
  return ConstanthPathEnum.PRODUCT_SEARCH.replace(':search_input', input);
};

export const getAdminProductDetail = (productId: string) => {
  return ConstanthPathEnum.ADMIN_PRODUCT_DETAIL.replace(
    ':product_id',
    productId,
  );
};

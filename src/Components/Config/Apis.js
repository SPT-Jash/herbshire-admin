// export const SERVER_URL = "http://192.168.29.121:8080/";
export const SERVER_URL = "https://api.herbshire.in/";

//product urls
export const PRODUCT_UPDATE_URL = SERVER_URL + "admin/product/update";
export const PRODUCT_URL = SERVER_URL + "product/search";
export const PRODUCT_DELETE_URL = SERVER_URL + "admin/product/delete?productID=";
export const PRODUCT_ADD_URL = SERVER_URL + "admin/product/add";
export const PRODUCT_ID_URL = SERVER_URL + "product/get";

//order urls
export const ORDER_URL =  SERVER_URL + "admin/order/get_all";
export const ORDER_CANCEL_URL = SERVER_URL + "admin/order/cancel";
export const ORDER_ADD_URL = SERVER_URL + "admin/order/create";

//subscription urls
export const SUB_URL = SERVER_URL + "search";
export const SUB_DELETE_URL = SERVER_URL + "admin/subscription/delete?id=";
export const SUB_UPDATE_URL = SERVER_URL + "admin/subscription/update";
export const SUB_ID_URL = SERVER_URL + "subscription/get";
export const SUB_ADD_URL = SERVER_URL + "admin/subscription/add";

//subscription price urls
export const SUB_PRICE_DELETE_URL = SERVER_URL + "admin/subscription/price/delete";
export const SUB_PRICE_UPDATE_URL = SERVER_URL + "admin/subscription/price/update";
export const SUB_PRICE_ID_URL = SERVER_URL + "subscription/price/get";

//user url
export const USER_URL = SERVER_URL + "user/search";
export const USER_ADD_URL = SERVER_URL + "user";

export const UPLOAD_FILE_URL = SERVER_URL + "api/storage/uploadMultipleFile";
export const DELETE_FILE_URL = SERVER_URL + "api/storage/deleteFile";
export const GST_URL = SERVER_URL + "gst/search";
// export const SUBSCRIPTION_SEARCH_URL = SERVER_URL + "subscription/search";
export const OTP_URL = SERVER_URL + "otp";

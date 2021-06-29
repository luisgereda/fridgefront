export const localhost = process.env.LOCAL_URL || "http://localhost:4000";
export const api_url =
  process.env.API_URL || "https://api.edamam.com/api/recipes/v2";
export const DEFAULT_MESSAGE_TIMEOUT = 3000;
export const app_id = "f6db72bb";
export const app_key = "804e3743171e5052a44473490a615381";
export const auth_detail = `?type=public&app_id=${app_id}&app_key=${app_key}`;

//Search Example:
//https://api.edamam.com/api/recipes/v2?type=public&q=chicken%20&app_id=f6db72bb&app_key=804e3743171e5052a44473490a615381&ingr=10-15

// Id example:
// https://api.edamam.com/api/recipes/v2/f662244fb07f5488c6d18290b638be47?type=public&app_id=f6db72bb&app_key=804e3743171e5052a44473490a615381

// recipeId = f662244fb07f5488c6d18290b638be47;

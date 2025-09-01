export const get_image_url = (image_path) => {
  const image_extension = image_path.split("/media/")[1];
  const image_url = import.meta.env.VITE_BASE_URL + "/media/" + image_extension;
  return image_url;
};

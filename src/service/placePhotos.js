export function getPlacePhotoName(placesResponse) {
  const photos = placesResponse?.data?.places?.[0]?.photos;
  if (!photos?.length) return null;
  const index = Math.min(3, photos.length - 1);
  return photos[index]?.name ?? photos[0]?.name ?? null;
}

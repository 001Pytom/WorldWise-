import { useSearchParams } from "react-router-dom";
// whenever we need a position from a url use this
function useUrlPosition() {
  // what u hvave in the ,get must be the same as what u used in the url lat=$...
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

export default useUrlPosition;

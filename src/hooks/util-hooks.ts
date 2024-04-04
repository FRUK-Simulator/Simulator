import { useParams } from "react-router-dom";

type UrlParams = {
  lessonId: string;
  challengeId: string;
};

export const useAppParams = () => {
  const params = useParams<UrlParams>();
  return params;
};

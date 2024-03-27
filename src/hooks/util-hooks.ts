import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Challenge, loadChallengesData } from "../core/data-loader";

type UrlParams = {
  lessonId: string;
  challengeId: string;
};

export const useAppParams = () => {
  const params = useParams<UrlParams>();
  return params;
};

export const useLoadChallengesData = (lessonId: string) => {
  const [data, setData] = useState<Challenge[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await loadChallengesData(lessonId);
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [lessonId]);

  return { data, loading, error };
};

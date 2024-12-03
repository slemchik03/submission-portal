import { useQuery } from "@tanstack/react-query";
import { candidateLevels } from "../queries/candidate-levels";

export default function useGetCandidateLevels() {
    return useQuery(candidateLevels.all())
}
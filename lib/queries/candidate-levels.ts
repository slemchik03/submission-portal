import { createQueryKeys } from "@lukemorales/query-key-factory";
import CandidateLevelsService from "../services/candidate-levels/service";

export const candidateLevels = createQueryKeys('candidate-levels', {
    all: () => ({
        queryKey: ["candidate-levels"],
        queryFn: async () => CandidateLevelsService
            .getCanditateLevels()
            .then(response => response.data.levels ?? [])
    })
});

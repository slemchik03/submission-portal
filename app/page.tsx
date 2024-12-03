import AssignmentForm from "@/components/assignment-form"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "./getQueryClient"
import { candidateLevels } from "@/lib/queries/candidate-levels"
import CandidateLevelsService from "@/lib/services/candidate-levels/service"

export default async function Home() {
  const queryClient = getQueryClient()
  const levelsResponse = await CandidateLevelsService.getCanditateLevels()

  queryClient.setQueryData(
    candidateLevels.all().queryKey,
    levelsResponse.data.levels
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-screen items-center px-4 sm:px-0">
        <AssignmentForm />
      </div>
    </HydrationBoundary>
  )
}

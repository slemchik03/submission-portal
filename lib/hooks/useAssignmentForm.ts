import { useForm } from "react-hook-form"
import useGetCandidateLevels from "./useGetCandidateLevels"
import schema, { ValidationSchema } from "../schemas/assignment"
import { joiResolver } from "@hookform/resolvers/joi"
import { useRouter } from "next/navigation"
import CandidateLevelsService from "../services/candidate-levels/service"
import { toast } from "sonner"

export default function useAssignmentForm() {
const { data: levels } = useGetCandidateLevels()
  const {
    handleSubmit,
    ...form
  } = useForm<ValidationSchema>({ resolver: joiResolver(schema) })
  const router = useRouter()
  const submitFormHandler = handleSubmit(async (fields) => {
    const response = await CandidateLevelsService.assignCandidate(fields)

    if (!response.ok) {
      return toast.error(response.data.errors?.[0] ?? "Something went wrong...")
    }
    const searchParams = new URLSearchParams()

    // setting up submitted values
    Object.entries(fields).forEach(([key, value]) => {
      searchParams.append(key, value)
    })   
    searchParams.append('message',response.data?.message ?? "" )
    router.push(`/thank-you?${searchParams.toString()}`)
  })
    return {
        submitFormHandler,
        form,
        levels,
    }
}
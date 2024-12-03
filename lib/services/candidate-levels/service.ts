import { request } from "@/lib/client"
import { CandidateLevelsEndpoints } from "./config"
import { ValidationSchema } from "@/lib/schemas/assignment"

export type CandidateLevel = "Junior" | "Middle" | "Senior" | "Principal"

type WithResponseWrap<T> = { data: T; ok: boolean }

type CandidateLevelsResponse = WithResponseWrap<{
  levels: CandidateLevel[]
}>

type AssignCandidateResponse = WithResponseWrap<{
  message: string
  errors?: string[]
}>

type AssignCandidateParams = ValidationSchema

export default class CandidateLevelsService {
  public static readonly getCanditateLevels =
    async (): Promise<CandidateLevelsResponse> => {
      return request({
        url: CandidateLevelsEndpoints.getCandidateLevels(),
        method: "get",
      })
    }
  public static readonly assignCandidate = async (
    data: AssignCandidateParams
  ): Promise<AssignCandidateResponse> => {
    return request({
      url: CandidateLevelsEndpoints.assignCandidate(),
      method: "post",
      data,
    })
  }
}

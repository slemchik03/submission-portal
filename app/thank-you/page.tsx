import ThankYou from "@/components/thank-you"

const DEFAULT_MESSAGE =
  "We appreciate your submission and will get back to you soon."

export default async function ThankYouPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const searchParams = await searchParamsPromise
  const {message, ...restFields} = searchParams

  return (
    <div className="h-screen flex items-center justify-center">
      <ThankYou message={message ?? DEFAULT_MESSAGE} submitedFields={restFields ?? {}} />
    </div>
  )
}

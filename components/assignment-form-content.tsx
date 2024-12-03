import useAssignmentForm from "@/lib/hooks/useAssignmentForm";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CandidateLevel } from "@/lib/services/candidate-levels/service";
import { CardFooter } from "./ui/card";
import { Button } from "./ui/button";

export default function AssignmentFormContent() {
  const {
    submitFormHandler,
    levels,
    form: {
      formState: { errors },
      register,
      resetField,
      setValue,
    },
  } = useAssignmentForm();
  const hasErrors = Object.keys(errors).length > 0;
  console.log(errors);

  return (
    <form
      data-errors={hasErrors}
      className="grid gap-2"
      onSubmit={submitFormHandler}
    >
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} placeholder="John Doe" />
        {errors.name && (
          <p data-testid="error" className="text-sm text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p data-testid="error" className="text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="description">Assignment Description</Label>
        <Textarea
          id="description"
          {...register("assignment_description")}
          placeholder="Briefly describe your assignment..."
        />
        {errors.assignment_description && (
          <p data-testid="error" className="text-sm text-red-500">
            {errors.assignment_description.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="githubUrl">GitHub URL</Label>
        <Input
          id="githubUrl"
          {...register("github_repo_url")}
          placeholder="https://github.com/yourusername/yourproject"
        />
        {errors.github_repo_url && (
          <p data-testid="error" className="text-sm text-red-500">
            {errors.github_repo_url.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="candidate_level">Candidate Level</Label>
        <Select
          {...register("candidate_level")}
          onValueChange={(v) => {
            resetField("candidate_level", { keepError: false });
            setValue("candidate_level", v as CandidateLevel);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your level" />
          </SelectTrigger>
          <SelectContent>
            {levels ? (
              levels.map((level) => (
                <SelectItem data-testid="select-item" key={level} value={level}>
                  {level}
                </SelectItem>
              ))
            ) : (
              <SelectItem
                value="Error"
                data-testid="error"
                className="text-sm text-red-500"
              >
                Error occured during levels fetching!
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        {errors.candidate_level && (
          <p data-testid="error" className="text-sm text-red-500">
            {errors.candidate_level.message}
          </p>
        )}
      </div>

      <CardFooter className="mt-3">
        <Button disabled={hasErrors} type="submit" className="w-full">
          Submit Assignment
        </Button>
      </CardFooter>
    </form>
  );
}

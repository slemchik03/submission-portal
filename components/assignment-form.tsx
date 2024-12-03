"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PropsWithChildren } from "react";
import AssignmentFormContent from "./assignment-form-content";

type AssignmentFormLayoutProps = PropsWithChildren;
function AssignmentFormLayout({ children }: AssignmentFormLayoutProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit Assignment Form</CardTitle>
        <CardDescription>
          Please fill out the form below to submit your assignment.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export default function AssignmentForm() {
  return (
    <AssignmentFormLayout>
      <AssignmentFormContent />
    </AssignmentFormLayout>
  );
}

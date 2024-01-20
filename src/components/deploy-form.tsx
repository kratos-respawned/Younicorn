"use client";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { DeployForm, deployForm } from "@/validators/deploy-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/lib/deploy";
import { Loader, Loader2 } from "lucide-react";
const ProjectDialog = () => {
  const [response, setResponse] = useState(null);
  const router = useRouter();
  const form = useForm<DeployForm>({
    resolver: zodResolver(deployForm),
    defaultValues: {
      url: "",
      buildcommand: "",
      runcommand: "",
      env: "",
    },
  });
  return (
    <DialogContent className="max-w-2xl w-[700px]">
      <DialogHeader>
        <DialogTitle>You&apos;re almost done.</DialogTitle>
        <DialogDescription>
          Please follow the steps to configure your Project and deploy it.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(createProject)}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repo URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/user/repo.git"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public repo link.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-5 justify-between">
            <FormField
              control={form.control}
              name="buildcommand"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Build Command</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={` 'npm run build' or 'npm tsc' `}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="runcommand"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Run Command</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={` 'npm run prod' or 'npm start' `}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="env"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environment Variables</FormLabel>
                <FormControl>
                  <Textarea placeholder={`DATABASE_URL=pgUrl`} {...field} />
                </FormControl>
                <FormDescription>
                  The command your frontend framework provides for compiling
                  your code.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button disabled={form.formState.isSubmitting} type="submit">
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>Deploy</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default ProjectDialog;

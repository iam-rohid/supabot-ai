import SecondaryPageHeader from "@/components/SecondaryPageHeader";
import { Button, ButtonLoader } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import AuthLayout from "@/layouts/AuthLayout";
import { NextPageWithLayout } from "@/types/next";
import { trpc } from "@/utils/trpc";
import { sendHelpRequestSchema } from "@/utils/validators";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const HelpPage: NextPageWithLayout = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const form = useForm<z.infer<typeof sendHelpRequestSchema>>({
    resolver: zodResolver(sendHelpRequestSchema),
    defaultValues: {
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    if (user?.primaryEmailAddress) {
      form.setValue("email", user.primaryEmailAddress.emailAddress);
    }
  }, [form, user?.primaryEmailAddress]);

  const { toast } = useToast();
  const sendMutation = trpc.help.sendRequest.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description:
          "Thank you so much sending help request. We will get back to you as soon as possible.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof sendHelpRequestSchema>) =>
    sendMutation.mutate(data);

  return (
    <main>
      <div className="container my-16 max-w-screen-sm">
        <SecondaryPageHeader title="How can we help?" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jhon@example.com"
                      autoFocus
                      {...field}
                      readOnly={isSignedIn || !isLoaded}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Summery of the request"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide a thorough and precise description of the problem you are encountering, including any relevant details"
                      rows={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={sendMutation.isLoading}>
                {sendMutation.isLoading && <ButtonLoader />}
                Send Help Request
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

HelpPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default HelpPage;

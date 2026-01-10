import PageContainer from "@/components/common/PageContainer";
import { Link, useNavigate } from "@tanstack/react-router";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import ErrorAlert from "@/components/common/ErrorAlert";
import FormField from "@/components/common/FormField";
import { useForm } from "@tanstack/react-form";
import { authApi } from "@/lib/auth";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";

type RegisterPageProps = {
  className?: string;
};

function RegisterPage({ className }: RegisterPageProps) {
  const navigate = useNavigate();
  const { setAuth, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    navigate({ to: "/profile" });
  }

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setError(null);
        setIsLoading(true);

        const response = await authApi.register(value);
        setAuth(response.data.user, response.data.token);
        toast.success("Account created successfully!");
        navigate({ to: "/" });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Registration failed";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <PageContainer centered className={className}>
      <Card className="w-full max-w-sm p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        {error && <ErrorAlert message={error} />}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Required"
                  : value.length < 2
                  ? "Too short"
                  : undefined,
            }}
          >
            {(field) => (
              <FormField error={field.state.meta.errors?.[0]}>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                />
              </FormField>
            )}
          </form.Field>

          <form.Field
            name="username"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Required"
                  : value.length < 3
                  ? "Too short"
                  : !/^[a-zA-Z0-9_]+$/.test(value)
                  ? "Only letters, numbers, and underscores allowed"
                  : undefined,
            }}
          >
            {(field) => (
              <FormField error={field.state.meta.errors?.[0]}>
                <Input
                  type="text"
                  placeholder="Username"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                />
              </FormField>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Required"
                  : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                  ? "Invalid email"
                  : undefined,
            }}
          >
            {(field) => (
              <FormField error={field.state.meta.errors?.[0]}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                />
              </FormField>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Required"
                  : value.length < 6
                  ? "Min 6 characters"
                  : undefined,
            }}
          >
            {(field) => (
              <FormField error={field.state.meta.errors?.[0]}>
                <Input
                  type="password"
                  placeholder="Password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                />
              </FormField>
            )}
          </form.Field>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            Continue
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </PageContainer>
  );
}

export default RegisterPage;

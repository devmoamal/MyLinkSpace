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

type LoginPageProps = {
  className?: string;
};

function LoginPage({ className }: LoginPageProps) {
  const navigate = useNavigate();
  const { setAuth, isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (isAuthenticated) {
    navigate({ to: "/profile" });
  }

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        setError(null);
        setIsLoading(true);

        const response = await authApi.login(value);
        setAuth(response.data.user, response.data.token);
        toast.success("Welcome back!");
        navigate({ to: "/" });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Login failed";
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
        <h1 className="text-2xl font-bold text-center">Sign In</h1>

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
                  ? "Too short"
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
          New here?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </PageContainer>
  );
}

export default LoginPage;

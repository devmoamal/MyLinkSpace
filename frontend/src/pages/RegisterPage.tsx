import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Input from "@/components/common/Input";
import { useForm } from "@tanstack/react-form";
import { authApi } from "@/lib/auth";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

type RegisterPageProps = {
  className?: string;
};

function RegisterPage({ className }: RegisterPageProps) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAuth();

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

        // Store auth data
        setAuth(response.data.user, response.data.token);

        // Redirect to home
        navigate({ to: "/" });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div
      className={cn(
        "h-screen bg-background flex items-center justify-center px-4",
        className
      )}
    >
      <Card className="w-full max-w-sm p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create Account</h1>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive text-center">{error}</p>
          </div>
        )}

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
              <div className="space-y-1.5">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                />
                {field.state.meta.errors && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
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
                  ? "Letters, numbers, _ only"
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-1.5">
                <Input
                  type="text"
                  placeholder="Username"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                />
                {field.state.meta.errors && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
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
              <div className="space-y-1.5">
                <Input
                  type="email"
                  placeholder="Email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                />
                {field.state.meta.errors && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
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
              <div className="space-y-1.5">
                <Input
                  type="password"
                  placeholder="Password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isLoading}
                />
                {field.state.meta.errors && (
                  <p className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
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
    </div>
  );
}

export default RegisterPage;

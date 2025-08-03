import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface LoginPageProps {
  userType?: "conseillere" | "admin" | "client";
}

function LoginPage({ userType = "conseillere" }: LoginPageProps) {
  const navigate = useNavigate();
  const params = useParams();
  const currentUserType =
    userType || (params.userType as "conseillere" | "admin" | "client");

  const { signIn, signInWithFacebook, profile } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const rolePaths: Record<string, string> = {
      client: "/client/dashboard",
      advisor: "/conseillere/dashboard",
      admin: "/admin/dashboard",
    };
    if (profile?.role) {
      navigate(rolePaths[profile.role]);
    }
  }, [profile, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const { error } = await signIn(email, password);
    if (error) setError(error);
    setIsLoading(false);
  };

  const getTitle = () => {
    switch (currentUserType) {
      case "conseillere":
        return "Espace Conseillère";
      case "admin":
        return "Espace Administrateur";
      default:
        return "Connexion";
    }
  };

  const getSubtitle = () => {
    switch (currentUserType) {
      case "conseillere":
        return "Connectez-vous pour gérer votre réseau";
      case "admin":
        return "Accès administrateur à la plateforme";
      default:
        return "Connectez-vous à votre compte";
    }
  };

  return (
    <div className="min-h-screen bg-lolly-background font-montserrat">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lolly-gray/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mr-4 text-lolly-contrast hover:bg-lolly-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-playfair font-bold text-lolly-contrast">
            Lolly
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-playfair font-semibold text-lolly-contrast mb-2">
              {getTitle()}
            </h2>
            <p className="text-lolly-gray">{getSubtitle()}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-lolly-contrast font-medium"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="border-lolly-gray/30 focus:border-lolly-primary"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-lolly-contrast font-medium"
              >
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="border-lolly-gray/30 focus:border-lolly-primary pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-lolly-gray" />
                  ) : (
                    <Eye className="h-4 w-4 text-lolly-gray" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-lolly-primary hover:bg-lolly-primary/90 text-white font-medium py-3"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={signInWithFacebook}
              className="w-full mt-2"
            >
              Continuer avec Facebook
            </Button>
          </form>

        </div>
      </main>
    </div>
  );
}

export default LoginPage;

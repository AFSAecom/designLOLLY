import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Flower, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function Home() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const goClient = () => {
    if (profile?.role === "client") navigate("/client/dashboard");
    else navigate("/client/login");
  };

  const goAdvisor = () => {
    if (profile?.role === "advisor") navigate("/conseillere/dashboard");
    else navigate("/conseillere/login");
  };

  const goAdmin = () => {
    if (profile?.role === "admin") navigate("/admin/dashboard");
    else navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-lolly-background font-montserrat">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lolly-gray/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <img
              src="/images/logo lolly.png"
              alt="Lolly"
              className="h-12 md:h-14 object-contain"
            />
          </div>
          <p className="text-lolly-gray text-center mt-2 text-base">
            Parfums dupes de luxe
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-lolly-contrast mb-4">
            Bienvenue dans l'univers Lolly
          </h2>
          <p className="text-lolly-gray text-lg max-w-2xl mx-auto">
            Découvrez nos parfums dupes de haute qualité et rejoignez notre
            réseau Lolly Forest
          </p>
        </div>

        {/* Access Buttons */}
        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Client Space */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-lolly-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-lolly-primary" />
            </div>
            <h3 className="text-xl font-playfair font-semibold text-lolly-contrast mb-3">
              Espace Client
            </h3>

            <Button
              onClick={goClient}
              className="w-full bg-lolly-primary hover:bg-lolly-primary/90 text-white font-medium py-3"
            >
              Accéder
            </Button>
          </div>

          {/* Conseillère Space */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-lolly-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flower className="w-8 h-8 text-lolly-gold" />
            </div>
            <h3 className="text-xl font-playfair font-semibold text-lolly-contrast mb-3">
              Espace Conseillère
            </h3>

            <Button
              onClick={goAdvisor}
              className="w-full bg-lolly-gold hover:bg-lolly-gold/90 text-lolly-contrast font-medium py-3"
            >
              Se connecter
            </Button>
          </div>

          {/* Admin Space */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-lolly-contrast/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-lolly-contrast" />
            </div>
            <h3 className="text-xl font-playfair font-semibold text-lolly-contrast mb-3">
              Espace Admin
            </h3>

            <Button
              onClick={goAdmin}
              className="w-full bg-lolly-contrast hover:bg-lolly-contrast/90 text-white font-medium py-3"
            >
              Se connecter
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-lolly-gray/20 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-lolly-gray">
            © 2024 Lolly - Parfums dupes de luxe
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;

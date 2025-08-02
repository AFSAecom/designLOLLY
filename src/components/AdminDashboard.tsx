import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowLeft,
  Package,
  Users,
  ShoppingCart,
  Settings,
  BarChart3,
  Gift,
  User,
  LogOut,
  CreditCard,
  Menu,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

function AdminDashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const stats = [
    {
      label: "Utilisateurs Totaux",
      value: "1",
      color: "text-lolly-primary",
      icon: Users,
    },
    {
      label: "Commandes du Jour",
      value: "0",
      color: "text-lolly-gold",
      icon: ShoppingCart,
    },
    {
      label: "Chiffre d'Affaires",
      value: "0 DT",
      color: "text-lolly-contrast",
      icon: BarChart3,
    },
    {
      label: "Produits Actifs",
      value: "0",
      color: "text-lolly-primary",
      icon: Package,
    },
  ];

  const managementSections = [
    {
      icon: Package,
      title: "Gestion Produits",
      description: "Catalogue et stock des parfums",
      color: "bg-lolly-primary",
      items: ["Ajouter produit", "Gérer stock", "Catégories"],
    },
    {
      icon: Users,
      title: "Utilisateurs",
      description: "Clients et conseillères",
      color: "bg-lolly-gold",
      items: ["Clients (0)", "Conseillères (0)", "Admins (1)"],
    },
    {
      icon: ShoppingCart,
      title: "Commandes",
      description: "Suivi et gestion des commandes",
      color: "bg-lolly-contrast",
      items: ["En attente (0)", "Expédiées (0)", "Livrées (0)"],
    },
  ];

  const quickActions = [
    { icon: Plus, label: "Nouveau produit", color: "bg-lolly-primary" },
    { icon: Users, label: "Ajouter utilisateur", color: "bg-lolly-gold" },
    { icon: Gift, label: "Créer promotion", color: "bg-lolly-contrast" },
    { icon: Settings, label: "Configuration", color: "bg-lolly-primary" },
  ];

  return (
    <div className="min-h-screen bg-lolly-background font-montserrat">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lolly-gray/20">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
            <div className="flex items-center min-w-0">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="mr-2 text-lolly-contrast hover:bg-lolly-primary/10 flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Accueil</span>
              </Button>
              <div className="flex items-center space-x-2">
                <img
                  src="/images/logo lolly.png"
                  alt="Lolly"
                  className="h-6 object-contain flex-shrink-0"
                />
                <span className="text-lg font-playfair font-bold text-lolly-contrast">
                  Admin
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 text-sm px-2"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 text-sm px-2"
              >
                <User className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Ahmed (Admin)</span>
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-lolly-contrast hover:bg-red-50 hover:text-red-600 text-sm px-2"
              >
                <LogOut className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Déconnexion</span>
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 border-b border-lolly-gray/20">
            <nav className="flex space-x-1 overflow-x-auto">
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 border-b-2 border-lolly-primary rounded-none px-3 py-2 text-sm whitespace-nowrap"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Tableau de bord
              </Button>
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 rounded-none px-3 py-2 text-sm whitespace-nowrap"
              >
                <Package className="w-4 h-4 mr-2" />
                Produits
              </Button>
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 rounded-none px-3 py-2 text-sm whitespace-nowrap"
              >
                <Users className="w-4 h-4 mr-2" />
                Utilisateurs
              </Button>
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 rounded-none px-3 py-2 text-sm whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Commandes
              </Button>
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 rounded-none px-3 py-2 text-sm whitespace-nowrap"
              >
                <Gift className="w-4 h-4 mr-2" />
                Promotions
              </Button>
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 rounded-none px-3 py-2 text-sm whitespace-nowrap"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Niveaux
              </Button>
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 rounded-none px-3 py-2 text-sm whitespace-nowrap"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Paiements
              </Button>
              <Button
                variant="ghost"
                className="text-lolly-contrast hover:bg-lolly-primary/10 rounded-none px-3 py-2 text-sm whitespace-nowrap"
              >
                <Settings className="w-4 h-4 mr-2" />
                Configuration
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-playfair font-semibold text-lolly-contrast mb-2">
              Panneau d'Administration
            </h2>
            <p className="text-lolly-gray">
              Gestion complète de la plateforme Lolly
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-lolly-gray text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 mb-6">
            <h3 className="text-lg lg:text-xl font-playfair font-semibold text-lolly-contrast mb-4">
              Actions Rapides
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    className={`${action.color} hover:${action.color}/90 text-white p-4 h-auto flex-col space-y-2`}
                  >
                    <IconComponent className="w-6 h-6" />
                    <span className="text-sm">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Management Sections */}
          <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
            {managementSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 ${section.color}/10 rounded-full flex items-center justify-center mr-4`}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${section.color.replace("bg-", "text-")}`}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-playfair font-semibold text-lolly-contrast">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-lolly-gray text-sm mb-4">
                    {section.description}
                  </p>
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center p-2 bg-lolly-background rounded-lg"
                      >
                        <span className="text-sm text-lolly-contrast">
                          {item}
                        </span>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className={`w-full mt-4 ${section.color} hover:${section.color}/90 text-white font-medium`}
                  >
                    Gérer
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Additional Management Zones */}
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Promotions Zone */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Gift className="w-6 h-6 text-lolly-gold mr-3" />
                  <h3 className="text-lg font-playfair font-semibold text-lolly-contrast">
                    Promotions Actives
                  </h3>
                </div>
                <Button
                  size="sm"
                  className="bg-lolly-gold hover:bg-lolly-gold/90 text-lolly-contrast"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Nouveau
                </Button>
              </div>
              <div className="space-y-3">
                <div className="text-center py-8">
                  <Gift className="w-12 h-12 text-lolly-gray/50 mx-auto mb-3" />
                  <p className="text-lolly-gray">Aucune promotion active</p>
                  <p className="text-sm text-lolly-gray mt-1">
                    Créez votre première promotion
                  </p>
                </div>
              </div>
            </div>

            {/* Payments Zone */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <CreditCard className="w-6 h-6 text-lolly-contrast mr-3" />
                <h3 className="text-lg font-playfair font-semibold text-lolly-contrast">
                  Gestion des Paiements
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-lolly-background rounded-lg">
                  <span className="text-lolly-gray">Paiements en attente</span>
                  <span className="font-semibold text-lolly-contrast">0</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-lolly-background rounded-lg">
                  <span className="text-lolly-gray">Commissions à payer</span>
                  <span className="font-semibold text-lolly-contrast">
                    0 DT
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-lolly-background rounded-lg">
                  <span className="text-lolly-gray">Revenus ce mois</span>
                  <span className="font-semibold text-lolly-contrast">
                    0 DT
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-playfair font-semibold text-lolly-contrast mb-4 lg:mb-6 text-center">
              État du Système
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center p-4">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-lolly-contrast mb-1">
                  Application
                </h4>
                <p className="text-sm text-lolly-gray">Opérationnelle</p>
              </div>
              <div className="text-center p-4">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-lolly-contrast mb-1">
                  Base de Données
                </h4>
                <p className="text-sm text-lolly-gray">Configuration</p>
              </div>
              <div className="text-center p-4">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-lolly-contrast mb-1">
                  Paiements
                </h4>
                <p className="text-sm text-lolly-gray">Configuration</p>
              </div>
              <div className="text-center p-4">
                <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2"></div>
                <h4 className="font-semibold text-lolly-contrast mb-1">
                  Sécurité
                </h4>
                <p className="text-sm text-lolly-gray">Active</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Users,
  TrendingUp,
  DollarSign,
  Gift,
  User,
  LogOut,
  Target,
  Share2,
  Award,
  Calendar,
  Search,
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  Filter,
  Star,
  Crown,
  Trophy,
  Plus,
  Eye,
  Package,
  Clock,
  Percent,
  Heart,
  Sparkles,
  X,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

function ConseillereDashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [currentView, setCurrentView] = useState<
    "dashboard" | "catalog" | "favorites"
  >("dashboard");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("today");

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // Force component to render with explicit styles
  console.log("ConseillereDashboard LOADED - currentView:", currentView);

  // Force re-render on mount
  React.useEffect(() => {
    console.log("ConseillereDashboard mounted successfully");
  }, []);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const handleAddToSale = (product: any) => {
    setSelectedProduct(product);
    setShowClientModal(true);
  };

  const handleSaleComplete = () => {
    setShowClientModal(false);
    setSelectedProduct(null);
    clearFavorites(); // Clear favorites after sale
  };

  // filteredProducts & filteredClients defined after data arrays

  const getSalesHistory = () => {
    // Sample sales history based on selected date range
    const todaySales = [
      {
        code: "LLY001",
        name: "Mystique Rose",
        inspiredProduct: "Black Opium",
        inspiredBrand: "Yves Saint Laurent",
        revenue: "120 DT",
        date: "5 Fév 2024",
      },
      {
        code: "LLY002",
        name: "Élégance Dorée",
        inspiredProduct: "Chanel N°5",
        inspiredBrand: "Chanel",
        revenue: "85 DT",
        date: "5 Fév 2024",
      },
    ];

    const weeklySales = [
      ...todaySales,
      {
        code: "LLY003",
        name: "Oud Royal",
        inspiredProduct: "Oud Wood",
        inspiredBrand: "Tom Ford",
        revenue: "160 DT",
        date: "3 Fév 2024",
      },
      {
        code: "LLY001",
        name: "Mystique Rose",
        inspiredProduct: "Black Opium",
        inspiredBrand: "Yves Saint Laurent",
        revenue: "75 DT",
        date: "1 Fév 2024",
      },
    ];

    return selectedDateRange === "today" ? todaySales : weeklySales;
  };

  // Données de performance
  const performanceStats = [
    {
      label: "Ventes Totales",
      value: "2,450 DT",
      color: "text-lolly-primary",
      icon: DollarSign,
      change: "+12%",
    },
    {
      label: "Commandes",
      value: "47",
      color: "text-lolly-gold",
      icon: Package,
      change: "+8%",
    },
    {
      label: "Objectif Mensuel",
      value: "3,000 DT",
      color: "text-lolly-contrast",
      icon: Target,
      progress: 82,
    },
    {
      label: "Clientes Actives",
      value: "23",
      color: "text-lolly-primary",
      icon: Users,
      change: "+3",
    },
  ];

  // Catalogue de parfums (données d'exemple)
  const perfumes = [
    {
      id: "LLY001",
      code: "LLY001",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&q=80",
      lollyName: "Mystique Rose",
      inspiredPerfume: "Black Opium",
      brand: "Yves Saint Laurent",
      family: "Oriental Floral",
      gender: "Femme",
      season: "Toute saison",
      notes: {
        top: "Poire, Fleur d'oranger",
        heart: "Jasmin, Café",
        base: "Vanille, Patchouli, Cèdre",
      },
      volumes: [
        { size: "15ml", price: "45 DT" },
        { size: "30ml", price: "75 DT" },
        { size: "50ml", price: "120 DT" },
        { size: "100ml", price: "200 DT" },
      ],
    },
    {
      id: "LLY002",
      code: "LLY002",
      image:
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=300&q=80",
      lollyName: "Élégance Dorée",
      inspiredPerfume: "Chanel N°5",
      brand: "Chanel",
      family: "Floral Aldéhydé",
      gender: "Femme",
      season: "Printemps/Été",
      notes: {
        top: "Aldéhydes, Ylang-ylang",
        heart: "Rose, Jasmin, Muguet",
        base: "Santal, Vétiver, Vanille",
      },
      volumes: [
        { size: "15ml", price: "50 DT" },
        { size: "30ml", price: "85 DT" },
        { size: "50ml", price: "140 DT" },
        { size: "100ml", price: "220 DT" },
      ],
    },
    {
      id: "LLY003",
      code: "LLY003",
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&q=80",
      lollyName: "Oud Royal",
      inspiredPerfume: "Oud Wood",
      brand: "Tom Ford",
      family: "Oriental Boisé",
      gender: "Mixte",
      season: "Automne/Hiver",
      notes: {
        top: "Bois de rose, Cardamome",
        heart: "Oud, Santal",
        base: "Vanille, Ambre",
      },
      volumes: [
        { size: "15ml", price: "60 DT" },
        { size: "30ml", price: "95 DT" },
        { size: "50ml", price: "160 DT" },
        { size: "100ml", price: "280 DT" },
      ],
    },
  ];

  // Clientes (données d'exemple)
  const clients = [
    {
      id: 1,
      name: "Amira Ben Salem",
      phone: "+216 98 123 456",
      email: "amira.bensalem@email.com",
      city: "Tunis",
      totalOrders: 8,
      totalSpent: "680 DT",
      lastOrder: "15 Jan 2024",
      purchaseHistory: [
        {
          date: "15 Jan 2024",
          code: "LLY001",
          productName: "Mystique Rose",
          inspiredProduct: "Black Opium",
          inspiredBrand: "Yves Saint Laurent",
          amount: "120 DT",
        },
        {
          date: "28 Dec 2023",
          code: "LLY002",
          productName: "Élégance Dorée",
          inspiredProduct: "Chanel N°5",
          inspiredBrand: "Chanel",
          amount: "85 DT",
        },
        {
          date: "10 Dec 2023",
          code: "LLY003",
          productName: "Oud Royal",
          inspiredProduct: "Oud Wood",
          inspiredBrand: "Tom Ford",
          amount: "160 DT",
        },
      ],
    },
    {
      id: 2,
      name: "Salma Trabelsi",
      phone: "+216 22 987 654",
      email: "salma.trabelsi@email.com",
      city: "Sfax",
      totalOrders: 12,
      totalSpent: "950 DT",
      lastOrder: "20 Jan 2024",
      purchaseHistory: [
        {
          date: "20 Jan 2024",
          code: "LLY003",
          productName: "Oud Royal",
          inspiredProduct: "Oud Wood",
          inspiredBrand: "Tom Ford",
          amount: "280 DT",
        },
        {
          date: "10 Jan 2024",
          code: "LLY001",
          productName: "Mystique Rose",
          inspiredProduct: "Black Opium",
          inspiredBrand: "Yves Saint Laurent",
          amount: "75 DT",
        },
        {
          date: "25 Dec 2023",
          code: "LLY002",
          productName: "Élégance Dorée",
          inspiredProduct: "Chanel N°5",
          inspiredBrand: "Chanel",
          amount: "85 DT",
        },
      ],
    },
  ];

  const filteredProducts = perfumes.filter((product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.lollyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.inspiredPerfume
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIngredient =
      ingredientSearch === "" ||
      product.notes.top
        .toLowerCase()
        .includes(ingredientSearch.toLowerCase()) ||
      product.notes.heart
        .toLowerCase()
        .includes(ingredientSearch.toLowerCase()) ||
      product.notes.base
        .toLowerCase()
        .includes(ingredientSearch.toLowerCase()) ||
      product.family.toLowerCase().includes(ingredientSearch.toLowerCase());

    return matchesSearch && matchesIngredient;
  });

  const filteredClients = clients.filter((client) => {
    if (clientSearchTerm === "") return true;
    const searchLower = clientSearchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.phone.includes(clientSearchTerm) ||
      client.email.toLowerCase().includes(searchLower)
    );
  });

  // Promotions actives
  const promotions = [
    {
      id: 1,
      title: "Offre Saint-Valentin",
      description:
        "15% de réduction sur tous les parfums floraux pour la Saint-Valentin",
      type: "Réduction",
      discount: "15%",
      validUntil: "14 Fév 2024",
      products: "Parfums floraux",
      badge: "Limitée",
    },
    {
      id: 2,
      title: "Pack Duo",
      description: "Achetez 2 parfums 50ml, obtenez 10% de réduction",
      type: "Pack",
      discount: "10%",
      validUntil: "29 Fév 2024",
      products: "Tous parfums 50ml",
      badge: "Populaire",
    },
    {
      id: 3,
      title: "Nouvelle Collection",
      description: "Découvrez nos 5 nouveaux parfums avec 20% de réduction",
      type: "Lancement",
      discount: "20%",
      validUntil: "15 Mar 2024",
      products: "Nouvelle collection",
      badge: "Nouveau",
    },
  ];

  // Historique des ventes mensuelles
  const salesHistory = [
    { month: "Oct", amount: 1800 },
    { month: "Nov", amount: 2200 },
    { month: "Déc", amount: 2800 },
    { month: "Jan", amount: 2450 },
  ];

  // Classement des conseillères
  const ranking = [
    { position: 1, name: "Fatma Bouaziz", sales: "4,200 DT", badge: "👑" },
    { position: 2, name: "Leila Mansouri", sales: "3,800 DT", badge: "🥈" },
    {
      position: 3,
      name: "Vous",
      sales: "2,450 DT",
      badge: "🥉",
      isCurrentUser: true,
    },
    { position: 4, name: "Nadia Khelifi", sales: "2,100 DT", badge: "" },
    { position: 5, name: "Rim Gharbi", sales: "1,950 DT", badge: "" },
  ];

  // Force render with explicit return
  if (!currentView) {
    console.error("No currentView set!");
    return <div>Loading...</div>;
  }

  return (
    <div
      className="min-h-screen font-montserrat"
      style={{
        backgroundColor: "#fbf0e9",
        minHeight: "100vh",
        width: "100%",
        display: "block",
      }}
    >
      {/* Header - Force visible */}
      <header
        className="shadow-sm sticky top-0 z-50"
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid rgba(173, 156, 146, 0.2)",
          display: "block",
          width: "100%",
          minHeight: "60px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="mr-2 text-lolly-contrast hover:bg-lolly-primary/10 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Accueil</span>
            </Button>
            <img
              src="/images/logo lolly.png"
              alt="Lolly"
              className="h-6 object-contain flex-shrink-0"
            />
          </div>
          <div className="flex items-center space-x-2 min-w-0">
            <Button
              variant="ghost"
              onClick={() => setCurrentView("dashboard")}
              className={`text-lolly-contrast hover:bg-lolly-primary/10 text-sm px-2 ${currentView === "dashboard" ? "bg-lolly-primary/10" : ""}`}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Tableau de bord</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentView("catalog")}
              className={`text-lolly-contrast hover:bg-lolly-primary/10 text-sm px-2 ${currentView === "catalog" ? "bg-lolly-primary/10" : ""}`}
            >
              <Package className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Catalogue</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCurrentView("favorites")}
              className={`text-lolly-contrast hover:bg-lolly-primary/10 text-sm px-2 relative ${currentView === "favorites" ? "bg-lolly-primary/10" : ""}`}
            >
              <Heart className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Favoris</span>
              {favorites.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-lolly-primary text-white text-xs">
                  {favorites.length}
                </Badge>
              )}
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
      </header>

      {/* Main Content - Force visible */}
      <main
        className="max-w-7xl mx-auto px-4 py-6 space-y-8"
        style={{
          display: "block",
          width: "100%",
          minHeight: "500px",
          backgroundColor: "#fbf0e9",
        }}
      >
        {currentView === "dashboard" && (
          <>
            {/* Welcome Section */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-lolly-contrast mb-2">
                Tableau de Bord Performance
              </h1>
              <p className="text-lolly-gray text-lg">
                Suivez vos performances et vos ventes
              </p>
            </div>

            {/* Performance Dashboard */}
            <section>
              <h2 className="text-2xl font-playfair font-semibold text-lolly-contrast mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-lolly-primary" />
                Tableau de Bord Performance
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {performanceStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <Card
                      key={index}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-6 text-center">
                        <div className="flex items-center justify-center mb-3">
                          <IconComponent
                            className={`w-6 h-6 ${stat.color} mr-2`}
                          />
                          <div className={`text-2xl font-bold ${stat.color}`}>
                            {stat.value}
                          </div>
                        </div>
                        <div className="text-lolly-gray text-sm mb-2">
                          {stat.label}
                        </div>
                        {stat.change && (
                          <div className="text-xs text-green-600 font-medium">
                            {stat.change} ce mois
                          </div>
                        )}
                        {stat.progress && (
                          <div className="mt-3">
                            <div className="w-full bg-lolly-gray/20 rounded-full h-2">
                              <div
                                className="bg-lolly-primary h-2 rounded-full transition-all"
                                style={{ width: `${stat.progress}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-lolly-gray mt-1">
                              {stat.progress}% atteint
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Sales History with Date Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lolly-contrast">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Historique des Ventes
                    </div>
                    <select
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value)}
                      className="px-3 py-1 border-2 border-lolly-contrast/30 rounded-md focus:border-lolly-primary text-sm"
                    >
                      <option value="today">Aujourd'hui</option>
                      <option value="week">Cette semaine</option>
                      <option value="month">Ce mois</option>
                    </select>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getSalesHistory().map((sale, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-lolly-background rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge className="bg-lolly-contrast text-white text-xs">
                              {sale.code}
                            </Badge>
                            <span className="font-medium text-lolly-contrast text-sm">
                              {sale.name}
                            </span>
                          </div>
                          <p className="text-xs text-lolly-gray">
                            Inspiré de {sale.inspiredProduct} -{" "}
                            {sale.inspiredBrand}
                          </p>
                          <p className="text-xs text-lolly-gray">{sale.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-lolly-primary">
                            {sale.revenue}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}

        {currentView === "catalog" && (
          <>
            {/* Welcome Section */}
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-lolly-contrast mb-2">
                Catalogue Produits
              </h1>
              <p className="text-lolly-gray text-lg">
                Recherchez et ajoutez des produits à vos favoris
              </p>
            </div>

            {/* Sales Zone */}
            <section>
              <h2 className="text-2xl font-playfair font-semibold text-lolly-contrast mb-6 flex items-center">
                <ShoppingCart className="w-6 h-6 mr-3 text-lolly-primary" />
                Zone de Vente - Catalogue Parfums
              </h2>

              {/* Search Bar */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lolly-gray w-4 h-4" />
                      <Input
                        placeholder="Rechercher par nom inspiré ou marque..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-2 border-lolly-contrast/30 focus:border-lolly-primary"
                      />
                    </div>
                    <div className="relative">
                      <Input
                        placeholder="Ingrédients et familles olfactives..."
                        value={ingredientSearch}
                        onChange={(e) => setIngredientSearch(e.target.value)}
                        className="border-2 border-lolly-contrast/30 focus:border-lolly-primary"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <select className="px-3 py-2 border-2 border-lolly-contrast/30 rounded-md focus:border-lolly-primary">
                      <option>Tous genres</option>
                      <option>Femme</option>
                      <option>Homme</option>
                      <option>Mixte</option>
                    </select>
                    <select className="px-3 py-2 border-2 border-lolly-contrast/30 rounded-md focus:border-lolly-primary">
                      <option>Toutes saisons</option>
                      <option>Printemps/Été</option>
                      <option>Automne/Hiver</option>
                      <option>Toute saison</option>
                    </select>
                    <select className="px-3 py-2 border-2 border-lolly-contrast/30 rounded-md focus:border-lolly-primary">
                      <option>Toutes familles</option>
                      <option>Floral</option>
                      <option>Oriental</option>
                      <option>Boisé</option>
                      <option>Cuir</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Product Catalog */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((perfume) => (
                  <Card
                    key={perfume.id}
                    className="hover:shadow-xl transition-all duration-300 group"
                  >
                    <CardContent className="p-0">
                      <div className="relative">
                        <Badge className="absolute top-3 left-3 z-10 bg-lolly-primary text-white">
                          {perfume.code}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFavorite(perfume.id)}
                          className={`absolute top-3 right-3 z-10 h-8 w-8 ${
                            favorites.includes(perfume.id)
                              ? "text-red-500 bg-white/80"
                              : "text-lolly-gray bg-white/80 hover:text-red-500"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${favorites.includes(perfume.id) ? "fill-current" : ""}`}
                          />
                        </Button>
                        <img
                          src={perfume.image}
                          alt={perfume.lollyName}
                          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-playfair font-semibold text-lg text-lolly-contrast mb-2">
                          {perfume.lollyName}
                        </h3>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm">
                            <Sparkles className="w-4 h-4 mr-2 text-lolly-gold" />
                            <span className="text-lolly-gray">Inspiré de:</span>
                            <span className="ml-1 font-medium text-lolly-contrast">
                              {perfume.inspiredPerfume}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Crown className="w-4 h-4 mr-2 text-lolly-primary" />
                            <span className="text-lolly-gray">Marque:</span>
                            <span className="ml-1 font-medium text-lolly-contrast">
                              {perfume.brand}
                            </span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Heart className="w-4 h-4 mr-2 text-lolly-primary" />
                            <span className="text-lolly-gray">Famille:</span>
                            <span className="ml-1 font-medium text-lolly-contrast">
                              {perfume.family}
                            </span>
                          </div>
                        </div>

                        {/* Notes olfactives */}
                        <div className="mb-4 p-3 bg-lolly-background rounded-lg">
                          <div className="text-xs space-y-1">
                            <div>
                              <span className="font-medium text-lolly-contrast">
                                Tête:
                              </span>{" "}
                              <span className="text-lolly-gray">
                                {perfume.notes.top}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-lolly-contrast">
                                Cœur:
                              </span>{" "}
                              <span className="text-lolly-gray">
                                {perfume.notes.heart}
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-lolly-contrast">
                                Fond:
                              </span>{" "}
                              <span className="text-lolly-gray">
                                {perfume.notes.base}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Volume buttons */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {perfume.volumes.map((volume, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="border-lolly-primary text-lolly-primary hover:bg-lolly-primary hover:text-white"
                            >
                              {volume.size} - {volume.price}
                            </Button>
                          ))}
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleAddToSale(perfume)}
                            className="flex-1 bg-lolly-primary hover:bg-lolly-primary/90 text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter à la vente
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="border-lolly-gray hover:bg-lolly-background"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {currentView === "favorites" && (
          <>
            {/* Favorites Section */}
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-playfair font-semibold text-lolly-contrast mb-2">
                Mes Favoris
              </h1>
              <p className="text-lolly-gray text-lg">
                {favorites.length} produit{favorites.length !== 1 ? "s" : ""} en
                favoris
              </p>
            </div>

            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-playfair font-semibold text-lolly-contrast">
                    Gestion des favoris
                  </h3>
                  <Button
                    onClick={clearFavorites}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50"
                    disabled={favorites.length === 0}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Remise à zéro
                  </Button>
                </div>
              </CardContent>
            </Card>

            {favorites.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Heart className="w-16 h-16 text-lolly-gray/50 mx-auto mb-4" />
                  <h3 className="text-xl font-playfair font-semibold text-lolly-contrast mb-2">
                    Aucun favori
                  </h3>
                  <p className="text-lolly-gray mb-6">
                    Ajoutez des produits à vos favoris depuis le catalogue
                  </p>
                  <Button
                    onClick={() => setCurrentView("catalog")}
                    className="bg-lolly-primary hover:bg-lolly-primary/90 text-white"
                  >
                    Aller au catalogue
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {perfumes
                  .filter((p) => favorites.includes(p.id))
                  .map((perfume) => (
                    <Card
                      key={perfume.id}
                      className="hover:shadow-xl transition-all duration-300"
                    >
                      <CardContent className="p-0">
                        <div className="relative">
                          <Badge className="absolute top-3 left-3 z-10 bg-lolly-primary text-white">
                            {perfume.code}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(perfume.id)}
                            className="absolute top-3 right-3 z-10 h-8 w-8 text-red-500 bg-white/80 hover:bg-white"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <img
                            src={perfume.image}
                            alt={perfume.lollyName}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-playfair font-semibold text-lg text-lolly-contrast mb-2">
                            {perfume.lollyName}
                          </h3>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm">
                              <Sparkles className="w-4 h-4 mr-2 text-lolly-gold" />
                              <span className="text-lolly-gray">
                                Inspiré de:
                              </span>
                              <span className="ml-1 font-medium text-lolly-contrast">
                                {perfume.inspiredPerfume}
                              </span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Crown className="w-4 h-4 mr-2 text-lolly-primary" />
                              <span className="text-lolly-gray">Marque:</span>
                              <span className="ml-1 font-medium text-lolly-contrast">
                                {perfume.brand}
                              </span>
                            </div>
                          </div>
                          <Button
                            onClick={() => handleAddToSale(perfume)}
                            className="w-full bg-lolly-primary hover:bg-lolly-primary/90 text-white"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Ajouter à la vente
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </>
        )}

        {currentView === "dashboard" && (
          <>
            {/* Client Search */}
            <section>
              <h2 className="text-2xl font-playfair font-semibold text-lolly-contrast mb-6 flex items-center">
                <Users className="w-6 h-6 mr-3 text-lolly-primary" />
                Recherche Cliente
              </h2>

              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lolly-gray w-4 h-4" />
                    <Input
                      placeholder="Rechercher par nom, téléphone ou email..."
                      value={clientSearchTerm}
                      onChange={(e) => setClientSearchTerm(e.target.value)}
                      className="pl-10 border-2 border-lolly-contrast/30 focus:border-lolly-primary"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredClients.map((client) => (
                  <Card
                    key={client.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="text-lolly-contrast">
                          {client.name}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-lolly-primary border-lolly-primary"
                        >
                          {client.totalOrders} commandes
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-lolly-gray" />
                          <span className="text-lolly-contrast">
                            {client.email}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-lolly-gray" />
                          <span className="text-lolly-contrast">
                            {client.city}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-lolly-gray/20">
                          <div>
                            <div className="text-sm text-lolly-gray">
                              Total dépensé
                            </div>
                            <div className="font-semibold text-lolly-primary">
                              {client.totalSpent}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-lolly-gray">
                              Dernière commande
                            </div>
                            <div className="font-semibold text-lolly-contrast">
                              {client.lastOrder}
                            </div>
                          </div>
                        </div>

                        {/* Purchase History */}
                        <div className="mt-4 p-3 bg-lolly-background rounded-lg">
                          <h4 className="font-medium text-lolly-contrast mb-2 text-sm">
                            Historique des achats
                          </h4>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {client.purchaseHistory
                              .slice(0, 3)
                              .map((purchase, idx) => (
                                <div key={idx} className="text-xs">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <Badge className="bg-lolly-contrast text-white text-xs">
                                      {purchase.code}
                                    </Badge>
                                    <span className="font-medium text-lolly-contrast">
                                      {purchase.productName}
                                    </span>
                                  </div>
                                  <p className="text-lolly-gray">
                                    Inspiré de {purchase.inspiredProduct} -{" "}
                                    {purchase.inspiredBrand}
                                  </p>
                                  <div className="flex justify-between items-center">
                                    <span className="text-lolly-gray">
                                      {purchase.date}
                                    </span>
                                    <span className="font-medium text-lolly-primary">
                                      {purchase.amount}
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Monthly Goals & Ranking */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Monthly Goals */}
              <section>
                <h2 className="text-2xl font-playfair font-semibold text-lolly-contrast mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-lolly-gold" />
                  Objectifs Mensuels
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-lolly-primary mb-2">
                        2,450 DT
                      </div>
                      <div className="text-lolly-gray">sur 3,000 DT</div>
                      <div className="w-full bg-lolly-gray/20 rounded-full h-3 mt-3">
                        <div
                          className="bg-lolly-gold h-3 rounded-full transition-all"
                          style={{ width: "82%" }}
                        ></div>
                      </div>
                      <div className="text-sm text-lolly-gray mt-2">
                        82% de l'objectif atteint
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-lolly-background rounded-lg">
                        <span className="text-lolly-gray">
                          Reste à atteindre
                        </span>
                        <span className="font-semibold text-lolly-contrast">
                          550 DT
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-lolly-background rounded-lg">
                        <span className="text-lolly-gray">Jours restants</span>
                        <span className="font-semibold text-lolly-contrast">
                          12 jours
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-lolly-background rounded-lg">
                        <span className="text-lolly-gray">
                          Moyenne quotidienne nécessaire
                        </span>
                        <span className="font-semibold text-lolly-primary">
                          46 DT/jour
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Ranking */}
              <section>
                <h2 className="text-2xl font-playfair font-semibold text-lolly-contrast mb-6 flex items-center">
                  <Trophy className="w-6 h-6 mr-3 text-lolly-gold" />
                  Classement du Mois
                </h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {ranking.map((advisor, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            advisor.isCurrentUser
                              ? "bg-lolly-primary/10 border border-lolly-primary/30"
                              : "bg-lolly-background"
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-lolly-primary/20 flex items-center justify-center mr-3">
                              <span className="text-sm font-bold text-lolly-primary">
                                {advisor.position}
                              </span>
                            </div>
                            <div>
                              <div
                                className={`font-medium ${
                                  advisor.isCurrentUser
                                    ? "text-lolly-primary"
                                    : "text-lolly-contrast"
                                }`}
                              >
                                {advisor.name} {advisor.badge}
                              </div>
                              <div className="text-sm text-lolly-gray">
                                {advisor.sales}
                              </div>
                            </div>
                          </div>
                          {advisor.isCurrentUser && (
                            <Badge className="bg-lolly-primary text-white">
                              Vous
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center p-3 bg-lolly-gold/10 rounded-lg">
                      <div className="text-sm text-lolly-contrast font-medium">
                        🎯 Continuez vos efforts ! Vous êtes sur la bonne voie !
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            {/* Promotions */}
            <section>
              <h2 className="text-2xl font-playfair font-semibold text-lolly-contrast mb-6 flex items-center">
                <Gift className="w-6 h-6 mr-3 text-lolly-primary" />
                Promotions à Relayer
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {promotions.map((promo) => (
                  <Card
                    key={promo.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lolly-contrast">
                          {promo.title}
                        </CardTitle>
                        <Badge
                          className={
                            promo.badge === "Limitée"
                              ? "bg-red-100 text-red-800"
                              : promo.badge === "Populaire"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                          }
                        >
                          {promo.badge}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col h-full">
                      <div className="flex-1 space-y-3">
                        <div className="min-h-[3rem] flex items-center">
                          <p className="text-lolly-gray text-sm">
                            {promo.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Percent className="w-4 h-4 mr-1 text-lolly-primary" />
                            <span className="font-bold text-lolly-primary text-lg">
                              {promo.discount}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-lolly-gray">
                              Valide jusqu'au
                            </div>
                            <div className="font-medium text-lolly-contrast">
                              {promo.validUntil}
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-lolly-background rounded-lg">
                          <div className="text-xs text-lolly-gray mb-1">
                            Produits concernés
                          </div>
                          <div className="font-medium text-lolly-contrast">
                            {promo.products}
                          </div>
                        </div>
                      </div>
                      <Button className="w-full bg-lolly-gold hover:bg-lolly-gold/90 text-lolly-contrast mt-4">
                        <Share2 className="w-4 h-4 mr-2" />
                        Partager la promotion
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Client Identification Modal */}
      <Dialog open={showClientModal} onOpenChange={setShowClientModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-playfair text-lolly-contrast">
              Identification du client
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="existing" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="existing">Client existant</TabsTrigger>
              <TabsTrigger value="new">Nouveau client</TabsTrigger>
            </TabsList>

            <TabsContent value="existing" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-lolly-contrast">
                    Téléphone ou Email
                  </label>
                  <Input
                    placeholder="+216 XX XXX XXX ou email@example.com"
                    className="border-2 border-lolly-contrast/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-lolly-contrast">
                    Mot de passe
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="border-2 border-lolly-contrast/30"
                  />
                </div>
                <Button
                  onClick={handleSaleComplete}
                  className="w-full bg-lolly-primary hover:bg-lolly-primary/90 text-white"
                >
                  Valider la vente
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="new" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-lolly-contrast">
                      Prénom
                    </label>
                    <Input
                      placeholder="Prénom"
                      className="border-2 border-lolly-contrast/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-lolly-contrast">
                      Nom
                    </label>
                    <Input
                      placeholder="Nom"
                      className="border-2 border-lolly-contrast/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-lolly-contrast">
                    Téléphone
                  </label>
                  <Input
                    placeholder="+216 XX XXX XXX"
                    className="border-2 border-lolly-contrast/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-lolly-contrast">
                    Email
                  </label>
                  <Input
                    placeholder="email@example.com"
                    className="border-2 border-lolly-contrast/30"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-lolly-contrast">
                    Mot de passe
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="border-2 border-lolly-contrast/30"
                  />
                </div>
                <Button
                  onClick={handleSaleComplete}
                  className="w-full bg-lolly-primary hover:bg-lolly-primary/90 text-white"
                >
                  Créer le client et valider la vente
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ConseillereDashboard;

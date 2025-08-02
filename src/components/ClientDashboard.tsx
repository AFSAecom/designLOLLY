import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Search,
  Heart,
  ShoppingCart,
  Filter,
  Star,
  Plus,
  Minus,
  X,
  User,
  Mail,
  Phone,
  Lock,
  Package,
  Gift,
  Users,
  TreePine,
  Edit,
  Eye,
  Calendar,
  DollarSign,
  Award,
  Copy,
  Check,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

// Types pour la simulation
type ViewType =
  | "catalog"
  | "product-detail"
  | "cart"
  | "checkout"
  | "order-summary"
  | "dashboard";

interface Product {
  id: string;
  code: string;
  lollyName: string;
  inspiredName: string;
  sourceBrand: string;
  olfactoryFamily: string;
  image: string;
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  sizes: {
    "15ml": number;
    "30ml": number;
    "50ml": number;
    "100ml": number;
  };
  gender: "homme" | "femme" | "mixte";
  season: "été" | "hiver" | "toute saison";
}

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  price: number;
}

function ClientDashboard() {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>("catalog");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("30ml");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [ingredientSearch, setIngredientSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("tous");
  const [seasonFilter, setSeasonFilter] = useState("toutes");
  const [familyFilter, setFamilyFilter] = useState("toutes");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [referralActivated, setReferralActivated] = useState(false);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data as Product[]);
      } else if (error) {
        console.error('Failed to load products', error.message);
      }
    };

    loadProducts();
  }, []);

  // Données simulées des produits
  const sampleProducts: Product[] = [
    {
      id: "1",
      code: "P001",
      lollyName: "Mystique Noir",
      inspiredName: "Black Opium",
      sourceBrand: "Yves Saint Laurent",
      olfactoryFamily: "Oriental Épicé",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&q=80",
      description:
        "Un parfum envoûtant aux notes de café noir et de vanille, parfait pour les soirées élégantes.",
      notes: {
        top: ["Poire", "Fleur d'oranger", "Poivre rose"],
        heart: ["Café", "Jasmin", "Amande amère"],
        base: ["Vanille", "Patchouli", "Cèdre"],
      },
      sizes: { "15ml": 25, "30ml": 45, "50ml": 65, "100ml": 95 },
      gender: "femme",
      season: "hiver",
    },
    {
      id: "2",
      code: "P002",
      lollyName: "Rose Éternelle",
      inspiredName: "La Vie Est Belle",
      sourceBrand: "Lancôme",
      olfactoryFamily: "Floral Fruité",
      image:
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=300&q=80",
      description:
        "Une fragrance florale délicate qui célèbre la joie de vivre avec ses notes de rose et d'iris.",
      notes: {
        top: ["Cassis", "Poire"],
        heart: ["Iris", "Jasmin", "Fleur d'oranger"],
        base: ["Praline", "Vanille", "Patchouli"],
      },
      sizes: { "15ml": 28, "30ml": 48, "50ml": 68, "100ml": 98 },
      gender: "femme",
      season: "toute saison",
    },
    {
      id: "3",
      code: "P003",
      lollyName: "Océan Bleu",
      inspiredName: "Bleu de Chanel",
      sourceBrand: "Chanel",
      olfactoryFamily: "Boisé Aromatique",
      image:
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80",
      description:
        "Un parfum masculin frais et sophistiqué, évoquant la liberté et l'élégance moderne.",
      notes: {
        top: ["Citron", "Menthe", "Poivre rose"],
        heart: ["Gingembre", "Noix de muscade", "Jasmin"],
        base: ["Cèdre", "Santal", "Ambre"],
      },
      sizes: { "15ml": 30, "30ml": 50, "50ml": 70, "100ml": 100 },
      gender: "homme",
      season: "été",
    },
    {
      id: "4",
      code: "P004",
      lollyName: "Ambre Doré",
      inspiredName: "Amber Oud",
      sourceBrand: "Tom Ford",
      olfactoryFamily: "Oriental Boisé",
      image:
        "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300&q=80",
      description:
        "Une composition luxueuse et mystérieuse alliant l'ambre précieux au oud envoûtant.",
      notes: {
        top: ["Rose", "Safran"],
        heart: ["Oud", "Ambre"],
        base: ["Santal", "Vanille", "Musc"],
      },
      sizes: { "15ml": 35, "30ml": 55, "50ml": 75, "100ml": 110 },
      gender: "mixte",
      season: "hiver",
    },
    {
      id: "5",
      code: "P005",
      lollyName: "Jardin Secret",
      inspiredName: "Flowerbomb",
      sourceBrand: "Viktor & Rolf",
      olfactoryFamily: "Floral Oriental",
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&q=80",
      description:
        "Un bouquet floral explosif et sensuel, véritable jardin secret de féminité.",
      notes: {
        top: ["Bergamote", "Thé"],
        heart: ["Sambac", "Orchidée", "Freesia", "Rose"],
        base: ["Patchouli", "Musc", "Vanille"],
      },
      sizes: { "15ml": 32, "30ml": 52, "50ml": 72, "100ml": 105 },
      gender: "femme",
      season: "toute saison",
    },
    {
      id: "6",
      code: "P006",
      lollyName: "Cuir Intense",
      inspiredName: "Tuscan Leather",
      sourceBrand: "Tom Ford",
      olfactoryFamily: "Cuir",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&q=80",
      description:
        "Un parfum de caractère au cuir noble, symbole de sophistication et de puissance.",
      notes: {
        top: ["Thym", "Safran", "Framboise"],
        heart: ["Cuir", "Jasmin"],
        base: ["Ambre", "Bois de santal", "Suède"],
      },
      sizes: { "15ml": 38, "30ml": 58, "50ml": 78, "100ml": 115 },
      gender: "mixte",
      season: "hiver",
    },
  ];

  // Filtrage des produits
  const filteredProducts = (products.length ? products : sampleProducts).filter(
    (product) => {
    const matchesSearch =
      searchTerm === "" ||
      product.lollyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.inspiredName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sourceBrand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIngredient =
      ingredientSearch === "" ||
      product.notes.top.some((note) =>
        note.toLowerCase().includes(ingredientSearch.toLowerCase()),
      ) ||
      product.notes.heart.some((note) =>
        note.toLowerCase().includes(ingredientSearch.toLowerCase()),
      ) ||
      product.notes.base.some((note) =>
        note.toLowerCase().includes(ingredientSearch.toLowerCase()),
      ) ||
      product.olfactoryFamily
        .toLowerCase()
        .includes(ingredientSearch.toLowerCase());

    const matchesGender =
      genderFilter === "tous" || product.gender === genderFilter;
    const matchesSeason =
      seasonFilter === "toutes" || product.season === seasonFilter;
    const matchesFamily =
      familyFilter === "toutes" ||
      product.olfactoryFamily
        .toLowerCase()
        .includes(familyFilter.toLowerCase());

    return (
      matchesSearch &&
      matchesIngredient &&
      matchesGender &&
      matchesSeason &&
      matchesFamily
    );
  });

  const handleAddToCart = () => {
    if (selectedProduct) {
      const newItem: CartItem = {
        product: selectedProduct,
        size: selectedSize,
        quantity: 1,
        price:
          selectedProduct.sizes[
            selectedSize as keyof typeof selectedProduct.sizes
          ],
      };
      setCartItems([...cartItems, newItem]);
      setShowAddToCartModal(true);
    }
  };

  const handleProceedToPayment = () => {
    setShowAddToCartModal(false);
    setShowLoginModal(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setCurrentView("dashboard");
  };

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText("LOLLY2024MARIE");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const tax = subtotal * 0.19; // 19% TVA
    return { subtotal, tax, total: subtotal + tax };
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const renderCatalog = () => (
    <div className="min-h-screen bg-lolly-background font-montserrat">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lolly-gray/20 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
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
              className="text-lolly-contrast hover:bg-lolly-primary/10 text-sm px-2"
            >
              <User className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Mon Espace</span>
            </Button>
            <Button
              variant="ghost"
              className="text-lolly-contrast hover:bg-lolly-primary/10 relative text-sm px-2"
              onClick={() => setCurrentView("cart")}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Panier</span>
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-lolly-primary text-white text-xs">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col space-y-4">
            {/* Search Bars - Two in first row */}
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

            {/* Filters - 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="border-2 border-lolly-contrast/30">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les genres</SelectItem>
                  <SelectItem value="femme">Femme</SelectItem>
                  <SelectItem value="homme">Homme</SelectItem>
                  <SelectItem value="mixte">Mixte</SelectItem>
                </SelectContent>
              </Select>

              <Select value={seasonFilter} onValueChange={setSeasonFilter}>
                <SelectTrigger className="border-2 border-lolly-contrast/30">
                  <SelectValue placeholder="Saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toutes">Toutes saisons</SelectItem>
                  <SelectItem value="été">Été</SelectItem>
                  <SelectItem value="hiver">Hiver</SelectItem>
                  <SelectItem value="toute saison">Toute saison</SelectItem>
                </SelectContent>
              </Select>

              <Select value={familyFilter} onValueChange={setFamilyFilter}>
                <SelectTrigger className="border-2 border-lolly-contrast/30">
                  <SelectValue placeholder="Famille olfactive" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toutes">Toutes familles</SelectItem>
                  <SelectItem value="floral">Floral</SelectItem>
                  <SelectItem value="oriental">Oriental</SelectItem>
                  <SelectItem value="boisé">Boisé</SelectItem>
                  <SelectItem value="cuir">Cuir</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:shadow-xl transition-shadow bg-white border border-lolly-gray/30"
              onClick={() => {
                setSelectedProduct(product);
                setCurrentView("product-detail");
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <Badge className="bg-lolly-contrast text-white font-bold text-sm scale-80">
                    {product.code}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-lolly-gray hover:text-lolly-primary scale-80"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>

                <div className="aspect-square mb-3 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.lollyName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="font-playfair font-semibold text-lolly-contrast text-sm">
                    {product.lollyName}
                  </h3>
                  <p className="text-xs text-lolly-gray italic">
                    {product.inspiredName}
                  </p>
                  <p className="text-xs text-lolly-gray font-medium">
                    {product.sourceBrand}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs border-lolly-primary text-lolly-primary"
                  >
                    {product.olfactoryFamily}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-lolly-background font-montserrat">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lolly-gray/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Button
              variant="ghost"
              onClick={() => setCurrentView("catalog")}
              className="mr-3 text-lolly-contrast hover:bg-lolly-primary/10 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Catalogue</span>
            </Button>
            <img
              src="/images/logo lolly.png"
              alt="Lolly"
              className="h-6 object-contain flex-shrink-0"
            />
          </div>
          <h1 className="text-xl font-playfair font-bold text-lolly-contrast">
            Mon Espace Client
          </h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className="text-lolly-contrast hover:bg-lolly-primary/10 relative text-sm px-2"
              onClick={() => setCurrentView("cart")}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Panier</span>
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-lolly-primary text-white text-xs">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-lolly-contrast hover:bg-red-50 hover:text-red-600 text-sm px-2"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mes Commandes */}
            <Card className="bg-white border border-lolly-gray/20">
              <CardHeader>
                <CardTitle className="font-playfair text-lolly-contrast flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Mes Commandes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Commande 1 */}
                  <div className="flex items-center justify-between p-4 border border-lolly-gray/20 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-lolly-contrast">
                          #CMD-2024-001
                        </span>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Livrée
                        </Badge>
                      </div>
                      <p className="text-sm text-lolly-gray">15 janvier 2024</p>
                      <p className="text-sm font-medium text-lolly-contrast">
                        Total: 127.50 DT
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-lolly-primary text-lolly-primary hover:bg-lolly-primary/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                  </div>

                  {/* Commande 2 */}
                  <div className="flex items-center justify-between p-4 border border-lolly-gray/20 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-lolly-contrast">
                          #CMD-2024-002
                        </span>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          En cours
                        </Badge>
                      </div>
                      <p className="text-sm text-lolly-gray">28 janvier 2024</p>
                      <p className="text-sm font-medium text-lolly-contrast">
                        Total: 89.00 DT
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-lolly-primary text-lolly-primary hover:bg-lolly-primary/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                  </div>

                  {/* Commande 3 */}
                  <div className="flex items-center justify-between p-4 border border-lolly-gray/20 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-lolly-contrast">
                          #CMD-2024-003
                        </span>
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                          Préparation
                        </Badge>
                      </div>
                      <p className="text-sm text-lolly-gray">2 février 2024</p>
                      <p className="text-sm font-medium text-lolly-contrast">
                        Total: 156.75 DT
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-lolly-primary text-lolly-primary hover:bg-lolly-primary/10"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mes Favoris */}
            <Card className="bg-white border border-lolly-gray/20">
              <CardHeader>
                <CardTitle className="font-playfair text-lolly-contrast flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Mes Favoris
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Favori 1 */}
                  <div className="flex items-center space-x-3 p-3 border border-lolly-gray/20 rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=60&q=80"
                      alt="Mystique Noir"
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-playfair font-semibold text-lolly-contrast text-sm">
                        Mystique Noir
                      </h4>
                      <p className="text-xs text-lolly-gray italic">
                        Black Opium
                      </p>
                      <p className="text-xs text-lolly-gray">
                        Yves Saint Laurent
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Favori 2 */}
                  <div className="flex items-center space-x-3 p-3 border border-lolly-gray/20 rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=60&q=80"
                      alt="Rose Éternelle"
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-playfair font-semibold text-lolly-contrast text-sm">
                        Rose Éternelle
                      </h4>
                      <p className="text-xs text-lolly-gray italic">
                        La Vie Est Belle
                      </p>
                      <p className="text-xs text-lolly-gray">Lancôme</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Favori 3 */}
                  <div className="flex items-center space-x-3 p-3 border border-lolly-gray/20 rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=60&q=80"
                      alt="Océan Bleu"
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-playfair font-semibold text-lolly-contrast text-sm">
                        Océan Bleu
                      </h4>
                      <p className="text-xs text-lolly-gray italic">
                        Bleu de Chanel
                      </p>
                      <p className="text-xs text-lolly-gray">Chanel</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 h-8 w-8"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Parrainage Section */}
            {!referralActivated ? (
              <Card className="bg-gradient-to-r from-lolly-primary/10 to-lolly-gold/10 border border-lolly-primary/30">
                <CardHeader>
                  <CardTitle className="font-playfair text-lolly-contrast flex items-center">
                    <TreePine className="w-5 h-5 mr-2" />
                    Je veux devenir parrain
                  </CardTitle>
                  <CardDescription className="text-lolly-gray">
                    Rejoignez le réseau Lolly Forest et gagnez des commissions
                    sur chaque filleul !
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-lolly-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-lolly-primary" />
                      </div>
                      <span className="text-sm text-lolly-contrast">
                        Parrainez vos amis et famille
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-lolly-primary/20 rounded-full flex items-center justify-center">
                        <DollarSign className="w-4 h-4 text-lolly-primary" />
                      </div>
                      <span className="text-sm text-lolly-contrast">
                        Gagnez jusqu'à 15% de commission
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-lolly-primary/20 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-lolly-primary" />
                      </div>
                      <span className="text-sm text-lolly-contrast">
                        Évoluez dans le réseau Lolly Forest
                      </span>
                    </div>
                    <Button
                      onClick={() => setReferralActivated(true)}
                      className="w-full bg-lolly-primary hover:bg-lolly-primary/90 text-white font-semibold"
                    >
                      Activer le parrainage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border border-lolly-gray/20">
                <CardHeader>
                  <CardTitle className="font-playfair text-lolly-contrast flex items-center">
                    <TreePine className="w-5 h-5 mr-2" />
                    Mon Tableau de Parrainage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Code de parrainage */}
                  <div className="bg-lolly-background p-4 rounded-lg">
                    <h4 className="font-playfair font-semibold text-lolly-contrast mb-2">
                      Mon code de parrainage
                    </h4>
                    <div className="flex items-center space-x-2">
                      <code className="bg-white px-3 py-2 rounded border text-lolly-contrast font-mono text-sm flex-1">
                        LOLLY2024MARIE
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyReferralCode}
                        className="border-lolly-primary text-lolly-primary hover:bg-lolly-primary/10"
                      >
                        {copiedCode ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Niveau actuel */}
                  <div className="bg-gradient-to-r from-lolly-gold/20 to-lolly-primary/20 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-playfair font-semibold text-lolly-contrast">
                        Mon niveau Lolly Forest
                      </h4>
                      <Badge className="bg-lolly-gold text-lolly-contrast border-lolly-gold">
                        Branch 🌿
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-lolly-gray">
                          Progression vers Tree
                        </span>
                        <span className="text-lolly-contrast font-medium">
                          7/10 filleuls
                        </span>
                      </div>
                      <div className="w-full bg-lolly-gray/30 rounded-full h-2">
                        <div
                          className="bg-lolly-primary h-2 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-lolly-gray">
                        Plus que 3 filleuls pour atteindre le niveau Tree 🌳
                      </p>
                    </div>
                  </div>

                  {/* Mes filleuls */}
                  <div>
                    <h4 className="font-playfair font-semibold text-lolly-contrast mb-3">
                      Mes filleuls (7)
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-lolly-background rounded-lg">
                        <div>
                          <span className="font-medium text-lolly-contrast">
                            Sarah
                          </span>
                          <p className="text-xs text-lolly-gray">
                            Inscrite le 12 jan 2024
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                            Active
                          </Badge>
                          <p className="text-xs text-lolly-gray mt-1">
                            3 commandes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-lolly-background rounded-lg">
                        <div>
                          <span className="font-medium text-lolly-contrast">
                            Amina
                          </span>
                          <p className="text-xs text-lolly-gray">
                            Inscrite le 18 jan 2024
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                            Active
                          </Badge>
                          <p className="text-xs text-lolly-gray mt-1">
                            1 commande
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-lolly-background rounded-lg">
                        <div>
                          <span className="font-medium text-lolly-contrast">
                            Leila
                          </span>
                          <p className="text-xs text-lolly-gray">
                            Inscrite le 25 jan 2024
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">
                            En attente
                          </Badge>
                          <p className="text-xs text-lolly-gray mt-1">
                            0 commande
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mes commissions */}
                  <div>
                    <h4 className="font-playfair font-semibold text-lolly-contrast mb-3">
                      Mes commissions
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-lolly-background rounded-lg">
                        <div>
                          <span className="font-medium text-lolly-contrast">
                            Commission Sarah
                          </span>
                          <p className="text-xs text-lolly-gray">
                            Niveau 1 - 15 jan 2024
                          </p>
                        </div>
                        <span className="font-semibold text-green-600">
                          +12.75 DT
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-lolly-background rounded-lg">
                        <div>
                          <span className="font-medium text-lolly-contrast">
                            Commission Amina
                          </span>
                          <p className="text-xs text-lolly-gray">
                            Niveau 1 - 20 jan 2024
                          </p>
                        </div>
                        <span className="font-semibold text-green-600">
                          +8.90 DT
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-lolly-background rounded-lg">
                        <div>
                          <span className="font-medium text-lolly-contrast">
                            Commission indirecte
                          </span>
                          <p className="text-xs text-lolly-gray">
                            Niveau 2 - 28 jan 2024
                          </p>
                        </div>
                        <span className="font-semibold text-green-600">
                          +4.25 DT
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-gradient-to-r from-lolly-primary/10 to-lolly-gold/10 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-playfair font-semibold text-lolly-contrast">
                          Total des commissions
                        </span>
                        <span className="font-bold text-lg text-lolly-contrast">
                          25.90 DT
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Bonus Anniversaire */}
            <Card className="bg-gradient-to-br from-pink-50 to-lolly-background border border-lolly-primary/30">
              <CardHeader>
                <CardTitle className="font-playfair text-lolly-contrast flex items-center">
                  <Gift className="w-5 h-5 mr-2" />
                  Bonus Anniversaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-lolly-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Gift className="w-8 h-8 text-lolly-primary" />
                  </div>
                  <p className="text-sm text-lolly-contrast font-medium">
                    🎉 Vous recevrez un cadeau le jour de votre anniversaire !
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-lolly-gray">
                    <Calendar className="w-4 h-4" />
                    <span>15 mars 2024</span>
                  </div>
                  <p className="text-xs text-lolly-gray">
                    Un parfum surprise vous attend pour votre anniversaire
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mes Informations */}
            <Card className="bg-white border border-lolly-gray/20">
              <CardHeader>
                <CardTitle className="font-playfair text-lolly-contrast flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Mes Informations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-lolly-gray uppercase tracking-wide">
                      Nom complet
                    </label>
                    <p className="text-sm font-medium text-lolly-contrast">
                      Marie Dubois
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-lolly-gray uppercase tracking-wide">
                      Email
                    </label>
                    <p className="text-sm font-medium text-lolly-contrast">
                      marie.dubois@email.com
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-lolly-gray uppercase tracking-wide">
                      Téléphone
                    </label>
                    <p className="text-sm font-medium text-lolly-contrast">
                      +216 20 123 456
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-lolly-gray uppercase tracking-wide">
                      Date de naissance
                    </label>
                    <p className="text-sm font-medium text-lolly-contrast">
                      15 mars 1992
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-lolly-primary text-lolly-primary hover:bg-lolly-primary/10"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier mes informations
                </Button>
              </CardContent>
            </Card>

            {/* Statistiques rapides */}
            <Card className="bg-white border border-lolly-gray/20">
              <CardHeader>
                <CardTitle className="font-playfair text-lolly-contrast text-sm">
                  Mes Statistiques
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lolly-primary">
                      12
                    </div>
                    <div className="text-xs text-lolly-gray">Commandes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lolly-primary">
                      3
                    </div>
                    <div className="text-xs text-lolly-gray">Favoris</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lolly-primary">
                      7
                    </div>
                    <div className="text-xs text-lolly-gray">Filleuls</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lolly-primary">
                      25.90
                    </div>
                    <div className="text-xs text-lolly-gray">DT gagnés</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProductDetail = () => {
    if (!selectedProduct) return null;

    return (
      <div className="min-h-screen bg-lolly-background font-montserrat">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-lolly-gray/20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center min-w-0">
              <Button
                variant="ghost"
                onClick={() => setCurrentView("catalog")}
                className="mr-2 text-lolly-contrast hover:bg-lolly-primary/10 flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">Catalogue</span>
              </Button>
              <img
                src="/images/logo lolly.png"
                alt="Lolly"
                className="h-6 object-contain flex-shrink-0"
              />
            </div>
            <Button
              variant="ghost"
              className="text-lolly-contrast hover:bg-lolly-primary/10 relative text-sm px-2"
              onClick={() => setCurrentView("cart")}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Panier</span>
              {cartItems.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-lolly-primary text-white text-xs">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
          </div>
        </header>

        {/* Product Detail */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-lolly-gray/20">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Image */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Badge className="bg-lolly-contrast text-white font-bold text-sm">
                    {selectedProduct.code}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-lolly-gray hover:text-lolly-primary h-8 w-8"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
                <div className="aspect-square overflow-hidden rounded-xl mx-auto">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.lollyName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-playfair font-bold text-lolly-contrast mb-2">
                    {selectedProduct.lollyName}
                  </h1>
                  <p className="text-base md:text-lg text-lolly-gray italic mb-1">
                    Inspiré de {selectedProduct.inspiredName}
                  </p>
                  <p className="text-lolly-gray font-medium">
                    {selectedProduct.sourceBrand}
                  </p>
                  <Badge className="mt-2 bg-lolly-primary/10 text-lolly-primary border-lolly-primary">
                    {selectedProduct.olfactoryFamily}
                  </Badge>
                </div>

                <div>
                  <h3 className="font-playfair font-bold text-lolly-contrast mb-3">
                    Notes olfactives
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-bold text-lolly-contrast">
                        Tête :{" "}
                      </span>
                      <span className="text-lolly-gray">
                        {selectedProduct.notes.top.join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-lolly-contrast">
                        Cœur :{" "}
                      </span>
                      <span className="text-lolly-gray">
                        {selectedProduct.notes.heart.join(", ")}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-lolly-contrast">
                        Fond :{" "}
                      </span>
                      <span className="text-lolly-gray">
                        {selectedProduct.notes.base.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-playfair font-bold text-lolly-contrast mb-3">
                    Description
                  </h3>
                  <p className="text-lolly-gray leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Size Selection */}
                <div className="flex flex-col items-center">
                  <h3 className="font-playfair font-bold text-lolly-contrast mb-3 text-center">
                    Choisir la contenance
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3 w-full max-w-xs md:max-w-md mx-auto">
                    {Object.entries(selectedProduct.sizes).map(
                      ([size, price]) => (
                        <Button
                          key={size}
                          variant={
                            selectedSize === size ? "default" : "outline"
                          }
                          className={`p-3 md:p-4 h-auto flex flex-col text-sm md:text-base ${
                            selectedSize === size
                              ? "bg-lolly-primary hover:bg-lolly-primary/90 text-white"
                              : "border-lolly-gray/30 text-lolly-contrast hover:bg-lolly-primary/10"
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          <span className="font-semibold">{size}</span>
                          <span className="text-xs md:text-sm">{price} DT</span>
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <div className="flex justify-center px-4">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full max-w-xs md:max-w-md bg-lolly-primary hover:bg-lolly-primary/90 text-white font-semibold py-3 text-base md:text-lg mx-auto"
                  >
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span className="text-sm md:text-base">
                      Ajouter au panier -{" "}
                      {
                        selectedProduct.sizes[
                          selectedSize as keyof typeof selectedProduct.sizes
                        ]
                      }{" "}
                      DT
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCart = () => (
    <div className="min-h-screen bg-lolly-background font-montserrat">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lolly-gray/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center min-w-0">
            <Button
              variant="ghost"
              onClick={() => setCurrentView("catalog")}
              className="mr-2 text-lolly-contrast hover:bg-lolly-primary/10 flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Catalogue</span>
            </Button>
            <h1 className="text-xl font-playfair font-bold text-lolly-contrast">
              Mon Panier
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-lolly-gray/50 mx-auto mb-4" />
            <h2 className="text-xl font-playfair font-semibold text-lolly-contrast mb-2">
              Votre panier est vide
            </h2>
            <p className="text-lolly-gray mb-6">
              Découvrez notre collection de parfums dupes de luxe
            </p>
            <Button
              onClick={() => setCurrentView("catalog")}
              className="bg-lolly-primary hover:bg-lolly-primary/90 text-white"
            >
              Découvrir le catalogue
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-playfair font-semibold text-lolly-contrast mb-6">
                Articles dans votre panier
              </h2>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 sm:space-x-3 p-3 sm:p-4 border border-lolly-gray/20 rounded-lg"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.lollyName}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="font-playfair font-semibold text-lolly-contrast text-sm">
                        {item.product.lollyName}
                      </h3>
                      <p className="text-xs text-lolly-gray">
                        {item.product.inspiredName} - {item.size}
                      </p>
                      <p className="text-xs text-lolly-gray leading-relaxed">
                        {item.product.description.substring(0, 80)}...
                      </p>
                      <p className="text-xs font-medium text-lolly-contrast">
                        {item.price} DT
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 flex-shrink-0">
                      <Button variant="outline" size="icon" className="h-5 w-5">
                        <Minus className="w-2 h-2" />
                      </Button>
                      <span className="w-4 text-center text-xs font-medium">
                        {item.quantity}
                      </span>
                      <Button variant="outline" size="icon" className="h-5 w-5">
                        <Plus className="w-2 h-2" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 h-6 w-6 flex-shrink-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-playfair font-semibold text-lolly-contrast mb-4">
                Récapitulatif
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-lolly-gray">Sous-total</span>
                  <span className="text-lolly-contrast">
                    {calculateTotal().subtotal.toFixed(2)} DT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lolly-gray">TVA (19%)</span>
                  <span className="text-lolly-contrast">
                    {calculateTotal().tax.toFixed(2)} DT
                  </span>
                </div>
                <div className="border-t border-lolly-gray/20 pt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-lolly-contrast">Total</span>
                    <span className="text-lolly-contrast">
                      {calculateTotal().total.toFixed(2)} DT
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setShowLoginModal(true)}
                className="w-full mt-6 bg-lolly-primary hover:bg-lolly-primary/90 text-white font-semibold py-3"
              >
                Procéder au paiement
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="min-h-screen bg-lolly-background font-montserrat">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-lolly-gray/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-playfair font-bold text-lolly-contrast text-center">
            Confirmation de commande
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-playfair font-bold text-lolly-contrast mb-2">
              Commande confirmée !
            </h2>
            <p className="text-lolly-gray">
              Merci pour votre commande. Vous recevrez un email de confirmation.
            </p>
          </div>

          {/* Order Details */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-playfair font-semibold text-lolly-contrast mb-4">
                Détails de la commande
              </h3>
              <div className="space-y-3">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-lolly-background rounded-lg"
                  >
                    <div>
                      <span className="font-medium text-lolly-contrast">
                        {item.product.lollyName} ({item.size})
                      </span>
                      <span className="text-lolly-gray ml-2">
                        x{item.quantity}
                      </span>
                    </div>
                    <span className="font-medium text-lolly-contrast">
                      {(item.price * item.quantity).toFixed(2)} DT
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-lolly-gray/20 pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-lolly-contrast">Total payé</span>
                <span className="text-lolly-contrast">
                  {calculateTotal().total.toFixed(2)} DT
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Button
                onClick={() => {
                  setCartItems([]);
                  setCurrentView("catalog");
                }}
                variant="outline"
                className="flex-1 border-lolly-primary text-lolly-primary hover:bg-lolly-primary/10"
              >
                Continuer mes achats
              </Button>
              <Button
                onClick={() => navigate("/client/dashboard")}
                className="flex-1 bg-lolly-primary hover:bg-lolly-primary/90 text-white"
              >
                Accéder à mon espace
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentView === "catalog" && renderCatalog()}
      {currentView === "product-detail" && renderProductDetail()}
      {currentView === "cart" && renderCart()}
      {currentView === "order-summary" && renderOrderSummary()}
      {currentView === "dashboard" && renderDashboard()}

      {/* Add to Cart Modal */}
      <Dialog open={showAddToCartModal} onOpenChange={setShowAddToCartModal}>
        <DialogContent className="sm:max-w-sm w-[80%] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-playfair text-lolly-contrast">
              Produit ajouté au panier !
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lolly-gray mb-6">
              Que souhaitez-vous faire maintenant ?
            </p>
          </div>
          <DialogFooter className="flex-col space-y-2 sm:flex-col sm:space-x-0">
            <Button
              onClick={() => setShowAddToCartModal(false)}
              variant="outline"
              className="w-full border-lolly-primary text-lolly-primary hover:bg-lolly-primary/10"
            >
              Retourner au catalogue
            </Button>
            <Button
              onClick={handleProceedToPayment}
              className="w-full bg-lolly-primary hover:bg-lolly-primary/90 text-white"
            >
              Procéder au paiement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="sm:max-w-sm w-[80%] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-playfair text-lolly-contrast text-center">
              Connexion requise
            </DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Créer un compte</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-lolly-contrast">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lolly-gray w-4 h-4" />
                    <Input
                      placeholder="votre@email.com"
                      className="pl-10 border-2 border-lolly-contrast/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-lolly-contrast">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lolly-gray w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-2 border-lolly-contrast/30"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full bg-lolly-primary hover:bg-lolly-primary/90 text-white"
                >
                  Se connecter
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
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
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lolly-gray w-4 h-4" />
                    <Input
                      placeholder="+216 XX XXX XXX"
                      className="pl-10 border-2 border-lolly-contrast/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-lolly-contrast">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lolly-gray w-4 h-4" />
                    <Input
                      placeholder="votre@email.com"
                      className="pl-10 border-2 border-lolly-contrast/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-lolly-contrast">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lolly-gray w-4 h-4" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-10 border-2 border-lolly-contrast/30"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full bg-lolly-primary hover:bg-lolly-primary/90 text-white"
                >
                  Créer mon compte
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ClientDashboard;

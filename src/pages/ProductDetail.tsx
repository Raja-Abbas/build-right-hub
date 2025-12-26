import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { ArrowLeft, ShoppingCart, Check, Loader2, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        if (data?.variants.edges[0]) {
          setSelectedVariantId(data.variants.edges[0].node.id);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  const selectedVariant = product?.variants.edges.find(
    v => v.node.id === selectedVariantId
  )?.node;

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const shopifyProduct: ShopifyProduct = {
      node: product
    };

    addItem({
      product: shopifyProduct,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });

    setIsAdded(true);
    toast.success("Added to cart", {
      description: `${quantity}x ${product.title}`,
      position: "top-center"
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link to="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Button>
        </Link>
      </div>
    );
  }

  const images = product.images.edges;
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-display font-semibold text-foreground">
                SaniSource
              </span>
            </Link>
            <CartDrawer />
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container">
          <Link 
            to="/#shop" 
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
                {images[selectedImage]?.node ? (
                  <img
                    src={images[selectedImage].node.url}
                    alt={images[selectedImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image.node.url}
                        alt={image.node.altText || `${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {product.title}
              </h1>
              
              <p className="text-2xl font-bold text-primary mb-6">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </p>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description || "Quality sanitary material for your construction and renovation needs."}
              </p>

              {/* Variants */}
              {product.options.length > 0 && product.options[0].name !== 'Title' && (
                <div className="space-y-4 mb-8">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="block text-sm font-medium mb-2">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const matchingVariant = product.variants.edges.find(
                            v => v.node.selectedOptions.some(
                              so => so.name === option.name && so.value === value
                            )
                          );
                          const isSelected = selectedVariant?.selectedOptions.some(
                            so => so.name === option.name && so.value === value
                          );
                          
                          return (
                            <Button
                              key={value}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => matchingVariant && setSelectedVariantId(matchingVariant.node.id)}
                            >
                              {value}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button
                variant="hero"
                size="xl"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart — {price.currencyCode} {(parseFloat(price.amount) * quantity).toFixed(2)}
                  </>
                )}
              </Button>

              {!selectedVariant?.availableForSale && (
                <p className="mt-4 text-center text-destructive">
                  This item is currently out of stock
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;

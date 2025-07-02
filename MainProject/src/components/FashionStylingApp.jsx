import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles, Star, Heart, ChevronRight } from 'lucide-react';

const FashionStylingApp = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [detectedType, setDetectedType] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [likedStyles, setLikedStyles] = useState({});
  const fileInputRef = useRef(null);

  const shirtStyles = [
    {
      id: 1,
      name: "Classic Tuck",
      image: "https://i.pinimg.com/736x/d4/a2/2d/d4a22dec37d903a38f416e887a89c38b.jpg",
      difficulty: "Easy",
      occasion: "Office or Casual",
      tutorial: [
        "Tuck shirt fully into high-waisted pants",
        "Add a belt to define your waist",
        "Choose fitted or slightly oversized shirt",
        "Pair with heels or flats",
        "Perfect for office or casual settings"
      ]
    },
    {
      id: 2,
      name: "French Tuck",
      image: "https://i.pinimg.com/736x/cb/6e/af/cb6eaf8cad95255d08669f5c0bee5710.jpg",
      difficulty: "Easy",
      occasion: "Casual Outings",
      tutorial: [
        "Tuck only the front center of shirt",
        "Leave sides and back loose",
        "Works best with high-waisted bottoms",
        "Creates relaxed, effortless look",
        "Perfect for casual outings"
      ]
    },
    {
      id: 3,
      name: "Tied at Waist",
      image: "https://i.pinimg.com/736x/01/37/fb/0137fb8c6229f323ad5ccc6da3f8252b.jpg",
      difficulty: "Easy",
      occasion: "Summer Styling",
      tutorial: [
        "Tie shirt ends at natural waist",
        "Works with crop or regular length shirts",
        "Pair with high-waisted bottoms",
        "Creates hourglass silhouette",
        "Great for summer styling"
      ]
    },
    {
      id: 4,
      name: "Oversized Layering",
      image: "https://i.pinimg.com/736x/28/9a/8f/289a8f9f100faa51f380da5223784977.jpg",
      difficulty: "Medium",
      occasion: "Variable Weather",
      tutorial: [
        "Wear shirt open over tank/tee",
        "Roll sleeves to 3/4 length",
        "Leave unbuttoned for casual layer",
        "Tie around waist when not wearing",
        "Perfect for variable weather"
      ]
    },
    {
      id: 5,
      name: "Collar Pop",
      image: "https://i.pinimg.com/736x/84/f5/b5/84f5b542329094ac5f2a4956efa89ff5.jpg",
      difficulty: "Easy",
      occasion: "Preppy Styling",
      tutorial: [
        "Wear under crew neck sweater",
        "Let collar peek out stylishly",
        "Choose contrasting colors",
        "Keep shirt fitted underneath",
        "Classic preppy styling"
      ]
    },
    {
      id: 6,
      name: "Off-Shoulder Style",
      image: "https://i.pinimg.com/736x/eb/bd/6b/ebbd6b846349df001b8e1e34b96aa8a2.jpg",
      difficulty: "Medium",
      occasion: "Evening Look",
      tutorial: [
        "Unbutton and slide off one shoulder",
        "Pair with or without a slip",
        "Pair with fitted bottoms",
        "Add delicate jewelry",
        "Romantic evening look"
      ]
    },
    {
      id: 7,
      name: "Sleeves Rolled",
      image: "https://i.pinimg.com/736x/d1/dc/5e/d1dc5e369bf2e8d17d6305f5a5d92947.jpg",
      difficulty: "Easy",
      occasion: "Professional Casual",
      tutorial: [
        "Roll sleeves to forearm length",
        "Cuff them neatly for polished look",
        "Tuck into pants or leave loose",
        "Add watch or bracelet",
        "Professional casual styling"
      ]
    },
    {
      id: 8,
      name: "Shirt Dress Style",
      image: "https://i.pinimg.com/736x/58/66/36/586636a7046d410be4ee83368da1708b.jpg",
      difficulty: "Medium",
      occasion: "Effortless Chic",
      tutorial: [
        "Wear long shirt as mini dress",
        "Add belt to cinch waist",
        "Pair with knee-high boots",
        "Layer with tights in winter",
        "Effortless chic look"
      ]
    },
    {
      id: 9,
      name: "Under Slip Dress",
      image: "https://i.pinimg.com/736x/1c/de/4f/1cde4f9807a60b101232c046cec79255.jpg",
      difficulty: "Medium",
      occasion: "Modern Styling",
      tutorial: [
        "Wear fitted shirt under slip dress",
        "Let sleeves and collar show",
        "Choose complementary colors",
        "Creates layered texture",
        "Modern styling technique"
      ]
    },
    {
      id: 10,
      name: "Statement Belt",
      image: "https://i.pinimg.com/736x/8e/78/05/8e7805e4e561fd7639cd3cde4ec98c6c.jpg",
      difficulty: "Easy",
      occasion: "Waist Definition",
      tutorial: [
        "Add wide belt over loose shirt",
        "Tuck shirt loosely first",
        "Choose contrasting belt color",
        "Pair with fitted bottoms",
        "Defines waist beautifully"
      ]
    }
  ];

  const tankStyles = [
    {
      id: 11,
      name: "Layered Under Blazer",
      image: "https://i.pinimg.com/736x/0b/7a/c1/0b7ac1a930a8bd1b4a1eddb9e9d9d035.jpg",
      difficulty: "Easy",
      occasion: "Professional",
      tutorial: [
        "Wear fitted tank under blazer",
        "Choose complementary colors",
        "Add tailored trousers",
        "Pair with heels or flats",
        "Professional, polished look"
      ]
    },
    {
      id: 12,
      name: "Summer Casual",
      image: "https://i.pinimg.com/736x/e6/43/4a/e6434a99a71e650a8f5109d6c519eb92.jpg",
      difficulty: "Easy",
      occasion: "Hot Weather",
      tutorial: [
        "Pair with denim shorts",
        "Add flip-flops or sandals",
        "Perfect for hot weather",
        "Relaxed, vacation-ready look",
        "Keep accessories minimal"
      ]
    },
    {
      id: 13,
      name: "Workout Chic",
      image: "https://i.pinimg.com/736x/3d/c0/ff/3dc0ff9fa30dccdb5fcec6a2c452639d.jpg",
      difficulty: "Easy",
      occasion: "Gym to Street",
      tutorial: [
        "Wear with high-waisted leggings",
        "Add matching sports bra underneath",
        "Pair with clean sneakers",
        "Perfect for gym-to-street",
        "Athletic, put-together look"
      ]
    },
    {
      id: 14,
      name: "Tucked Sophisticated",
      image: "https://i.pinimg.com/736x/68/da/77/68da77c7ab84b1214d0dfff4294eae19.jpg",
      difficulty: "Medium",
      occasion: "Professional",
      tutorial: [
        "Tuck into high-waisted trousers",
        "Add statement belt",
        "Pair with heels and blazer",
        "Choose silk or quality cotton",
        "Elevated, professional style"
      ]
    },
    {
      id: 15,
      name: "Layered Under Sheer",
      image: "https://i.pinimg.com/736x/01/42/b6/0142b613b6f630990fe82894c26e4360.jpg",
      difficulty: "Medium",
      occasion: "Textured Look",
      tutorial: [
        "Wear tank under sheer top",
        "Let tank provide coverage",
        "Choose complementary colors",
        "Add delicate jewelry",
        "Creates interesting texture"
      ]
    },
    {
      id: 16,
      name: "Bohemian Flow",
      image: "https://i.pinimg.com/736x/d1/d2/53/d1d253523086b82a4b92e8c5802b3dde.jpg",
      difficulty: "Easy",
      occasion: "Artistic Vibe",
      tutorial: [
        "Pair with flowing maxi skirt",
        "Add layered necklaces",
        "Wear with sandals",
        "Choose loose, comfortable fit",
        "Free-spirited, artistic vibe"
      ]
    },
    {
      id: 17,
      name: "Edgy Leather",
      image: "https://i.pinimg.com/736x/8b/02/6c/8b026ce424f76a58b3de20312474a0c8.jpg",
      difficulty: "Medium",
      occasion: "Rock Chic",
      tutorial: [
        "Pair with leather pants or skirt",
        "Add combat boots or heels",
        "Choose black or white tank",
        "Add silver jewelry",
        "Rock-chic, rebellious style"
      ]
    },
    {
      id: 18,
      name: "Preppy Layering",
      image: "https://i.pinimg.com/736x/53bb/7c/53bb7c09e74b05c54150f73b606dbddf.jpg",
      difficulty: "Easy",
      occasion: "Collegiate Look",
      tutorial: [
        "Wear under button-down shirt",
        "Keep the shirt half buttoned or open",
        "Pair with chinos or skirt",
        "Add loafers or boat shoes",
        "Classic, collegiate look"
      ]
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      // For demo purposes, randomly detect shirt or tank
      const types = ['shirt', 'tank'];
      const detected = types[Math.floor(Math.random() * types.length)];
      setDetectedType(detected);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStylesForType = () => {
    return detectedType === 'tank' ? tankStyles : shirtStyles;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-pink-500 mr-2" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              StyleGenius
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Transform your wardrobe with AI-powered styling suggestions</p>
        </div>

        {/* Upload Section */}
        {!uploadedImage && (
          <div className="max-w-md mx-auto mb-8">
            <div 
              className="border-2 border-dashed border-pink-300 rounded-xl p-8 text-center bg-white/50 backdrop-blur-sm hover:border-pink-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Your Outfit</h3>
              <p className="text-gray-500 mb-4">Upload a photo of your shirt or tank top</p>
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all">
                Choose Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* Analysis Section */}
        {uploadedImage && (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Uploaded Image */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-pink-500" />
                  Your Upload
                </h3>
                <img 
                  src={uploadedImage} 
                  alt="Uploaded outfit" 
                  className="w-48 h-auto object-contain rounded-lg mb-4 mx-auto"
                />
                <button 
                  onClick={() => {
                    setUploadedImage(null);
                    setDetectedType(null);
                    setSelectedStyle(null);
                  }}
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                >
                  Upload Different Image
                </button>
              </div>

              {/* Analysis Results */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">AI Analysis</h3>
                {isAnalyzing ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                    <span className="ml-3 text-gray-600">Analyzing your outfit...</span>
                  </div>
                ) : detectedType ? (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-green-600 font-medium">Detection Complete</span>
                    </div>
                    <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4">
                      <p className="text-lg">
                        <span className="font-semibold">Detected:</span> {detectedType === 'tank' ? 'Tank Top' : 'Shirt'}
                      </p>
                      <p className="text-gray-600 mt-2">
                        {getStylesForType().length} styling options available
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Style Suggestions */}
            {detectedType && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-2 text-pink-500" />
                  Style Suggestions for Your {detectedType === 'tank' ? 'Tank Top' : 'Shirt'}
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getStylesForType().map((style) => (
                    <div 
                      key={style.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <img 
                        src={style.image} 
                        alt={style.name}
                        className="w-full h-120 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-lg">{style.name}</h4>
                          <Heart
  className={`w-5 h-5 cursor-pointer transition-colors ${likedStyles[style.id] ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
  fill={likedStyles[style.id] ? 'red' : 'none'}
  onClick={() => setLikedStyles(prev => ({ ...prev, [style.id]: !prev[style.id] }))}
/>
                        </div>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(style.difficulty)}`}>
                            {style.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">{style.occasion}</span>
                        </div>
                        <button 
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center"
                          onClick={() => setSelectedStyle(style)}
                        >
                          View Tutorial
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tutorial Modal */}
            {selectedStyle && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold">{selectedStyle.name} Tutorial</h3>
                      <button 
                        onClick={() => setSelectedStyle(null)}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                      >
                        ×
                      </button>
                    </div>
                    
                    <img 
                      src={selectedStyle.image} 
                      alt={selectedStyle.name}
                      className="w-48 h-70 object-cover rounded-lg mb-6 mx-auto"
                    />
                    
                    <div className="flex items-center mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedStyle.difficulty)} mr-3`}>
                        {selectedStyle.difficulty}
                      </span>
                      <span className="text-sm text-gray-600">Perfect for: {selectedStyle.occasion}</span>
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-3">Step-by-Step Tutorial:</h4>
                    <div className="space-y-3">
                      {selectedStyle.tutorial.map((step, index) => (
                        <div key={index} className="flex items-start">
                          <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all">
                        Save Style
                      </button>
                      <button 
                        onClick={() => setSelectedStyle(null)}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FashionStylingApp;
import React, { useState } from 'react';
import { Upload, Map, Activity, Layers, BarChart3, Settings, Upload as UploadIcon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const tabs = [
    { id: 'upload', icon: Upload, label: 'Upload Image' },
    { id: 'process', icon: Activity, label: 'Cloud Removal' },
    { id: 'measure', icon: Map, label: 'Land Measurement' },
    { id: 'analyze', icon: BarChart3, label: 'Analysis' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setActiveTab('process');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'upload':
        return (
          <div className="flex flex-col items-center justify-center space-y-6 p-8">
            <div className="w-full max-w-xl h-80 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 bg-gray-50">
              <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
              <label className="cursor-pointer">
                <span className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Select Satellite Image
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              <p className="text-sm text-gray-500 mt-2">Supported formats: JPEG, PNG, TIFF</p>
            </div>
          </div>
        );

      case 'process':
        return (
          <div className="grid grid-cols-2 gap-6 p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Original Image</h3>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Original"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Processed Image</h3>
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1569429593410-b498b3fb3387?auto=format&fit=crop&w=800"
                  alt="Processed"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-2">
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
                Apply Cloud Removal
              </button>
            </div>
          </div>
        );

      case 'measure':
        return (
          <div className="p-6 space-y-6">
            <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1569429593410-b498b3fb3387?auto=format&fit=crop&w=800"
                alt="Measurement"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
                <h4 className="font-semibold mb-2">Measurements</h4>
                <div className="space-y-2">
                  <p className="text-sm">Total Area: 245.3 hectares</p>
                  <p className="text-sm">Perimeter: 2.3 km</p>
                  <p className="text-sm">Land Type: Agricultural</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Draw Area
              </button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                Auto Detect Boundaries
              </button>
            </div>
          </div>
        );

      case 'analyze':
        return (
          <div className="p-6 grid grid-cols-2 gap-6">
            <div className="col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Land Analysis Results</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-700">Vegetation Index</h4>
                  <p className="text-2xl font-bold text-blue-900">0.76</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-700">Land Usage</h4>
                  <p className="text-2xl font-bold text-green-900">Agricultural</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-700">Soil Quality</h4>
                  <p className="text-2xl font-bold text-purple-900">High</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-4">Historical Data</h4>
              <div className="h-48 bg-gray-100 rounded-lg"></div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold mb-4">Recommendations</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Optimal for crop rotation in next season</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Consider irrigation system upgrade</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Soil enrichment recommended</span>
                </li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Layers className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-semibold">LandSense AI</span>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Settings className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="min-h-[600px]">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
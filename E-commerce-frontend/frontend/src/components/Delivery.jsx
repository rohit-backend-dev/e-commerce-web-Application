import React, { useState } from "react";
import { Package, Truck, MapPin, Clock, DollarSign, Globe, AlertCircle, CheckCircle, XCircle, Search, Calendar, Shield, Zap } from "lucide-react";

const DeliveryPage = () => {
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [postalCode, setPostalCode] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState(null);
  const [activeTab, setActiveTab] = useState("domestic");

  const deliveryZones = {
    domestic: [
      { name: "Standard Shipping", time: "5-7 business days", cost: "$5.99", icon: Truck },
      { name: "Express Shipping", time: "2-3 business days", cost: "$12.99", icon: Zap },
      { name: "Overnight Shipping", time: "1 business day", cost: "$24.99", icon: Package },
      { name: "Free Shipping", time: "7-10 business days", cost: "Free", icon: CheckCircle, condition: "Orders over $50" }
    ],
    international: [
      { name: "Standard International", time: "10-15 business days", cost: "$19.99", icon: Globe },
      { name: "Express International", time: "5-7 business days", cost: "$39.99", icon: Zap },
      { name: "Premium International", time: "3-5 business days", cost: "$59.99", icon: Package }
    ]
  };

  const countries = [
    { code: "us", name: "United States", flag: "🇺🇸", available: true },
    { code: "ca", name: "Canada", flag: "🇨🇦", available: true },
    { code: "uk", name: "United Kingdom", flag: "🇬🇧", available: true },
    { code: "au", name: "Australia", flag: "🇦🇺", available: true },
    { code: "de", name: "Germany", flag: "🇩🇪", available: true },
    { code: "fr", name: "France", flag: "🇫🇷", available: true },
    { code: "in", name: "India", flag: "🇮🇳", available: true },
    { code: "jp", name: "Japan", flag: "🇯🇵", available: true }
  ];

  const checkDelivery = () => {
    if (postalCode.length >= 3) {
      const today = new Date();
      const delivery = new Date(today.setDate(today.getDate() + Math.floor(Math.random() * 5) + 3));
      setEstimatedDelivery(delivery.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }
  };

  const faqs = [
    {
      q: "How do I track my order?",
      a: "Once your order ships, you'll receive a tracking number via email. You can track your package using this number on our Track Order page or directly on the carrier's website."
    },
    {
      q: "What if I'm not home during delivery?",
      a: "Most carriers will leave a notice and attempt redelivery. You can also arrange to pick up your package at a nearby facility or provide delivery instructions through the tracking portal."
    },
    {
      q: "Do you ship to P.O. boxes?",
      a: "Yes, we ship to P.O. boxes via USPS. However, express and overnight shipping options are not available for P.O. box addresses."
    },
    {
      q: "Can I change my delivery address after ordering?",
      a: "Yes, but only before the order has shipped. Contact our customer service immediately at support@ecommerce.com to update your address."
    },
    {
      q: "What are customs fees for international orders?",
      a: "International customers are responsible for any customs duties, taxes, or fees imposed by their country. These charges are not included in our shipping costs."
    },
    {
      q: "Do you offer same-day delivery?",
      a: "Same-day delivery is available in select metropolitan areas for orders placed before 12 PM. Check your zip code at checkout to see if you're eligible."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Package className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Shipping & Delivery
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Fast, reliable delivery to your doorstep. Track your order every step of the way.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Delivery Time Estimator */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <Search className="w-6 h-6 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Check Delivery Time</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Postal / ZIP Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="Enter your postal code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={checkDelivery}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Check
                </button>
              </div>
            </div>
          </div>

          {estimatedDelivery && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-green-900">Delivery Available!</p>
                <p className="text-green-700 text-sm">
                  Estimated delivery by <span className="font-semibold">{estimatedDelivery}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Shipping Options Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab("domestic")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "domestic"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <MapPin className="w-5 h-5 inline mr-2" />
              Domestic Shipping
            </button>
            <button
              onClick={() => setActiveTab("international")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === "international"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Globe className="w-5 h-5 inline mr-2" />
              International Shipping
            </button>
          </div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {deliveryZones[activeTab].map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={index}
                    className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{option.name}</h3>
                          <p className="text-sm text-gray-600 flex items-center mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            {option.time}
                          </p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-blue-600">{option.cost}</span>
                    </div>
                    {option.condition && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        {option.condition}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Secure Packaging</h3>
            <p className="text-gray-600 text-sm">
              All items are carefully packaged with protective materials to ensure safe delivery.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Real-Time Tracking</h3>
            <p className="text-gray-600 text-sm">
              Monitor your package's journey from our warehouse to your doorstep with live updates.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Delivery Guarantee</h3>
            <p className="text-gray-600 text-sm">
              If your package is lost or damaged, we'll replace it or issue a full refund.
            </p>
          </div>
        </div>

        {/* Shipping Carriers */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Our Trusted Shipping Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "FedEx", logo: "📦" },
              { name: "UPS", logo: "🚚" },
              { name: "USPS", logo: "📮" },
              { name: "DHL", logo: "✈️" }
            ].map((carrier, index) => (
              <div key={index} className="flex flex-col items-center justify-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all">
                <span className="text-4xl mb-2">{carrier.logo}</span>
                <span className="font-semibold text-gray-700">{carrier.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-12 border-l-4 border-amber-500">
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Important Delivery Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Processing Time:</strong> Orders are processed within 1-2 business days (excluding weekends and holidays)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Order Cutoff:</strong> Orders placed after 2 PM EST will be processed the next business day</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Holidays:</strong> Shipping times may be extended during peak seasons (Black Friday, Christmas, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Address Accuracy:</strong> Please ensure your shipping address is correct. We're not responsible for delays due to incorrect addresses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Signature Required:</strong> High-value orders (over $500) may require a signature upon delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Order Status Guide */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Status Guide</h2>
          <div className="space-y-4">
            {[
              { status: "Order Confirmed", icon: CheckCircle, color: "green", desc: "Your order has been received and is being prepared" },
              { status: "Processing", icon: Package, color: "blue", desc: "Your items are being picked, packed, and prepared for shipment" },
              { status: "Shipped", icon: Truck, color: "purple", desc: "Your package is on its way! Check your tracking number" },
              { status: "Out for Delivery", icon: MapPin, color: "orange", desc: "Your package is with the delivery driver and arriving today" },
              { status: "Delivered", icon: CheckCircle, color: "green", desc: "Your package has been successfully delivered" }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className={`bg-${item.color}-100 p-2 rounded-full mr-4 flex-shrink-0`}>
                    <Icon className={`w-5 h-5 text-${item.color}-600`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.status}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Restricted Items */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <XCircle className="w-6 h-6 text-red-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">Items We Cannot Ship</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Hazardous materials (flammable, explosive, toxic)",
              "Perishable food items (except with special packaging)",
              "Live animals or plants",
              "Illegal substances or weapons",
              "Counterfeit or pirated goods",
              "Items prohibited by carrier or destination country"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <XCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="p-4 text-gray-700 bg-white border-l-4 border-blue-500 mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help with Your Delivery?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our customer support team is here to assist you with tracking, delivery issues, or any questions about shipping.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:support@ecommerce.com" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Email Support
            </a>
            <button className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
              Track Your Order
            </button>
            <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;
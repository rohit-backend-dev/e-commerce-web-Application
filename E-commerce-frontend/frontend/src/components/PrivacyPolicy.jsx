import React, { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Lock, Eye, Users, Bell, FileText, Mail, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  const [expandedSections, setExpandedSections] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      id: "intro",
      icon: Shield,
      title: "Introduction",
      content: (
        <>
          <p className="mb-4">
            Welcome to <span className="font-semibold text-gray-900">E-Commerce Inc.</span> ("we," "our," or "us"). 
            We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains 
            how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
          <p className="mb-4">
            Please read this policy carefully. By using our services, you agree to the collection and use of 
            information in accordance with this policy. If you do not agree with our policies and practices, 
            please do not use our services.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-900">
              <strong>Quick Summary:</strong> We collect information to provide you with the best shopping experience, 
              process your orders, and improve our services. We never sell your personal data to third parties.
            </p>
          </div>
        </>
      )
    },
    {
      id: "collection",
      icon: Eye,
      title: "Information We Collect",
      content: (
        <>
          <h3 className="font-semibold text-gray-900 mb-3">Personal Information You Provide:</h3>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li><strong>Account Information:</strong> Name, email address, phone number, date of birth</li>
            <li><strong>Billing & Shipping Details:</strong> Physical address, postal code, city, country</li>
            <li><strong>Payment Information:</strong> Credit/debit card details, billing address (processed securely via payment providers)</li>
            <li><strong>Communication Data:</strong> Customer service inquiries, reviews, survey responses</li>
            <li><strong>Profile Preferences:</strong> Size preferences, favorite products, wishlist items</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mb-3">Information Collected Automatically:</h3>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
            <li><strong>Usage Data:</strong> Pages viewed, time spent, clicks, search queries, referral sources</li>
            <li><strong>Location Data:</strong> Approximate geographic location based on IP address</li>
            <li><strong>Cookies & Tracking:</strong> Session cookies, preference cookies, analytics cookies</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mb-3">Information from Third Parties:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Social media platforms (if you sign in via Facebook, Google, etc.)</li>
            <li>Payment processors and fraud prevention services</li>
            <li>Delivery and logistics partners</li>
            <li>Marketing and analytics partners</li>
          </ul>
        </>
      )
    },
    {
      id: "usage",
      icon: FileText,
      title: "How We Use Your Information",
      content: (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Processing & Fulfillment:</h3>
              <p className="text-sm text-gray-700">Process transactions, verify payment information, arrange shipping and delivery, send order confirmations and updates, manage returns and refunds.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Customer Service & Support:</h3>
              <p className="text-sm text-gray-700">Respond to inquiries, resolve disputes, provide technical support, process warranty claims.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Marketing & Communications:</h3>
              <p className="text-sm text-gray-700">Send promotional emails, personalized offers, product recommendations, newsletters (you can opt-out anytime).</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Site Improvement & Analytics:</h3>
              <p className="text-sm text-gray-700">Analyze user behavior, conduct A/B testing, improve website performance, develop new features and products.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Security & Fraud Prevention:</h3>
              <p className="text-sm text-gray-700">Detect and prevent fraudulent transactions, protect against security threats, verify identity, enforce terms of service.</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Legal Compliance:</h3>
              <p className="text-sm text-gray-700">Comply with applicable laws, respond to legal requests, protect our rights and property.</p>
            </div>
          </div>
        </>
      )
    },
    {
      id: "sharing",
      icon: Users,
      title: "Information Sharing & Disclosure",
      content: (
        <>
          <p className="mb-4 font-medium text-gray-900">
            We do NOT sell, rent, or trade your personal information to third parties for their marketing purposes.
          </p>
          
          <p className="mb-3">We may share your information with:</p>
          <div className="space-y-3">
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Service Providers:</h4>
              <p className="text-sm text-gray-700">Payment processors (Stripe, PayPal, Razorpay), shipping companies (FedEx, UPS, DHL), email services (SendGrid, Mailchimp), cloud hosting (AWS, Google Cloud).</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Analytics Partners:</h4>
              <p className="text-sm text-gray-700">Google Analytics, Facebook Pixel, Hotjar for understanding user behavior and improving our services.</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Legal Requirements:</h4>
              <p className="text-sm text-gray-700">Law enforcement, government authorities, or legal proceedings when required by law.</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Business Transfers:</h4>
              <p className="text-sm text-gray-700">In connection with mergers, acquisitions, or sale of assets (users will be notified).</p>
            </div>
          </div>
        </>
      )
    },
    {
      id: "cookies",
      icon: Globe,
      title: "Cookies & Tracking Technologies",
      content: (
        <>
          <p className="mb-4">
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, 
            and personalize content. Here's what we use:
          </p>
          
          <div className="space-y-3">
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900">Essential Cookies (Required)</h4>
              <p className="text-sm text-gray-700">Enable core functionality like shopping cart, checkout, and account access.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900">Performance Cookies</h4>
              <p className="text-sm text-gray-700">Help us understand how visitors interact with our website (Google Analytics).</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900">Functionality Cookies</h4>
              <p className="text-sm text-gray-700">Remember your preferences, language, and region settings.</p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-900">Marketing Cookies</h4>
              <p className="text-sm text-gray-700">Track your browsing to show relevant ads on other websites (Facebook, Google Ads).</p>
            </div>
          </div>
          
          <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded">
            <p className="text-sm text-gray-800">
              <strong>Managing Cookies:</strong> You can control cookies through your browser settings. Note that 
              disabling essential cookies may affect site functionality. Visit our Cookie Settings to customize your preferences.
            </p>
          </div>
        </>
      )
    },
    {
      id: "security",
      icon: Lock,
      title: "Data Security & Retention",
      content: (
        <>
          <h3 className="font-semibold text-gray-900 mb-3">Security Measures:</h3>
          <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
            <li><strong>SSL/TLS Encryption:</strong> All data transmitted between your browser and our servers is encrypted</li>
            <li><strong>PCI-DSS Compliance:</strong> Payment information is processed according to industry standards</li>
            <li><strong>Secure Storage:</strong> Personal data is stored on secure servers with restricted access</li>
            <li><strong>Regular Audits:</strong> We conduct security assessments and vulnerability testing</li>
            <li><strong>Employee Training:</strong> Staff are trained on data protection and confidentiality</li>
            <li><strong>Two-Factor Authentication:</strong> Available for account protection</li>
          </ul>

          <h3 className="font-semibold text-gray-900 mb-3">Data Retention:</h3>
          <p className="mb-2">We retain your personal information for as long as necessary to:</p>
          <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
            <li>Provide our services and fulfill transactions</li>
            <li>Comply with legal obligations (e.g., tax records for 7 years)</li>
            <li>Resolve disputes and enforce our agreements</li>
            <li>Improve and develop our products</li>
          </ul>
          
          <p className="text-sm text-gray-700">
            After this period, we will delete or anonymize your data unless longer retention is required by law.
          </p>
        </>
      )
    },
    {
      id: "rights",
      icon: Bell,
      title: "Your Privacy Rights",
      content: (
        <>
          <p className="mb-4">Depending on your location, you may have the following rights:</p>
          
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Right to Access</h4>
              <p className="text-sm text-gray-700">Request a copy of the personal data we hold about you.</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Right to Rectification</h4>
              <p className="text-sm text-gray-700">Correct inaccurate or incomplete personal information.</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Right to Erasure ("Right to be Forgotten")</h4>
              <p className="text-sm text-gray-700">Request deletion of your personal data (subject to legal obligations).</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Right to Data Portability</h4>
              <p className="text-sm text-gray-700">Receive your data in a structured, machine-readable format.</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Right to Object</h4>
              <p className="text-sm text-gray-700">Object to processing of your data for marketing or legitimate interests.</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Right to Restrict Processing</h4>
              <p className="text-sm text-gray-700">Limit how we use your data in certain circumstances.</p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded">
              <h4 className="font-semibold text-gray-900 mb-1">Right to Withdraw Consent</h4>
              <p className="text-sm text-gray-700">Withdraw consent for marketing communications at any time.</p>
            </div>
          </div>
          
          <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded">
            <p className="text-sm text-gray-800">
              <strong>How to Exercise Your Rights:</strong> Email us at <span className="font-semibold">privacy@ecommerce.com</span> or 
              visit your account settings. We will respond within 30 days.
            </p>
          </div>
        </>
      )
    },
    {
      id: "international",
      icon: Globe,
      title: "International Data Transfers",
      content: (
        <>
          <p className="mb-4">
            We operate globally and may transfer your data to countries outside your residence, including the 
            United States and European Union. These countries may have different data protection laws.
          </p>
          
          <p className="mb-4">
            When transferring data internationally, we ensure adequate protection through:
          </p>
          
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
            <li>Privacy Shield frameworks (where applicable)</li>
            <li>Binding Corporate Rules for intra-group transfers</li>
            <li>Adequacy decisions by relevant authorities</li>
          </ul>
          
          <p className="text-sm text-gray-700">
            For EU/EEA residents: We comply with GDPR requirements for international data transfers.
          </p>
        </>
      )
    },
    {
      id: "children",
      icon: Shield,
      title: "Children's Privacy",
      content: (
        <>
          <p className="mb-4">
            Our services are not intended for individuals under the age of 18 (or the age of majority in your jurisdiction). 
            We do not knowingly collect personal information from children.
          </p>
          
          <p className="mb-4">
            If you are a parent or guardian and believe we have collected information from your child, please contact us 
            immediately at <span className="font-semibold">privacy@ecommerce.com</span>. We will promptly delete such information.
          </p>
          
          <p className="text-sm text-gray-700">
            By using our services, you confirm that you are at least 18 years old or have parental consent.
          </p>
        </>
      )
    },
    {
      id: "marketing",
      icon: Mail,
      title: "Marketing Communications",
      content: (
        <>
          <p className="mb-4">
            With your consent, we may send you promotional emails about new products, special offers, and other updates 
            that we think you may find interesting.
          </p>
          
          <h3 className="font-semibold text-gray-900 mb-3">You can opt-out by:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Clicking the "Unsubscribe" link at the bottom of any marketing email</li>
            <li>Adjusting your preferences in your account settings</li>
            <li>Contacting us at <span className="font-semibold">support@ecommerce.com</span></li>
          </ul>
          
          <div className="bg-amber-50 border border-amber-200 p-4 rounded">
            <p className="text-sm text-gray-800">
              <strong>Note:</strong> Even if you opt-out of marketing emails, we will still send you transactional 
              emails related to your orders, account, and customer service.
            </p>
          </div>
        </>
      )
    },
    {
      id: "thirdparty",
      icon: Globe,
      title: "Third-Party Links & Services",
      content: (
        <>
          <p className="mb-4">
            Our website may contain links to third-party websites, plugins, and applications (e.g., social media platforms, 
            payment processors). Clicking on these links may allow third parties to collect or share data about you.
          </p>
          
          <p className="mb-4">
            <strong>We do not control these third-party sites</strong> and are not responsible for their privacy practices. 
            We encourage you to review their privacy policies before providing any personal information.
          </p>
          
          <h3 className="font-semibold text-gray-900 mb-2">Third-Party Services We Use:</h3>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Google Analytics for website analytics</li>
            <li>Facebook Pixel for advertising</li>
            <li>Stripe/PayPal for payment processing</li>
            <li>Mailchimp for email marketing</li>
            <li>Zendesk for customer support</li>
          </ul>
        </>
      )
    },
    {
      id: "california",
      icon: FileText,
      title: "California Privacy Rights (CCPA)",
      content: (
        <>
          <p className="mb-4">
            If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
          </p>
          
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li><strong>Right to Know:</strong> What personal information we collect, use, disclose, and sell</li>
            <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
            <li><strong>Right to Opt-Out:</strong> Opt-out of the sale of personal information (we don't sell data)</li>
            <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your rights</li>
          </ul>
          
          <p className="mb-4">
            To exercise these rights, contact us at <span className="font-semibold">privacy@ecommerce.com</span> or 
            call our toll-free number: <span className="font-semibold">1-800-XXX-XXXX</span>.
          </p>
          
          <p className="text-sm text-gray-700">
            We will verify your identity before processing requests and respond within 45 days.
          </p>
        </>
      )
    },
    {
      id: "gdpr",
      icon: Shield,
      title: "EU/EEA Privacy Rights (GDPR)",
      content: (
        <>
          <p className="mb-4">
            If you are located in the European Union or European Economic Area, we process your data in accordance 
            with the General Data Protection Regulation (GDPR).
          </p>
          
          <h3 className="font-semibold text-gray-900 mb-3">Legal Basis for Processing:</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li><strong>Contractual Necessity:</strong> To fulfill our contract with you (order processing, delivery)</li>
            <li><strong>Legitimate Interest:</strong> For business operations, fraud prevention, and improvement</li>
            <li><strong>Consent:</strong> For marketing communications and non-essential cookies</li>
            <li><strong>Legal Obligation:</strong> To comply with tax and legal requirements</li>
          </ul>
          
          <p className="mb-4">
            You have the right to lodge a complaint with your local data protection authority if you believe we have 
            not complied with GDPR requirements.
          </p>
        </>
      )
    },
    {
      id: "changes",
      icon: Bell,
      title: "Changes to This Privacy Policy",
      content: (
        <>
          <p className="mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, 
            or operational needs. The updated version will be indicated by a revised "Last updated" date at the top of this page.
          </p>
          
          <p className="mb-4">
            <strong>Material Changes:</strong> If we make significant changes that affect how we handle your personal data, 
            we will notify you by:
          </p>
          
          <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
            <li>Email notification to your registered address</li>
            <li>Prominent notice on our website</li>
            <li>In-app notification (if applicable)</li>
          </ul>
          
          <p className="text-sm text-gray-700">
            We encourage you to review this Privacy Policy periodically. Your continued use of our services after changes 
            constitutes acceptance of the updated policy.
          </p>
        </>
      )
    },
    {
      id: "contact",
      icon: Mail,
      title: "Contact Us",
      content: (
        <>
          <p className="mb-4">
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
            please don't hesitate to contact us:
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg space-y-3">
            <div>
              <h4 className="font-semibold text-gray-900">Email:</h4>
              <p className="text-gray-700">privacy@ecommerce.com</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900">Support:</h4>
              <p className="text-gray-700">support@ecommerce.com</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900">Phone:</h4>
              <p className="text-gray-700">1-800-XXX-XXXX (Mon-Fri, 9 AM - 6 PM EST)</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900">Mailing Address:</h4>
              <p className="text-gray-700">
                E-Commerce Inc.<br />
                123 Business Street, Suite 100<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900">Data Protection Officer:</h4>
              <p className="text-gray-700">dpo@ecommerce.com</p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-gray-700">
            We aim to respond to all legitimate requests within 30 days. If your request is particularly complex or 
            you have made multiple requests, we may take up to 60 days (we will notify you if this is the case).
          </p>
        </>
      )
    }
  ];

  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof section.content === 'string' && section.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-600 mr-3" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Privacy Policy
            </h1>
          </div>
          <p className="text-center text-gray-600 mb-6">
            Last updated: <span className="font-semibold">November 8, 2025</span>
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search privacy topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-left px-3 py-2 rounded hover:bg-blue-50 text-sm text-blue-600 hover:text-blue-800 transition-colors"
              >
                {index + 1}. {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {filteredSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections[section.id];
            
            return (
              <div key={section.id} id={section.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <Icon className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                    <h2 className="text-xl font-semibold text-gray-900 text-left">
                      {section.title}
                    </h2>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {section.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white text-center">
          <Lock className="w-10 h-10 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Your Privacy Matters</h3>
          <p className="text-blue-100 mb-6">
            We're committed to protecting your personal information and maintaining transparency 
            about how we use your data.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="mailto:privacy@ecommerce.com" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Contact Privacy Team
            </a>
            <button className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
              Manage Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
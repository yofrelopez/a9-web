// components/contact/ContactPage.tsx
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";
import ContactMap from "./ContactMap";
import ContactDepartments from "./ContactDepartments";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <ContactHero />
      
      {/* Contact Information Grid */}
      <div className="container mx-auto px-6 py-16 space-y-16">
        {/* Departments */}
        <ContactDepartments />
        
        {/* Location & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ContactInfo />
          <ContactMap />
        </div>
      </div>
    </div>
  );
}
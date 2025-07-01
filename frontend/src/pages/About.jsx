import React from "react";
import { Link } from "react-router-dom";
const AboutUs = () => {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Our Fashion Story
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Where style meets passion, and trends become timeless.
          </p>
        </div>

        {/* Our Story */}
        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Founded in 2025, TrendVogue emerged from a simple idea: fashion
              should empower everyone to express their unique identity. What
              began as a small boutique in New York has blossomed into a global
              fashion destination.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              We believe in the transformative power of style. Our carefully
              curated collections blend contemporary trends with timeless
              elegance, offering something special for every occasion and every
              body type.
            </p>
            <p className="text-lg text-gray-600">
              Today, we serve fashion-forward customers in over 50 countries,
              with physical stores in 12 major cities and a thriving online
              presence.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="TrendVogue store interior"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Quality Craftsmanship",
                description:
                  "We source only the finest materials and work with skilled artisans to create pieces that stand the test of time.",
                icon: (
                  <svg
                    className="h-12 w-12 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
              {
                title: "Sustainable Fashion",
                description:
                  "We're committed to ethical production and reducing our environmental footprint through responsible sourcing.",
                icon: (
                  <svg
                    className="h-12 w-12 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                ),
              },
              {
                title: "Inclusive Style",
                description:
                  "Fashion is for everyone. Our collections celebrate diversity in size, age, and personal style.",
                icon: (
                  <svg
                    className="h-12 w-12 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Women's Fashion",
                description:
                  "From casual wear to evening elegance, discover pieces that inspire confidence.",
              },
              {
                title: "Men's Collections",
                description:
                  "Sharp, sophisticated styles for every occasion and lifestyle.",
              },
              {
                title: "Accessories",
                description:
                  "The perfect finishing touches - handbags, jewelry, scarves, and more.",
              },
              {
                title: "Personal Styling",
                description:
                  "Our expert stylists help you create looks that reflect your personality.",
              },
            ].map((offer, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 transition-colors duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {offer.title}
                </h3>
                <p className="text-gray-600">{offer.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet the Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Meet Our Creative Team
          </h2>
          <div className=" gap-8">
            {[
              {
                name: "Umesh Tummepalli",
                role: "Director of Fashion And Design, Full Stack Developer",
                bio: "",
                image:
                  "https://umeshportfolio-beryl.vercel.app/assets/mainPhoto-BHFYnbva.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-4">
                  <img
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent hover:border-indigo-500 transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-indigo-600 mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-indigo-50 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Fashion Journey
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Sign up for our newsletter to receive exclusive offers, styling
            tips, and first access to new collections.
          </p>
          <div className="max-w-md text-center mx-auto">
            <Link to="/contact">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                Contact us
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

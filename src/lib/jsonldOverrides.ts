type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

const bgHomeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.rotorem.bg/#website",
      "url": "https://www.rotorem.bg",
      "name": "РотоРем",
      "publisher": {
        "@id": "https://www.rotorem.bg/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.rotorem.bg/#organization",
      "name": "РотоРем",
      "alternateName": "RotoRem",
      "url": "https://www.rotorem.bg",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "089 834 0982",
        "contactType": "customer service",
        "areaServed": "BG"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61583413912114"
      ]
    },
    {
      "@type": [
        "LocalBusiness",
        "Electrician"
      ],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем",
      "url": "https://www.rotorem.bg",
      "image": "https://www.rotorem.bg/img/hero.webp",
      "description": "Професионален ремонт на битова техника по домовете във Варна и София.",
      "telephone": "089 834 0982",
      "email": "n.ivanov.ivanov@abv.bg",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Varna",
        "postalCode": "9000",
        "addressCountry": "BG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.2141,
        "longitude": 27.9147
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Varna"
        },
        {
          "@type": "City",
          "name": "Sofia"
        },
        {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 43.2141,
            "longitude": 27.9147
          },
          "geoRadius": "20000"
        },
        {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 42.6975,
            "longitude": 23.3221
          },
          "geoRadius": "20000"
        }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "17:00"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "60",
        "bestRating": "5",
        "worstRating": "1"
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Диагностика на битова техника във Варна",
          "areaServed": {
            "@type": "City",
            "name": "Varna"
          },
          "price": "20.46",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Диагностика на битова техника в София",
          "areaServed": {
            "@type": "City",
            "name": "Sofia"
          },
          "price": "30",
          "priceCurrency": "EUR"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги за ремонт и монтаж на битова техника",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ремонт и монтаж на перални"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ремонт и монтаж на сушилни"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ремонт и монтаж на съдомиялни"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ремонт и монтаж на бойлери"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Електроуслуги"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Ремонт и монтаж на готварски печки и фурни"
            }
          }
        ]
      },
      "founder": {
        "@id": "https://www.rotorem.bg/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/#person",
      "name": "Николай Иванов",
      "jobTitle": "Главен сервизен техник",
      "description": "Магистър по Автоматика и системи за управление.",
      "worksFor": {
        "@id": "https://www.rotorem.bg/#organization"
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Технически университет Варна",
          "sameAs": "https://www.tu-varna.bg/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.rotorem.bg/#faq",
      "inLanguage": "bg",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Колко струва диагностиката?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Таксата за диагностика за Варна е 20,46 EUR, а за София - 30 EUR. Тя включва посещение на място, инспекция и диагностициране на проблема."
          }
        },
        {
          "@type": "Question",
          "name": "Кои райони обслужвате?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Обслужваме град Варна, София и всички квартали и населени места в радиус от 20 км."
          }
        },
        {
          "@type": "Question",
          "name": "Предоставяте ли гаранция за ремонтите?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Да, предоставяме гаранция за извършените ремонти, като срокът зависи от типа на услугата и вложените части."
          }
        },
        {
          "@type": "Question",
          "name": "Предлагате ли ремонт още същия ден?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Да, в повечето случаи завършваме ремонта същия ден. Това зависи от сложността на проблема и наличността на резервни части."
          }
        }
      ]
    }
  ]
};

const enHomeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.rotorem.bg/en/#website",
      "url": "https://www.rotorem.bg/en/",
      "name": "RotoRem",
      "publisher": {
        "@id": "https://www.rotorem.bg/en/#organization"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://www.rotorem.bg/en/#organization",
      "name": "RotoRem",
      "alternateName": "RotoRem",
      "url": "https://www.rotorem.bg/en/",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "089 834 0982",
        "contactType": "customer service",
        "areaServed": "BG"
      },
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61583413912114"
      ]
    },
    {
      "@type": [
        "LocalBusiness",
        "Electrician"
      ],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem",
      "url": "https://www.rotorem.bg/en/",
      "image": "https://www.rotorem.bg/img/hero.webp",
      "description": "Professional home appliance repair services at your home in Varna and Sofia.",
      "telephone": "089 834 0982",
      "email": "n.ivanov.ivanov@abv.bg",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Varna",
        "postalCode": "9000",
        "addressCountry": "BG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 43.2141,
        "longitude": 27.9147
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Varna"
        },
        {
          "@type": "City",
          "name": "Sofia"
        },
        {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 43.2141,
            "longitude": 27.9147
          },
          "geoRadius": "20000"
        },
        {
          "@type": "GeoCircle",
          "geoMidpoint": {
            "@type": "GeoCoordinates",
            "latitude": 42.6975,
            "longitude": 23.3221
          },
          "geoRadius": "20000"
        }
      ],
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "60",
        "bestRating": "5",
        "worstRating": "1"
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Appliance diagnostics in Varna",
          "areaServed": {
            "@type": "City",
            "name": "Varna"
          },
          "price": "20.46",
          "priceCurrency": "EUR"
        },
        {
          "@type": "Offer",
          "name": "Appliance diagnostics in Sofia",
          "areaServed": {
            "@type": "City",
            "name": "Sofia"
          },
          "price": "30",
          "priceCurrency": "EUR"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Home appliance repair and installation services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Repair and installation of washing machines" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Repair and installation of dryers" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Repair and installation of dishwashers" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Repair and installation of water heaters" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Electrical services" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Repair and installation of stoves and ovens" } }
        ]
      },
      "founder": {
        "@id": "https://www.rotorem.bg/en/#person"
      }
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/en/#person",
      "name": "Nikolay Ivanov",
      "jobTitle": "Chief Service Technician",
      "description": "Master's in Automation and Control Systems.",
      "worksFor": {
        "@id": "https://www.rotorem.bg/en/#organization"
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Technical University of Varna",
          "sameAs": "https://www.tu-varna.bg/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.rotorem.bg/en/#faq",
      "inLanguage": "en",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does the diagnostics cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The diagnostic fee for Varna is 20.46 EUR, and for Sofia - 30 EUR. It includes an on-site visit, inspection, and problem diagnostics."
          }
        },
        {
          "@type": "Question",
          "name": "Which areas do you serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We serve the cities of Varna, Sofia, and all neighborhoods and settlements within a 20 km radius."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide a warranty for the repairs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide a warranty for the repairs performed, and the duration depends on the type of service and the parts used."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer same-day repair?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, in most cases, we complete the repair on the same day. This depends on the complexity of the problem and the availability of spare parts."
          }
        }
      ]
    }
  ]
};

const bgContactGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.rotorem.bg/contact/#webpage",
      "url": "https://www.rotorem.bg/contact/",
      "name": "Контакти - Сервиз за битова техника РотоРем",
      "description": "Свържете се с екипа на РотоРем за професионален ремонт на битова техника по домовете във Варна и София, включително прилежащите населени места в радиус до 20 км.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/contact/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/#localbusiness" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/contact/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.rotorem.bg/" },
        { "@type": "ListItem", "position": 2, "name": "Контакти", "item": "https://www.rotorem.bg/contact/" }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем",
      "url": "https://www.rotorem.bg",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "telephone": "089 834 0982",
      "email": "n.ivanov.ivanov@abv.bg",
      "priceRange": "20EUR - 30EUR",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "089 834 0982",
          "contactType": "customer service",
          "areaServed": ["Varna", "Sofia"],
          "availableLanguage": ["Bulgarian", "English"]
        }
      ],
      "address": [
        { "@type": "PostalAddress", "addressLocality": "Varna", "postalCode": "9000", "addressCountry": "BG", "description": "Обслужване на всички квартали в град Варна" },
        { "@type": "PostalAddress", "addressLocality": "Sofia", "postalCode": "1000", "addressCountry": "BG", "description": "Обслужване на град София и прилежащите райони" }
      ],
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "17:00" }
      ],
      "sameAs": ["https://www.facebook.com/profile.php?id=61583413912114"]
    }
  ]
};

const enContactGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://www.rotorem.bg/en/contact/#webpage",
      "url": "https://www.rotorem.bg/en/contact/",
      "name": "Contact - RotoRem Home Appliance Service",
      "description": "Contact the RotoRem team for professional home appliance repair services at your home in Varna and Sofia, including surrounding areas within a 20 km radius.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/en/contact/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/en/#localbusiness" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/en/contact/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rotorem.bg/en/" },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://www.rotorem.bg/en/contact/" }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem",
      "url": "https://www.rotorem.bg/en/",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "telephone": "089 834 0982",
      "email": "n.ivanov.ivanov@abv.bg",
      "priceRange": "20EUR - 30EUR",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "089 834 0982",
          "contactType": "customer service",
          "areaServed": ["Varna", "Sofia"],
          "availableLanguage": ["Bulgarian", "English"]
        }
      ],
      "address": [
        { "@type": "PostalAddress", "addressLocality": "Varna", "postalCode": "9000", "addressCountry": "BG", "description": "Serving all neighborhoods in Varna" },
        { "@type": "PostalAddress", "addressLocality": "Sofia", "postalCode": "1000", "addressCountry": "BG", "description": "Serving Sofia City and surrounding areas" }
      ],
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "17:00" }
      ],
      "sameAs": ["https://www.facebook.com/profile.php?id=61583413912114"]
    }
  ]
};

const bgServicesIndexGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.rotorem.bg/services/#webpage",
      "url": "https://www.rotorem.bg/services/",
      "name": "Професионални услуги за ремонт на битова техника във Варна",
      "description": "Пълен каталог на предлаганите ремонтни услуги за перални, сушилни, съдомиялни, фурни, бойлери и електроуслуги по домовете в град Варна.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/services/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/services/#catalog" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/services/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.rotorem.bg/" },
        { "@type": "ListItem", "position": 2, "name": "Услуги за Варна", "item": "https://www.rotorem.bg/services/" }
      ]
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://www.rotorem.bg/services/#catalog",
      "name": "Каталог със сервизни услуги РотоРем Варна",
      "url": "https://www.rotorem.bg/services/",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": 6,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/washing-machine-repair/#service", "name": "Ремонт и монтаж на перални машини" } } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/dryer-repair/#service", "name": "Ремонт и монтаж на сушилни" } } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/dishwasher-repair/#service", "name": "Ремонт и монтаж на съдомиялни машини" } } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/oven-repair/#service", "name": "Ремонт и монтаж на готварски печки, фурни и котлони" } } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/boiler-repair/#service", "name": "Ремонт и монтаж на бойлери" } } },
        { "@type": "ListItem", "position": 6, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/electrical-services/#service", "name": "Електроуслуги" } } }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем",
      "url": "https://www.rotorem.bg",
      "telephone": "089 834 0982",
      "priceRange": "20EUR - 30EUR",
      "image": "https://www.rotorem.bg/img/hero.webp",
      "address": { "@type": "PostalAddress", "addressLocality": "Varna", "postalCode": "9000", "addressCountry": "BG" },
      "geo": { "@type": "GeoCoordinates", "latitude": 43.2141, "longitude": 27.9147 },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "60" },
      "founder": { "@id": "https://www.rotorem.bg/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/#person",
      "name": "Николай Иванов",
      "jobTitle": "Главен техник",
      "worksFor": { "@id": "https://www.rotorem.bg/#localbusiness" },
      "description": "Магистър по Автоматика и системи за управление с над 25 години опит в поддръжката на битова техника."
    }
  ]
};

const enServicesIndexGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.rotorem.bg/en/services/#webpage",
      "url": "https://www.rotorem.bg/en/services/",
      "name": "Professional Home Appliance Repair Services in Varna",
      "description": "Full catalog of repair services for washing machines, dryers, dishwashers, ovens, boilers, and electrical services in Varna.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/en/services/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/en/services/#catalog" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/en/services/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rotorem.bg/en/" },
        { "@type": "ListItem", "position": 2, "name": "Varna Services", "item": "https://www.rotorem.bg/en/services/" }
      ]
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://www.rotorem.bg/en/services/#catalog",
      "name": "RotoRem Varna Service Catalog",
      "url": "https://www.rotorem.bg/en/services/",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": 6,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/washing-machine-repair/#service", "name": "Washing Machine Repair and Installation" } } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/dryer-repair/#service", "name": "Dryer Repair and Installation" } } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/dishwasher-repair/#service", "name": "Dishwasher Repair and Installation" } } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/oven-repair/#service", "name": "Stove, Oven and Hob Repair and Installation" } } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/boiler-repair/#service", "name": "Water Heater (Boiler) Repair and Installation" } } },
        { "@type": "ListItem", "position": 6, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/electrical-services/#service", "name": "Electrical Services" } } }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem",
      "url": "https://www.rotorem.bg/en/",
      "telephone": "089 834 0982",
      "priceRange": "20EUR - 30EUR",
      "image": "https://www.rotorem.bg/img/hero.webp",
      "address": { "@type": "PostalAddress", "addressLocality": "Varna", "postalCode": "9000", "addressCountry": "BG" },
      "geo": { "@type": "GeoCoordinates", "latitude": 43.2141, "longitude": 27.9147 },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "60" },
      "founder": { "@id": "https://www.rotorem.bg/en/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/en/#person",
      "name": "Nikolay Ivanov",
      "jobTitle": "Chief Technician",
      "worksFor": { "@id": "https://www.rotorem.bg/en/#localbusiness" },
      "description": "Master in Automation and Control Systems with over 25 years of experience in home appliance maintenance."
    }
  ]
};

const bgSofiaIndexGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.rotorem.bg/services/sofia/#webpage",
      "url": "https://www.rotorem.bg/services/sofia/",
      "name": "Професионални услуги за ремонт на битова техника в София",
      "description": "Пълен каталог на предлаганите ремонтни услуги за перални, сушилни, съдомиялни, фурни и бойлери по домовете в град София.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/services/sofia/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/services/sofia/#catalog" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/services/sofia/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.rotorem.bg/" },
        { "@type": "ListItem", "position": 2, "name": "Услуги за София", "item": "https://www.rotorem.bg/services/sofia/" }
      ]
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://www.rotorem.bg/services/sofia/#catalog",
      "name": "Каталог със сервизни услуги на РотоРем в град София",
      "url": "https://www.rotorem.bg/services/sofia/",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": 5,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/sofia/washing-machine-repair/#service", "name": "Ремонт и монтаж на перални машини" } } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/sofia/dryer-repair/#service", "name": "Ремонт и монтаж на сушилни" } } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/sofia/dishwasher-repair/#service", "name": "Ремонт и монтаж на съдомиялни машини" } } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/sofia/oven-repair/#service", "name": "Ремонт и монтаж на готварски печки, фурни и котлони" } } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/services/sofia/boiler-repair/#service", "name": "Ремонт и монтаж на бойлери" } } }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем София",
      "url": "https://www.rotorem.bg",
      "telephone": "089 834 0982",
      "priceRange": "20EUR - 30EUR",
      "address": { "@type": "PostalAddress", "addressLocality": "Sofia", "postalCode": "1000", "addressCountry": "BG" },
      "geo": { "@type": "GeoCoordinates", "latitude": 42.6975, "longitude": 23.3221 },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "60" },
      "founder": { "@id": "https://www.rotorem.bg/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/#person",
      "name": "Николай Иванов",
      "jobTitle": "Главен техник",
      "worksFor": { "@id": "https://www.rotorem.bg/#localbusiness" },
      "description": "Магистър по Автоматика и системи за управление с над 25 години опит в поддръжката на битова техника."
    }
  ]
};

const enSofiaIndexGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.rotorem.bg/en/services/sofia/#webpage",
      "url": "https://www.rotorem.bg/en/services/sofia/",
      "name": "Professional Home Appliance Repair Services in Sofia",
      "description": "Full catalog of home appliance repair services for washing machines, dryers, dishwashers, ovens, and boilers at home in the city of Sofia.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/en/services/sofia/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/en/services/sofia/#catalog" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/en/services/sofia/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rotorem.bg/en/" },
        { "@type": "ListItem", "position": 2, "name": "Sofia Services", "item": "https://www.rotorem.bg/en/services/sofia/" }
      ]
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://www.rotorem.bg/en/services/sofia/#catalog",
      "name": "RotoRem Sofia Service Catalog",
      "url": "https://www.rotorem.bg/en/services/sofia/",
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "numberOfItems": 5,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/sofia/washing-machine-repair/#service", "name": "Washing Machine Repair and Installation" } } },
        { "@type": "ListItem", "position": 2, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/sofia/dryer-repair/#service", "name": "Dryer Repair and Installation" } } },
        { "@type": "ListItem", "position": 3, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/sofia/dishwasher-repair/#service", "name": "Dishwasher Repair and Installation" } } },
        { "@type": "ListItem", "position": 4, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/sofia/oven-repair/#service", "name": "Stove, Oven and Hob Repair and Installation" } } },
        { "@type": "ListItem", "position": 5, "item": { "@type": "Offer", "itemOffered": { "@type": "Service", "@id": "https://www.rotorem.bg/en/services/sofia/boiler-repair/#service", "name": "Water Heater (Boiler) Repair and Installation" } } }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem Sofia",
      "url": "https://www.rotorem.bg/en/",
      "telephone": "089 834 0982",
      "priceRange": "20EUR - 30EUR",
      "address": { "@type": "PostalAddress", "addressLocality": "Sofia", "postalCode": "1000", "addressCountry": "BG" },
      "geo": { "@type": "GeoCoordinates", "latitude": 42.6975, "longitude": 23.3221 },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "60" },
      "founder": { "@id": "https://www.rotorem.bg/en/#person" }
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/en/#person",
      "name": "Nikolay Ivanov",
      "jobTitle": "Chief Technician",
      "worksFor": { "@id": "https://www.rotorem.bg/en/#localbusiness" },
      "description": "Master in Automation and Control Systems with over 25 years of experience in home appliance maintenance."
    }
  ]
};

type FaqItem = { q: string; a: string };

type ServiceConfig = {
  path: string;
  lang: "bg" | "en";
  breadcrumbSecond: string;
  breadcrumbThird: string;
  serviceName: string;
  serviceType: string;
  description: string;
  cityName: string;
  lat: number;
  lng: number;
  offerName: string;
  eurPrice: string;
  localBusinessName: string;
  addressLocality: string;
  postalCode: string;
  personName: string;
  personJobTitle: string;
  personDescription: string;
  faq: FaqItem[];
};

function buildServiceGraph(cfg: ServiceConfig): JsonLd {
  const baseRoot = cfg.lang === "en" ? "https://www.rotorem.bg/en" : "https://www.rotorem.bg";
  const pageUrl = `https://www.rotorem.bg${cfg.path}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": cfg.lang === "en" ? "Home" : "Начало",
            "item": `${baseRoot}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": cfg.breadcrumbSecond,
            "item": cfg.path.includes("/sofia/")
              ? `${baseRoot}/services/sofia/`
              : `${baseRoot}/services/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": cfg.breadcrumbThird,
            "item": pageUrl
          }
        ]
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": cfg.serviceName,
        "serviceType": cfg.serviceType,
        "url": pageUrl,
        "description": cfg.description,
        "provider": {
          "@id": `${baseRoot}/#localbusiness`
        },
        "areaServed": [
          {
            "@type": "City",
            "name": cfg.cityName
          },
          {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": cfg.lat,
              "longitude": cfg.lng
            },
            "geoRadius": "20000"
          }
        ],
        "offers": {
          "@type": "Offer",
          "name": cfg.offerName,
          "price": cfg.eurPrice,
          "priceCurrency": "EUR"
        }
      },
      {
        "@type": "Organization",
        "@id": `${baseRoot}/#organization`,
        "name": cfg.lang === "en" ? "RotoRem" : "РотоРем",
        "url": `${baseRoot}/`,
        "logo": "https://www.rotorem.bg/favicon.svg"
      },
      {
        "@type": ["LocalBusiness", "Electrician"],
        "@id": `${baseRoot}/#localbusiness`,
        "name": cfg.localBusinessName,
        "url": `${baseRoot}/`,
        "telephone": "089 834 0982",
        "email": "n.ivanov.ivanov@abv.bg",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": cfg.addressLocality,
          "postalCode": cfg.postalCode,
          "addressCountry": "BG"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": cfg.lat,
          "longitude": cfg.lng
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "17:00"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "60",
          "bestRating": "5",
          "worstRating": "1"
        },
        "sameAs": ["https://www.facebook.com/profile.php?id=61583413912114"],
        "founder": {
          "@id": `${baseRoot}/#person`
        }
      },
      {
        "@type": "Person",
        "@id": `${baseRoot}/#person`,
        "name": cfg.personName,
        "jobTitle": cfg.personJobTitle,
        "worksFor": {
          "@id": `${baseRoot}/#organization`
        },
        "description": cfg.personDescription
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "inLanguage": cfg.lang,
        "mainEntity": cfg.faq.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a
          }
        }))
      }
    ]
  };
}

const serviceConfigs: ServiceConfig[] = [
  {
    path: "/services/washing-machine-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за Варна",
    breadcrumbThird: "Ремонт на перални по домовете във Варна",
    serviceName: "Ремонт на перални по домовете във Варна",
    serviceType: "Ремонт на перални",
    description: "Специализиран ремонт и монтаж на перални машини по домовете във Варна. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "Варна",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Диагностика на пералня - Варна",
    eurPrice: "20.46",
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Давате ли гаранция за ремонта?", a: "Да, всички извършени дейности са с гаранция, което ви осигурява спокойствие след обслужването." },
      { q: "Какви проблеми с перални машини ремонтирате най-често?", a: "Най-честите проблеми включват: течове на вода, неработещо центрофугиране, проблеми с източването на вода, неработещи програми, шум по време на работа и проблеми с нагряването на водата." },
      { q: "Колко време отнема ремонтът на пералня?", a: "В повечето случаи ремонтът се завършва в рамките на 1-2 часа в същия ден. По-сложни ремонти могат да отнемат повече време или да изискват повторно посещение ако трябва да поръчаме специфични части." }
    ]
  },
  {
    path: "/services/dryer-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за Варна",
    breadcrumbThird: "Ремонт на сушилни във Варна",
    serviceName: "Ремонт и монтаж на сушилни по домовете във Варна",
    serviceType: "Ремонт на сушилни",
    description: "Специализиран ремонт и монтаж на сушилни по домовете във Варна. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "Варна",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Диагностика на сушилни - Варна",
    eurPrice: "20.46",
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Как да разбера дали проблемът със сушилната е сериозен?", a: "Ако сушилнята спира по време на работа, мирише на изгоряло или не загрява изобщо, е добре да не я използвате до преглед от техник." },
      { q: "Трябва ли да подготвя нещо преди посещението?", a: "Добре е уредът да е достъпен и да има свободно пространство около него. Това улеснява диагностицирането и спестява време." },
      { q: "Ремонтирате ли сушилни в същия ден?", a: "В повечето случаи ремонтът се извършва по време на самото посещение, стига повредата да позволява работа на място и да разполагаме с необходимите части." }
    ]
  },
  {
    path: "/services/dishwasher-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за Варна",
    breadcrumbThird: "Ремонт и монтаж на съдомиялни машини във Варна",
    serviceName: "Ремонт на съдомиялни по домовете във Варна",
    serviceType: "Ремонт на съдомиялни",
    description: "Специализиран ремонт и монтаж на съдомиялни машини по домовете във Варна. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "Варна",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Диагностика на съдомиялна - Варна",
    eurPrice: "20.46",
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Какво да правя ако съдомиялната не измива съдовете добре?", a: "Най-честите причини са запушени филтри, износени дюзи или проблеми с водното налягане. Нашият техник ще диагностицира точната причина и ще я отстрани." },
      { q: "Ремонтирате ли вградени съдомиялни машини?", a: "Да, ремонтираме всички типове съдомиялни машини включително вградени модели. Нашият техник има опит с демонтаж и монтаж на вградени уреди при необходимост." },
      { q: "Колко време отнема ремонтът на съдомиялна?", a: "В повечето случаи проблемът се отстранява в рамките на едно посещение, ако не се налага специфична част." }
    ]
  },
  {
    path: "/services/oven-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за Варна",
    breadcrumbThird: "Ремонт на готварски печки и фурни във Варна",
    serviceName: "Ремонт на фурни по домовете във Варна",
    serviceType: "Ремонт на фурни",
    description: "Специализиран ремонт и монтаж на готварски фурни и котлони по домовете във Варна. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "Варна",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Диагностика на фурна - Варна",
    eurPrice: "20.46",
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Предлагате ли монтаж на нова фурна?", a: "Да, извършваме монтаж на фурна за вграждане, включително свързване и тест на уреда." },
      { q: "Можете ли да смените нагревателни елементи?", a: "Да, разполагаме с оригинални и съвместими нагревателни елементи за повечето марки фурни. Смяната се извършва професионално с гаранция за работата." },
      { q: "Ремонтирате ли фурни в същия ден?", a: "В повечето случаи ремонтът се извършва още при посещението, ако проблемът позволява." }
    ]
  },
  {
    path: "/services/boiler-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за Варна",
    breadcrumbThird: "Ремонт и монтаж на бойлери във Варна",
    serviceName: "Ремонт на бойлери по домовете във Варна",
    serviceType: "Ремонт на бойлери",
    description: "Специализиран ремонт и монтаж на електрически бойлери по домовете във Варна. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "Варна",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Диагностика на бойлер - Варна",
    eurPrice: "20.46",
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Работите ли с части за конкретни марки като Теси и Елдом?", a: "Да, използваме съвместими или оригинални компоненти, включително ремонтни комплекти според модела." },
      { q: "Предлагате ли монтаж на закупен от клиента бойлер?", a: "Да, извършваме монтаж и демонтаж на бойлери, включително свързване и проверка на инсталацията." },
      { q: "Ремонтирате ли бойлери в същия ден?", a: "В повечето случаи ремонтът се извършва още при посещението, ако техническият проблем позволява работа на място." }
    ]
  },
  {
    path: "/services/electrical-services/",
    lang: "bg",
    breadcrumbSecond: "Услуги за Варна",
    breadcrumbThird: "Електроуслуги и аварийни ел. ремонти във Варна",
    serviceName: "Електроуслуги във Варна",
    serviceType: "Електроуслуги",
    description: "Професионални електротехнически услуги по домовете във Варна. Ремонт и изграждане на ел. инсталации, монтаж на табла, ключове, контакти и диагностика на ел. повреди.",
    cityName: "Варна",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Посещение и диагностика от електротехник - Варна",
    eurPrice: "20.46",
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление. Квалифициран специалист в изграждането и поддръжката на електрически системи.",
    faq: [
      { q: "Какво да правя, ако електрическите уреди спират да работят?", a: "При проблем с уредите, свържете се с нас за бърза диагностика и ремонт. Нашите специалисти ще открият причината за проблема и ще го отстранят." },
      { q: "Имате ли сертификати за електроуслуги?", a: "Да, всички електроуслуги се извършват от сертифицирани електроинженери в съответствие с действащите стандарти за безопасност." },
      { q: "Правите ли спешни електрически ремонти?", a: "Да, предоставяме спешни електрически услуги при аварийни ситуации като къси съединения или загуба на ток. Обадете се на 089 834 0982 за незабавна помощ." }
    ]
  },
  {
    path: "/services/sofia/washing-machine-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт на перални в София",
    serviceName: "Ремонт и монтаж на перални по домовете в София",
    serviceType: "Ремонт на перални",
    description: "Специализиран ремонт и монтаж на перални машини по домовете в София. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Диагностика на перални - София",
    eurPrice: "30",
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Давате ли гаранция за ремонта?", a: "Да, всички извършени дейности са с гаранция, което ви осигурява спокойствие след обслужването." },
      { q: "Какви проблеми с перални машини ремонтирате най-често?", a: "Най-честите проблеми включват: течове на вода, неработещо центрофугиране, проблеми с източването на вода, неработещи програми, шум по време на работа и проблеми с нагряването на водата." },
      { q: "Колко време отнема ремонтът на пералня?", a: "В повечето случаи ремонтът се завършва в рамките на 1-2 часа в същия ден. По-сложни ремонти могат да отнемат повече време или да изискват повторно посещение ако трябва да поръчаме специфични части." }
    ]
  },
  {
    path: "/services/sofia/dryer-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт на сушилни в София",
    serviceName: "Ремонт и монтаж на сушилни по домовете в София",
    serviceType: "Ремонт на сушилни",
    description: "Специализиран ремонт и монтаж на сушилни по домовете в София. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Диагностика на сушилни - София",
    eurPrice: "30",
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Как да разбера дали проблемът със сушилната е сериозен?", a: "Ако сушилнята спира по време на работа, мирише на изгоряло или не загрява изобщо, е добре да не я използвате до преглед от техник." },
      { q: "Трябва ли да подготвя нещо преди посещението?", a: "Добре е уредът да е достъпен и да има свободно пространство около него. Това улеснява диагностицирането и спестява време." },
      { q: "Ремонтирате ли сушилни в същия ден?", a: "В повечето случаи ремонтът се извършва по време на самото посещение, стига повредата да позволява работа на място и да разполагаме с необходимите части." }
    ]
  },
  {
    path: "/services/sofia/dishwasher-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт и монтаж на съдомиялни машини във Варна",
    serviceName: "Ремонт и монтаж на съдомиялни машини във Варна",
    serviceType: "Ремонт на съдомиялни",
    description: "Специализиран ремонт и монтаж на съдомиялни машини по домовете в София. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Диагностика на съдомиялна - София",
    eurPrice: "30",
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Какво да правя ако съдомиялната не измива съдовете добре?", a: "Най-честите причини са запушени филтри, износени дюзи или проблеми с водното налягане. Нашият техник ще диагностицира точната причина и ще я отстрани." },
      { q: "Ремонтирате ли вградени съдомиялни машини?", a: "Да, ремонтираме всички типове съдомиялни машини включително вградени модели. Нашият техник има опит с демонтаж и монтаж на вградени уреди при необходимост." },
      { q: "Колко време отнема ремонтът на съдомиялна?", a: "В повечето случаи проблемът се отстранява в рамките на едно посещение, ако не се налага специфична част." }
    ]
  },
  {
    path: "/services/sofia/oven-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт на готварски печки и фурни в София",
    serviceName: "Ремонт на готварски печки, котлони и фурни в София",
    serviceType: "Ремонт на фурни",
    description: "Специализиран ремонт и монтаж на готварски печки, фурни и котлони по домовете в София. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Диагностика на фурна - София",
    eurPrice: "30",
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Предлагате ли монтаж на нова фурна?", a: "Да, извършваме монтаж на фурна за вграждане, включително свързване и тест на уреда." },
      { q: "Можете ли да смените нагревателни елементи?", a: "Да, разполагаме с оригинални и съвместими нагревателни елементи за повечето марки фурни. Смяната се извършва професионално с гаранция за работата." },
      { q: "Ремонтирате ли фурни в същия ден?", a: "В повечето случаи ремонтът в София се извършва още при посещението, ако техническата повреда позволява отстраняване на място." }
    ]
  },
  {
    path: "/services/sofia/boiler-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт и монтаж на бойлери в София",
    serviceName: "Ремонт и монтаж на бойлери в София",
    serviceType: "Ремонт на бойлери",
    description: "Специализиран ремонт и монтаж на електрически бойлери по домовете в София. Професионална диагностика, сервиз в същия ден и гаранция за извършената услуга.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Диагностика на бойлер - София",
    eurPrice: "30",
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Работите ли с части за конкретни марки като Теси и Елдом?", a: "Да, използваме съвместими или оригинални компоненти, включително ремонтни комплекти според модела." },
      { q: "Предлагате ли монтаж на закупен от клиента бойлер?", a: "Да, извършваме монтаж и демонтаж на бойлери, включително свързване и проверка на инсталацията." },
      { q: "Ремонтирате ли бойлери в същия ден?", a: "В повечето случаи ремонтът в София се извършва още при посещението, ако техническият проблем позволява работа на място." }
    ]
  },
  {
    path: "/en/services/washing-machine-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "In-Home Washing Machine Repair in Varna",
    serviceName: "Washing Machine Repair at Home in Varna",
    serviceType: "Washing Machine Repair",
    description: "Specialized at-home washing machine repair and installation in Varna. Professional diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Washing Machine Diagnostics - Varna",
    eurPrice: "20.46",
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "Do you provide a warranty on repairs?", a: "Yes, all work is covered by a warranty, ensuring peace of mind after the service." },
      { q: "What washing machine problems do you repair most often?", a: "The most common issues include: water leaks, non-working spin cycle, water drainage problems, malfunctioning programs, noise during operation, and water heating issues." },
      { q: "How long does a washing machine repair take?", a: "In most cases, the repair is completed within 1-2 hours on the same day. More complex repairs may take longer or require a follow-up visit if we need to order specific parts." }
    ]
  },
  {
    path: "/en/services/dryer-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "Dryer Repair in Varna",
    serviceName: "At-Home Dryer Repair and Installation in Varna",
    serviceType: "Dryer Repair",
    description: "Specialized at-home dryer repair and installation in Varna. Professional diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Dryer Diagnostics - Varna",
    eurPrice: "20.46",
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "How can I tell if the dryer issue is serious?", a: "If the dryer stops during operation, smells of burning, or fails to heat, please discontinue use until a technician has inspected it." },
      { q: "Do I need to prepare anything before the visit?", a: "Please ensure the appliance is accessible and has clear space around it. This facilitates diagnostics and saves time." },
      { q: "Do you offer same-day dryer repairs?", a: "Most repairs are completed during the initial visit, provided the issue can be handled on-site and the required parts are in stock." }
    ]
  },
  {
    path: "/en/services/dishwasher-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "Dishwasher Repair & Installation in Varna",
    serviceName: "Dishwasher Repair at Home in Varna",
    serviceType: "Dishwasher Repair",
    description: "Specialized dishwasher repair and installation at your home in Varna. Professional diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Dishwasher Diagnostics - Varna",
    eurPrice: "20.46",
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "What should I do if my dishwasher is not cleaning effectively?", a: "Common causes include clogged filters, worn spray arms, or water pressure issues. Our technician will diagnose and resolve the exact cause." },
      { q: "Do you repair built-in dishwashers?", a: "Yes, we repair all types, including integrated models. Our technicians are experienced in removing and reinstalling built-in appliances if needed." },
      { q: "How long does a dishwasher repair take?", a: "Most repairs are completed within a single visit, unless a specialized part is required." }
    ]
  },
  {
    path: "/en/services/oven-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "Cooker and Oven Repair in Varna",
    serviceName: "At-Home Oven and Stove Repair in Varna",
    serviceType: "Oven and Stove Repair",
    description: "Specialized at-home repair and installation of ovens and stoves in Varna. Professional diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Oven Diagnostics - Varna",
    eurPrice: "20.46",
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "Do you offer installation for new ovens?", a: "Yes, we provide installation for built-in ovens, including connection and testing of the appliance." },
      { q: "Can you replace heating elements?", a: "Yes, we stock original and compatible heating elements for most oven brands. Replacements are performed professionally and include a labor warranty." },
      { q: "Do you offer same-day oven repairs?", a: "In most cases, repairs are completed during the initial visit, depending on the nature of the issue." }
    ]
  },
  {
    path: "/en/services/boiler-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "Boiler Repair in Varna",
    serviceName: "At-Home Water Heater Repair in Varna",
    serviceType: "Water Heater Repair",
    description: "Specialized at-home electric water heater repair and installation in Varna. Professional diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Water Heater Diagnostics - Varna",
    eurPrice: "20.46",
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "Do you use parts for specific brands like Tesy and Eldom?", a: "Yes, we use original or compatible components, including model-specific repair kits." },
      { q: "Do you offer installation for customer-purchased water heaters?", a: "Yes, we provide installation and removal services, including connection and system testing." },
      { q: "Do you offer same-day boiler repairs?", a: "In most cases, the repair is completed during the visit if the technical problem allows for on-site work." }
    ]
  },
  {
    path: "/en/services/electrical-services/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "Comprehensive Electrical Services in Varna",
    serviceName: "Electrical Services in Varna",
    serviceType: "Electrical Services",
    description: "Professional at-home electrical services in Varna. Repair and installation of electrical systems, mounting of panels, switches, sockets, and diagnostics of electrical faults.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    offerName: "Electrician Visit and Diagnostics - Varna",
    eurPrice: "20.46",
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems. Qualified specialist in the installation and maintenance of electrical systems.",
    faq: [
      { q: "What should I do if my appliances stop working?", a: "Please contact us for a prompt diagnosis and repair. Our specialists will identify the root cause and resolve the issue." },
      { q: "Do you have certifications for electrical work?", a: "Yes, all electrical services are performed by certified electrical engineers in accordance with current safety standards." },
      { q: "Do you provide emergency electrical repairs?", a: "Yes, we provide emergency electrical services for situations like short circuits or power outages. Call 089 834 0982 for immediate assistance." }
    ]
  },
  {
    path: "/en/services/sofia/washing-machine-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Washing Machine Repair in Sofia",
    serviceName: "At-Home Washing Machine Repair and Installation in Sofia",
    serviceType: "Washing Machine Repair",
    description: "Professional at-home washing machine repair and installation in Sofia. Expert diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Washing Machine Diagnostics - Sofia",
    eurPrice: "30",
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "Do you provide a warranty on repairs?", a: "Yes, all work is covered by a warranty, ensuring peace of mind after the service." },
      { q: "What washing machine problems do you repair most often?", a: "The most common issues include: water leaks, non-working spin cycle, water drainage problems, malfunctioning programs, noise during operation, and water heating issues." },
      { q: "How long does a washing machine repair take?", a: "In most cases, the repair is completed within 1-2 hours on the same day. More complex repairs may take longer or require a follow-up visit if we need to order specific parts." }
    ]
  },
  {
    path: "/en/services/sofia/dryer-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Dryer Repair in Sofia",
    serviceName: "At-Home Dryer Repair and Installation in Sofia",
    serviceType: "Dryer Repair",
    description: "Professional at-home dryer repair and installation services in Sofia. Expert diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Dryer Diagnostics - Sofia",
    eurPrice: "30",
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "How can I tell if the dryer issue is serious?", a: "If the dryer stops during operation, smells of burning, or fails to heat, please discontinue use until a technician has inspected it." },
      { q: "Do I need to prepare anything before the visit?", a: "Please ensure the appliance is accessible and has clear space around it. This facilitates diagnostics and saves time." },
      { q: "Do you offer same-day dryer repairs?", a: "Most repairs are completed during the initial visit, provided the issue can be handled on-site and the required parts are in stock." }
    ]
  },
  {
    path: "/en/services/sofia/dishwasher-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Dishwasher Repair & Installation in Sofia",
    serviceName: "At-Home Dishwasher Repair and Installation in Sofia",
    serviceType: "Dishwasher Repair",
    description: "Professional at-home dishwasher repair and installation services in Sofia. Expert diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Dishwasher Diagnostics - Sofia",
    eurPrice: "30",
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "What should I do if my dishwasher is not cleaning effectively?", a: "Common causes include clogged filters, worn spray arms, or water pressure issues. Our technician will diagnose and resolve the exact cause." },
      { q: "Do you repair built-in dishwashers?", a: "Yes, we repair all types, including integrated models. Our technicians are experienced in removing and reinstalling built-in appliances if needed." },
      { q: "How long does a dishwasher repair take?", a: "Most repairs are completed within a single visit, unless a specialized part is required." }
    ]
  },
  {
    path: "/en/services/sofia/oven-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Cooker and Oven Repair in Sofia",
    serviceName: "At-Home Oven, Stove, and Hob Repair in Sofia",
    serviceType: "Oven Repair",
    description: "Specialized at-home repair and installation of stoves, ovens, and hobs in Sofia. Professional diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Oven Diagnostics - Sofia",
    eurPrice: "30",
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "Do you offer installation for new ovens?", a: "Yes, we provide installation for built-in ovens, including connection and testing of the appliance." },
      { q: "Can you replace heating elements?", a: "Yes, we stock original and compatible heating elements for most oven brands. Replacements are performed professionally and include a labor warranty." },
      { q: "Do you offer same-day oven repairs?", a: "In most cases, repairs are completed during the initial visit, depending on the nature of the issue." }
    ]
  },
  {
    path: "/en/services/sofia/boiler-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Boiler Repair in Sofia",
    serviceName: "At-Home Water Heater Repair and Installation in Sofia",
    serviceType: "Water Heater Repair",
    description: "Professional at-home electric water heater repair and installation services in Sofia. Expert diagnostics, same-day service, and warranty on all repairs provided.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    offerName: "Water Heater Diagnostics - Sofia",
    eurPrice: "30",
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "Do you use parts for specific brands like Tesy and Eldom?", a: "Yes, we use original or compatible components, including model-specific repair kits." },
      { q: "Do you offer installation for customer-purchased water heaters?", a: "Yes, we provide installation and removal services, including connection and system testing." },
      { q: "Do you offer same-day boiler repairs?", a: "In most cases, the repair is completed during the visit if the technical problem allows for on-site work." }
    ]
  }
];

const serviceOverrides: Record<string, JsonLd> = Object.fromEntries(
  serviceConfigs.map((cfg) => [cfg.path, buildServiceGraph(cfg)])
);

function normalizeServicePath(pathname: string): string {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function getServiceFaqItems(pathname: string): FaqItem[] {
  const normalizedPath = normalizeServicePath(pathname);
  const config = serviceConfigs.find((item) => item.path === normalizedPath);
  return config?.faq ?? [];
}

const bgTeamGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.rotorem.bg/ekip/#webpage",
      "url": "https://www.rotorem.bg/ekip/",
      "name": "Екип от специалисти на сервиз РотоРем",
      "description": "Запознайте се с нашите инженери и технически специалисти по ремонт на битова техника и електроуслуги във Варна и София.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/ekip/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/ekip/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Начало", "item": "https://www.rotorem.bg/" },
        { "@type": "ListItem", "position": 2, "name": "Екип", "item": "https://www.rotorem.bg/ekip/" }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем",
      "url": "https://www.rotorem.bg",
      "logo": "https://www.rotorem.bg/favicon.svg"
    }
  ]
};

const enTeamGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.rotorem.bg/en/team/#webpage",
      "url": "https://www.rotorem.bg/en/team/",
      "name": "RotoRem Service Specialist Team",
      "description": "Meet our engineers and technical specialists for home appliance repair and electrical services in Varna and Sofia.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/en/team/#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/en/team/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.rotorem.bg/en/" },
        { "@type": "ListItem", "position": 2, "name": "Team", "item": "https://www.rotorem.bg/en/team/" }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem",
      "url": "https://www.rotorem.bg/en/",
      "logo": "https://www.rotorem.bg/favicon.svg"
    }
  ]
};

const bgNikolayProfileGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.rotorem.bg/ekip/nikolay-ivanov/#webpage",
      "url": "https://www.rotorem.bg/ekip/nikolay-ivanov/",
      "name": "Николай Иванов - Главен сервизен техник в РотоРем",
      "description": "Професионален профил на инж. Николай Иванов, магистър по Автоматика и системи за управление с над 25 години опит в сервиза на битова техника.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/ekip/nikolay-ivanov/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/ekip/nikolay-ivanov/#person" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/ekip/nikolay-ivanov/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Начало",
          "item": "https://www.rotorem.bg/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Екип",
          "item": "https://www.rotorem.bg/ekip/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Николай Иванов - Професионален ел техник",
          "item": "https://www.rotorem.bg/ekip/nikolay-ivanov/"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/ekip/nikolay-ivanov/#person",
      "name": "Николай Иванов",
      "jobTitle": "Главен сервизен техник",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Инженер по автоматизация и сервизна поддръжка",
        "occupationalCategory": "7412",
        "experienceRequirements": "15+ години професионален опит",
        "description": "Експерт в диагностиката, поддръжката и ремонта на електронни модули и сложни системи за управление в домакинските уреди."
      },
      "gender": "https://schema.org/Male",
      "image": "https://www.rotorem.bg/profil/avatar-1.jpg",
      "description": "Инженер-магистър с дългогодишен практически опит в диагностиката, поддръжката и основния ремонт на перални, сушилни, съдомиялни и фурни. Специалист по ремонт на електронни модули и управление на битови уреди.",
      "worksFor": { "@id": "https://www.rotorem.bg/#localbusiness" },
      "url": "https://www.rotorem.bg/ekip/nikolay-ivanov/",
      "knowsLanguage": [
        { "@type": "Language", "name": "Bulgarian" },
        { "@type": "Language", "name": "English" }
      ],
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Технически университет Варна",
          "sameAs": "https://www.tu-varna.bg/"
        },
        {
          "@type": "EducationalOrganization",
          "name": "Техникум по електротехника Димитър Ганев, гр. Варна"
        }
      ],
      "knowsAbout": [
        "Ремонт на перални машини",
        "Ремонт на сушилни машини",
        "Ремонт на съдомиялни машини",
        "Ремонт на фурни и готварски печки",
        "Ремонт на електронни платки и модули",
        "Автоматика и системи за управление"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Магистър по Автоматика и системи за управление",
          "recognizedBy": {
            "@type": "EducationalOrganization",
            "name": "Технически университет Варна"
          }
        }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем",
      "url": "https://www.rotorem.bg",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "telephone": "089 834 0982",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Varna",
        "postalCode": "9000",
        "addressCountry": "BG"
      }
    }
  ]
};

const bgGeorgiProfileGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.rotorem.bg/ekip/georgi-nikolov/#webpage",
      "url": "https://www.rotorem.bg/ekip/georgi-nikolov/",
      "name": "Георги Николов - Електротехник в РотоРем Варна",
      "description": "Професионален профил на Георги Николов, специалист по електроуслуги и изграждане на ел. инсталации в град Варна.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/ekip/georgi-nikolov/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/ekip/georgi-nikolov/#person" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/ekip/georgi-nikolov/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Начало",
          "item": "https://www.rotorem.bg/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Екип",
          "item": "https://www.rotorem.bg/ekip/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Георги Николов - Професионални електро услуги във Варна",
          "item": "https://www.rotorem.bg/ekip/georgi-nikolov/"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/ekip/georgi-nikolov/#person",
      "name": "Георги Николов",
      "jobTitle": "Електротехник",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Електротехник по сградни инсталации и оборудване",
        "occupationalCategory": "7411",
        "description": "Специалист по проектиране, изграждане и ремонт на електрически инсталации, монтаж на ел. табла и отстраняване на аварии."
      },
      "gender": "https://schema.org/Male",
      "image": "https://www.rotorem.bg/profil/avatar-2.jpg",
      "description": "Квалифициран електротехник с фокус върху безопасността и надеждността на домашните ел. системи. Експерт в монтажа на защитна апаратура и диагностиката на ел. повреди в района на Варна.",
      "worksFor": { "@id": "https://www.rotorem.bg/#localbusiness" },
      "url": "https://www.rotorem.bg/ekip/georgi-nikolov/",
      "knowsLanguage": [
        { "@type": "Language", "name": "Bulgarian" }
      ],
      "knowsAbout": [
        "Електроуслуги",
        "Монтаж на ел. табла",
        "Проектиране на ел. инсталации",
        "Смяна на ел. ключове и контакти",
        "Аварийни електроремонти",
        "Заземяване и мълниезащита"
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем",
      "url": "https://www.rotorem.bg",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "telephone": "089 834 0982",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Varna",
        "postalCode": "9000",
        "addressCountry": "BG"
      }
    }
  ]
};

const bgLyubomirProfileGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.rotorem.bg/ekip/lyubomir-dimitrov/#webpage",
      "url": "https://www.rotorem.bg/ekip/lyubomir-dimitrov/",
      "name": "Любомир Димитров - Специалист бяла техника в РотоРем София",
      "description": "Професионален профил на инж. Любомир Димитров, магистър по Сградна автоматизация с над 10 години опит в сервиза на битова техника в София.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/ekip/lyubomir-dimitrov/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/ekip/lyubomir-dimitrov/#person" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/ekip/lyubomir-dimitrov/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Начало",
          "item": "https://www.rotorem.bg/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Екип",
          "item": "https://www.rotorem.bg/ekip/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Любомир Димитров - Майстор на перални, съдомиялни, печки и др.",
          "item": "https://www.rotorem.bg/ekip/lyubomir-dimitrov/"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/ekip/lyubomir-dimitrov/#person",
      "name": "Любомир Димитров",
      "jobTitle": "Сервизен техник на бяла техника",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Инженер по сградна автоматизация и сервизна поддръжка",
        "occupationalCategory": "7412",
        "experienceRequirements": "10+ години професионален опит",
        "description": "Специалист по поддръжка на автоматизирани системи и диагностика на домакински електроуреди."
      },
      "gender": "https://schema.org/Male",
      "image": "https://www.rotorem.bg/profil/avatar-3.jpg",
      "description": "Инженер-магистър по Сградна автоматизация с богат опит в ремонта на перални, съдомиялни и сушилни машини. Специализиран в обслужването на клиенти в района на София.",
      "worksFor": { "@id": "https://www.rotorem.bg/#localbusiness" },
      "url": "https://www.rotorem.bg/ekip/lyubomir-dimitrov/",
      "knowsLanguage": [
        { "@type": "Language", "name": "Bulgarian" }
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Технически университет Варна",
        "sameAs": "https://www.tu-varna.bg/"
      },
      "knowsAbout": [
        "Ремонт на перални",
        "Ремонт на сушилни",
        "Ремонт на съдомиялни машини",
        "Ремонт на фурни и котлони",
        "Сградна автоматизация",
        "Електротехническа диагностика"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Магистър по Сградна автоматизация",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Технически университет – Варна"
        }
      }
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем",
      "url": "https://www.rotorem.bg",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "telephone": "089 834 0982",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sofia",
        "postalCode": "1000",
        "addressCountry": "BG"
      }
    }
  ]
};

const enNikolayProfileGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.rotorem.bg/en/team/nikolay-ivanov/#webpage",
      "url": "https://www.rotorem.bg/en/team/nikolay-ivanov/",
      "name": "Nikolay Ivanov - Chief Service Technician at RotoRem",
      "description": "Professional profile of Eng. Nikolay Ivanov, Master in Automation and Control Systems with over 25 years of experience in home appliance repair.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/en/team/nikolay-ivanov/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/en/team/nikolay-ivanov/#person" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/en/team/nikolay-ivanov/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.rotorem.bg/en/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Team",
          "item": "https://www.rotorem.bg/en/team/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Nikolay Ivanov - Professional Appliance Technician",
          "item": "https://www.rotorem.bg/en/team/nikolay-ivanov/"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/en/team/nikolay-ivanov/#person",
      "name": "Nikolay Ivanov",
      "jobTitle": "Chief Service Technician",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Automation and Service Maintenance Engineer",
        "occupationalCategory": "7412",
        "experienceRequirements": "15+ years of professional experience",
        "description": "Expert in diagnostics, maintenance, and repair of electronic modules and complex control systems in household appliances."
      },
      "gender": "https://schema.org/Male",
      "image": "https://www.rotorem.bg/profil/avatar-1.jpg",
      "description": "Engineer-master with extensive practical experience in diagnostics, maintenance, and major repair of washing machines, dryers, dishwashers, and ovens. Specialist in repairing electronic modules and control systems for household appliances.",
      "worksFor": { "@id": "https://www.rotorem.bg/en/#localbusiness" },
      "url": "https://www.rotorem.bg/en/team/nikolay-ivanov/",
      "knowsLanguage": [
        { "@type": "Language", "name": "Bulgarian" },
        { "@type": "Language", "name": "English" }
      ],
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "Technical University of Varna",
          "sameAs": "https://www.tu-varna.bg/"
        },
        {
          "@type": "EducationalOrganization",
          "name": "Dimitar Ganev Vocational School of Electrical Engineering, Varna"
        }
      ],
      "knowsAbout": [
        "Washing Machine Repair",
        "Dryer Repair",
        "Dishwasher Repair",
        "Oven and Stove Repair",
        "Electronic Board and Module Repair",
        "Automation and Control Systems"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "degree",
          "name": "Master in Automation and Control Systems",
          "recognizedBy": {
            "@type": "EducationalOrganization",
            "name": "Technical University of Varna"
          }
        }
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem",
      "url": "https://www.rotorem.bg/en/",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "telephone": "089 834 0982",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Varna",
        "postalCode": "9000",
        "addressCountry": "BG"
      }
    }
  ]
};

const enGeorgiProfileGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.rotorem.bg/en/team/georgi-nikolov/#webpage",
      "url": "https://www.rotorem.bg/en/team/georgi-nikolov/",
      "name": "Georgi Nikolov - Electrician at RotoRem Varna",
      "description": "Professional profile of Georgi Nikolov, specialist in electrical services and installation of electrical systems in the city of Varna.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/en/team/georgi-nikolov/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/en/team/georgi-nikolov/#person" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/en/team/georgi-nikolov/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.rotorem.bg/en/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Team",
          "item": "https://www.rotorem.bg/en/team/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Georgi Nikolov - Professional Electrical Services in Varna",
          "item": "https://www.rotorem.bg/en/team/georgi-nikolov/"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/en/team/georgi-nikolov/#person",
      "name": "Georgi Nikolov",
      "jobTitle": "Electrician",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Electrician for building installations and equipment",
        "occupationalCategory": "7411",
        "description": "Specialist in the design, construction, and repair of electrical installations, installation of electrical panels, and emergency fault rectification."
      },
      "gender": "https://schema.org/Male",
      "image": "https://www.rotorem.bg/profil/avatar-2.jpg",
      "description": "Qualified electrician with a focus on the safety and reliability of domestic electrical systems. Expert in the installation of protective equipment and diagnostics of electrical faults in the Varna region.",
      "worksFor": { "@id": "https://www.rotorem.bg/en/#localbusiness" },
      "url": "https://www.rotorem.bg/en/team/georgi-nikolov/",
      "knowsLanguage": [
        { "@type": "Language", "name": "Bulgarian" }
      ],
      "knowsAbout": [
        "Electrical Services",
        "Electrical Panel Installation",
        "Electrical System Design",
        "Replacement of Switches and Sockets",
        "Emergency Electrical Repairs",
        "Grounding and Lightning Protection"
      ]
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem",
      "url": "https://www.rotorem.bg/en/",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "telephone": "089 834 0982",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Varna",
        "postalCode": "9000",
        "addressCountry": "BG"
      }
    }
  ]
};

const enLyubomirProfileGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": "https://www.rotorem.bg/en/team/lyubomir-dimitrov/#webpage",
      "url": "https://www.rotorem.bg/en/team/lyubomir-dimitrov/",
      "name": "Lyubomir Dimitrov - White Goods Specialist at RotoRem Sofia",
      "description": "Professional profile of Eng. Lyubomir Dimitrov, Master in Building Automation with over 10 years of experience in home appliance repair in Sofia.",
      "breadcrumb": { "@id": "https://www.rotorem.bg/en/team/lyubomir-dimitrov/#breadcrumb" },
      "mainEntity": { "@id": "https://www.rotorem.bg/en/team/lyubomir-dimitrov/#person" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.rotorem.bg/en/team/lyubomir-dimitrov/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.rotorem.bg/en/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Team",
          "item": "https://www.rotorem.bg/en/team/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Lyubomir Dimitrov - Appliance Repair Specialist",
          "item": "https://www.rotorem.bg/en/team/lyubomir-dimitrov/"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.rotorem.bg/en/team/lyubomir-dimitrov/#person",
      "name": "Lyubomir Dimitrov",
      "jobTitle": "White Goods Service Technician",
      "hasOccupation": {
        "@type": "Occupation",
        "name": "Building Automation and Service Maintenance Engineer",
        "occupationalCategory": "7412",
        "experienceRequirements": "10+ years of professional experience",
        "description": "Specialist in maintenance of automated systems and diagnostics of household electrical appliances."
      },
      "gender": "https://schema.org/Male",
      "image": "https://www.rotorem.bg/profil/avatar-3.jpg",
      "description": "Engineer-Master in Building Automation with extensive experience in repairing washing machines, dishwashers, and dryers. Specialized in serving customers in the Sofia area.",
      "worksFor": { "@id": "https://www.rotorem.bg/en/#localbusiness" },
      "url": "https://www.rotorem.bg/en/team/lyubomir-dimitrov/",
      "knowsLanguage": [
        { "@type": "Language", "name": "Bulgarian" }
      ],
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Technical University of Varna",
        "sameAs": "https://www.tu-varna.bg/"
      },
      "knowsAbout": [
        "Washing Machine Repair",
        "Dryer Repair",
        "Dishwasher Repair",
        "Oven and Hob Repair",
        "Building Automation",
        "Electrical Diagnostics"
      ],
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "name": "Master in Building Automation",
        "recognizedBy": {
          "@type": "EducationalOrganization",
          "name": "Technical University of Varna"
        }
      }
    },
    {
      "@type": ["Electrician", "LocalBusiness"],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem",
      "url": "https://www.rotorem.bg/en/",
      "logo": "https://www.rotorem.bg/favicon.svg",
      "telephone": "089 834 0982",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Sofia",
        "postalCode": "1000",
        "addressCountry": "BG"
      }
    }
  ]
};

const simplePageOverrides: Record<string, JsonLd> = {
  "/": bgHomeGraph,
  "/en/": enHomeGraph,
  "/contact/": bgContactGraph,
  "/en/contact/": enContactGraph,
  "/services/": bgServicesIndexGraph,
  "/en/services/": enServicesIndexGraph,
  "/services/sofia/": bgSofiaIndexGraph,
  "/en/services/sofia/": enSofiaIndexGraph,
  "/ekip/": bgTeamGraph,
  "/en/team/": enTeamGraph,
  "/ekip/nikolay-ivanov/": bgNikolayProfileGraph,
  "/ekip/georgi-nikolov/": bgGeorgiProfileGraph,
  "/ekip/lyubomir-dimitrov/": bgLyubomirProfileGraph,
  "/en/team/nikolay-ivanov/": enNikolayProfileGraph,
  "/en/team/georgi-nikolov/": enGeorgiProfileGraph,
  "/en/team/lyubomir-dimitrov/": enLyubomirProfileGraph,
  ...serviceOverrides
};

export function getJsonLdOverride(pathname: string): JsonLd | null {
  return simplePageOverrides[pathname] ?? null;
}

import {
  getSchemaOffers,
  type ServiceCity,
  type ServicePriceKey,
} from '../data/service-prices';
import {
  buildAggregateRating,
  buildSchemaReviews,
} from '../utils/schemaReviews';

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

const AGGREGATE_RATING = buildAggregateRating();
const BG_SCHEMA_REVIEWS = buildSchemaReviews('bg');
const EN_SCHEMA_REVIEWS = buildSchemaReviews('en');

const LOCAL_BUSINESS_TYPES = {
  varna: ['LocalBusiness', 'HomeAndConstructionBusiness', 'Electrician'],
  sofia: ['LocalBusiness', 'HomeAndConstructionBusiness'],
} as const;

function getLocalBusinessTypes(city: ServiceCity): readonly string[] {
  return LOCAL_BUSINESS_TYPES[city];
}

function getCityFromServicePath(path: string): ServiceCity {
  return path.includes('/sofia/') ? 'sofia' : 'varna';
}

function getServiceKeyFromPath(path: string): ServicePriceKey | null {
  if (path.includes('electrical-services')) return null;
  if (path.includes('washing-machine-repair')) return 'washing-machine';
  if (path.includes('dryer-repair')) return 'dryer';
  if (path.includes('dishwasher-repair')) return 'dishwasher';
  if (path.includes('oven-repair')) return 'oven';
  if (path.includes('boiler-repair')) return 'boiler';
  return null;
}

function buildServiceOffers(cfg: ServiceConfig): Array<Record<string, unknown>> {
  const city = getCityFromServicePath(cfg.path);
  const serviceKey = getServiceKeyFromPath(cfg.path);

  if (!serviceKey) {
    return [
      {
        '@type': 'Offer',
        name:
          cfg.lang === 'en'
            ? `Electrician visit and diagnostics - ${city === 'sofia' ? 'Sofia' : 'Varna'}`
            : `Посещение и диагностика от електротехник - ${city === 'sofia' ? 'София' : 'Варна'}`,
        price: city === 'sofia' ? '30' : '20',
        priceCurrency: 'EUR',
      },
    ];
  }

  return getSchemaOffers(serviceKey, city, cfg.lang).map((offer) => ({
    '@type': 'Offer',
    name: offer.name,
    price: offer.price,
    priceCurrency: 'EUR',
  }));
}

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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "aggregateRating": AGGREGATE_RATING,
      "review": BG_SCHEMA_REVIEWS,
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Диагностика на битова техника във Варна",
          "areaServed": {
            "@type": "City",
            "name": "Varna"
          },
          "price": "20",
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
            "text": "Таксата за диагностика за Варна е 20 EUR, а за София - 30 EUR. Тя включва посещение на място, инспекция и диагностициране на проблема."
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "aggregateRating": AGGREGATE_RATING,
      "review": EN_SCHEMA_REVIEWS,
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "Appliance diagnostics in Varna",
          "areaServed": {
            "@type": "City",
            "name": "Varna"
          },
          "price": "20",
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
            "text": "The diagnostic fee for Varna is 20 EUR, and for Sofia - 30 EUR. It includes an on-site visit, inspection, and problem diagnostics."
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем",
      "url": "https://www.rotorem.bg",
      "telephone": "089 834 0982",
      "priceRange": "20EUR - 30EUR",
      "image": "https://www.rotorem.bg/img/hero.webp",
      "address": { "@type": "PostalAddress", "addressLocality": "Varna", "postalCode": "9000", "addressCountry": "BG" },
      "geo": { "@type": "GeoCoordinates", "latitude": 43.2141, "longitude": 27.9147 },
      "aggregateRating": AGGREGATE_RATING,
      "review": BG_SCHEMA_REVIEWS,
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem",
      "url": "https://www.rotorem.bg/en/",
      "telephone": "089 834 0982",
      "priceRange": "20EUR - 30EUR",
      "image": "https://www.rotorem.bg/img/hero.webp",
      "address": { "@type": "PostalAddress", "addressLocality": "Varna", "postalCode": "9000", "addressCountry": "BG" },
      "geo": { "@type": "GeoCoordinates", "latitude": 43.2141, "longitude": 27.9147 },
      "aggregateRating": AGGREGATE_RATING,
      "review": EN_SCHEMA_REVIEWS,
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
      "@type": [...LOCAL_BUSINESS_TYPES.sofia],
      "@id": "https://www.rotorem.bg/#localbusiness",
      "name": "РотоРем София",
      "url": "https://www.rotorem.bg",
      "telephone": "089 834 0982",
      "priceRange": "20EUR - 30EUR",
      "address": { "@type": "PostalAddress", "addressLocality": "Sofia", "postalCode": "1000", "addressCountry": "BG" },
      "geo": { "@type": "GeoCoordinates", "latitude": 42.6975, "longitude": 23.3221 },
      "aggregateRating": AGGREGATE_RATING,
      "review": BG_SCHEMA_REVIEWS,
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
      "@type": [...LOCAL_BUSINESS_TYPES.sofia],
      "@id": "https://www.rotorem.bg/en/#localbusiness",
      "name": "RotoRem Sofia",
      "url": "https://www.rotorem.bg/en/",
      "telephone": "089 834 0982",
      "priceRange": "20EUR - 30EUR",
      "address": { "@type": "PostalAddress", "addressLocality": "Sofia", "postalCode": "1000", "addressCountry": "BG" },
      "geo": { "@type": "GeoCoordinates", "latitude": 42.6975, "longitude": 23.3221 },
      "aggregateRating": AGGREGATE_RATING,
      "review": EN_SCHEMA_REVIEWS,
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
        "offers": buildServiceOffers(cfg),
      },
      {
        "@type": "Organization",
        "@id": `${baseRoot}/#organization`,
        "name": cfg.lang === "en" ? "RotoRem" : "РотоРем",
        "url": `${baseRoot}/`,
        "logo": "https://www.rotorem.bg/favicon.svg"
      },
      {
        "@type": [...getLocalBusinessTypes(getCityFromServicePath(cfg.path))],
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
        "aggregateRating": AGGREGATE_RATING,
        "review": cfg.lang === "en" ? EN_SCHEMA_REVIEWS : BG_SCHEMA_REVIEWS,
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
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли пералнята да бъде ремонтирана на адрес?", a: "Да. РотоРем извършва ремонт и диагностика на перални по домовете във Варна. В много случаи ремонтът може да бъде извършен при самото посещение." },
      { q: "Как разбирате коя част е повредена?", a: "Техникът започва от конкретния симптом и проверява системите, които могат да го причинят. Подмяна на част се препоръчва след установяване на причината." },
      { q: "Какво означава кодът за грешка на пералнята?", a: "Кодът за грешка е полезна информация за диагностиката, но невинаги показва директно коя част трябва да бъде сменена." },
      { q: "Защо пералнята не източва?", a: "Възможните причини включват филтъра, дренажния маркуч, помпата за източване или проблем в друга част от системата." },
      { q: "Струва ли си да се сменят лагерите?", a: "Зависи от модела, възрастта и общото състояние на пералнята. След диагностика може да се прецени дали ремонтът е икономически оправдан." },
      { q: "Ремонтирате ли перални, които не загряват?", a: "Да. Проверяват се нагревателят, температурните датчици и управляващата система, за да се установи точната причина." },
      { q: "Ремонтирате ли перални на всички марки?", a: "РотоРем работи с много от популярните марки перални. При обаждане е добре да посочите марката и, ако е възможно, модела на машината." },
      { q: "Давате ли гаранция за ремонта?", a: "Да, предоставяме гаранция за извършените ремонти. Конкретните условия се обсъждат след диагностика и преди започване на работата." }
    ]
  },
  {
    path: "/services/dryer-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за Варна",
    breadcrumbThird: "Ремонт на сушилни по домовете във Варна",
    serviceName: "Ремонт на сушилни по домовете във Варна",
    serviceType: "Ремонт на сушилни",
    description: "Ремонт и диагностика на сушилни по домовете във Варна. Проблеми с нагряване, термопомпа, барабан, ремък, помпа, шум и електроника. РотоРем.",
    cityName: "Варна",
    lat: 43.2141,
    lng: 27.9147,
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли сушилнята да бъде ремонтирана на адрес?", a: "Да. РотоРем извършва диагностика и ремонт на сушилни по домовете във Варна. В много случаи ремонтът може да бъде направен при посещението." },
      { q: "Ремонтирате ли сушилни с термопомпа?", a: "Да. Диагностиката при тези модели се съобразява със специфичната им конструкция и система. РотоРем обслужва достъпните компоненти, но не извършва ремонт на компресори и хладилната система на термопомпата." },
      { q: "Защо сушилнята не загрява?", a: "Причината може да бъде нагревател, термостат, температурен датчик, електроника или друг компонент." },
      { q: "Защо барабанът не се върти?", a: "Проверяват се ремъкът, моторът, ролките, лагерите и механичното движение на барабана." },
      { q: "Защо сушилнята суши много бавно?", a: "Причината може да бъде ограничен въздушен поток, замърсени филтри, проблем с кондензатора, датчик или системата с термопомпа." },
      { q: "Ремонтирате ли сушилни, които не източват водата?", a: "Да. Проверяват се помпата, резервоарът за конденз, маркучите и дренажната система." },
      { q: "Монтирате ли сушилня върху пералня?", a: "Да, когато моделите и условията позволяват безопасно позициониране. При необходимост от свързващ комплект, той трябва да бъде осигурен предварително от собственика на уредите." },
      { q: "Колко струва диагностиката?", a: "Диагностиката във Варна е 20 €." },
      { q: "Давате ли гаранция?", a: "Да, предоставяме гаранция за извършените ремонти. Конкретните условия се обсъждат след диагностика и преди започване на работата." }
    ]
  },
  {
    path: "/services/dishwasher-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за Варна",
    breadcrumbThird: "Ремонт на съдомиялни по домовете във Варна",
    serviceName: "Ремонт на съдомиялни по домовете във Варна",
    serviceType: "Ремонт на съдомиялни",
    description: "Ремонт и диагностика на съдомиялни по домовете във Варна. Проблеми с източване, пълнене, нагряване, течове, помпи, врата и електроника. РотоРем.",
    cityName: "Варна",
    lat: 43.2141,
    lng: 27.9147,
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли съдомиялната да бъде ремонтирана на адрес?", a: "Да. РотоРем извършва диагностика и ремонт на съдомиялни по домовете във Варна. Когато естеството на повредата позволява, ремонтът се извършва на място." },
      { q: "Ремонтирате ли вградени съдомиялни?", a: "Да. РотоРем обслужва свободностоящи и вградени съдомиялни. При вградените модели може да бъде необходим частичен демонтаж за достъп до уреда." },
      { q: "Защо съдомиялната не източва водата?", a: "Причината може да бъде запушен филтър, дренажен маркуч, помпа за източване или друг проблем по дренажната система." },
      { q: "Защо съдомиялната не загрява?", a: "Проверяват се нагревателната система, температурните датчици и управлението на машината, за да се установи конкретната причина." },
      { q: "Защо съдовете остават мръсни?", a: "Причината може да бъде в замърсени филтри, разпръскващи рамена, дюзи, циркулацията на водата или друга част от системата." },
      { q: "Какво означава кодът за грешка?", a: "Кодът помага да се определи коя система трябва да бъде проверена, но сам по себе си невинаги означава, че определена част трябва да бъде сменена." },
      { q: "Монтирате ли нови съдомиялни?", a: "Да. РотоРем предлага монтаж на свободностоящи и вградени съдомиялни във Варна." },
      { q: "Колко струва диагностиката?", a: "Към момента на страницата е посочена цена 40 лв. / 20,46 € за посещение и диагностика във Варна." }
    ]
  },
  {
    path: "/services/oven-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за Варна",
    breadcrumbThird: "Ремонт на фурни във Варна",
    serviceName: "Ремонт на фурни по домовете във Варна",
    serviceType: "Ремонт на фурни",
    description: "Ремонт и диагностика на фурни по домовете във Варна. Проблеми с нагреватели, температура, вентилатор, врата, програматор и електроника. РотоРем.",
    cityName: "Варна",
    lat: 43.2141,
    lng: 27.9147,
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли фурната да бъде ремонтирана на адрес?", a: "Да. РотоРем извършва диагностика и ремонт на фурни по домовете във Варна. Когато естеството на повредата позволява, ремонтът може да бъде извършен при посещението." },
      { q: "Защо фурната не загрява?", a: "Причината може да бъде в нагревател, термостат, температурен датчик, термозащита, електронно управление или друга част от системата." },
      { q: "Защо фурната не достига зададената температура?", a: "Възможно е един от нагревателите да не работи правилно или да има проблем със системата за измерване и контрол на температурата." },
      { q: "Защо фурната изключва предпазителя?", a: "Причината може да бъде електрическа неизправност в нагревател или друг компонент. Използването на фурната трябва да бъде прекратено до установяване на проблема." },
      { q: "Може ли да бъде сменен само нагревателят?", a: "Да, когато диагностиката покаже, че конкретният нагревател е причината за проблема и има подходяща резервна част за модела." },
      { q: "Ремонтирате ли вентилатори на фурни?", a: "Да. РотоРем обслужва конвекционни фурни и проблеми с вентилатора, мотора и свързаните компоненти." },
      { q: "Ремонтирате ли вградени фурни?", a: "Да. РотоРем ремонтира вградени и свободностоящи електрически фурни според конкретния модел и симптом." },
      { q: "Какво означава кодът за грешка?", a: "Кодът помага при диагностиката, но не трябва самостоятелно да се използва като доказателство, че определена част трябва да бъде сменена." },
      { q: "Колко струва диагностиката?", a: "Посещението и диагностиката във Варна са 20 €." },
      { q: "Давате ли гаранция?", a: "Да, предоставяме гаранция за извършените ремонти. Конкретните условия се обсъждат след диагностика и преди започване на работата." }
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
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли бойлерът да бъде ремонтиран на адрес?", a: "Да. РотоРем извършва диагностика и ремонт на електрически бойлери по домовете във Варна." },
      { q: "Защо бойлерът не загрява водата?", a: "Възможните причини включват нагревател, термостат, термозащита, електрическо захранване или друга част от системата. Точната причина се определя след диагностика." },
      { q: "Как се разбира дали нагревателят е изгорял?", a: "Нагревателят се проверява с подходящи измервания. Липсата на топла вода сама по себе си не доказва, че той е повреден." },
      { q: "Защо бойлерът изключва предпазителя?", a: "Причината може да бъде електрическа неизправност в нагревателя, връзките или друг компонент. Уредът трябва да бъде проверен преди повторна употреба." },
      { q: "Защо бойлерът тече?", a: "Зависи откъде идва водата. Причината може да бъде връзка, клапан, фланец, уплътнение или проблем с друга част на бойлера." },
      { q: "Нормално ли е предпазният клапан да капе?", a: "При определени условия може да има отделяне на вода при загряване и повишаване на налягането. Постоянен или необичаен теч обаче трябва да бъде проверен." },
      { q: "Почиствате ли бойлери от котлен камък?", a: "Да. Почистването от котлен камък е част от услугите на РотоРем за бойлери." },
      { q: "Монтирате ли нови бойлери?", a: "Да. РотоРем включва и монтаж на нов бойлер в предлаганите услуги." },
      { q: "Какви бойлери ремонтирате?", a: "РотоРем обслужва електрически вертикални, хоризонтални и компактни бойлери за монтаж под мивка." },
      { q: "Колко струва диагностиката във Варна?", a: "Посещението и диагностиката във Варна са 20,46 € / 40 лв." },
      { q: "Давате ли гаранция за ремонта?", a: "Да, предоставяме гаранция за извършения ремонт и използваните части. Конкретните условия се обсъждат след диагностика." }
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
    localBusinessName: "РотоРем",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление. Квалифициран специалист в изграждането и поддръжката на електрически системи.",
    faq: [
      { q: "Какви електро услуги извършвате във Варна?", a: "РотоРем извършва диагностика и ремонти по домашни електрически инсталации, работа по контакти, ключове, осветление, електрически табла, кабели и други предлагани електроуслуги." },
      { q: "Можете ли да установите защо няма ток в една стая?", a: "Да. Проверяват се защитните устройства, наличието на напрежение и връзките по съответната електрическа верига." },
      { q: "Защо автоматичният предпазител изключва?", a: "Причината може да бъде претоварване, късо съединение, дефектен електрически уред или проблем в инсталацията." },
      { q: "Какво да направя, ако контактът искри?", a: "Спрете да използвате контакта до извършване на проверка. Не включвайте електрически уреди в него, ако има искрене, силно загряване или миризма на изгоряло." },
      { q: "Сменяте ли контакти и ключове?", a: "Да. РотоРем извършва диагностика, монтаж и подмяна на контакти и ключове според съществуващата електрическа инсталация." },
      { q: "Монтирате ли осветителни тела?", a: "Да. РотоРем извършва монтаж на домашни осветителни тела според конкретната инсталация." },
      { q: "Работите ли по електрически табла?", a: "Да. При проблем могат да бъдат проверени автоматичните прекъсвачи, защитните устройства, връзките и съответните токови кръгове." },
      { q: "Колко струва диагностиката?", a: "Посещението и диагностиката във Варна са 20 €." },
      { q: "Предлагате ли аварийни ел услуги?", a: "РотоРем приема заявки за проблеми като късо съединение, загуба на ток или изключваща защита според текущия график." }
    ]
  },
  {
    path: "/services/sofia/washing-machine-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт на перални в София",
    serviceName: "Ремонт и монтаж на перални по домовете в София",
    serviceType: "Ремонт на перални",
    description: "Ремонт и диагностика на перални по домовете в София. Ремонт при проблем с източване, центрофуга, нагряване, теч, барабан и други повреди. Диагностика 30 €.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли пералнята да бъде ремонтирана на адрес?", a: "Да. РотоРем извършва диагностика и ремонт на перални по домовете в София и населени места около София." },
      { q: "Защо пералнята не източва водата?", a: "Причината може да бъде свързана с филтъра, помпата, маркуча, запушване или друг компонент от системата за източване." },
      { q: "Защо пералнята не центрофугира?", a: "Причината може да бъде свързана с неизточена вода, ремъка, двигателя, управлението или друг компонент." },
      { q: "Защо пералнята не загрява?", a: "Проверяват се нагревателят, температурният датчик, електрическите връзки и управлението." },
      { q: "Защо пералнята издава силен шум?", a: "Шумът може да бъде свързан с лагерите, барабана, амортисьорите, двигателя или друга механична част." },
      { q: "Защо пералнята тече?", a: "Водата може да идва от маркуч, връзка, уплътнение, помпа или друг компонент." },
      { q: "Извършвате ли монтаж и демонтаж?", a: "Да. РотоРем извършва монтаж и демонтаж на перални." },
      { q: "Колко струва диагностиката?", a: "Посещението и диагностиката в София са 30 €." },
      { q: "Давате ли гаранция?", a: "Гаранцията зависи от извършения ремонт и използваните части. Конкретните условия се уточняват със специалиста." }
    ]
  },
  {
    path: "/services/sofia/dryer-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт на сушилни в София",
    serviceName: "Ремонт на сушилни по домовете в София",
    serviceType: "Ремонт на сушилни",
    description: "Ремонт и диагностика на сушилни по домовете в София. Проблеми с нагряване, сушене, барабан, ремък, конденз и други повреди. Диагностика 30 €.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли сушилнята да бъде ремонтирана на адрес?", a: "Да. РотоРем извършва диагностика и ремонт на сушилни по домовете в София и населени места около София." },
      { q: "Защо сушилнята работи, но не загрява?", a: "Причината може да бъде свързана с нагревателната система, температурните датчици, въздушния поток, термопомпената система или управлението." },
      { q: "Защо сушилнята не суши добре?", a: "Проблемът може да бъде свързан с филтрите, въздушния поток, температурата, датчиците или друга част от процеса." },
      { q: "Защо барабанът не се върти?", a: "Възможните причини включват ремъка, двигателя, ролките или друг механичен компонент." },
      { q: "Защо сушилнята работи по-дълго от обикновено?", a: "Причината може да бъде ограничен въздушен поток, замърсени филтри, недостатъчно нагряване или друг проблем." },
      { q: "Ремонтирате ли сушилни с термопомпа?", a: "Да. РотоРем извършва диагностика и ремонт на основните видове сушилни с термопомпа." },
      { q: "Извършвате ли монтаж и демонтаж?", a: "Да. Извършват се монтаж и демонтаж на сушилни." },
      { q: "Монтирате ли сушилня върху пералня?", a: "Да, когато конкретните уреди и условия позволяват безопасен монтаж." },
      { q: "Колко струва диагностиката?", a: "Посещението и диагностиката в София са 30 €." },
      { q: "Давате ли гаранция?", a: "Гаранцията зависи от извършения ремонт и използваните части. Конкретните условия се уточняват със специалиста." }
    ]
  },
  {
    path: "/services/sofia/dishwasher-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт на съдомиялни в София",
    serviceName: "Ремонт и монтаж на съдомиялни по домовете в София",
    serviceType: "Ремонт на съдомиялни",
    description: "Ремонт и диагностика на съдомиялни по домовете в София. Проблеми с източване, пълнене, нагряване, течове и други повреди. Диагностика 30 €.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли съдомиялната да бъде ремонтирана на адрес?", a: "Да. РотоРем извършва диагностика и ремонт на съдомиялни по домовете в София и населени места около София." },
      { q: "Защо съдомиялната не източва?", a: "Причината може да бъде във филтър, помпа, маркуч или друга част от системата за източване." },
      { q: "Защо съдомиялната не измива добре?", a: "Проверяват се филтрите, циркулацията, разпръскващите рамена и нагряването." },
      { q: "Защо съдомиялната не загрява?", a: "Проверяват се нагревателната система, температурните датчици и управлението." },
      { q: "Ремонтирате ли вградени съдомиялни?", a: "Да. РотоРем обслужва свободностоящи и вградени съдомиялни." },
      { q: "Извършвате ли монтаж и демонтаж?", a: "Да. РотоРем извършва монтаж и демонтаж на съдомиялни в София." },
      { q: "Колко струва диагностиката?", a: "Посещението и диагностиката в София са 30 €." },
      { q: "Давате ли гаранция?", a: "Гаранцията зависи от ремонта и използваните части. Конкретните условия се уточняват със специалиста." }
    ]
  },
  {
    path: "/services/sofia/oven-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт на фурни в София",
    serviceName: "Ремонт на фурни по домовете в София",
    serviceType: "Ремонт на фурни",
    description: "Ремонт и диагностика на фурни по домовете в София. Проблеми с нагреватели, температура, вентилатор, врата и електроника. Диагностика 30 €.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли фурната да бъде ремонтирана на адрес?", a: "Да. РотоРем извършва диагностика и ремонт на фурни по домовете в София и населени места около София." },
      { q: "Защо фурната не загрява?", a: "Причината може да бъде в нагревател, термостат, датчик, електрическа връзка или управление." },
      { q: "Защо фурната пече неравномерно?", a: "Проверяват се нагревателите, вентилаторът и температурният контрол." },
      { q: "Ремонтирате ли вградени фурни?", a: "Да. РотоРем ремонтира вградени и свободностоящи електрически фурни." },
      { q: "Ремонтирате ли фурни Gorenje?", a: "Да. РотоРем извършва диагностика и ремонт на фурни Gorenje в София." },
      { q: "Извършвате ли монтаж?", a: "Да. РотоРем извършва монтаж и демонтаж на електрически фурни." },
      { q: "Колко струва диагностиката?", a: "Посещението и диагностиката в София са 30 €." },
      { q: "Давате ли гаранция?", a: "Гаранцията зависи от ремонта и използваните части. Условията се уточняват със специалиста." }
    ]
  },
  {
    path: "/services/sofia/boiler-repair/",
    lang: "bg",
    breadcrumbSecond: "Услуги за София",
    breadcrumbThird: "Ремонт на бойлери в София",
    serviceName: "Ремонт и монтаж на бойлери в София",
    serviceType: "Ремонт на бойлери",
    description: "Ремонт, диагностика, монтаж и демонтаж на бойлери в София. Нагреватели, термостати, течове, шум и други повреди. Диагностика 30 €.",
    cityName: "София",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "РотоРем София",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Николай Иванов",
    personJobTitle: "Главен техник",
    personDescription: "Магистър по Автоматика и системи за управление с дългогодишен опит в ремонта на домакински уреди.",
    faq: [
      { q: "Може ли бойлерът да бъде ремонтиран на адрес?", a: "Да. РотоРем извършва диагностика и ремонт на бойлери по домовете в София и около града." },
      { q: "Защо бойлерът не загрява?", a: "Проверяват се нагревателят, термостатът, термозащитата и захранването." },
      { q: "Защо бойлерът тече?", a: "Причината може да бъде във фланец, уплътнение, клапан, връзка или водосъдържателя." },
      { q: "Защо бойлерът изключва предпазителя?", a: "Причината може да бъде свързана с нагревателя, електрическа утечка или друг електрически компонент." },
      { q: "Извършвате ли монтаж и демонтаж?", a: "Да. РотоРем извършва монтаж и демонтаж на бойлери в София." },
      { q: "Работите ли с марки като TESY и Eldom?", a: "Да. РотоРем обслужва Eldom, Ariston, TESY, Diplomat, Bosch и други марки бойлери." },
      { q: "Колко струва диагностиката?", a: "Посещението и диагностиката в София са 30 €." },
      { q: "Давате ли гаранция?", a: "Гаранцията зависи от ремонта и използваните части. Конкретните условия се уточняват със специалиста." }
    ]
  },
  {
    path: "/en/services/washing-machine-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "In-Home Washing Machine Repair in Varna",
    serviceName: "In-Home Washing Machine Repair in Varna",
    serviceType: "Washing Machine Repair",
    description: "Specialized in-home washing machine repair and installation in Varna. Professional diagnostics, same-day service and a warranty on completed work.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "Can a washing machine be repaired at my address?", a: "Yes. RotoRem provides in-home diagnostics and repair of washing machines in Varna. In many cases the repair can be completed during the visit itself." },
      { q: "How do you find out which part is faulty?", a: "The technician starts from the specific symptom and checks the systems that could cause it. A part replacement is recommended only after the cause has been established." },
      { q: "What does a washing machine error code mean?", a: "An error code is useful information for diagnostics, but it does not always point directly to the part that has to be replaced." },
      { q: "Why does my washing machine not drain?", a: "Possible causes include the filter, the drain hose, the drain pump or a problem in another part of the system." },
      { q: "Is it worth replacing the bearings?", a: "It depends on the model, the age and the overall condition of the washing machine. After diagnostics, we can assess whether the repair makes economic sense." },
      { q: "Do you repair washing machines that do not heat?", a: "Yes. We check the heating element, the temperature sensors and the control system to find the exact cause." },
      { q: "Do you repair washing machines of all brands?", a: "RotoRem works with many popular washing machine brands. When you call, it helps to tell us the brand and, if possible, the model of the machine." },
      { q: "Do you give a warranty on the repair?", a: "Yes, we provide a warranty on completed repairs. The specific terms are discussed after diagnostics and before work begins." }
    ]
  },
  {
    path: "/en/services/dryer-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "In-Home Dryer Repair in Varna",
    serviceName: "In-Home Dryer Repair in Varna",
    serviceType: "Dryer Repair",
    description: "In-home dryer repair and diagnostics in Varna. Heating, heat pump, drum, belt, pump, noise and electronics problems. RotoRem.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "Can a dryer be repaired at my address?", a: "Yes. RotoRem provides in-home diagnostics and repair of dryers in Varna. In many cases the repair can be completed during the visit." },
      { q: "Do you repair heat pump dryers?", a: "Yes. Diagnostics on these models take their specific construction and system into account. RotoRem services accessible components, but does not repair compressors or the refrigeration circuit of the heat pump." },
      { q: "Why does my dryer not heat?", a: "The cause may be the heating element, thermostat, temperature sensor, electronics or another component." },
      { q: "Why does the drum not rotate?", a: "We check the belt, motor, rollers, bearings and the mechanical movement of the drum." },
      { q: "Why does the dryer dry very slowly?", a: "The cause may be restricted airflow, dirty filters, a condenser problem, a sensor or the heat pump system." },
      { q: "Do you repair dryers that do not drain water?", a: "Yes. We check the pump, condensate tank, hoses and drainage system." },
      { q: "Do you install a dryer on top of a washing machine?", a: "Yes, when the models and conditions allow safe positioning. If a stacking kit is required, it must be provided in advance by the owner of the appliances." },
      { q: "How much does diagnostics cost?", a: "Diagnostics in Varna cost €20." },
      { q: "Do you give a warranty?", a: "Yes, we provide a warranty on completed repairs. The specific terms are discussed after diagnostics and before work begins." }
    ]
  },
  {
    path: "/en/services/dishwasher-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "In-Home Dishwasher Repair in Varna",
    serviceName: "In-Home Dishwasher Repair in Varna",
    serviceType: "Dishwasher Repair",
    description: "In-home dishwasher repair and diagnostics in Varna. Drainage, filling, heating, leaks, pumps, door and electronics problems. RotoRem.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "Can a dishwasher be repaired at my address?", a: "Yes. RotoRem provides in-home diagnostics and repair of dishwashers in Varna. When the nature of the fault allows it, the repair is carried out on site." },
      { q: "Do you repair built-in dishwashers?", a: "Yes. RotoRem services freestanding and built-in dishwashers. With built-in models, partial removal may be needed to access the appliance." },
      { q: "Why does my dishwasher not drain?", a: "The cause may be a clogged filter, a drain hose, the drain pump or another problem along the drainage path." },
      { q: "Why does my dishwasher not heat?", a: "We check the heating system, the temperature sensors and the machine's controls to establish the specific cause." },
      { q: "Why do my dishes stay dirty?", a: "The cause may be dirty filters, spray arms, nozzles, water circulation or another part of the system." },
      { q: "What does an error code mean?", a: "The code helps determine which system should be checked, but on its own it does not always mean that a particular part has to be replaced." },
      { q: "Do you install new dishwashers?", a: "Yes. RotoRem offers installation of freestanding and built-in dishwashers in Varna." },
      { q: "How much does diagnostics cost?", a: "The visit and diagnostics in Varna cost 20 €." }
    ]
  },
  {
    path: "/en/services/oven-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "In-Home Oven Repair in Varna",
    serviceName: "In-Home Oven Repair in Varna",
    serviceType: "Oven and Stove Repair",
    description: "In-home oven repair and diagnostics in Varna. Heating element, temperature, fan, door, program selector and electronics problems. RotoRem.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "Can an oven be repaired at my address?", a: "Yes. RotoRem provides in-home diagnostics and repair of ovens in Varna. When the nature of the fault allows it, the repair can be carried out during the visit." },
      { q: "Why does my oven not heat?", a: "The cause may be a heating element, the thermostat, a temperature sensor, the thermal protection, the electronic control or another part of the system." },
      { q: "Why does my oven not reach the set temperature?", a: "One of the heating elements may not be working properly, or there may be a problem with the system that measures and controls the temperature." },
      { q: "Why does my oven trip the circuit breaker?", a: "The cause may be an electrical fault in a heating element or another component. Use of the oven should stop until the problem has been found." },
      { q: "Can only the heating element be replaced?", a: "Yes, when diagnostics show that this particular heating element is the cause of the problem and a suitable spare part is available for the model." },
      { q: "Do you repair oven fans?", a: "Yes. RotoRem services convection ovens and problems with the fan, the motor and related components." },
      { q: "Do you repair built-in ovens?", a: "Yes. RotoRem repairs built-in and freestanding electric ovens according to the specific model and symptom." },
      { q: "What does an error code mean?", a: "The code helps with diagnostics, but it should not be used on its own as proof that a particular part has to be replaced." },
      { q: "How much does diagnostics cost?", a: "The visit and diagnostics in Varna cost 20 €." },
      { q: "Do you give a warranty?", a: "Yes, we provide a warranty on completed repairs. The specific terms are discussed after diagnostics and before work begins." }
    ]
  },
  {
    path: "/en/services/boiler-repair/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "In-Home Water Heater Repair and Installation in Varna",
    serviceName: "In-Home Water Heater Repair in Varna",
    serviceType: "Water Heater Repair",
    description: "Specialized repair and installation of electric water heaters (boilers) in Varna. Professional diagnostics, same-day service and a warranty on completed work.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with years of experience in household appliance repair.",
    faq: [
      { q: "Can a water heater be repaired at my address?", a: "Yes. RotoRem provides in-home diagnostics and repair of electric water heaters in Varna." },
      { q: "Why does my water heater not heat the water?", a: "Possible causes include the heating element, the thermostat, the thermal protection, the electrical supply or another part of the system. The exact cause is determined after diagnostics." },
      { q: "How can I tell if the heating element has burnt out?", a: "The heating element is tested with suitable measurements. A lack of hot water alone does not prove that it is faulty." },
      { q: "Why does my water heater trip the circuit breaker?", a: "The cause may be an electrical fault in the heating element, the connections or another component. The appliance must be inspected before it is used again." },
      { q: "Why does my water heater leak?", a: "It depends on where the water is coming from. The cause may be a connection, a valve, the flange, a gasket or a problem with another part of the water heater." },
      { q: "Is it normal for the safety valve to drip?", a: "Under certain conditions, some water may be released while heating as the pressure rises. However, a constant or unusual leak should be checked." },
      { q: "Do you descale water heaters?", a: "Yes. Limescale removal is part of RotoRem's water heater services." },
      { q: "Do you install new water heaters?", a: "Yes. RotoRem also installs new water heaters." },
      { q: "What kinds of water heaters do you repair?", a: "RotoRem services electric vertical, horizontal and compact under-sink water heaters." },
      { q: "How much does diagnostics cost in Varna?", a: "The visit and diagnostics in Varna cost 20 €." },
      { q: "Do you give a warranty on the repair?", a: "Yes, we provide a warranty on the completed repair and the parts used. The specific terms are discussed after diagnostics." }
    ]
  },
  {
    path: "/en/services/electrical-services/",
    lang: "en",
    breadcrumbSecond: "Varna Services",
    breadcrumbThird: "In-Home Electrical Services and Emergency Repairs in Varna",
    serviceName: "Electrical Services in Varna",
    serviceType: "Electrical Services",
    description: "Professional in-home electrical services in Varna. Repair and installation of electrical systems, mounting of panels, switches and sockets, and diagnostics of electrical faults.",
    cityName: "Varna",
    lat: 43.2141,
    lng: 27.9147,
    localBusinessName: "RotoRem",
    addressLocality: "Varna",
    postalCode: "9000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems. Qualified specialist in the installation and maintenance of electrical systems.",
    faq: [
      { q: "What electrical services do you provide in Varna?", a: "RotoRem provides diagnostics and repairs of home electrical installations, work on sockets, switches, lighting, electrical panels, cables and other electrical services." },
      { q: "Can you find out why there is no power in one room?", a: "Yes. We check the protective devices, the presence of voltage and the connections along the relevant electrical circuit." },
      { q: "Why does the circuit breaker trip?", a: "The cause may be an overload, a short circuit, a faulty electrical appliance or a problem in the installation." },
      { q: "What should I do if a socket is sparking?", a: "Stop using the socket until it has been inspected. Do not plug electrical appliances into it if there is sparking, strong heating or a smell of burning." },
      { q: "Do you replace sockets and switches?", a: "Yes. RotoRem diagnoses, installs and replaces sockets and switches according to the existing electrical installation." },
      { q: "Do you install light fixtures?", a: "Yes. RotoRem installs household light fixtures according to the specific installation." },
      { q: "Do you work on electrical panels?", a: "Yes. When there is a problem, we can check the circuit breakers, protective devices, connections and the relevant circuits." },
      { q: "How much does diagnostics cost?", a: "The visit and diagnostics in Varna cost 20 €." },
      { q: "Do you offer emergency electrical services?", a: "RotoRem accepts requests for problems such as short circuits, power loss or tripping protection, depending on the current schedule." }
    ]
  },
  {
    path: "/en/services/sofia/washing-machine-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Washing Machine Repair in Sofia",
    serviceName: "At-Home Washing Machine Repair and Installation in Sofia",
    serviceType: "Washing Machine Repair",
    description: "At-home washing machine repair and diagnostics in Sofia. Repairs for drainage, spin, heating, leaks, drum issues, and other faults. Diagnostics 30 €.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "Can the washing machine be repaired at my home?", a: "Yes. RotoRem provides diagnostics and washing machine repair at customers' homes in Sofia and nearby areas." },
      { q: "Why won't the washing machine drain?", a: "The cause may be related to the filter, pump, hose, blockage, or another component in the drainage system." },
      { q: "Why won't the washing machine spin?", a: "The cause may be related to water left in the drum, the belt, motor, control board, or another component." },
      { q: "Why won't the washing machine heat the water?", a: "The heating element, temperature sensor, electrical connections, and control system are checked." },
      { q: "Why is the washing machine making loud noise?", a: "The noise may be related to bearings, the drum, shock absorbers, the motor, or another mechanical part." },
      { q: "Why is the washing machine leaking?", a: "Water may come from a hose, connection, seal, pump, or another component." },
      { q: "Do you provide installation and removal?", a: "Yes. RotoRem installs and removes washing machines." },
      { q: "How much does diagnostics cost?", a: "The visit and diagnostics in Sofia are 30 €." },
      { q: "Do you provide a warranty?", a: "Warranty terms depend on the repair performed and parts used. Specific conditions are confirmed with the technician." }
    ]
  },
  {
    path: "/en/services/sofia/dryer-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Dryer Repair in Sofia",
    serviceName: "At-Home Dryer Repair in Sofia",
    serviceType: "Dryer Repair",
    description: "At-home dryer repair and diagnostics in Sofia. Heating, drying, drum, belt, condensate, and other faults. Diagnostics 30 €.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "Can the dryer be repaired at my home?", a: "Yes. RotoRem provides diagnostics and dryer repair at customers' homes in Sofia and nearby areas." },
      { q: "Why does the dryer run but not heat?", a: "The cause may be related to the heating system, temperature sensors, airflow, heat pump system, or control board." },
      { q: "Why doesn't the dryer dry well?", a: "The problem may be related to filters, airflow, temperature, sensors, or another part of the drying process." },
      { q: "Why won't the drum spin?", a: "Possible causes include the belt, motor, rollers, or another mechanical component." },
      { q: "Why does the dryer take longer than usual?", a: "The cause may be restricted airflow, dirty filters, insufficient heating, a sensor issue, or another fault." },
      { q: "Do you repair heat pump dryers?", a: "Yes. RotoRem diagnoses and repairs the main types of heat pump dryers." },
      { q: "Do you provide installation and removal?", a: "Yes. We install and remove dryers." },
      { q: "Do you stack a dryer on a washing machine?", a: "Yes, when the specific appliances and conditions allow safe installation." },
      { q: "How much does diagnostics cost?", a: "The visit and diagnostics in Sofia are 30 €." },
      { q: "Do you provide a warranty?", a: "Warranty terms depend on the repair performed and parts used. Specific conditions are confirmed with the technician." }
    ]
  },
  {
    path: "/en/services/sofia/dishwasher-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Dishwasher Repair in Sofia",
    serviceName: "At-Home Dishwasher Repair and Installation in Sofia",
    serviceType: "Dishwasher Repair",
    description: "At-home dishwasher repair and diagnostics in Sofia. Drainage, filling, heating, leaks, and other faults. Diagnostics 30 €.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "Can the dishwasher be repaired at my home?", a: "Yes. RotoRem provides diagnostics and dishwasher repair at customers' homes in Sofia and nearby areas." },
      { q: "Why won't the dishwasher drain?", a: "The cause may be in the filter, pump, hose, or another part of the drainage system." },
      { q: "Why doesn't the dishwasher wash well?", a: "Filters, circulation, spray arms, and heating are checked." },
      { q: "Why won't the dishwasher heat?", a: "The heating system, sensors, and control board are checked." },
      { q: "Do you repair built-in dishwashers?", a: "Yes. RotoRem services freestanding and built-in dishwashers." },
      { q: "Do you provide installation and removal?", a: "Yes. RotoRem installs and removes dishwashers in Sofia." },
      { q: "How much does diagnostics cost?", a: "The visit and diagnostics in Sofia are 30 €." },
      { q: "Do you provide a warranty?", a: "Warranty terms depend on the repair and parts used. Specific conditions are confirmed with the technician." }
    ]
  },
  {
    path: "/en/services/sofia/oven-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Oven Repair in Sofia",
    serviceName: "At-Home Oven Repair in Sofia",
    serviceType: "Oven Repair",
    description: "At-home oven repair and diagnostics in Sofia. Heating elements, temperature, fan, door, and electronics faults. Diagnostics 30 €.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "Can the oven be repaired at my home?", a: "Yes. RotoRem provides diagnostics and oven repair at customers' homes in Sofia and nearby areas." },
      { q: "Why won't the oven heat?", a: "The cause may be a heating element, thermostat, sensor, electrical connection, or control board." },
      { q: "Why does the oven bake unevenly?", a: "Heating elements, the fan, and temperature control are checked." },
      { q: "Do you repair built-in ovens?", a: "Yes. RotoRem repairs built-in and freestanding electric ovens." },
      { q: "Do you repair Gorenje ovens?", a: "Yes. RotoRem diagnoses and repairs Gorenje ovens in Sofia." },
      { q: "Do you provide installation?", a: "Yes. RotoRem installs and removes electric ovens." },
      { q: "How much does diagnostics cost?", a: "The visit and diagnostics in Sofia are 30 €." },
      { q: "Do you provide a warranty?", a: "Warranty terms depend on the repair and parts used. Conditions are confirmed with the technician." }
    ]
  },
  {
    path: "/en/services/sofia/boiler-repair/",
    lang: "en",
    breadcrumbSecond: "Sofia Services",
    breadcrumbThird: "Boiler Repair in Sofia",
    serviceName: "Water Heater Repair and Installation in Sofia",
    serviceType: "Water Heater Repair",
    description: "Water heater repair, diagnostics, installation, and removal in Sofia. Heating elements, thermostats, leaks, noise, and other faults. Diagnostics 30 €.",
    cityName: "Sofia",
    lat: 42.6975,
    lng: 23.3221,
    localBusinessName: "RotoRem Sofia",
    addressLocality: "Sofia",
    postalCode: "1000",
    personName: "Nikolay Ivanov",
    personJobTitle: "Chief Technician",
    personDescription: "Master in Automation and Control Systems with extensive experience in household appliance repair.",
    faq: [
      { q: "Can the water heater be repaired at my home?", a: "Yes. RotoRem provides diagnostics and water heater repair at customers' homes in Sofia and nearby areas." },
      { q: "Why won't the water heater heat?", a: "The heating element, thermostat, thermal cut-out, and power supply are checked." },
      { q: "Why is the water heater leaking?", a: "The cause may be the flange, seal, valve, connection, or tank." },
      { q: "Why does the water heater trip the breaker?", a: "The cause may be related to the heating element, electrical leakage, or another electrical component." },
      { q: "Do you provide installation and removal?", a: "Yes. RotoRem installs and removes water heaters in Sofia." },
      { q: "Do you work with brands such as TESY and Eldom?", a: "Yes. RotoRem services Eldom, Ariston, TESY, Diplomat, Bosch, and other water heater brands." },
      { q: "How much does diagnostics cost?", a: "The visit and diagnostics in Sofia are 30 €." },
      { q: "Do you provide a warranty?", a: "Warranty terms depend on the repair and parts used. Specific conditions are confirmed with the technician." }
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "@type": [...LOCAL_BUSINESS_TYPES.sofia],
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "@type": [...LOCAL_BUSINESS_TYPES.varna],
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
      "@type": [...LOCAL_BUSINESS_TYPES.sofia],
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

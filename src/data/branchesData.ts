export interface BranchInfo {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  area: string;
  address: string;
  phone: string;
  whatsapp: string;
  hours: string;
  flagship: boolean;
  mapUrl: string;
  queryAddress: string;
  coverImage: string;
  images: string[];
  description: string;
  highlights: string[];
}

export const BRANCHES_DATA: BranchInfo[] = [
  {
    id: 7,
    slug: 'head-quarters',
    name: 'Head Quarters',
    shortName: 'Head Quarters',
    area: 'Lavington',
    address: 'Lavington Avenue Complex G/F, James Gichuru Road, Nairobi',
    phone: '+254 722 590 049',
    whatsapp: '254722590049',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM • Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: true,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Lavington+Avenue+Complex+James+Gichuru+Road+Nairobi',
    queryAddress: 'Lavington Avenue Complex, James Gichuru Road, Nairobi, Kenya',
    coverImage: '/Sunny HQ/sunny_hq_1.jpg',
    images: [
      '/Sunny HQ/sunny_hq_1.jpg',
      '/Sunny HQ/sunny_hq_2.jpg',
      '/Sunny HQ/sunny_hq_3.jpg',
      '/Sunny HQ/sunny_hq_4.jpg',
      '/Sunny HQ/sunny_hq_5.jpg',
      '/Sunny HQ/sunny_hq_6.jpg',
      '/Sunny HQ/sunny_hq_7.jpg',
      '/Sunny HQ/sunny_hq_8.jpg',
      '/Sunny HQ/sunny_hq_9.jpg',
      '/Sunny HQ/sunny_hq_10.jpg',
      '/Sunny HQ/sunny_hq_11.jpg',
      '/Sunny HQ/sunny_hq_12.jpg',
      '/Sunny HQ/sunny_hq_13.jpg',
    ],
    description: 'Executive corporate headquarters and premier flagship retail counter featuring executive trading suites, VIP teller counters, and institutional remittance desks.',
    highlights: ['Executive VIP Lounges', 'Institutional Remittance Desk', 'Dedicated Parking', 'High-Volume FX Counter']
  },
  {
    id: 1,
    slug: 'kilimani',
    name: 'Kilimani Branch',
    shortName: 'Kilimani',
    area: 'Kilimani',
    address: 'Woodridge Centre, Wood Avenue, Kilimani, Nairobi',
    phone: '+254 722 350 400',
    whatsapp: '254722350400',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM • Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Woodridge+Centre+Wood+Avenue+Kilimani+Nairobi',
    queryAddress: 'Woodridge Centre, Wood Avenue, Kilimani, Nairobi, Kenya',
    coverImage: '/Sunny Kilimani/Sunny_Kilimani_2.jpg',
    images: [
      '/Sunny Kilimani/Sunny_Kilimani_2.jpg',
      '/Sunny Kilimani/Sunny_Kilimani_1.jpg',
      '/Sunny Kilimani/Sunny_Kilimani_3.jpg',
      '/Sunny Kilimani/Sunny_Kilimani_4.jpg',
      '/Sunny Kilimani/Sunny_Kilimani_5.jpg',
      '/Sunny Kilimani/Sunny_Kilimani_6.jpg',
      '/Sunny Kilimani/Sunny_Kilimani_7.jpg',
    ],
    description: 'Located at the vibrant heart of Kilimani on Wood Avenue. Fast, secure walk-in forex exchange and instant mobile remittance services.',
    highlights: ['Express Teller Desks', 'Accessible Location', 'Multi-Currency Support', 'Instant Cash Pickup']
  },
  {
    id: 2,
    slug: 'valley-arcade',
    name: 'Valley Arcade Branch',
    shortName: 'Valley Arcade',
    area: 'Lavington',
    address: 'Valley Arcade Shopping Mall, Gitanga Road, Lavington, Nairobi',
    phone: '+254 722 360 800',
    whatsapp: '254722360800',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM • Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Valley+Arcade+Shopping+Mall+Gitanga+Road+Lavington+Nairobi',
    queryAddress: 'Valley Arcade Shopping Mall, Gitanga Road, Lavington, Nairobi, Kenya',
    coverImage: '/Sunny Arcade/Sunny_arcade_1.jpg',
    images: [
      '/Sunny Arcade/Sunny_arcade_1.jpg',
      '/Sunny Arcade/Sunny_arcade_2.jpg',
      '/Sunny Arcade/Sunny_arcade_3.jpg',
      '/Sunny Arcade/Sunny_arcade_4.jpg',
      '/Sunny Arcade/Sunny_arcade_5.jpg',
      '/Sunny Arcade/Sunny_arcade_6.jpg',
      '/Sunny Arcade/Sunny_arcade_7.jpg',
    ],
    description: 'Conveniently situated inside the premier Valley Arcade Shopping Mall on Gitanga Road with seamless shopping access and ample parking.',
    highlights: ['Mall Parking Access', 'Rapid Forex Settlement', 'Corporate Accounts', 'Open 7 Days']
  },
  {
    id: 9,
    slug: 'lavington-mall',
    name: 'Lavington Mall Branch',
    shortName: 'Lavington Mall',
    area: 'Lavington',
    address: 'Lavington Mall G/F, James Gichuru / Olenguruone Road, Lavington, Nairobi',
    phone: '+254 722 590 049',
    whatsapp: '254722590049',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM • Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Lavington+Mall+James+Gichuru+Road+Nairobi',
    queryAddress: 'Lavington Mall, James Gichuru Road, Nairobi, Kenya',
    coverImage: '/Sunny HQ/sunny_hq_2.jpg',
    images: [
      '/Sunny HQ/sunny_hq_2.jpg',
      '/Sunny HQ/sunny_hq_3.jpg',
    ],
    description: 'Premier branch inside Lavington Mall offering executive forex rates, shopping convenience, secure parking, and instant remittance pickups.',
    highlights: ['Lavington Mall G/F', 'Ample Mall Parking', 'Instant Remittance', 'Open 7 Days']
  },
  {
    id: 3,
    slug: 'gtc-mall',
    name: 'GTC Mall Branch',
    shortName: 'GTC Westlands',
    area: 'Westlands',
    address: 'GTC Mall, Chiromo Lane, Westlands, Nairobi',
    phone: '+254 722 305 188',
    whatsapp: '254722305188',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM • Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=GTC+Mall+Chiromo+Lane+Westlands+Nairobi',
    queryAddress: 'GTC Mall, Chiromo Lane, Westlands, Nairobi, Kenya',
    coverImage: '/Sunny GTC/Sunny_GTC_1.jpg',
    images: [
      '/Sunny GTC/Sunny_GTC_1.jpg',
      '/Sunny GTC/Sunny_GTC_2.jpg',
      '/Sunny GTC/sunny_GTC_3.jpg',
      '/Sunny GTC/sunny_GTC_4.jpg',
      '/Sunny GTC/sunny_GTC_5.jpg',
    ],
    description: 'Ultra-modern forex hub inside Nairobi’s landmark Global Trade Centre (GTC) in Westlands, catering to diplomatic, corporate, and global business travelers.',
    highlights: ['Commercial Hub', 'High-Security Facility', 'Expatriate & Business FX', 'Direct Mall Access']
  },
  {
    id: 4,
    slug: 'village-market-new',
    name: 'Village Market New Wing',
    shortName: 'VM New Wing',
    area: 'Gigiri / Limuru Road',
    address: 'Village Market Mall – New Wing G/F, Limuru Road, Nairobi',
    phone: '+254 718 040 847',
    whatsapp: '254718040847',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM • Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Village+Market+Mall+New+Wing+Limuru+Road+Nairobi',
    queryAddress: 'Village Market Mall, New Wing, Limuru Road, Nairobi, Kenya',
    coverImage: '/Sunny Village new/sunny_village_new_1.jpg',
    images: [
      '/Sunny Village new/sunny_village_new_1.jpg',
      '/Sunny Village new/sunny_village_new_2.jpg',
      '/Sunny Village new/sunny_village_new_3.jpg',
      '/Sunny Village new/sunny_village_new_4.jpg',
    ],
    description: 'Located in the New Wing of Village Market Mall, serving the diplomatic and expatriate community in Gigiri and surrounding neighborhoods with world-class service.',
    highlights: ['Diplomatic Enclave', 'Premium Mall Setting', 'Weekend Banking', 'Zero Rate Slippage']
  },
  {
    id: 5,
    slug: 'village-market-old',
    name: 'Village Market Old Wing',
    shortName: 'VM Old Wing',
    area: 'Gigiri / Limuru Road',
    address: 'Village Market Mall – Old Wing G/F, Limuru Road, Nairobi',
    phone: '+254 722 454 757',
    whatsapp: '254722454757',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM • Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Village+Market+Mall+Old+Wing+Limuru+Road+Nairobi',
    queryAddress: 'Village Market Mall, Old Wing, Limuru Road, Nairobi, Kenya',
    coverImage: '/Sunny Village old/sunny_Village_old_1.jpg',
    images: [
      '/Sunny Village old/sunny_Village_old_1.jpg',
      '/Sunny Village old/sunny_Village_old_2.jpg',
      '/Sunny Village old/sunny_Village_old_3.jpg',
      '/Sunny Village old/sunny_Village_old_4.jpg',
    ],
    description: 'Long-standing trusted counter in Village Market Mall’s Old Wing, offering swift currency conversion, school fee remittances, and international payout services.',
    highlights: ['Classic Mall Branch', 'Trusted Heritage Desk', 'Direct Payout Support', 'Open 7 Days']
  },
  {
    id: 6,
    slug: 'runda',
    name: 'Runda Branch',
    shortName: 'Runda',
    area: 'Runda / Kiambu Road',
    address: 'Runda Mall G/F, Kiambu Road, Nairobi',
    phone: '+254 722 109 594',
    whatsapp: '254722109594',
    hours: 'Mon-Fri: 9:00 AM - 7:00 PM • Sat-Sun: 9:00 AM - 6:00 PM',
    flagship: false,
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Runda+Mall+Kiambu+Road+Nairobi',
    queryAddress: 'Runda Mall, Kiambu Road, Nairobi, Kenya',
    coverImage: '/Sunny Runda/sunny_runda_4.jpg',
    images: [
      '/Sunny Runda/sunny_runda_4.jpg',
      '/Sunny Runda/sunny_runda_1.jpg',
      '/Sunny Runda/sunny_runda_2.jpg',
      '/Sunny Runda/sunny_runda_3.jpg',
      '/Sunny Runda/sunny_runda_5.jpg',
      '/Sunny Runda/sunny_runda_6.jpg',
      '/Sunny Runda/sunny_runda_7.jpg',
    ],
    description: 'Premier branch on Kiambu Road serving Runda, Ridgeways, and Muthaiga North residents with bespoke private forex rates and family remittance pickups.',
    highlights: ['Residential Hub', 'Spacious Easy Access', 'Fast Foreign Exchange', 'Priority Desk Service']
  }
];

export const ALL_BRANCH_PHOTOS = BRANCHES_DATA.flatMap((b) =>
  b.images.map((img, idx) => ({
    src: img,
    branchName: b.name,
    branchSlug: b.slug,
    branchArea: b.area,
    index: idx + 1,
    total: b.images.length,
    alt: b.name + ' - Photo ' + (idx + 1)
  }))
);

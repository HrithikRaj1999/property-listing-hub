export const LABELS = {
  GOOGLE_LOGIN: `Sign in with google`,
  UPDATE: "UPDATE",
  SIGN_IN: `Sign In`,
  SIGN_UP: `Sign Up`,
  UPLOAD: `UPLOAD`,
  NO_AC: `Don't have an Account?`,
  YES_AC: `Have an Account`,
  FORGOT_PASS: `Forgot Password?`,
  CREATE_LISTING: "Create Listing",
  SHOW_LISTINGS: "Show Listings",
  DELETE_USER: "Delete Account",
  SIGN_OUT: " Sign out",
  CREATE_LISTING_HEADING: "Create a listing of property",
  CREATE_LIST: "Create List",
  UPDATE_LISTING_HEADING: "Update the listing of property",
  LISTING_IMG_UPLOAD_WARNING:
    "The first image will be the cover (max 6 allowed)",
  SPECIFICATIONS: "Specifications",
  BEDROOMS: "Bed Rooms",
  BATHROOMS: "Bathrooms",
  LISTING: "Your Listings",
  HALL: "Hall",
  REGULAR_PRICE: "Regular Price",
  REGULAR_PRICE_SUB: "(Rs/ month)",
  DISCOUNT_PRICE: "Discount Price",
  DISCOUNT_PRICE_SUB: "(Rs/ month)",
  IMAGE: "Image :",
  FULL: " Full Furnished",
  SEMI: "Semi-Furnished",
  NOT: " Unfurnished",
  PARKING: "Parking Spot",
  POOL: "Swimming Pool",
  SECURITY: "Security",
  POWER_BACKUP: "Power Backup",
  WATER_SUPPLY: "24/7 Water Supply",
  ELEVATORS: "Elevators",
  GYM: "Gymnasium",
  PLAYGROUND: "Playground",
  COMMUNITY_HALL: "Community Hall",
  GARDENS: "Landscaped Gardens",
  CAR_PARKING: "Car Parking",
  WASTE_DISPOSAL: "Waste Disposal",
  FIRE_SAFETY: "Fire Safety",
};

export const facilityOptions = [
  { value: LABELS.PARKING, label: LABELS.PARKING },
  { value: LABELS.POOL, label: LABELS.POOL },
  { value: LABELS.SECURITY, label: LABELS.SECURITY },
  { value: LABELS.POWER_BACKUP, label: LABELS.POWER_BACKUP },
  { value: LABELS.WATER_SUPPLY, label: LABELS.WATER_SUPPLY },
  { value: LABELS.ELEVATORS, label: LABELS.ELEVATORS },
  { value: LABELS.GYM, label: LABELS.GYM },
  { value: LABELS.PLAYGROUND, label: LABELS.PLAYGROUND },
  { value: LABELS.COMMUNITY_HALL, label: LABELS.COMMUNITY_HALL },
  { value: LABELS.GARDENS, label: LABELS.GARDENS },
  { value: LABELS.CAR_PARKING, label: LABELS.CAR_PARKING },
  { value: LABELS.WASTE_DISPOSAL, label: LABELS.WASTE_DISPOSAL },
  { value: LABELS.FIRE_SAFETY, label: LABELS.FIRE_SAFETY },
];
export const inititalFormikData: PictureUploadListingDataType = {
  name: "",
  description: "",
  address: "",
  phone: "",
  type: "rent",
  facilities: ["Tennis Court", "Football Ground"],
  roomType: "furnished",
  specifications: {
    bathroom: 1,
    bedrooms: 1,
    hall: 1,
    regularPrice: 0,
    discountedPrice: 0,
  },
  imageUrls: [],
};

import duotone from "../../../icons/duotone";
export const navigation = [
  {
    type: "label",
    label: "Admin",
  },
  {
    name: "Anasayfa",
    icon: duotone.Dashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Kullanıcılar",
    icon: duotone.Dashboard,
    path: "/admin/customers",
  },

  {
    name: "İstatistikler",
    icon: duotone.Products,
    children: [
      {
        name: "Ürün İstatistikleri",
        path: "/admin/statistics/product-statistics",
      },
      {
        name: "Şehre Göre Ödemeler",
        path: "/admin/statistics/city-payments",
      },
     
      {
        name: "Tekrarlı Ödemeler",
        path: "/admin/statistics/repeated-payments",
      },
    ],
  },
  {
    name: "Ürünler",
    icon: duotone.Products,
    children: [
      {
        name: "Ürün Listesi",
        path: "/admin/products",
      },
      {
        name: "Ürün Ekle",
        path: "/admin/products/create",
      },
      {
        name: "Ürün Yorumları",
        path: "/admin/products/reviews",
      },
    ],
  },
  {
    name: "Slider",
    icon: duotone.Products,
    children: [
      {
        name: "Slider Listesi",
        path: "/admin/slider",
      },
      {
        name: "Slider Ekle",
        path: "/admin/slider/create",
      },
     
    ],
  },
  {
    name: "Kategoriler",
    icon: duotone.Accounts,
    children: [
      {
        name: "Kategori Listesi",
        path: "/admin/categories",
      },
      {
        name: "Kategori Ekle",
        path: "/admin/categories/create",
      },
    ],
  },
  {
    name: "Siparişler",
    icon: duotone.Order,
    children: [
      {
        name: "Siparişler Listesi",
        path: "/admin/orders",
      },
      
    ],
  },
  
  {
    name: "Ödemeler",
    icon: duotone.Order,
    children: [
      {
        name: "Ödemeler Listesi",
        path: "/admin/payouts",
      },
      
    ],
  },
  
  {
    name: "Hesap Ayarları",
    icon: duotone.AccountSetting,
    path: "/admin/account-settings",
  },

  {
    name: "Çıkış Yap",
    icon: duotone.Session,
    path: "/",
  },
];

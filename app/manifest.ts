import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RecipeVault - Professional Recipe Management",
    short_name: "RecipeVault",
    description: "Professional recipe management platform for restaurants and culinary teams",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#8B0000",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["business", "productivity", "food"],
    lang: "en-US",
    orientation: "portrait-primary",
  }
}

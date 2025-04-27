/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "admin.umt.edu.pk",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/visualize/:path*", // Frontend route
        destination: `${process.env.PRODUCTION_CHATBOT_API_URL}/:path*`, // Replace with your FastAPI server's URL
      },
    ];
  },
};

export default nextConfig;

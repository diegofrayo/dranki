/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	allowedDevOrigins: ["192.168.40.*", "dranki.local"],
};

export default nextConfig;

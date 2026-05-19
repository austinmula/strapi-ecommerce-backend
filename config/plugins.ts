import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => {
  const cloudName = env('CLOUDINARY_NAME', '');

  // Only activate Cloudinary when credentials are present.
  // Falls back to local disk storage in dev when vars are unset.
  if (!cloudName) return {};

  return {
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: cloudName,
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};

export default config;

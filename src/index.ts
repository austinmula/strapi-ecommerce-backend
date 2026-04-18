import type { Core } from '@strapi/strapi';

// Content types that should be publicly readable (find + findOne)
const PUBLIC_CONTENT_TYPES = [
  'api::product.product',
  'api::category.category',
  'api::collection.collection',
  'api::lookbook-post.lookbook-post',
];

// Orders: only createable publicly (POST), not readable
const PUBLIC_ORDER_ACTIONS = ['create'];

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    // Grant find + findOne on catalogue content types
    for (const uid of PUBLIC_CONTENT_TYPES) {
      for (const action of ['find', 'findOne']) {
        const permission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({ where: { action: `${uid}.${action}`, role: publicRole.id } });

        if (!permission) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: { action: `${uid}.${action}`, role: publicRole.id, enabled: true },
          });
        } else if (!permission.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({ where: { id: permission.id }, data: { enabled: true } });
        }
      }
    }

    // Grant create on orders
    for (const action of PUBLIC_ORDER_ACTIONS) {
      const uid = 'api::order.order';
      const permission = await strapi
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action: `${uid}.${action}`, role: publicRole.id } });

      if (!permission) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action: `${uid}.${action}`, role: publicRole.id, enabled: true },
        });
      } else if (!permission.enabled) {
        await strapi
          .query('plugin::users-permissions.permission')
          .update({ where: { id: permission.id }, data: { enabled: true } });
      }
    }
  },
};

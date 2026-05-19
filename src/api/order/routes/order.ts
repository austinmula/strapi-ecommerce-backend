export default {
  routes: [
    {
      method: 'POST',
      path: '/orders',
      handler: 'order.create',
      config: { policies: [], middlewares: [] },
    },
    {
      method: 'PUT',
      path: '/orders/:id',
      handler: 'order.update',
      config: { policies: [], middlewares: [] },
    },
  ],
}

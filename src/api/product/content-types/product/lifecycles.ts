export default {
  beforeCreate(event: { params: { data: Record<string, unknown> } }) {
    coerceJsonFields(event.params.data);
  },
  beforeUpdate(event: { params: { data: Record<string, unknown> } }) {
    coerceJsonFields(event.params.data);
  },
};

function coerceJsonFields(data: Record<string, unknown>) {
  for (const field of ['sizes', 'colours'] as const) {
    if (data[field] === '' || data[field] === undefined) {
      data[field] = null;
    }
  }
}

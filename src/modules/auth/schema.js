function verifyRequiredConfig(configList) {
  const schema = {
    required: [{
      fastify: 'object',
      database: 'object',
      authConfig: 'object',
      jwt: 'object',
      bcrypt: 'object',
    }],
  };
  Object.keys(configList).forEach((el) => {
    /* eslint valid-typeof: "error" */
    if (!schema.required[el]) {
      throw new Error(`[SCHEMA_FAILED] ${el} value is not set`);
    } else if (schema.required[el]
      && typeof el !== schema.required[el]) {
      throw new Error(`[SCHEMA_FAILED] ${el} should be typeof ${schema.required[el]}`);
    }
  });
}

module.exports = {
  verifyRequiredConfig,
};

class SchemaValidator {
  static validate(schema) {
    return async (req, res, next) => {
      try {
        const validation = {
          body: req.body,
          params: req.params,
          query: req.query
        };
        const { body, params, query } = await schema.validate(validation, {
          stripUnknown: true,
          recursive: true
        });

        req.data = body;
        req.filter = { ...params, ...query };

        return next();
      } catch (error) {
        console.log(error); // eslint-disable-line no-console

        return res.status(400).json({
          status: 'error',
          type_error: 'VALIDATION_ERROR',
          error
        });
      }
    };
  }
}

export default SchemaValidator;

import {
  array,
  boolean,
  number,
  object,
  string
} from 'yup';

class BookSchema {
  get list() {
    return object({
      query: object().shape({
        firstPage: boolean().default(false),
        page: number().min(0).test(this.isPageRequiredTest()),
        categoryId: number().min(1).required()
      }).noUnknown(),
    });
  }

  get find() {
    return object({
      params: object().shape({
        id: number().min(1).required()
      }).noUnknown(),
    });
  }

  get create() {
    return object({
      body: object().shape({
        title: string().required().max(255).nonNullable(),
        fileId: string().required().max(255).nonNullable(),
        thumbId: string().required().max(255).nonNullable(),
        author: string().required().max(255).nonNullable(),
        edition: number().nullable().min(1),
        categoryId: number().min(1).required().nonNullable(),
        description: string().max(255),
        chapters: array(object({
          name: string().required(),
          inferiorLimit: number().min(0).max(9999).required(),
          superiorLimit: number().min(0).max(9999).required(),
          topics: array(object({
            name: string().required(),
            inferiorLimit: number().min(0).max(9999).required(),
            superiorLimit: number().min(0).max(9999).required()
          }).noUnknown())
        }).noUnknown()).nullable()
      }).noUnknown()
    });
  }

  isPageRequiredTest() {
    return {
      name: 'required',
      params: {},
      message: '${path} is required',
      test: function(value) {
        if (this.parent.firstPage) return true;

        return value === 0 || !!value;
      }
    };
  }
}

export default BookSchema;

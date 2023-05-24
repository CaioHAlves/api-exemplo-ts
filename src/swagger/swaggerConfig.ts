import { JsonObject, SwaggerOptions, SwaggerUiOptions } from 'swagger-ui-express'

export const swaggerConfig: JsonObject | SwaggerOptions | SwaggerUiOptions = {
  openapi: "3.0.3",
  info: {
    title: "API MHD - Mohamed",
    author: "https://github.com/CaioHAlves",
    contact: {
      name: "API MHD",
      url: "https://caiohalves.vercel.app",
      email: "caio.henriquealves@outlook.com"
    }
  },
  paths: {
    "/users/create": {
      post: {
        tags: ["User"],
        description: "Cria um usuario",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Users"
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          },
          201: {
            description: "Usuario Criado com sucesso"
          }
        }
      }
    },
    "/users/login": {
      post: {
        tags: ["User"],
        description: "Realiza login de um usuario",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    require: true
                  },
                  password: {
                    type: "string",
                    require: true
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          },
          201: {
            description: "Usuario Criado com sucesso"
          }
        }
      }
    },
    "/users/getAll": {
      get: {
        tags: ["User"],
        description: "Busca usuarios por filtro",
        parameters: [
          { in: "query", name: "name" },
          { in: "query", name: "email" }
        ],
        responses: {
          200: {
            description: "ok"
          },
          500: {
            description: "Erro de conexão com o servidores"
          }
        }
      }
    },
    "/users/delete/{userId}": {
      delete: {
        tags: ["User"],
        description: "Delete um usuario",
        parameters: [
          { in: "path", name: "userId", required: true }
        ],
        responses: {
          200: {
            description: "ok"
          },
          500: {
            description: "Erro de conexão com o servidores"
          }
        }
      }
    },
    "/users/update/{userId}": {
      patch: {
        tags: ["User"],
        description: "Atualiza dados de um usuario",
        parameters: [
          { in: "path", name: "userId", required: true },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "User" },
                  email: { type: "string", example: "user@teste.com.br" },
                  password: { type: "string", example: "123456" },
                  tell: { type: "string", example: "199123456" },
                  newPassword: { type: "string", example: "123456" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          },
          204: {
            description: "ok"
          },
          500: {
            description: "Erro de conexão com o servidores"
          }
        }
      }
    },
    "/measurements/create": {
      post: {
        tags: ["Measurements"],
        description: "Medidas corporais de um usuario",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Measurements"
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          },
          201: {
            description: "Dados cadastrados com sucesso"
          }
        }
      }
    },
    "/measurements/update/{measurementsId}": {
      patch: {
        tags: ["Measurements"],
        description: "Atualiza as medidas de um usuario",
        parameters: [
          { in: "path", name: "measurementsId", required: true }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                $ref: "#/components/schemas/Measurements"
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          }
        }
      }
    },
    "/measurements/get/{userId}": {
      get: {
        tags: ["Measurements"],
        description: "Recupera as medias de um usuario",
        parameters: [
          { in: "path", name: "userId", required: true }
        ],
        responses: {
          200: {
            description: "ok"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Users: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "Nome",
            example: "User Teste"
          },
          email: {
            type: "string",
            description: "Email",
            example: "user@teste.com"
          },
          tell: {
            type: "string",
            description: "Telefone/Celular",
            example: "19912345678"
          },
          password: {
            type: "string",
            description: "Senha usuario",
            example: "123456"
          },
          isAStudent: {
            type: "boolean",
            description: "Define se usuario é aluno ou professor",
            example: false
          }
        }
      },
      Measurements: {
        type: "object",
        properties: {
          weight: {
            type: "number",
            description: "Peso (em kg)"
          },
          arm: {
            type: "number",
            description: "Tamanho do braço (em cm)"
          },
          waist: {
            type: "number",
            description: "Tamanho da cintura (em cm)"
          },
          leg: {
            type: "number",
            description: "Tamanho da perna (em cm)"
          },
          bodyFat: {
            type: "number",
            description: "Peso corporal (em kg)"
          },
          leanMass: {
            type: "number",
            description: "Massa magra (em kg)"
          },
          height: {
            type: "number",
            description: "Altura (em cm)"
          },
          userId: {
            type: "string",
            description: "Id usuario que esta fazendo registro"
          }
        }
      }
    }
  }
}